import { Employee } from "../types/employee.type";

export class EmployeeModalController {
    constructor(private $uibModalInstance: any, private $scope: any, private id: number) {
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