import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect, useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { setSyntheticLeadingComments } from 'typescript';
import { ObservedLightning16 } from '@carbon/icons-react';

interface TromboneBlowProps {
    // scaler describes which overtone is being played
    // expects frequency
    scaler: number;
    // root describes the root note (as determined by slide positon)
    // expects frequency
    root: number | undefined;
    duration?: string;
    synth?: Tone.Synth;
}

// Describes the buttons to play the trombone
export function TromboneBlow({
    scaler,
    root,
    duration,
    synth
}: TromboneBlowProps): JSX.Element {
    // For now I'm stealing the styling from the Piano synth selector.

    // Calculate frequency based on slider position and mouth style
    if (!root) {
        // This should never happen. Sets root to a default.
        root = 233.08
    }
    let note: string = Tone.Frequency(root * scaler, 'hz').toNote();
    return (
        <div
            onMouseDown={() => synth?.triggerAttack(`${note}`)}
            onMouseUp={() => synth?.triggerRelease('+0.25')}
            className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1')}>
                Note: {note}
        </div>
    );
}

function Trombone({ synth, setSynth }: InstrumentProps): JSX.Element {
    const sliderRoots = new Map<number, number>([
        [ 1, 233.08 ], // A#3
        [2, 220], // A3
        [3, 207.65], // G#3
        [4, 196.00], // G3
        [5, 185.00], // F#3
        [6, 174.61], // F3
        [7, 164.81], // E3
    ]);

    const setTrombone = () => {

        const envelope = new Tone.AmplitudeEnvelope({
            attack: 0.3,
            decay: 0.2,
            sustain: 0.8,
            release: 0.4
        }).toDestination();

        setSynth(oldSynth => {
            oldSynth.disconnect();


            return new Tone.Synth({
                oscillator: { type: 'fmsine', phase: 180 } as Tone.OmniOscillatorOptions,
                envelope: envelope
            }).toDestination();
        });
    };

    const [currentSlider, setCurrentSlider] = useState<number>(1);

    return (
        <div className="pv4">
            <div className="relative ml4">
                <input
                    value={currentSlider}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>,
                        ): void => setCurrentSlider(Number(event.target.value))}
                    type="range" 
                    id="slider" 
                    name="slider" 
                    min="1" max="7">
                </input>
                <br></br>
                Slide Position: {currentSlider}
            </div>
            <div className={'pl4 pt4 flex'}>
                {Array.from(Array(7).keys()).map(x => (
                    <TromboneBlow
                        scaler={x + 1}
                        root={sliderRoots.get(currentSlider)}
                        synth={synth}
                    />
                ))}
            </div>
            <div className={'ph3 mt4'}>
                <button className={'f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black'}
                onClick={setTrombone}>
                    Set Trombone
                </button>
            </div>
        </div>
    )
}

export const TromboneInstrument = new Instrument('Trombone', Trombone);