import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

// Draws colorful circles
export const ColorsVisualizer = new Visualizer(
    'Colors',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        p5.noStroke();

        p5.background(50);

        const values = analyzer.getValue();
        for (let i = values.length; i > 0; i--) {
            const amplitude = values[i] as number;
            p5.colorMode(p5.HSB, analyzer.size, analyzer.size, analyzer.size);
            p5.fill(i * 16, analyzer.size, analyzer.size);
            p5.ellipse(
                (width / 3) + Math.random() * (width / 5),
                (height / 2.5) + Math.random() * (height / 5), 
                (width * amplitude), 
                (width * amplitude));
        } 
    },
);