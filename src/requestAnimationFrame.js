let animationFrame = undefined;
let cancelAnimation = undefined;

if (window.requestAnimationFrame) {
  animationFrame = window.requestAnimationFrame;
  cancelAnimation = window.cancelAnimationFrame;
} else {
  let start = 0;

  animationFrame = function (callback) {
    let now = new Date().getTime();
    let nextTime = Math.max(start + 16, now);
    let frameId = setTimeout(() => {
      callback(start = nextTime)
    }, nextTime - now);
    return frameId;
  };

  cancelAnimation = (id) => {
    clearTimeout(id)
  }
}

export {animationFrame,cancelAnimation}

