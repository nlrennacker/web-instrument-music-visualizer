
// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
// project imports
import { Visualizer } from '../Visualizers';

let particles: Array<Particle> = [];
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
        // p5.stroke(255);
        // p5.strokeWeight(2);
        // p5.noFill();
        
        
        // p5.angleMode(p5.DEGREES);
        // p5.beginShape();
        // for (let i = 0; i <= 180; i++) {
        //     p5.stroke((-i / 180 * 50 + p5.frameCount * 1) % 360, 255, 255, 200);
        //     let index = Math.floor(p5.map(i, 0, 180, 0, values.length - 1));
        //     let r = p5.map((values[index] as number), -1, 1, 150, 350);
        //     r *= .5;
        //     let x = r * p5.cos(i);
        //     let y = r * p5.sin(i);
        //     p5.vertex(x, y);
        // }
        // p5.endShape();
        // p5.beginShape();
        // for (let i = 0; i <= 180; i++) {
        //     p5.stroke((-i / 180 * 50 + p5.frameCount * 1) % 360, 255, 255, 200);
        //     let index = Math.floor(p5.map(i, 0, 180, 0, values.length - 1));
        //     let r = p5.map((values[index] as number), -1, 1, 150, 350);
        //     r *= .5;
        //     let x = r * p5.cos(i);
        //     let y = r * -p5.sin(i);
        //     p5.vertex(x, y);
        // }
        // p5.endShape();
        // let p = new Particle();
        // particles.push(p);
        // for (let i = 0; i < particles.length; i++) {
        //     if (!particles[i].edges()){
        //         //particles[i].update();
        //         particles[i].show();
        //     } else {
        //         particles.splice(i,1);
        //     }
            
        // }

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


        // let p = new Particle();
        // particles.push(p);

        // for (let i = 0; i < particles.length; i++) {
        //     particles[i].show();
        // }

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


        // let offset = 30 * Math.sin(p5.frameCount / 500)
        // p5.stroke(255);

        // for (let i = 0; i < values.length; i++) {
        //     p5.beginShape();
        //     let angle = p5.map((i + offset) % values.length, 0, values.length, 0, 2 * Math.PI);
        //     // let r = p5.map(i + 50, 0, values.length, 50, 255);
        //     // let g = p5.map(i + 100, 0, values.length, 0, 255);
        //     // let b = p5.map(i + 200, 0, values.length, 50, 255);
        //     // p5.stroke(r, g, b, 200);
        //     p5.stroke((-i / values.length + p5.frameCount * 1) % 360, 255, 255, 200);

        //     let value = values[i] as number;
        //     let amplitude;
        //     if (value < -200) {
        //         amplitude = 0
        //     } else {
        //         amplitude = p5.map(value, -200, 0, 0, 255)
        //     }
        //     const x1 = width / 3 + 4 * Math.cos(angle);
        //     const y1 = height / 2 + 4 * Math.sin(angle);
        //     const x = width / 3 + amplitude * Math.cos(angle);
        //     const y = height / 2 + amplitude * Math.sin(angle);
        //     //p5.circle(x,y, 10);
        //     p5.line(x1, y1, x, y);
        //     // const x = amplitude * Math.cos(i);
        //     // const y = amplitude * Math.sin(i);
        //     // Place vertex
        //     //p5.vertex(x, y);
        // }
        // p5.endShape();
    },
);

export class Particle {
    private pos: P5.Vector;
    private vel: P5.Vector;
    private acc: P5.Vector;
    private w: number;
    constructor() {
        this.pos = P5.Vector.random2D().mult(125);
        this.vel = p5s.createVector(0, 0);
        this.acc = this.pos.copy().mult(p5s.random(0.0001, 0.00001));

        this.w = p5s.random(3, 5);
    }
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
    edges() {
        if (this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2) {
            return true;
        } else {
            return false;
        }
    }
    show() {
        p5s.noStroke();
        p5s.fill(255);
        p5s.ellipse(this.pos.x, this.pos.y, 4);
    }
}