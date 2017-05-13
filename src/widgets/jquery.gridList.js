var GridList = function (items, options) {
  /**
   * A GridList manages the two-dimensional positions from a list of items,
   * within a virtual matrix.
   *
   * The GridList's main function is to convert the item positions from one
   * grid size to another, maintaining as much of their order as possible.
   *
   * The GridList's second function is to handle collisions when moving an item
   * over another.
   *
   * The positioning algorithm places items in columns. Starting from left to
   * right, going through each column top to bottom.
   *
   * The size of an item is expressed using the number of cols and rows it
   * takes up within the grid (w and h)
   *
   * The position of an item is express using the col and row position within
   * the grid (x and y)
   *
   * An item is an object of structure:
   * {
   *   w: 3, h: 1,
   *   x: 0, y: 1
   * }
   */

  this._options = options;
  for (var k in this.defaults) {
    if (!this._options.hasOwnProperty(k)) {
      this._options[k] = this.defaults[k];
    }
  }

  this.items = items;

  this._adjustSizeOfItems();

  this.generateGrid();
};

GridList.cloneItems = function (items, _items) {
  /**
   * Clone items with a deep level of one. Items are not referenced but their
   * properties are
   */
  var _item,
    i,
    k;
  if (_items === undefined) {
    _items = [];
  }
  for (i = 0; i < items.length; i++) {
    // XXX: this is good because we don't want to lose item reference, but
    // maybe we should clear their properties since some might be optional
    if (!_items[i]) {
      _items[i] = {};
    }
    for (k in items[i]) {
      _items[i][k] = items[i][k];
    }
  }
  return _items;
};

GridList.prototype = {

  defaults: {
    lanes: 12,
    xlanes: 12,
    ylanes: 12,
    direction: 'horizontal'
  },

  /**
   * Illustates grid as text-based table, using a number identifier for each
   * item. E.g.
   *
   *  #|  0  1  2  3  4  5  6  7  8  9 10 11 12 13
   *  --------------------------------------------
   *  0| 00 02 03 04 04 06 08 08 08 12 12 13 14 16
   *  1| 01 -- 03 05 05 07 09 10 11 11 -- 13 15 --
   *
   * Warn: Does not work if items don't have a width or height specified
   * besides their position in the grid.
   */
  toString: function () {
    var widthOfGrid = this.grid.length,
      output = '\n #|',
      border = '\n --',
      item,
      i,
      j;

    // Render the table header
    for (i = 0; i < widthOfGrid; i++) {
      output += ' ' + this._padNumber(i, ' ');
      border += '---';
    };
    output += border;

    // Render table contents row by row, as we go on the y axis
    for (i = 0; i < this._options.lanes; i++) {
      output += '\n' + this._padNumber(i, ' ') + '|';
      for (j = 0; j < widthOfGrid; j++) {
        output += ' ';
        item = this.grid[j][i];
        output += item ? this._padNumber(this.items.indexOf(item), '0') : '--';
      }
    };
    output += '\n';
    return output;
  },

  generateGrid: function () {
    /**
     * Build the grid structure from scratch, with the current item positions
     */
    var i;
    this._resetGrid();
    for (i = 0; i < this.items.length; i++) {
      this._markItemPositionToGrid(this.items[i]);
    }
  },

  resizeGrid: function (lanes) {
    var currentColumn = 0;

    this._options.lanes = lanes;
    this._adjustSizeOfItems();

    this._sortItemsByPosition();
    this._resetGrid();

    // The items will be sorted based on their index within the this.items array,
    // that is their "1d position"
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i],
        position = this._getItemPosition(item);

      this._updateItemPosition(
        item, this.findPositionForItem(item, { x: currentColumn, y: 0 }));

      // New items should never be placed to the left of previous items
      currentColumn = Math.max(currentColumn, position.x);
    }

    this._pullItemsToLeft();
  },

  findPositionForItem: function (item, start, fixedRow) {
    /**
     * This method has two options for the position we want for the item:
     * - Starting from a certain row/column number and only looking for
     *   positions to its right
     * - Accepting positions for a certain row number only (use-case: items
     *   being shifted to the left/right as a result of collisions)
     *
     * @param {Object<x:Number, y:Number, w:Number, h:Number} item
     * @param {Object<x:Number, y:Number} start Position from which to start
     *     the search.
     * @param {Number} [fixedRow] If provided, we're going to try to find a
     *     position for the new item on it. If doesn't fit there, we're going
     *     to put it on the first row.
     *
     * @returns {Number[2]} x and y.
     */

    var x, y, position;

    // Start searching for a position from the horizontal position of the
    // rightmost item from the grid
    for (x = start.x; x < this.grid.length; x++) {
      if (fixedRow !== undefined) {
        position = [x, fixedRow];

        if (this._itemFitsAtPosition(item, position)) {
          return position;
        }
      } else {
        for (y = start.y; y < this._options.lanes; y++) {
          position = [x, y];

          if (this._itemFitsAtPosition(item, position)) {
            return position;
          }
        }
      }
    }

    // If we've reached this point, we need to start a new column
    var newCol = this.grid.length,
      newRow = 0;

    if (fixedRow !== undefined &&
      this._itemFitsAtPosition(item, [newCol, fixedRow])) {
      newRow = fixedRow;
    }

    return [newCol, newRow];
  },

  moveItemToPosition: function (item, newPosition) {
    var position = this._getItemPosition({
      x: newPosition[0],
      y: newPosition[1],
      w: item.w,
      h: item.h
    });

    this._updateItemPosition(item, [position.x, position.y]);
    this._resolveCollisions(item);
  },

  resizeItem: function (item, size) {
    /**
     * Resize an item and resolve collisions.
     *
     * @param {Object} item A reference to an item that's part of the grid.
     * @param {Object} size
     * @param {Number} [size.w=item.w] The new width.
     * @param {Number} [size.h=item.h] The new height.
     */

    var width = size.w || item.w,
      height = size.h || item.h;

    this._updateItemSize(item, width, height);

    this._resolveCollisions(item);

    this._pullItemsToLeft();
  },

  getChangedItems: function (initialItems, idAttribute) {
    /**
     * Compare the current items against a previous snapshot and return only
     * the ones that changed their attributes in the meantime. This includes both
     * position (x, y) and size (w, h)
     *
     * Since both their position and size can change, the items need an
     * additional identifier attribute to match them with their previous state
     */
    var changedItems = [];

    for (var i = 0; i < initialItems.length; i++) {
      var item = this._getItemByAttribute(idAttribute,
        initialItems[i][idAttribute]);

      if (item.x !== initialItems[i].x ||
        item.y !== initialItems[i].y ||
        item.w !== initialItems[i].w ||
        item.h !== initialItems[i].h) {
        changedItems.push(item);
      }
    }

    return changedItems;
  },

  _sortItemsByPosition: function () {
    this.items.sort(function (item1, item2) {
      var position1 = this._getItemPosition(item1),
        position2 = this._getItemPosition(item2);

      // Try to preserve columns.
      if (position1.x != position2.x) {
        return position1.x - position2.x;
      }

      if (position1.y != position2.y) {
        return position1.y - position2.y;
      }

      // The items are placed on the same position.
      return 0;
    }.bind(this));
  },

  _adjustSizeOfItems: function () {
    /**
     * Some items can have 100% height or 100% width. Those dimmensions are
     * expressed as 0. We need to ensure a valid width and height for each of
     * those items as the number of items per lane.
     */

    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];

      // This can happen only the first time items are checked.
      // We need the property to have a value for all the items so that the
      // `cloneItems` method will merge the properties properly. If we only set
      // it to the items that need it then the following can happen:
      //
      // cloneItems([{id: 1, autoSize: true}, {id: 2}],
      //            [{id: 2}, {id: 1, autoSize: true}]);
      //
      // will result in
      //
      // [{id: 1, autoSize: true}, {id: 2, autoSize: true}]
      if (item.autoSize === undefined) {
        item.autoSize = item.w === 0 || item.h === 0;
      }

      if (item.autoSize) {
        if (this._options.direction === 'horizontal') {
          item.h = this._options.lanes;
        } else {
          item.w = this._options.lanes;
        }
      }
    }
  },

  _resetGrid: function () {
    this.grid = [];
  },

  _itemFitsAtPosition: function (item, newPosition) {
    /**
     * Check that an item wouldn't overlap with another one if placed at a
     * certain position within the grid
     */

    var position = this._getItemPosition(item),
      x, y, row;

    // No coordonate can be negative
    if (newPosition[0] < 0 || newPosition[1] < 0) {
      return false;
    }

    // Make sure the item isn't larger than the entire grid
    if (newPosition[1] + position.h > this._options.lanes) {
      return false;
    }

    // Make sure the position doesn't overlap with an already positioned
    // item.
    for (x = newPosition[0]; x < newPosition[0] + position.w; x++) {
      var col = this.grid[x];

      // Surely a column that hasn't even been created yet is available
      if (!col) {
        continue;
      }

      for (y = newPosition[1]; y < newPosition[1] + position.h; y++) {
        // Any space occupied by an item can continue to be occupied by the
        // same item.
        if (col[y] && col[y] !== item) {
          return false;
        }
      }
    }

    return true;
  },

  _updateItemPosition: function (item, position) {
    if (item.x !== null && item.y !== null) {
      this._deleteItemPositionFromGrid(item);
    }

    this._setItemPosition(item, position);

    this._markItemPositionToGrid(item);
  },

  _updateItemSize: function (item, width, height) {
    /**
     * @param {Object} item A reference to a grid item.
     * @param {Number} width The new width.
     * @param {Number} height The new height.
     */

    if (item.x !== null && item.y !== null) {
      this._deleteItemPositionFromGrid(item);
    }

    item.w = width;
    item.h = height;

    this._markItemPositionToGrid(item);
  },

  _markItemPositionToGrid: function (item) {
    /**
     * Mark the grid cells that are occupied by an item. This prevents items
     * from overlapping in the grid
     */

    var position = this._getItemPosition(item),
      x, y;

    // Ensure that the grid has enough columns to accomodate the current item.
    this._ensureColumns(position.x + position.w);

    for (x = position.x; x < position.x + position.w; x++) {
      for (y = position.y; y < position.y + position.h; y++) {
        this.grid[x][y] = item;
      }
    }
  },

  _deleteItemPositionFromGrid: function (item) {
    var position = this._getItemPosition(item),
      x, y;

    for (x = position.x; x < position.x + position.w; x++) {
      // It can happen to try to remove an item from a position not generated
      // in the grid, probably when loading a persisted grid of items. No need
      // to create a column to be able to remove something from it, though
      if (!this.grid[x]) {
        continue;
      }

      for (y = position.y; y < position.y + position.h; y++) {
        // Don't clear the cell if it's been occupied by a different widget in
        // the meantime (e.g. when an item has been moved over this one, and
        // thus by continuing to clear this item's previous position you would
        // cancel the first item's move, leaving it without any position even)
        if (this.grid[x][y] == item) {
          this.grid[x][y] = null;
        }
      }
    }
  },

  _ensureColumns: function (N) {
    /**
     * Ensure that the grid has at least N columns available.
     */
    var i;
    for (i = 0; i < N; i++) {
      if (!this.grid[i]) {
        this.grid.push(new GridCol(this._options.lanes));
      }
    }
  },

  _getItemsCollidingWithItem: function (item) {
    var collidingItems = [];
    for (var i = 0; i < this.items.length; i++) {
      if (item != this.items[i] &&
        this._itemsAreColliding(item, this.items[i])) {
        collidingItems.push(i);
      }
    }
    return collidingItems;
  },

  _itemsAreColliding: function (item1, item2) {
    var position1 = this._getItemPosition(item1),
      position2 = this._getItemPosition(item2);

    return !(position2.x >= position1.x + position1.w ||
      position2.x + position2.w <= position1.x ||
      position2.y >= position1.y + position1.h ||
      position2.y + position2.h <= position1.y);
  },

  _resolveCollisions: function (item) {
    if (!this._tryToResolveCollisionsLocally(item)) {
      this._pullItemsToLeft(item);
    }
    this._pullItemsToLeft();
  },

  _tryToResolveCollisionsLocally: function (item) {
    /**
     * Attempt to resolve the collisions after moving a an item over one or more
     * other items within the grid, by shifting the position of the colliding
     * items around the moving one. This might result in subsequent collisions,
     * in which case we will revert all position permutations. To be able to
     * revert to the initial item positions, we create a virtual grid in the
     * process
     */
    var collidingItems = this._getItemsCollidingWithItem(item);
    if (!collidingItems.length) {
      return true;
    }
    var _gridList = new GridList([], this._options),
      leftOfItem,
      rightOfItem,
      aboveOfItem,
      belowOfItem;

    GridList.cloneItems(this.items, _gridList.items);
    _gridList.generateGrid();

    for (var i = 0; i < collidingItems.length; i++) {
      var collidingItem = _gridList.items[collidingItems[i]],
        collidingPosition = this._getItemPosition(collidingItem);

      // We use a simple algorithm for moving items around when collisions occur:
      // In this prioritized order, we try to move a colliding item around the
      // moving one:
      // 1. to its left side
      // 2. above it
      // 3. under it
      // 4. to its right side
      var position = this._getItemPosition(item);

      leftOfItem = [position.x - collidingPosition.w, collidingPosition.y];
      rightOfItem = [position.x + position.w, collidingPosition.y];
      aboveOfItem = [collidingPosition.x, position.y - collidingPosition.h];
      belowOfItem = [collidingPosition.x, position.y + position.h];

      if (_gridList._itemFitsAtPosition(collidingItem, leftOfItem)) {
        _gridList._updateItemPosition(collidingItem, leftOfItem);
      } else if (_gridList._itemFitsAtPosition(collidingItem, aboveOfItem)) {
        _gridList._updateItemPosition(collidingItem, aboveOfItem);
      } else if (_gridList._itemFitsAtPosition(collidingItem, belowOfItem)) {
        _gridList._updateItemPosition(collidingItem, belowOfItem);
      } else if (_gridList._itemFitsAtPosition(collidingItem, rightOfItem)) {
        _gridList._updateItemPosition(collidingItem, rightOfItem);
      } else {
        // Collisions failed, we must use the pullItemsToLeft method to arrange
        // the other items around this item with fixed position. This is our
        // plan B for when local collision resolving fails.
        return false;
      }
    }
    // If we reached this point it means we managed to resolve the collisions
    // from one single iteration, just by moving the colliding items around. So
    // we accept this scenario and marge the brached-out grid instance into the
    // original one
    GridList.cloneItems(_gridList.items, this.items);
    this.generateGrid();
    return true;
  },

  _pullItemsToLeft: function (fixedItem) {
    /**
     * Build the grid from scratch, by using the current item positions and
     * pulling them as much to the left as possible, removing as space between
     * them as possible.
     *
     * If a "fixed item" is provided, its position will be kept intact and the
     * rest of the items will be layed around it.
     */


    // Start a fresh grid with the fixed item already placed inside
    this._sortItemsByPosition();
    this._resetGrid();

    // Start the grid with the fixed item as the first positioned item
    if (fixedItem) {
      var fixedPosition = this._getItemPosition(fixedItem);
      this._updateItemPosition(fixedItem, [fixedPosition.x, fixedPosition.y]);
    }

    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i],
        position = this._getItemPosition(item);

      // The fixed item keeps its exact position
      if (fixedItem && item == fixedItem) {
        continue;
      }

      var x = this._findLeftMostPositionForItem(item),
        newPosition = this.findPositionForItem(
          item, { x: x, y: 0 }, position.y);

      this._updateItemPosition(item, newPosition);
    }
  },

  _findLeftMostPositionForItem: function (item) {
    /**
     * When pulling items to the left, we need to find the leftmost position for
     * an item, with two considerations in mind:
     * - preserving its current row
     * - preserving the previous horizontal order between items
     */

    var tail = 0,
      position = this._getItemPosition(item);

    for (var i = 0; i < this.grid.length; i++) {
      for (var j = position.y; j < position.y + position.h; j++) {
        var otherItem = this.grid[i][j];

        if (!otherItem) {
          continue;
        }

        var otherPosition = this._getItemPosition(otherItem);

        if (this.items.indexOf(otherItem) < this.items.indexOf(item)) {
          tail = otherPosition.x + otherPosition.w;
        }
      }
    }

    return tail;
  },

  _getItemByAttribute: function (key, value) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i][key] === value) {
        return this.items[i];
      }
    }
    return null;
  },

  _padNumber: function (nr, prefix) {
    // Currently works for 2-digit numbers (<100)
    return nr >= 10 ? nr : prefix + nr;
  },

  _getItemPosition: function (item) {
    /**
     * If the direction is vertical we need to rotate the grid 90 deg to the
     * left. Thus, we simulate the fact that items are being pulled to the top.
     *
     * Since the items have widths and heights, if we apply the classic
     * counter-clockwise 90 deg rotation
     *
     *     [0 -1]
     *     [1  0]
     *
     * then the top left point of an item will become the bottom left point of
     * the rotated item. To adjust for this, we need to subtract from the y
     * position the height of the original item - the width of the rotated item.
     *
     * However, if we do this then we'll reverse some actions: resizing the
     * width of an item will stretch the item to the left instead of to the
     * right; resizing an item that doesn't fit into the grid will push the
     * items around it instead of going on a new row, etc.
     *
     * We found it better to do a vertical flip of the grid after rotating it.
     * This restores the direction of the actions and greatly simplifies the
     * transformations.
     */

    if (this._options.direction === 'horizontal') {
      return item;
    } else {
      return {
        x: item.y,
        y: item.x,
        w: item.h,
        h: item.w
      };
    }
  },

  _setItemPosition: function (item, position) {
    /**
     * See _getItemPosition.
     */

    if (this._options.direction === 'horizontal') {
      item.x = position[0];
      item.y = position[1];
    } else {
      // We're supposed to subtract the rotated item's height which is actually
      // the non-rotated item's width.
      item.x = position[1];
      item.y = position[0];
    }
  }
};

var GridCol = function (lanes) {
  for (var i = 0; i < lanes; i++) {
    this.push(null);
  }
};

// Extend the Array prototype
GridCol.prototype = [];

// It does not try to register in a CommonJS environment since jQuery is not
// likely to run in those environments.
var DraggableGridList = function (element, options, draggableOptions) {
  this.options = $.extend({}, this.defaults, options);
  this.draggableOptions = $.extend(
    {}, this.draggableDefaults, draggableOptions);

  this.$element = $(element);
  this._init();
  this._bindEvents();
};

DraggableGridList.prototype = {

  defaults: {
    xlanes: 12,
    ylanes: 12,
    direction: "horizontal",
    itemSelector: 'li[data-w]',
    widthHeightRatio: 1,
    dragAndDrop: true
  },

  draggableDefaults: {
    zIndex: 2,
    scroll: false,
    containment: "parent"
  },

  destroy: function () {
    this._unbindEvents();
  },

  resize: function (lanes) {
    if (lanes) {
      this.options.lanes = lanes;
    }
    this._createGridSnapshot();
    this.gridList.resizeGrid(this.options.lanes);
    this._updateGridSnapshot();

    this.reflow();
  },

  resizeItem: function (element, size) {
    /**
     * Resize an item.
     *
     * @param {Object} size
     * @param {Number} [size.w]
     * @param {Number} [size.h}
     */

    this._createGridSnapshot();
    this.gridList.resizeItem(this._getItemByElement(element), size);
    this._updateGridSnapshot();

    this.render();
  },

  reflow: function () {
    this._calculateCellSize();
    this.render();
  },

  render: function () {
    this._applySizeToItems();
    this._applyPositionToItems();
  },

  _bindMethod: function (fn) {
    /**
     * Bind prototype method to instance scope (similar to CoffeeScript's fat
     * arrow)
     */
    var that = this;
    return function () {
      return fn.apply(that, arguments);
    };
  },

  reInit: function () {
    // Read items and their meta data. Ignore other list elements (like the
    // position highlight)

    this.$items = this.$element.find(this.options.itemSelector);
    this.items = this._generateItemsFromDOM();
    this.gridList.items = this.items;
    this._widestItem = Math.max.apply(
      null, this.items.map(function (item) { return item.w; }));
    this._tallestItem = Math.max.apply(
      null, this.items.map(function (item) { return item.h; }));

    // Used to highlight a position an element will land on upon drop
    this.$positionHighlight = this.$element.find('.position-highlight').hide();

    this._initGridList();
    this.reflow();

    if (this.options.dragAndDrop) {
      // Init Draggable JQuery UI plugin for each of the list items
      // http://api.jqueryui.com/draggable/
      this.$items.each(function (i, element) {
        if ($(element).is(":data('ui-draggable')")) {
          $(element).draggable("destroy");
        }
      });

      this.$items.draggable(this.draggableOptions);
    }

    this._unbindEvents();
    this._bindEvents();
  },

  getMaxY: function () {
    var maxy = 0;
    $.each(this.items, function (i, v) {
      maxy = Math.max(maxy, (isNaN(v.h) ? 0 : v.h) + (isNaN(v.y) ? 0 : v.y));
    })
    return maxy;
  },

  _init: function () {
    // Read items and their meta data. Ignore other list elements (like the
    // position highlight)
    this.$items = this.$element.find(this.options.itemSelector);
    this.items = this._generateItemsFromDOM();
    this._widestItem = Math.max.apply(
      null, this.items.map(function (item) { return item.w; }));
    this._tallestItem = Math.max.apply(
      null, this.items.map(function (item) { return item.h; }));

    // Used to highlight a position an element will land on upon drop
    this.$positionHighlight = this.$element.find('.position-highlight').hide();

    this._initGridList();
    this.reflow();

    if (this.options.dragAndDrop) {
      // Init Draggable JQuery UI plugin for each of the list items
      // http://api.jqueryui.com/draggable/
      this.$items.draggable(this.draggableOptions);
    }
  },

  _initGridList: function () {
    // Create instance of GridList (decoupled lib for handling the grid
    // positioning and sorting post-drag and dropping)
    this.gridList = new GridList(this.items, {
      lanes: this.options.lanes,
      xlanes: this.options.xlanes,
      ylanes: this.options.ylanes,
      direction: this.options.direction
    });
  },

  _bindEvents: function () {
    this._onStart = this._bindMethod(this._onStart);
    this._onDrag = this._bindMethod(this._onDrag);
    this._onStop = this._bindMethod(this._onStop);
    this.$items.on('dragstart', this._onStart);
    this.$items.on('drag', this._onDrag);
    this.$items.on('dragstop', this._onStop);
  },

  _unbindEvents: function () {
    this.$items.off('dragstart', this._onStart);
    this.$items.off('drag', this._onDrag);
    this.$items.off('dragstop', this._onStop);
  },

  _onStart: function (event, ui) {
    // Create a deep copy of the items; we use them to revert the item
    // positions after each drag change, making an entire drag operation less
    // distructable
    this._triggerOnStart();

    this._createGridSnapshot();

    // Since dragging actually alters the grid, we need to establish the number
    // of cols (+1 extra) before the drag starts

    this._maxGridCols = this.gridList.grid.length;
  },

  _onDrag: function (event, ui) {
    var item = this._getItemByElement(ui.helper),
      newPosition = this._snapItemPositionToGrid(item);

    if (this._dragPositionChanged(newPosition)) {
      this._previousDragPosition = newPosition;

      // Regenerate the grid with the positions from when the drag started
      GridList.cloneItems(this._items, this.items);
      this.gridList.generateGrid();

      // Since the items list is a deep copy, we need to fetch the item
      // corresponding to this drag action again
      item = this._getItemByElement(ui.helper);
      this.gridList.moveItemToPosition(item, newPosition);

      // Visually update item positions and highlight shape
      this._applyPositionToItems();
      this._highlightPositionForItem(item);
    }
  },

  _onStop: function (event, ui) {
    this._updateGridSnapshot();
    this._previousDragPosition = null;

    // HACK: jQuery.draggable removes this class after the dragstop callback,
    // and we need it removed before the drop, to re-enable CSS transitions
    $(ui.helper).removeClass('ui-draggable-dragging');

    this._applyPositionToItems();
    this._removePositionHighlight();

    this._triggerOnStop();
  },

  _generateItemsFromDOM: function () {
    /**
     * Generate the structure of items used by the GridList lib, using the DOM
     * data of the children of the targeted element. The items will have an
     * additional reference to the initial DOM element attached, in order to
     * trace back to it and re-render it once its properties are changed by the
     * GridList lib
     */
    var _this = this,
      items = [],
      item;
    this.$items.each(function (i, element) {
      items.push({
        $element: $(element),
        x: Number($(element).attr('data-x')),
        y: Number($(element).attr('data-y')),
        w: Number($(element).attr('data-w')),
        h: Number($(element).attr('data-h')),
        id: Number($(element).attr('data-id'))
      });
    });
    return items;
  },

  _getItemByElement: function (element) {
    // XXX: this could be optimized by storing the item reference inside the
    // meta data of the DOM element
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].$element.is(element)) {
        return this.items[i];
      }
    }
  },

  _calculateCellSize: function () {
    this._cellWidth = 100 / this.options.xlanes;
    this._cellHeight = 100 / this.options.ylanes;

    // if (this.options.heightToFontSizeRatio) {
    //   this._fontSize = this._cellHeight * this.options.heightToFontSizeRatio;
    // }
  },

  _getItemWidth: function (item) {
    return (item.w * this._cellWidth) + "%";
  },

  _getItemHeight: function (item) {
    return (item.h * this._cellHeight) + "%";
  },

  _applySizeToItems: function () {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].$element.css({
        width: this._getItemWidth(this.items[i]),
        height: this._getItemHeight(this.items[i])
      });
    }
    // if (this.options.heightToFontSizeRatio) {
    //   this.$items.css('font-size', this._fontSize);
    // }
  },

  _applyPositionToItems: function () {
    // TODO: Implement group separators
    for (var i = 0; i < this.items.length; i++) {
      // Don't interfere with the positions of the dragged items
      if (this.items[i].move) {
        continue;
      }
      this.items[i].$element.css({
        left: (this.items[i].x * this._cellWidth) + "%",
        top: (this.items[i].y * this._cellHeight) + "%"
      });
      this.items[i].$element.attr("data-x", this.items[i].x);
      this.items[i].$element.attr("data-y", this.items[i].y);
      // console.log(this.items[0].$element.data("x"));
    }
    // Update the width of the entire grid container with enough room on the
    // right to allow dragging items to the end of the grid.
    // if (this.options.direction === "horizontal") {
    //   this.$element.width(
    //     (this.gridList.grid.length + this._widestItem) * this._cellWidth);
    // } else {
    //   this.$element.height(
    //     (this.gridList.grid.length + this._tallestItem) * this._cellHeight);
    // }
  },

  _dragPositionChanged: function (newPosition) {
    if (!this._previousDragPosition) {
      return true;
    }
    return (newPosition[0] != this._previousDragPosition[0] ||
      newPosition[1] != this._previousDragPosition[1]);
  },

  _snapItemPositionToGrid: function (item) {
    var position = item.$element.position();

    position[0] -= this.$element.position().left;

    var _cellWidth = this.$element.width() / 100 * this._cellWidth;
    var _cellHeight = this.$element.height() / 100 * this._cellHeight;;

    var col = Math.round(position.left / _cellWidth),
      row = Math.round(position.top / _cellHeight);

    // Keep item position within the grid and don't let the item create more
    // than one extra column
    col = Math.max(col, 0);
    row = Math.max(row, 0);

    if (this.options.direction === "horizontal") {
      col = Math.min(col, this._maxGridCols);
      row = Math.min(row, this.options.lanes - item.h);
    } else {
      col = Math.min(col, this.options.lanes - item.w);
      row = Math.min(row, this._maxGridCols);
    }

    return [col, row];
  },

  _highlightPositionForItem: function (item) {
    this.$positionHighlight.css({
      width: this._getItemWidth(item),
      height: this._getItemHeight(item),
      left: (item.x * this._cellWidth) + "%",
      top: (item.y * this._cellHeight) + "%"
    }).show();
    // if (this.options.heightToFontSizeRatio) {
    //   this.$positionHighlight.css('font-size', this._fontSize);
    // }
  },

  _removePositionHighlight: function () {
    this.$positionHighlight.hide();
  },

  _createGridSnapshot: function () {
    this._items = GridList.cloneItems(this.items);
  },

  _updateGridSnapshot: function () {
    // Notify the user with the items that changed since the previous snapshot
    this._triggerOnChange();
    GridList.cloneItems(this.items, this._items);
  },

  _triggerOnStart: function () {
    if (typeof (this.options.onStart) != 'function') {
      return;
    }
    this.options.onStart.call(this, this.$element);
  },

  _triggerOnChange: function () {
    if (typeof (this.options.onChange) != 'function') {
      return;
    }
    this.options.onChange.call(
      this, this.gridList.getChangedItems(this._items, '$element'));
  },

  _triggerOnStop: function () {
    if (typeof (this.options.onStop) != 'function') {
      return;
    }
    this.options.onStop.call(this, this.$element);
  }
};

$.fn.gridList = function (options, draggableOptions) {
  var instance,
    method,
    args;
  var r = this;
  if (typeof (options) == 'string') {
    method = options;
    args = Array.prototype.slice.call(arguments, 1);
  }
  this.each(function () {
    instance = $(this).data('_gridList');
    // The plugin call be called with no method on an existing GridList
    // instance to re-initialize it
    if (instance && !method) {
      instance.destroy();
      instance = null;
    }
    if (!instance) {
      instance = new DraggableGridList(this, options, draggableOptions);
      $(this).data('_gridList', instance);
    }
    if (method) {
      r = instance[method].apply(instance, args);
    }
  });
  // Maintain jQuery chain
  return r;
};
