declare module AppConfig {
    interface Route {
        path: string;
        templateUrl: string; 
        controller: string;
    }

    interface Department {
        name: string;
        maxAllowedEmployees: number;
    }
    
    interface Modal {
        animation: boolean;
        size: string;
        ariaLabelledBy: string;
        ariaDescribedBy: string;
        templateUrl: string;
        controller: string;
        controllerAs: string;
    }

    interface Client {
        basePath: string;
        html5Mode: boolean,
        routes: Route[];
        departments: Department[],
        modal: Modal
    }

    export interface Configuration {
        client: Client;
    }
}