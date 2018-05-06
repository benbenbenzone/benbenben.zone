import RightNow from 'right-now';

// ANIMATIONS IMPORT
import BenForces from './animations/ben-forces';


const animationsImportList = [
  BenForces
];

export default class {
  constructor () {
    this._rafID = null;
    this._running = false;
    this.animations = [];

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'main-canvas';
    this.canvas.className = 'animation-canvas';
    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this.canvas.width =  (window.innerWidth-2);
    this.canvas.height = (window.innerHeight-2); 
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

  _update() {

  }

  _draw() {

  }

}