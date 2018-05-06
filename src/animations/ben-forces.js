
import Paper from 'paper';
import Ben from '../assets/ben.svg';

export default class {
  constructor (canvas) {
    Paper.setup(canvas);
  }
  
  load() {
    Paper.project.importSVG(Ben, {
      insert: false,
      onLoad: (item) => {

        console.log(item.children[1].children[0].children);
        const thing = item.children[1].children[0].children[2];
        thing.fillColor = 'white';
        thing.strokeColor = 'black';
        thing.copyTo(Paper.project);
      }
    });

  }

  update() {

  }

  draw() {

  }

}