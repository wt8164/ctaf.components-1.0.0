var path = require("path");

require("./node_modules/@ctaf/config/server.js")({
    entry: {
        'page': ['./demo/page.ts'],
        'ctaf_components': ['./src/entry.ts']
    },
    module: {
        loaders: [
            {
                test: /sockjs-client/,
                loader: "expose?SockJS"
            },
            {
                test: /iscroll.js/,
                loader: "expose?IScroll"
            },
            {
                test: /jquery-mousewheel/,
                loader: "imports?define=>false&this=>window"
            },
            {
                test: /malihu-custom-scrollbar-plugin/,
                loader: "imports?define=>false&this=>window"
            }
        ]
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
}, false, true);