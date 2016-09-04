import * as angular from "angular";
import "ngSanitize";
import "ngRoute";
import "ngStorage";
import "ngAnimate";
import "ngTouch";
import "angular-ui-bootstrap";
import { HomeController } from "./home.controller/home.controller";
import { DepartmentController } from "./department.controller/department.controller";
import { DepartmentService } from "./department.service/department.service";
import { registerRoutesFor } from "./routes";

export module app {
    "use strict";
    var app = angular.module("app", ["ngSanitize", "ngRoute", "ngStorage", "ngAnimate", "ngTouch", "ui.bootstrap"])
                .controller("homeController", HomeController)
                .controller("departmentController", DepartmentController)
                .factory("departmentService", [DepartmentService]);
    
    registerRoutesFor(app);

    export var angularModule = app;
}