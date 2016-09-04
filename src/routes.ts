var config: AppConfig.Configuration = require("./app.config.json!");
import "angular";

export function registerRoutesFor(app: angular.IModule) {
    "use strict";

    app.config(($routeProvider: any, $locationProvider: angular.ILocationProvider) => {
        $locationProvider.html5Mode(true);

        let home = config.client.routes.find(v => v.controller === "homeController");
        let department = config.client.routes.find(v => v.controller === "departmentController");

        $routeProvider
            .when(home.path, {
                templateUrl: home.templateUrl,
                controller: home.controller
            })
            .when(department.path, {
                templateUrl: department.templateUrl,
                controller: department.controller
            })
            .otherwise({
                redirectTo: config.client.basePath
            });
    });
}