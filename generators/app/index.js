var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  collecting() {
    this.log("collecting");
  }

  creating() {
    // generate package.json
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      { title: "Templating with Yeoman" }
    );
    this.npmInstall(
      [
        "@babel/core",
        "@babel/plugin-transform-react-jsx",
        "babel-loader",
        "css-loader",
        "webpack",
        "webpack-cli",
        "webpack-dev-server",
        "@babel/preset-env",
        "@babel/register",
        "mocha",
        "nyc",
        "css",
        "html-webpack-plugin",
      ],
      {
        "save-dev": true,
      }
    );

    // copy template file
    this.fs.copyTpl(this.templatePath("**/**"), this.destinationPath());

    // this.fs.copyTpl(
    //   this.templatePath("index.html"),
    //   this.destinationPath("public/index.html"),
    //   { title: "Templating with Yeoman" }
    // );
  }
};
