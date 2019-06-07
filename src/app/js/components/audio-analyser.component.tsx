import * as React from 'react';
import AudioVisualiser from './audio-visualiser';


interface AudioAnalyserProps {
  audio: MediaStream;
}

interface AudioAnalyserState {
  audioData: any;
}

export default class AudioAnalyser extends React.Component<AudioAnalyserProps, AudioAnalyserState> {
  audioContext: any;
  analyser: any;
  dataArray: any;
  source: any;
  rafId: any;

  constructor(props: AudioAnalyserProps, state: AudioAnalyserState) {
    super(props, state);

    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  render() {
    return this.state.audioData
      ? <AudioVisualiser audioData={this.state.audioData} />
      : '';
  }

  componentDidMount(): void {
    this.audioContext = new (window as any).AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }
}