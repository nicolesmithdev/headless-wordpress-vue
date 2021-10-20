module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/sass/style.sass"`,
            },
            scss: {
                additionalData: `@import "@/sass/style.scss";`,
            },
        },
    },

    transpileDependencies: ['vuetify'],

    pluginOptions: {
        browserSync: {
            files: ['src/*'],
        },
    },
};
