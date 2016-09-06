/// <reference path="../../globals/angular/index.d.ts" />

declare interface IEmployeeModalControllerScope extends ng.IScope {
    submit: (form: ng.IFormController) => void;
    cancel: () => void;
    name: string;
}