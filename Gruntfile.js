module.exports = function(grunt) {

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	// uglify: {
	//   options: {
	//     // the banner is inserted at the top of the output
	//     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	//   },
	//   dist: {
	//     files: {
	//       'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
	//     }
	//   }
	// },
	jshint: {
	  // define the files to lint
	  files: ['gruntfile.js', 'out/*.js', 'test/**/*.js'],
	  // configure JSHint (documented at http://www.jshint.com/docs/)
	  options: {
	      // more options here if you want to override JSHint defaults
	    globals: {
	      jQuery: true,
	      console: true,
	      module: true
	    }
	  }
	},
	// watch: {
	//   files: ['<%= jshint.files %>'],
	//   tasks: ['jshint']
	// },
	// configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    }
	
});

//grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
//grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-nodemon');

// the default task can be run just by typing "grunt" on the command line
grunt.registerTask('default', ['jshint', 'nodemon']);

};