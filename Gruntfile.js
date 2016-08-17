module.exports = function( grunt ) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'public/stylesheets/style.css': 'sass/home.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['sass/*'],
                tasks: ['compile-sass'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('compile-sass', ['sass:dist']);
};
