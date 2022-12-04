// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const EdmundJohnCruz = new Visualizer(
  'EdmundJohnCruz',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 120, 255); //blue background

    p5.angleMode('degrees') //helps create the circle
    p5.translate(width/2.5, height/2)
    p5.strokeWeight(dim * 0.5); //size of circle
    p5.stroke(255, 160, 0, 255); //color of circle
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) { //allows circle to spike on note press
      const amplitude = values[i] as number;
      const r = p5.map(amplitude, 0, 1.5, 20, 70);
      const x = r * Math.cos(i);
      const y = r * Math.sin(i);
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();
  },
);
