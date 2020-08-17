import Wrapper from "./Wrapper";

export function createElement(Cls, attributes, ...children) {
  let o;
  if (typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls();
  }

  for (let attr in attributes) {
    o.setAttribute(attr, attributes[attr]);
  }

  for (let child of children) {
    o.appendChild(child);
  }

  return o;
}
