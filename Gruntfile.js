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
                "lib/**/*.js",
                "test/**/*.js"

            ]
        },

        mochaTest: {
            test: {
                src: ["test/**/*-spec.js"]
            }
        }

    });

    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-mocha-test");

    grunt.registerTask("default", [
        "eslint",
        "mochaTest"
    ]);
};
