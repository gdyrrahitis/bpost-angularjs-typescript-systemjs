/// <reference path="../../globals/angular/index.d.ts" />
/// <reference path="../employee/index.d.ts" />

declare interface IDepartmentControllerScope extends ng.IScope {
    employees: Employee[];
    addNew: () => void;
    removeEmployee: (employee: Employee) => void;
    resetEmployees: () => void;
    departmentName: string;
    maxAllowedEmployeesForDepartment: number;
} 