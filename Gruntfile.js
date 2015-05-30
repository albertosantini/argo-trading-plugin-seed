"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            options: {
                config: ".eslintrc"
            },
            src: [
                "Gruntfile.js",
                "bin/argo-trading-plugin-seed",
                "scripts/**/*.js",
                "lib/**/*.js"

            ]
        }

    });

    grunt.loadNpmTasks("grunt-eslint");

    grunt.registerTask("default", [
        "eslint"
    ]);
};
