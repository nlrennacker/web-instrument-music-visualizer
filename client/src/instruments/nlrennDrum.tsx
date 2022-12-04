// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List } from 'immutable';

// project imports
import { MembraneInstrument, InstrumentProps } from '../MembraneInstruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Drum.
 ** ------------------------------------------------------------------------ */

interface DrumKeyProps {
  note: string;
  duration?: string;
  synth?: Tone.MembraneSynth; // Contains library code for making sound
  index: number; // give a location for the Drum key
  width: number;
}

export function DrumKey({
  note,
  synth,
  width
}: DrumKeyProps): JSX.Element {


  return (
    <div
      className={classNames('drumWrapper')}
      style={{
        width: width + 10,
        height: width + 10,
      }}
      >
      <div
        onMouseDown={() => synth?.triggerAttackRelease(`${note}`, '8n')}
        className={classNames('pointer relative drum top')}
        style={{
          // CSS
          padding: 10,
          margin: 20,
          display: "inline-block",
          borderRadius: "50%",
          width: width,
          height: width,
          marginLeft: 10,
          marginRight: 5
        }}
      ></div >
    </div>
  );
}

function DrumType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph3 pv2 ba mr1 br1 fw7 bw1 drumButtons', {
        'white drumButtonsPressed': active,
        'white b--none': !active,
      })}
    >
      {title}
    </div>
  );
}

function Drum({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'E1', idx: 0, width: 175 },
    { note: 'E2', idx: 1, width: 75 },
    { note: 'G1', idx: 2, width: 150 },
    { note: 'A1', idx: 3, width: 150 },
    { note: 'G2', idx: 4, width: 75 }
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    switch (newType) {
      case "sine" as Tone.ToneOscillatorType:
      case "triangle10" as Tone.ToneOscillatorType:
        setSynth(oldSynth => {
          oldSynth.disconnect();
          return bassMembrane(newType);
        });
        break;
      case "fmsine" as Tone.ToneOscillatorType:
        setSynth(oldSynth => {
          oldSynth.disconnect();
          return hitMembrane();
        });
        break;
      // case "amtriangle" as Tone.ToneOscillatorType:
      //   break;
      default:
        setSynth(oldSynth => {
          oldSynth.disconnect();
          return defaultSynth(newType);;
        });

        break;
    }

  };


  const oscillators: List<OscillatorType> = List([
    'sine',
    'fmsine', 
    'triangle10',
    //synthy ones
    'sine5', 
    'triangle', 
    'fmtriangle', 
  ]) as List<OscillatorType>;

  return (
    <div className="pv4 pl2">
      <div className="relative dib h4 w-100 ">
        {keys.map(key => {
          const note = `${key.note}`;
          return (
            <DrumKey
              key={note}
              note={note}
              synth={synth}
              index={key.idx}
              width={key.width}
            />
          );
        },
        )}
      </div>
      <div className={'pl2 pt4 flex mt3'}>
        {oscillators.map(o => (
          <DrumType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

let bassMembrane = function (newType: Tone.ToneOscillatorType): Tone.MembraneSynth {
  return new Tone.MembraneSynth({
    pitchDecay: 0.2,
    octaves: 2.0,
    oscillator: { type: newType } as Tone.OmniOscillatorOptions,
    envelope: {
      attack: 0.001,
      decay: 0.3,
      sustain: 0.01,
      release: 0.1,
      attackCurve: 'linear'
    },
  }).toDestination()
};

let hitMembrane = function (): Tone.MembraneSynth {
  return new Tone.MembraneSynth({
    pitchDecay: 0.2,
    octaves: 2.0,
    oscillator: {
      phase: 140,
      modulationType: "sine",
      modulationIndex: 0.8,
      partials: [1] //1,0.1,0.01,0.01
    } as Tone.OmniOscillatorOptions,
    envelope: {
      attack: 0.01,
      decay: 0.74,
      sustain: 0.71,
      release: 0.05,
      attackCurve: "exponential"
    }
  }).toDestination();
};

let defaultSynth = function (newType: Tone.ToneOscillatorType): Tone.MembraneSynth {
  return new Tone.MembraneSynth({
    pitchDecay: 0.2,
    octaves: 2.0,
    oscillator: { type: newType } as Tone.OmniOscillatorOptions,
    envelope: {
      attack: 0.01,
      decay: 0.74,
      sustain: 0.71,
      release: 0.05,
      attackCurve: "exponential"
    }
  }).toDestination();
}

export const nlrennDrum = new MembraneInstrument('nlrennacker', Drum);