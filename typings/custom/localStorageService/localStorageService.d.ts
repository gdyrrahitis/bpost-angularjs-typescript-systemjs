/// <reference path="../../globals/angularlocalstorage/index.d.ts" />
/// <reference path="../employee/employee.d.ts" />


declare interface IApplicationLocalStorageService extends angular.localStorage.ILocalStorageService {
    employees: Employee[];
}