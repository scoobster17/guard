import * as React from 'react';


interface AudioVisualiserProps {
  audioData: any;
}

export default class AudioVisualiser extends React.Component<AudioVisualiserProps> {
  canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props: AudioVisualiserProps) {
    super(props);
    this.canvas = React.createRef();
  }

  render() {
    return <canvas width='300' height='300' ref={this.canvas} />;
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const canvas = this.canvas.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const { audioData } = this.props;
    const height = canvas.height;
    const width = canvas.width;
    const sliceWidth = width / audioData.length;
    let x = 0;

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);

    for (const item of audioData) {
      const y = (item / 255) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }

    context.lineTo(x, height / 2);
    context.stroke();
  }
}
