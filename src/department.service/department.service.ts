export class DepartmentService {
    private _departments: Department[];

    constructor() {
        this._departments = [
            {
                id: 1,
                name: "Sales"
            },
            {
                id: 2,
                name: "IT"
            }
        ];
    }

    getDepartments(): Department[] {
        return this._departments;
    }

    getDepartment(id: number): Department {
        return this._departments.find(v => v.id == id);
    }
}