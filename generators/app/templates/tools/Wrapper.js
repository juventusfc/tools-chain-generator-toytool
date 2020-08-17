import { Text } from "../components/Text";
import { enableGesture } from "./gesture";

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  setAttribute(key, value) {
    this.root.setAttribute(key, value);

    if (key.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, (c) => c.toLowerCase());
      this.root.addEventListener(eventName, value);
    }

    if (key === "enableGesture") {
      enableGesture(this.root);
    }
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  get style() {
    return this.root.style;
  }

  mountTo(parent) {
    let visit = (children) => {
      for (let child of children) {
        if (child instanceof Array) {
          visit(child);
          continue;
        }
        if (typeof child === "string") {
          child = new Text(child);
        }
        child.mountTo(this.root);
      }
    };
    visit(this.children);

    parent.appendChild(this.root);
  }
}

export default Wrapper;
