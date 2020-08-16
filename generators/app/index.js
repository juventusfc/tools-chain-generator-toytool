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
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json")
    );
    // this.fs.copyTpl(
    //   this.templatePath("index.html"),
    //   this.destinationPath("public/index.html"),
    //   { title: "Templating with Yeoman" }
    // );
  }
};
