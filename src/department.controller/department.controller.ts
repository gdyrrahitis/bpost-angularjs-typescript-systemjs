// var config: AppConfig.Configuration = require("../app.config.json!");
import { Employee } from "../types/employee.type";
import { Department } from "../types/department.type";
import { DepartmentService } from "../department.service/department.service";
import * as $ from "jquery";
import "bootstrap";

export class DepartmentController {
    constructor(private $scope: any, private $routeParams: any, private $localStorage: any, private departmentService: DepartmentService) {
        let employees: Employee[] = [];
        if (this.$localStorage.employees) {
            employees = this.$localStorage.employees.filter((v) => v.departmentId === $routeParams.id);
        } else {
            this.$localStorage.employees = [];
        }

        $scope.employees = employees;
        $scope.addNew = this.addNew;
        $scope.submit = this.submit;
        $scope.removeEmployee = this.removeEmployee;
        $scope.resetEmployees = this.resetEmployees;
        
        let currentDepartment = departmentService.getDepartment(<number>$routeParams.id);
        $scope.departmentName = currentDepartment.name;
        $scope.maxAllowedEmployeesForDepartment = 5; 
            // config.client.departments.find(v => v.name === currentDepartment.name.toLowerCase()).maxAllowedEmployees;
    }

    removeEmployee = (employee: Employee) => {
        // Remove employee from $scope
        var scopeIndex = (<Employee[]>this.$scope.employees).findIndex(v => v == employee);
        (<Employee[]>this.$scope.employees).splice(scopeIndex, 1);

        // Remove employee from $localStorage
        var storageIndex = (<Employee[]>this.$localStorage.employees).findIndex(v => v == employee);
        (<Employee[]>this.$localStorage.employees).splice(storageIndex, 1);
    }

    addNew = () => {
        this.toggleModal();
    }

    resetEmployees = () => {
        // Remove all employees from $scope
        (<Employee[]>this.$scope.employees).splice(0, this.$scope.employees.length);

        // Get all employees from the other departments
        var rest = (<Employee[]>this.$localStorage.employees).filter(v => {
            return v.departmentId != this.$routeParams.id;
        });
        // $localStorage.employees contains now only employees from the other departments
        this.$localStorage.employees = rest;
    }

    submit = (form: angular.IFormController) => {
        if (form.$valid) {
            let employee: Employee = { name: this.$scope.name, departmentId: this.$routeParams.id };

            if (this.$scope.maxAllowedEmployeesForDepartment > this.$scope.employees.length) {
                this.$scope.employees.push(employee);
                this.$localStorage.employees.push(employee);
            }

            form.$setPristine();
            this.$scope.name = "";

            this.toggleModal();
        }
    }

    private toggleModal() {
        (<any>$(".modal")).modal('toggle');
    }
}