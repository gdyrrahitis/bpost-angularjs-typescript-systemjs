/// <reference path="../../globals/angular/index.d.ts" />
/// <reference path="../department/department.d.ts" />

declare interface IHomeControllerScope extends ng.IScope {
    departments: Department[];
    navigateToDepartment: (id: number) => void;
}