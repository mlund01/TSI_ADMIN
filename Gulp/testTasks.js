var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('testServe', function() {
    browserSync.init({
        server: {
            baseDir: config.build,
            index: 'index.html',
            routes: ''
        },
        port: 44451,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        logPrefix: 'OrderCloud 3.0',
        tunnel: 'ordercloudappadmin'
    })
});