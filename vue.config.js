module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `
            @import "./src/assets/styles/variables.scss";
            @import "./src/assets/styles/base/typography.scss";
        `
        }
      }
    }
  };