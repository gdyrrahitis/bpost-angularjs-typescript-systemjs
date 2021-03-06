var config: AppConfig.Configuration = require("../app.config.json!");
import { DepartmentService } from "../department.service/department.service";

export class DepartmentController {
    private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance;

    constructor(private $scope: IDepartmentControllerScope, 
        private $routeParams: IApplicationRouteParams,
        private $localStorage: IApplicationLocalStorageService, 
        private departmentService: DepartmentService,
        private $uibModal: angular.ui.bootstrap.IModalService) {

        let employees: Employee[] = [];
        if (this.$localStorage.employees) {
            employees = this.$localStorage.employees.filter((v) => v.departmentId === $routeParams.id);
        } else {
            this.$localStorage.employees = [];
        }

        $scope.employees = employees;
        $scope.addNew = this.addNew;
        $scope.removeEmployee = this.removeEmployee;
        $scope.resetEmployees = this.resetEmployees;

        let currentDepartment = departmentService.getDepartment($routeParams.id);
        $scope.departmentName = currentDepartment.name;
        $scope.maxAllowedEmployeesForDepartment = config.client.departments.find(v => v.name === currentDepartment.name.toLowerCase()).maxAllowedEmployees;
    }

    removeEmployee = (employee: Employee) => {
        // Remove employee from $scope
        var scopeIndex = this.$scope.employees.findIndex(v => v == employee);
        this.$scope.employees.splice(scopeIndex, 1);

        // Remove employee from $localStorage
        var storageIndex = this.$localStorage.employees.findIndex(v => v == employee);
        this.$localStorage.employees.splice(storageIndex, 1);
    }

    addNew = () => {
        this.$uibModalInstance = this.$uibModal.open({
            animation: config.client.modal.animation,
            size: config.client.modal.size,
            scope: this.$scope,
            templateUrl: config.client.modal.templateUrl,
            controller: config.client.modal.controller,
            controllerAs: config.client.modal.controllerAs,
            resolve: {
                id: () => {
                    return this.$routeParams.id;
                }
            }
        });

        this.$uibModalInstance.result.then((name: string) => {
            if (name) {
                let employee: Employee = { name: name, departmentId: this.$routeParams.id };

                if (this.$scope.maxAllowedEmployeesForDepartment > this.$scope.employees.length) {
                    this.$scope.employees.push(employee);
                    this.$localStorage.employees.push(employee);
                }
            }
        });
    }

    resetEmployees = () => {
        // Remove all employees from $scope
        this.$scope.employees.splice(0, this.$scope.employees.length);

        // Get all employees from the other departments
        var rest = this.$localStorage.employees.filter(v => {
            return v.departmentId != this.$routeParams.id;
        });
        // $localStorage.employees contains now only employees from the other departments
        this.$localStorage.employees = rest;
    }
}