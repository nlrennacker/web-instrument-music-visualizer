// 3rd party library imports
import * as Tone from "tone";
import { motion } from "framer-motion";
import classNames from "classnames";
import { List } from "immutable";

import React from "react";
import { useState } from "react";
// project imports
import { Instrument, InstrumentProps } from "../Instruments";
import styles from "../xylo.module.css";
import { ColorData } from "./data";

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */


interface XylophoneKeyProps {
  synth?: Tone.Synth;
  color: string;
  height: string;
  note: string;
}


function XylophoneColor({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

const colors: List<String> = List([
  'classic',
  'wave',
  'steel',
  'earth',
  'black',
  'pastel',
  'sunset',
  'festive'
]) as List<String>;



export function XylophoneKey({ synth, color, height, note }: XylophoneKeyProps): JSX.Element {
  // const dist = new Tone.Distortion(0.8).toDestination();
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      // onMouseDown={() => synth?.connect(dist).triggerAttackRelease(`${note}`, "1n")}
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`, "1n")}
      onMouseUp={() => synth?.triggerRelease("+0.01")}
      className={styles.key}
      style={{
        background: color,
        height: height,
      }}
    >
      <div className={styles.top} />
      <div className={styles.bottom} />
    </motion.div>
  );
}

function Xylophone({ synth }: InstrumentProps): JSX.Element {
  const [color, setColor] = useState("classic");

  return (
    <>
    <div className={styles.board}>
    {ColorData
        .filter((item) => item.title === color)
        .map((filteredItem) => 
        {
          return (
          <>
          <XylophoneKey color={filteredItem.colors[0]} synth={synth} height="100%" note="c4"/>
          <XylophoneKey color={filteredItem.colors[1]}  synth={synth} height="93%" note="d4"/>
          <XylophoneKey color={filteredItem.colors[2]}  synth={synth} height="86%" note="e4"/>
          <XylophoneKey color={filteredItem.colors[3]}  synth={synth} height="79%" note="f4"/>
          <XylophoneKey color={filteredItem.colors[4]}  synth={synth} height="72%" note="g4"/>
          <XylophoneKey color={filteredItem.colors[5]}  synth={synth} height="65%" note="a4"/>
          <XylophoneKey color={filteredItem.colors[6]}  synth={synth} height="58%" note="b4"/>
          <XylophoneKey color={filteredItem.colors[7]}  synth={synth} height="51%" note="c5"/>
          </>)
        })}
    </div>
     <div className={styles.colorSelecter}>
     {colors.map(c => (
       <XylophoneColor
         key={c}
         title={c}
         onClick={() => setColor(c.toString())}
         active={color=== c}
       />
     ))}
   </div>
   </>
  );
}

export const XylophoneInstrument = new Instrument("Xylophone", Xylophone);
