// 3rd party library imports
import * as Tone from 'tone';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Lute.
 ** ------------------------------------------------------------------------ */

interface LuteKeyProps {
  note: string; // C, D, E, F, G, A, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
}

export function LuteKey({ //Creation of Lute Strings
  note,
  synth,
  duration,
}: LuteKeyProps): JSX.Element {

  return (
    <div
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`,`${duration}`)}
      className='pointer dim' //clicker hand and dims the strings of lute
      style={{
        // CSS
        background: "#cccccc",
        display: "flex",
        flexDirection: "column",
        height: "4px",
        justifyContent: "space-between",
        margin: "8px",
        width: "150%",
        zIndex: 4,
      }}
    >
    </div>
  );
}

function Lute({synth}: InstrumentProps): JSX.Element {

  return (
    <div style={{
      // CSS for Lute Neck
      background: "#392613",
      display: "grid",
      height: "160px",
      width: "80%",
    }}
      >
        <div style={{
      // CSS for Lute Top of Neck
      background: "#e68a00",
      display: "grid",
      height: "100%",
      width: "20px",
      zIndex: 1,
      position: 'absolute',
    }}
      ></div>
    <div style={{
      // CSS for Lute Base
      background: "#e68a00",
      display: "grid",
      marginLeft: "75%",
      height: "220px",
      width: "300px",
      zIndex: 2,
      position: 'absolute',
    }}
      ></div>
    <div style={{
      // CSS for Lute Hole
      background: "#000000",
      display: "grid",
      marginLeft: "90%",
      height: "160px",
      width: "150px",
      zIndex: 3,
      position: 'absolute',
    }}
      ></div>
    
      <LuteKey synth={synth} note={"C3"} duration={"3n"}/>
      <LuteKey synth={synth} note={"D3"} duration={"3n"}/>
      <LuteKey synth={synth} note={"E3"} duration={"3n"}/>
      <LuteKey synth={synth} note={"F3"} duration={"3n"}/>
      <LuteKey synth={synth} note={"G3"} duration={"3n"}/>
      <LuteKey synth={synth} note={"A3"} duration={"3n"}/>
      <LuteKey synth={synth} note={"B3"} duration={"3n"}/>
    </div>
    
    
  );
}

export const EdLute = new Instrument('EdLute', Lute);
