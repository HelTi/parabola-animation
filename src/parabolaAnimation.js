import {
  setStyle,
  htmlStringToDom
} from "./dom";
import {
  animationFrame,
  cancelAnimation
} from "./requestAnimationFrame";

/**
 * 抛物线动画
 * @param element
 * @param ops
 * @constructor
 */

let noop = function () {

};
let parabolaAnimation = function (element, ops) {
  let defaultOptions = {
    vertex_Rtop: 20,
    speed: 1.2,
    startPos: null,
    endPos: null,
    endFunc: noop
  };
  this.runElement = element !== null ? htmlStringToDom(element) : this.createBall();
  this.options = Object.assign(defaultOptions, ops);

  if (this instanceof parabolaAnimation) {
    this.initSettings();
  } else {
    return new parabolaAnimation(element, ops).initSettings();
  }

};

parabolaAnimation.prototype = {
  constructor: parabolaAnimation,
  initSettings: function () {
    let settings = this.options,
      startPos = settings.startPos,
      endPos = settings.endPos;

    setStyle(this.runElement, {
      marginTop: '0px',
      marginLeft: '0px',
      position: 'fixed'
    });

    let vertex_top = Math.min(startPos.top, endPos.top) - Math.abs(startPos.left - endPos.left) / 3;
    if (vertex_top < settings.vertex_Rtop) {
      vertex_top = Math.min(settings.vertex_Rtop, Math.min(startPos.top, endPos.top));
    }

    let distance = Math.sqrt(Math.pow(startPos.top - endPos.top, 2) + Math.pow(startPos.left - endPos.left, 2));
    let steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / settings.speed);
    let ratio = startPos.top === vertex_top ? 0 : -Math.sqrt((endPos.top - vertex_top) / (startPos.top - vertex_top));
    let vertex_left = (ratio * startPos.left - endPos.left) / (ratio - 1);
    let curvature = endPos.left === vertex_left ? 0 : (endPos.top - vertex_top) / Math.pow(endPos.left - vertex_left, 2);

    this.options = Object.assign(settings, {
      count: -1,
      steps: steps,
      vertex_left: vertex_left,
      vertex_top: vertex_top,
      curvature: curvature
    });


    document.body.appendChild(this.runElement);
    this.move();
  },
  move: function () {
    let _this = this;
    let anId = null;

    function ani(timestamp) {
      //settings
      let settings = _this.options;
      let start = settings.startPos;
      let count = settings.count;
      let steps = settings.steps;
      let end = settings.endPos;
      let endFunc = settings.endFunc;

      let left = start.left + (end.left - start.left) * count / steps;
      let top = settings.curvature === 0 ? start.top + (end.top - start.top) * count / steps :
        settings.curvature * Math.pow(left - settings.vertex_left, 2) + settings.vertex_top;

      setStyle(_this.runElement, {
        top: top + 'px',
        left: left + 'px'
      });

      settings.count++;

      anId = animationFrame(ani);
      if (count == steps) {
        cancelAnimation(anId);
        endFunc.apply(this);
      }
    }
    ani()
  },
  createBall: function () {
    let ballDom = document.createElement('div');
    setStyle(ballDom, {
      width: '20px',
      height: '20px',
      backgroundColor: '#EC4646',
      zIndex: '99999',
      borderRadius: '50%'
    });
    return ballDom;
  },

  destroy: function () {
    document.body.removeChild(this.runElement);
  }
};


export default parabolaAnimation;
export {
  parabolaAnimation
}