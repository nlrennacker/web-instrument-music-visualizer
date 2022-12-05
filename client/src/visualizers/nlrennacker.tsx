
// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
// project imports
import { Visualizer } from '../Visualizers';

let p5s: P5;
let width: number;
let height: number;

export const nlrennacker = new Visualizer(
    'nlrennacker',
    (p5: P5, analyzer: Tone.Analyser) => {
        p5s = p5;
        width = window.innerWidth;
        height = window.innerHeight / 2;
        const dim = Math.min(width, height);
        p5.translate(width / 3, height / 2);
        p5.colorMode(p5.HSB);
        //Black background
        p5.blendMode(p5.BLEND); //change the blend mode before setting the background otherwise some crazy stuff happens
        p5.background(0);
        p5.blendMode(p5.ADD); //set to add for smoothing out color changes
        const values = analyzer.getValue();
        analyzer.smoothing = .9;

        let n = values.length * .2;
        let hist = [];

        for (let i = 0; i < n; i++) {
            let fac = i / n;
            let value = values[i] as number;
            let amplitude;
            if (value < -200) {
                amplitude = 0
            } else {
                amplitude = p5.map(value * fac + (values[i + p5.int(n)] as number) * (1 - fac), 0, 255, 0, height / 2);
            }
            hist[i] = amplitude;
        }

        let hists = [];
        let nHist = 40; //history length for shape creation
        hists[0] = hist;
        //for smooth color changing decided to use a series of 40
        for (let i = nHist - 1; i > 0; i--) {
            if (hists[i - 1] != undefined) {
                hists[i] = hists[i - 1];
            }
        }


        //show history
        p5.stroke(255);
        p5.strokeWeight(2);
        for (let j = 0; j < hists.length; j++) {
            p5.beginShape();
            p5.stroke((-j / hists.length * 50 + p5.frameCount * 1) % 360, 255, 255, 200);
            for (let i = 0; i < n; i++) {
                let fac = i / n;
                let angle = 2 * p5.PI * fac;
                let rMult = 1 + j / hists.length;
                if (j == 0) {
                    p5.fill(0);
                }
                else {
                    p5.noFill();
                }
                p5.curveVertex(Math.cos(angle) * hists[j][i] * rMult, Math.sin(angle) * hists[j][i] * rMult);
            }
            p5.endShape(p5.CLOSE);
        }
    },
);