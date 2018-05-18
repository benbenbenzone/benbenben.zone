import RightNow from 'right-now';

// ANIMATIONS IMPORT
import BenBlend from './animations/ben-blend';


const animationsImportList = [
  BenBlend
];

export default class {
  constructor () {
    this._rafID = null;
    this._running = false;
    this.animations = [];
    this.maxDeltaTime = 1/30;
    this._lastTime = RightNow();
    this.time = 0;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'main-canvas';
    this.canvas.className = 'animation-canvas';
    document.body.appendChild(this.canvas);


  }

  _resize() {
    // no need for global resize currently size paper js needs to control resize on its own
    
    // this.canvas.width =  (window.innerWidth);
    // this.canvas.height = (window.innerHeight); 
    // window.dispatchEvent(new Event('resize'));
  }

  // This needs to be done better and asynchronously, for animations that
  // depend on loading in external assets
  load() {
    animationsImportList.forEach((AnimationImport) => {
      this.animations.push(new AnimationImport(this.canvas));
    });

    const loadPromises = [];

    this.animations.forEach((animation) => {
      loadPromises.push(animation.load());
    });

    return Promise.all(loadPromises);
  }

  start() {

    if (this._rafID !== null) return;
    
    this._rafID = window.requestAnimationFrame(this._animate.bind(this));
    this._running = true;
  }

  _animate() {
    if (!this._running) return;

    window.requestAnimationFrame(this._animate.bind(this));
    const now = RightNow();
    const dt = Math.min(this.maxDeltaTime, (now - this._lastTime) / 1000);
    this.time += dt;
    this._lastTime = now;
    this._update(dt, this.time);
    this._draw();

  }

  _update(dt, time) {
    this.animations.forEach((animation) => {
      animation.update({
        dt,
        time
      });
    });
  }

  _draw() {

  }

}