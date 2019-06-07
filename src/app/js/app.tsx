import * as React from 'react';
import AudioAnalyser from './components/audio-analyser.component';


interface AppState {
  audio: MediaStream | null;
  recording: boolean;
}

export default class App extends React.Component<any, AppState> {
  constructor(props: {}, state: AppState) {
    super(props, state);

    this.state = {
      audio: null,
      recording: false,
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  render(): React.ReactNode {
    const { recording, audio } = this.state;
    return (
      <main>
        <h1>Guard</h1>
        <p>To get started, click the button below to start recording audio from your microphone.</p>
        <button onClick={recording ? this.stopRecording : this.startRecording}>
          { recording ? 'Stop recording' : 'Start recording' }
        </button>
        { audio && <AudioAnalyser audio={ audio } /> }
      </main>
    );
  }

  async startRecording(): Promise<void> {
    const audio = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    this.setState({ audio, recording: true });
  }

  stopRecording(): void {
    // TODO: track.stop deprecated
    if (!this.state.audio) {
      return;
    }
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null, recording: false });
  }
}

