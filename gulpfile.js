var gulp = require("gulp")
var gutil = require('gulp-util');
var seq = require('run-sequence');
var bump = require('gulp-bump');
var path = require("path");

var moduleGulp = require('./node_modules/@ctaf/config/gulpfile.js');

gulp.tasks = moduleGulp.tasks;

gulp.task("build.project", function (cb) {
    let config = {
        entry: {
            'ctaf_components': ('./src/entry.ts')
        },
        module: {
            loaders: [{
                test: /sockjs-client/,
                loader: "expose?SockJS"
            }, {
                test: /iscroll.js/,
                loader: "expose?IScroll"
            }, {
                test: /jquery-mousewheel/,
                loader: "imports?define=>false&this=>window"
            }, {
                test: /malihu-custom-scrollbar-plugin/,
                loader: "imports?define=>false&this=>window"
            }]
        },
        resolve: {
            alias: {
                "amcharts": path.resolve("./3rd/amcharts/amcharts/amcharts"),
                "amcharts.serial": path.resolve("./3rd/amcharts/amcharts/serial"),
                "amcharts.pie": path.resolve("./3rd/amcharts/amcharts/pie"),
                "amcharts.funnel": path.resolve("./3rd/amcharts/amcharts/funnel"),
                "amcharts.gantt": path.resolve("./3rd/amcharts/amcharts/gantt"),
                "amcharts.gauge": path.resolve("./3rd/amcharts/amcharts/gauge"),
                "amcharts.radar": path.resolve("./3rd/amcharts/amcharts/radar"),
                "amcharts.xy": path.resolve("./3rd/amcharts/amcharts/xy"),
                "amcharts.amstock": path.resolve("./3rd/amstockchart/amcharts/amstock"),
                "amcharts.theme.light": path.resolve("./3rd/amcharts/amcharts/themes/light"),
                "amcharts.theme.dark": path.resolve("./3rd/amcharts/amcharts/themes/dark"),
            }
        }
    };

    moduleGulp.buildproject(config, cb, false, true);
});

gulp.task("build.demo", function (cb) {
    let config = {
        entry: {
            'page': ['./demo/page.ts']
        },
        module: {
            loaders: [{
                test: /underscore/,
                loader: "expose?_"
            }, {
                test: /numeral/,
                loader: "expose?numeral"
            }]
        },
        resolve: {
            alias: {
                "amcharts": path.resolve("./3rd/amcharts/amcharts/amcharts"),
                "amcharts.serial": path.resolve("./3rd/amcharts/amcharts/serial"),
                "amcharts.pie": path.resolve("./3rd/amcharts/amcharts/pie"),
                "amcharts.funnel": path.resolve("./3rd/amcharts/amcharts/funnel"),
                "amcharts.gantt": path.resolve("./3rd/amcharts/amcharts/gantt"),
                "amcharts.gauge": path.resolve("./3rd/amcharts/amcharts/gauge"),
                "amcharts.radar": path.resolve("./3rd/amcharts/amcharts/radar"),
                "amcharts.xy": path.resolve("./3rd/amcharts/amcharts/xy"),
                "amcharts.amstock": path.resolve("./3rd/amstockchart/amcharts/amstock"),
                "amcharts.theme.light": path.resolve("./3rd/amcharts/amcharts/themes/light"),
                "amcharts.theme.dark": path.resolve("./3rd/amcharts/amcharts/themes/dark"),
            }
        },
        externals: {
            "../src/entry": "ctaf_components",
            "../../src/entry": "ctaf_components"
        }
    };

    moduleGulp.builddemo(config, cb, false, true);
});


// 复制 demo 站点到包文件中
gulp.task('copy.demo', function (cb) {
    gulp
        .src(['demo/dist/**'])
        .pipe(gulp.dest('dist/demo'));

    gulp
        .src(['demo/index.html'])
        .pipe(gulp.dest('dist/demo/'));

    gulp
        .src(['3rd/amcharts/amcharts/images/**'])
        .pipe(gulp.dest('dist/images/amcharts/'));

    cb();
});

// 发布 ctaf_project 到私有 npm 仓库
gulp.task('publish', function (cb) {
    if (gutil.env.v) {
        gulp.src('./package.json')
            .pipe(bump({
                type: gutil.env.v
            }))
            .pipe(gulp.dest('./'));
    } else {
        gulp.src('./package.json')
            .pipe(bump({
                type: 'prerelease',
                preid: 'beta-' + new Date().format('yyyyMMdd')
            }))
            .pipe(gulp.dest('./'));
    }
    seq('clean', 'copy.package', 'build.project', 'build.min.js', 'build.min.css', 'build.demo', 'copy.demo', 'publish.npm');
});