// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { nlrennDrum } from './instruments/nlrennDrum';
import { nlrennacker } from './visualizers/nlrennacker';
import { TromboneInstrument } from './instruments/Trombone';
import { WaveformVisualizer } from './visualizers/Waveform';
import { ColorsVisualizer } from './visualizers/Colors';
import { EdLute } from './instruments/EdLute';
import { EdmundJohnCruz } from './visualizers/EdVisualizer';
import { XylophoneInstrument } from './instruments/kenpaso';
import { KenpasoVisualizer } from './visualizers/kenpaso';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, XylophoneInstrument, EdLute, TromboneInstrument, nlrennDrum  ]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, KenpasoVisualizer, EdmundJohnCruz, ColorsVisualizer, nlrennacker]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});