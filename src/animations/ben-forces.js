
import Paper, { Path } from 'paper';
import Ben from '../assets/ben.svg';

Paper.install(window);

export default class {
  constructor (canvas) {
    this.canvas = canvas;
    paper.setup(canvas);

    window.addEventListener("resize", this._resize.bind(this));
    this._resize();
    this.box = new CompoundPath({
      children: [
        new Path.Rectangle({
          position: [view.center.x, (view.center.y+100)/1],
          size: [this.canvas.offsetWidth,(this.canvas.offsetHeight-100)/5],
          fillColor: 'white'
        }),
        new Path.Rectangle({
          position: [view.center.x, ((view.center.y+100)/1) * 3],
          size: [this.canvas.offsetWidth,((this.canvas.offsetHeight-100)/0.7)],
          fillColor: 'white'
        }),
        new Path.Rectangle({
          position: [view.center.x, ((view.center.y+100)/1) * 5],
          size: [this.canvas.offsetWidth,((this.canvas.offsetHeight-100)/5)],
          fillColor: 'white'
        }),
        new Path.Rectangle({
          position: [view.center.x, ((view.center.y+100)/1) * 7],
          size: [this.canvas.offsetWidth,((this.canvas.offsetHeight-100)/0.7)],
          fillColor: 'white'
        }),
        new Path.Rectangle({
          position: [view.center.x, ((view.center.y+100)/1) * 9],
          size: [this.canvas.offsetWidth,((this.canvas.offsetHeight-100)/5)],
          fillColor: 'white'
        })
       ]
    });
  }
  
  load() {
    paper.project.importSVG(Ben, {
      insert: false,
      onLoad: (item) => {

        this.benSingle = new CompoundPath({
          children: [
            item.children[1].children[0].children[0], 
            item.children[1].children[0].children[1],
            item.children[1].children[0].children[2]
          ]
        });
        const ben1 = this.benSingle.clone();
        console.log(ben1.bounds)
        ben1.position.x -= (ben1.bounds.width+15);
        const ben2 = this.benSingle.clone();
        ben2.position.x += (ben2.bounds.width+15);
        this.ben = new CompoundPath({
          children: [
            ben1, 
            this.benSingle,
            ben2
          ],
          insert: false
        });
        this.ben.fillColor = 'red';
        this.ben.scale(5.0, 25.0);
        this.ben.position = view.center;
        console.log(this.ben);
        // this.ben.selected = true;
        this.ben.addTo(paper.project);
      }
    });

  }

  _resize() {

    paper.project.view.setViewSize(window.innerWidth, window.innerHeight);
  }
  
  update(event) {
  
    if (this.ben && this.box) {
      this.box.position = view.center;
      this.box.scale(view.viewSize.width/this.box.bounds.width,view.viewSize.height/this.box.bounds.height);
      this.ben.position = view.center;


      if (this.result) {
        this.result.remove();
      }
      this.result = this.box.exclude(this.ben);
      this.result.fillColor = 'black';
      
    }
      // console.log(result.children[0]);

  }

  draw() {

  }

}