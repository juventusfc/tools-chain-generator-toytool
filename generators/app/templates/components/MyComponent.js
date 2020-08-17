import { createElement } from "../tools/createElement";
import { Text } from "./Text";

class MyComponent {
  constructor() {
    this.children = [];
  }

  setAttribute(key, value) {
    this.root.setAttribute(key, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    this.slot = <div></div>;
    for (let child of this.children) {
      this.slot.appendChild(child);
    }

    this.render().mountTo(parent);
  }

  render() {
    return (
      <article>
        <header>***This is Header***</header>
        {this.slot}
        <footer>***This is Footer***</footer>
      </article>
    );
  }
}

export default MyComponent;
