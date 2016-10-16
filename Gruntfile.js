'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: [
                'build.safariextension'
            ]
        },

        jshint: {
            all: [
                'src/scripts/main.js'
            ],

            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'images/*'
                        ],
                        dest: 'build.safariextension/'
                    },

                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'Settings.plist'
                        ],
                        dest: 'build.safariextension/'
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
                        dest: 'build.safariextension/'
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
                files: {
                    'build.safariextension/scripts/main.js': [
                        'src/scripts/main.js'
                    ]
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build.safariextension/stylesheets/main.css': [
                        'src/stylesheets/main.css'
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'copy',
        'string-replace',
        'uglify',
        'cssmin'
    ]);
};
