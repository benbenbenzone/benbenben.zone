import Conductor from './conductor';

window.onload = function() {
  const conductor = new Conductor();

  conductor.load().then(() => {
    conductor.start();
  })
}
