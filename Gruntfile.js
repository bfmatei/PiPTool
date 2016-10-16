'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: [
                '<%= pkg.config.buildPath %>'
            ]
        },

        jshint: {
            all: [
                '<%= pkg.config.srcScriptsPath %>/*.js'
            ],

            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        jscs: {
            src: '<%= pkg.config.srcScriptsPath %>/*.js',
            options: {
                config: '.jscsrc'
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.config.srcPath %>',
                        src: [
                            'images/*'
                        ],
                        dest: '<%= pkg.config.buildPath %>/'
                    },

                    {
                        expand: true,
                        cwd: '<%= pkg.config.srcPath %>',
                        src: [
                            'index.html',
                            'Settings.plist'
                        ],
                        dest: '<%= pkg.config.buildPath %>/'
                    }
                ]
            }
        },

        'string-replace': {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'Info.plist',
                            'params.json'
                        ],
                        dest: '<%= pkg.config.buildPath %>'
                    }
                ],
                options: {
                    replacements: [
                        {
                            pattern: new RegExp('{{author}}', 'gi'),
                            replacement: '<%= pkg.contributors[0].name %>'
                        },
                        {
                            pattern: new RegExp('{{packageIdentifier}}', 'gi'),
                            replacement: '<%= pkg.config.packageIdentifier %>'
                        },
                        {
                            pattern: new RegExp('{{version}}', 'gi'),
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            pattern: new RegExp('{{description}}', 'gi'),
                            replacement: '<%= pkg.description %>'
                        },
                        {
                            pattern: new RegExp('{{devKey}}', 'gi'),
                            replacement: '<%= pkg.config.devKey %>'
                        }
                    ]
                }
            }
        },

        uglify: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.config.srcScriptsPath %>',
                        src: '*.js',
                        dest: '<%= pkg.config.buildScriptsPath %>'
                    }
                ]
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },

            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.config.srcStylesheetsPath %>',
                        src: '*.css',
                        dest: '<%= pkg.config.buildStylesheetsPath %>'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: [
                    '<%= pkg.config.srcScriptsPath %>/*.js'
                ],

                tasks: [
                    'jshint',
                    'jscs',
                    'uglify'
                ]
            },

            styles: {
                files: [
                    '<%= pkg.config.srcStylesheetsPath %>/*.css'
                ],

                tasks: [
                    'cssmin'
                ]
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'jscs',
        'copy',
        'string-replace',
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('live', [
        'build',
        'watch'
    ]);
};
