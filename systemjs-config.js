(function () {
    var map = {
        "app": "src",
        "angular": "node_modules/angular",
        "ngSanitize": "node_modules/angular-sanitize",
        "ngRoute": "node_modules/angular-route",
        "ngStorage": "node_modules/ngstorage/",
        "bootstrap": "node_modules/bootstrap/dist/js/",
        "jquery": "node_modules/jquery/dist/"
    };

    var packages = {
        "app": { main: "main.js", defaultExtension: "js" },
        "angular": { main: "index.js", defaultExtension: "js" },
        "ngSanitize": { main: "index.js", defaultExtension: "js" },
        "ngRoute": { main: "index.js", defaultExtension: "js" },
        "ngStorage": { main: "ngStorage.js", defaultExtension: "js" },
        "bootstrap": { main: "bootstrap.js", defaultExtension: "js" },
        "jquery": { main: "jquery.js", defaultExtension: "js" }
    };

    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})();