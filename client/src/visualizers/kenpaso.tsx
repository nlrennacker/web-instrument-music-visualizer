// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const KenpasoVisualizer = new Visualizer(
  "Parol",
  (p5: P5, analyzer: Tone.Analyser) => {

    // from p5 documentation to create a star
    function star(x:number, y:number, radius1:number, radius2:number, npoints:number, r:number, g:number, b:number, a:number) {
      let angle = p5.TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      p5.beginShape();
      p5.fill(r,g,b,a)
      p5.stroke(34,139,34);
      for (let a = 0; a < p5.TWO_PI; a += angle) {
        let sx = x + p5.cos(a) * radius2;
        let sy = y + p5.sin(a) * radius2;
        p5.vertex(sx, sy);
        sx = x + p5.cos(a + halfAngle) * radius1;
        sy = y + p5.sin(a + halfAngle) * radius1;
        p5.vertex(sx, sy);
      }
      p5.endShape(p5.CLOSE);
    }
  
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(50);
    p5.strokeWeight(dim * 0.01);
    p5.noStroke()

    const values = analyzer.getValue();

    let maxY = 0
    let minY= 0

    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      // const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height -20;
      if(maxY === 0){
        maxY = y
      }
      if(minY === 0){
        minY = y
      }
      maxY = Math.max(y, maxY)
      minY = Math.min(y, minY)
    }
    star(width/2.5,height/2, 1+minY,10+ maxY,5 + maxY/10, 255,0,0,200)
    star(width/2.5,height/2, 1+minY,10-maxY,5 + maxY/10, 100,270,200,100)
    star(width/2.5,height/2, 100,50 - maxY/10,6, 255,255,0,305)
    star(width/2.5,height/2, 100,39 - maxY/10,6, 255,0,0,305)
  },
);

