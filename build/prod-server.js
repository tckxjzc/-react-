let browserSync=require('browser-sync').create();
browserSync.init({
    server:{
        baseDir: "../dist",
        proxy: {
            target: "http://yourlocal.dev",
        }
    }
});