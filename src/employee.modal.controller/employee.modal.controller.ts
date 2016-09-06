import { Employee } from "../types/employee.type";

interface IEmployeeModalControllerScope extends ng.IScope {
    submit: (form: angular.IFormController) => void;
    cancel: () => void;
    name: string;
}

export class EmployeeModalController {
    constructor(private $uibModalInstance: any, private $scope: IEmployeeModalControllerScope, private id: number) {
        $scope.submit = this.submit;
        $scope.cancel = this.cancel;
    }

    submit = (form: angular.IFormController) => {
        if (form.$valid) {
            this.$uibModalInstance.close(this.$scope.name);
            form.$setPristine();
            this.$scope.name = "";
        }
    }

    cancel = () => {
        this.$uibModalInstance.dismiss("cancel");
    }
}