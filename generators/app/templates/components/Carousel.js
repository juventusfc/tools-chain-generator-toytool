import { createElement } from "../tools/createElement";
import { Text } from "./Text";
import { cubicBezier } from "../tools/cubicBezier";
import { Animation, TimeLine } from "../tools/animation";
import { enableGesture } from "../tools/gesture";
import css from "./carousel.css";

let ease = cubicBezier(0.25, 0.1, 0.25, 1);

class Carousel {
  constructor() {
    this.children = [];
    this.attributes = new Map();
  }

  setAttribute(key, value) {
    // this.attributes.set(key, value);
    this[key] = value;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }

  render() {
    let timeLine = new TimeLine();
    window.xTimeLine = timeLine;
    timeLine.start();
    let position = 0;

    let nextPicStopHandler = null;

    let children = this.data.map((d, currentPosition) => {
      let prevPosition =
        (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      let offset = 0;

      let onStart = () => {
        timeLine.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition];

        let currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        );

        offset = currentTransformValue + 500 * currentPosition;
      };

      let onPanmove = (event) => {
        let dx = event.detail.clientX - event.detail.startX;

        let prevElement = children[prevPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let currentTransformValue = -500 * currentPosition + offset + dx;
        let prevTransformValue = -500 - 500 * prevPosition + offset + dx;
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

        prevElement.style.transform = `translateX(${prevTransformValue}px)`;
        currentElement.style.transform = `translateX(${currentTransformValue}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue}px)`;
      };

      let onPanend = (event) => {
        let prevElement = children[prevPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let direction = 0;
        let dx = event.detail.clientX - event.detail.startX;

        if (dx + offset > 250 || (dx > 0 && event.detail.isFlick)) {
          direction = 1;
        } else if (dx + offset < -250 || (dx < 0 && event.detail.isFlick)) {
          direction = -1;
        }

        timeLine.reset();
        timeLine.start();

        let prevAnimation = new Animation(
          prevElement.style,
          "transform",
          (v) => `translateX(${v}px)`,
          -500 - 500 * prevPosition + offset + dx,
          -500 - 500 * prevPosition + direction * 500,
          500,
          0,
          ease
        );

        let currentAnimation = new Animation(
          currentElement.style,
          "transform",
          (v) => `translateX(${v}px)`,
          -500 * currentPosition + offset + dx,
          -500 * currentPosition + direction * 500,
          500,
          0,
          ease
        );

        let nextAnimation = new Animation(
          nextElement.style,
          "transform",
          (v) => `translateX(${v}px)`,
          500 - 500 * nextPosition + offset + dx,
          500 - 500 * nextPosition + direction * 500,
          500,
          0,
          ease
        );

        timeLine.add(prevAnimation);
        timeLine.add(currentAnimation);
        timeLine.add(nextAnimation);

        position =
          (currentPosition - direction + this.data.length) % this.data.length;
        nextPicStopHandler = setTimeout(nextPic, 3000);
      };

      let img = (
        <img
          src={d}
          enableGesture={true}
          onPanmove={onPanmove}
          onStart={onStart}
          onPanend={onPanend}
        />
      );
      img.style.transform = "translateX(0px)";
      img.addEventListener("dragstart", (event) => event.preventDefault());
      return img;
    });

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;

      let current = children[position];
      let next = children[nextPosition];

      let currentAnimation = new Animation(
        current.style,
        "transform",
        (v) => `translateX(${5 * v}px)`,
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease
      );

      let nextAnimation = new Animation(
        next.style,
        "transform",
        (v) => `translateX(${5 * v}px)`,
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease
      );

      timeLine.add(currentAnimation);
      timeLine.add(nextAnimation);

      position = nextPosition;

      nextPicStopHandler = setTimeout(nextPic, 3000);
    };
    nextPicStopHandler = setTimeout(nextPic, 3000);

    let root = <div class="carousel">{children}</div>;

    return root;
  }
}

export default Carousel;
