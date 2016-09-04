var config: AppConfig.Configuration = require("../app.config.json!");
import { Employee } from "../types/employee.type";
import { Department } from "../types/department.type";
import { DepartmentService } from "../department.service/department.service";

export class DepartmentController {
    private $uibModalInstance: any;

    constructor(private $scope: any, private $routeParams: any, private $localStorage: any, private departmentService: DepartmentService, private $uibModal: any) {
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
        $scope.maxAllowedEmployeesForDepartment = config.client.departments.find(v => v.name === currentDepartment.name.toLowerCase()).maxAllowedEmployees;
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
        this.$uibModalInstance = this.$uibModal.open({
            animation: true,
            size: "lg",
            scope: this.$scope,
            template: `<div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Add new employee</h4>
                        </div>
                        <div class="modal-body">
                            <form name="NewEmployee" ng-submit="submit(NewEmployee)">
                                <div class="form-group">
                                    <input type="text" name="name" ng-model="$parent.name" class="form-control" placeholder="Employee name" required />
                                </div>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </form>
                        </div>
                    </div>`,
            resolve: {
                name: () => {
                    return this.$scope.name;
                }
            }
        });
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

            this.$uibModalInstance.dismiss();
        }
    }
}