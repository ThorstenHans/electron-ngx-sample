"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_1 = require('./components/app/app');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
]);
//# sourceMappingURL=boot.js.map