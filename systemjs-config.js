(function () {
    var map = {
        "app": "src",
        "angular": "node_modules/angular",
        "ngSanitize": "node_modules/angular-sanitize/",
        "ngRoute": "node_modules/angular-route/",
        "ngStorage": "node_modules/ngstorage/",
        "ngAnimate": "node_modules/angular-animate/",
        "ngTouch": "node_modules/angular-touch/",
        "angular-ui-bootstrap": "node_modules/angular-ui-bootstrap/",
        "json": "node_modules/systemjs-plugin-json/"
    };

    var packages = {
        "app": { main: "main.js", defaultExtension: "js" },
        "angular": { main: "index.js", defaultExtension: "js" },
        "ngSanitize": { main: "index.js", defaultExtension: "js" },
        "ngRoute": { main: "index.js", defaultExtension: "js" },
        "ngAnimate": { main: "index.js", defaultExtension: "js" },
        "ngTouch": { main: "index.js", defaultExtension: "js" },
        "angular-ui-bootstrap": { main: "index.js", defaultExtension: "js" },
        "ngStorage": { main: "ngStorage.js", defaultExtension: "js" },
        "json": { main: "json.js", defaultExtension: "js" }
    };

    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})();