import { Component, ViewChild, AfterViewInit, AfterViewChecked, OnInit, HostBinding, Input, Output, ComponentBase, CTAFComponent, keyframes, group, ChangeDetectorRef  } from '@ctaf/framework';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@ctaf/framework';
import './animation.less';
@Component({
  templateUrl: 'animation.html'
})

export class DemoAnimationComponent extends ComponentBase {
  // @ViewChild('animation1') animation1: AnimationComponent1;
  // @ViewChild('animation2') animation2: AnimationComponent2;
  // @ViewChild('animation3') animation3: AnimationComponent3;
  // @ViewChild('animation4') animation4: AnimationComponent4;
  // @ViewChild('animation5') animation5: AnimationComponent5;
  // @ViewChild('animation6') animation6: AnimationComponent6;
  // @ViewChild('animation7') animation7: AnimationComponent7;
  // @ViewChild('animation8') animation8: AnimationComponent8;
  // @ViewChild('animation9') animation9: AnimationComponent9;

}

@CTAFComponent({
  selector: 'ctaf-cp-animation1',
  template: `
    <div class="animateBox" [@routeAnimation]="routeAnimation">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'translateX(0)'
      })),
      state('on', style({
        transform: 'translateX(100%)'
      })),
      /** ease 默认，规定慢速开始，然后变快，然后慢速结束的过渡效果
       *  linear 规定以相同速度开始至结束的过渡效果
       *  ease-in 规定以慢速开始的过渡效果
       *  ease-out 规定以慢速结束的过渡效果
       *  ease-in-out 规定以慢速开始和结束的过渡效果
       */
      transition('off => on', animate('500ms ease')),
      transition('on => off', animate('300ms ease'))
    ])
  ]
})
export class AnimationComponent1 extends ComponentBase {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation2',
  template: `
    <div class="animateBox">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'scale(1)',
        transformOrigin: 'left bottom'
      })),
      state('on', style({
        transform: 'scale(1.5)',
        transformOrigin: 'left bottom'
      })),
      transition('off => on', animate('500ms ease')),
      transition('on => off', animate('300ms ease'))
    ])
  ]
})
export class AnimationComponent2 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation3',
  template: `
    <div class="animateBox">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'rotate(0deg)'
      })),
      state('on', style({
        transform: 'rotate(180deg)'
      })),
      transition('off => on', animate('500ms ease')),
      transition('on => off', animate('500ms ease'))
    ])
  ]
})
export class AnimationComponent3 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation4',
  template: `
    <div class="animateBox">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'skew(0deg)'
      })),
      state('on', style({
        transform: 'skew(-45deg,-45deg)'
      })),
      transition('off => on', animate('.5s ease')),
      transition('on => off', animate('.5s ease'))
    ])
  ]
})
export class AnimationComponent4 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation5',
  template: `
    <div class="animateBox">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        opacity: 1
      })),
      state('on', style({
        opacity: .3
      })),
      transition('off => on', animate('.5s ease')),
      transition('on => off', animate('.5s ease'))
    ])
  ]
})
export class AnimationComponent5 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation6',
  template: `
    <div class="animateBox">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        width: '100px'
      })),
      state('on', style({
        width: '0px'
      })),
      transition('off => on', animate('.5s ease')),
      transition('on => off', animate('.5s ease'))
    ])
  ]
})
export class AnimationComponent6 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation7',
  template: `
    <div class="animateBox">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        height: '100px'
      })),
      state('on', style({
        height: '0px'
      })),
      transition('off => on', animate('.5s ease')),
      transition('on => off', animate('.5s ease'))
    ])
  ]
})
export class AnimationComponent7 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation8',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'translateY(-200%) scale(0)',
        opacity: 0.3
      })),
      state('on', style({
        transform: 'translateY(0) scale(1)',
        opacity: 1
      })),
      transition('off => on', group([
        animate('0.3s ease', style({
          transform: 'translateY(0) scale(1)'
        })),
        animate('0.3s 0.2s ease', style({
          opacity: 1
        }))
      ])
      ),
      transition('on => off', animate('.3s ease'))
    ])
  ]
})
export class AnimationComponent8 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation9',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'translateY(0)'
      })),
      state('on', style({
        transform: 'translateY(0)'
      })),
      transition('off <=> on', [
        animate(900, keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-100%)', offset: 0.8 }),
          style({ transform: 'translateY(-100%)', offset: 0.9 }),
          style({ transform: 'translateY(0)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class AnimationComponent9 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation10',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'rotate(0)',
        opacity: 1
      })),
      state('on', style({
        transform: 'rotate(0)',
        opacity: 1
      })),
      transition('off <=> on', [
        animate(900, keyframes([
          style({ transform: 'rotate(0)', opacity: 1, offset: 0 }),
          style({ transform: 'rotate(180deg)', opacity: 0, offset: 0.8 }),
          style({ transform: 'rotate(0)', opacity: 0, offset: 0.8 }),
          style({ transform: 'rotate(0)', opacity: 1, offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class AnimationComponent10 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation11',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'rotate(0)',
        opacity: 1,
        transformOrigin: 'left bottom'
      })),
      state('on', style({
        transform: 'rotate(0)',
        opacity: 1,
        transformOrigin: 'left bottom'
      })),
      transition('off <=> on', [
        animate(700, keyframes([
          style({ transform: 'rotate(-45deg)', opacity: 0, offset: 0 }),
          style({ transform: 'rotate(0deg)', opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AnimationComponent11 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation12',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        opacity: 1
      })),
      state('on', style({
        opacity: 1
      })),
      transition('off <=> on', [
        animate(900, keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 0.2 }),
          style({ opacity: 1, offset: 0.5 }),
          style({ opacity: 0, offset: 0.8 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AnimationComponent12 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation13',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'translateX(0)'
      })),
      state('on', style({
        transform: 'translateX(0)'
      })),
      transition('off <=> on', [
        animate(600, keyframes([
          style({ transform: 'translateX(100%)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.5 }),
          style({ transform: 'translateX(10px)', offset: 0.7 }),
          style({ transform: 'translateX(-5px)', offset: 0.9 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AnimationComponent13 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation14',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'scale(1)'
      })),
      state('on', style({
        transform: 'scale(1)'
      })),
      transition('off <=> on', [
        animate(600, keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.5,0.8)', offset: 0.5 }),
          style({ transform: 'scale(0.8,1)', offset: 0.7 }),
          style({ transform: 'scale(1.3,1)', offset: 0.8 }),
          style({ transform: 'scale(0.9,1)', offset: 0.9 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AnimationComponent14 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}

@CTAFComponent({
  selector: 'ctaf-cp-animation15',
  template: `
    <div class="animateText">Animate</div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('off', style({
        transform: 'translateX(0) skew(0)'
      })),
      state('on', style({
        transform: 'translateX(0) skew(0)'
      })),
      transition('off <=> on', [
        animate(600, keyframes([
          style({ transform: 'translateX(100%) skew(0)', offset: 0 }),
          style({ transform: 'translateX(20px) skew(40deg)', offset: 0.6 }),
          style({ transform: 'translateX(0) skew(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AnimationComponent15 extends ComponentBase {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return this.animationState ? 'on' : 'off';
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }
  @HostBinding('style.height') get height() {
    return '100%';
  }
  @HostBinding('style.width') get width() {
    return '100%';
  }
  @HostBinding('style.overflow') get overflow() {
    return 'hidden';
  }
  public _animationState: boolean = false;
  @Input()
  set animationState(a: boolean) {
    this.setProperty('_animationState', a);
  }
  get animationState(): boolean {
    return this._animationState;
  }
}



