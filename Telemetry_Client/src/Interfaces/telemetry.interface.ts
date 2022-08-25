interface telemetryInterface {
  clientID: string;
  telemetryOptions: TelemetryOptions;

  videoWidth?: number;
  videoHeight?: number;
  bitrateSwitch?: BitrateSwitch;
  availableBitrates?: amp.VideoTrack[];
  videoBufferingEvent?: BufferingEvent;

  setAvailableBitrates: (bitrates: amp.VideoTrack[]) => void;
  setBitrateSwitch: (bitrate: amp.VideoTrack) => void;
  setBufferingEvent: (duration: number) => void;
  clear: () => void;
}

interface BufferingEvent {
  timeStamp: number;
  duration: number;
}

interface BitrateSwitch {
  timeStamp: number;
  bitrate: amp.VideoTrack;
}
