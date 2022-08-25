const defaultTelemetryOptions: TelemetryOptions = {
  MAX_BITRATE_SWITCH_REPS: 2,
  MAX_BITRATE_SWITCH_TIME: 10, // in secs
  MAX_BUFFERING_EVENT_TIME: 1, // in secs
  MAX_BUFFERING_EVENT_TIME_IN_INTERVAL: 0.5, // in secs
  MAX_BUFFERING_EVENT_REPS: 3,
  MAX_BUFFERING_EVENT_INTERVAL: 30, // in secs
};

export class Telemetry implements telemetryInterface {
  telemetryOptions: TelemetryOptions;
  clientID: string;
  videoWidth?: number;
  videoHeight?: number;
  availableBitrates?: amp.VideoTrack[];
  bitrateSwitch?: BitrateSwitch;
  videoBufferingEvent?: BufferingEvent;

  constructor(
    clientID: string,
    options: TelemetryOptions = defaultTelemetryOptions
  ) {
    this.clientID = clientID;
    this.telemetryOptions = options;
  }

  setAvailableBitrates(bitrates: amp.VideoTrack[]) {
    this.availableBitrates = bitrates;
  }

  setVideoWidth(width: number) {
    this.videoWidth = width;
  }

  setVideoHeight(height: number) {
    this.videoHeight = height;
  }

  setBitrateSwitch(bitrate: amp.VideoTrack) {
    const newBitrateSwitch: BitrateSwitch = {
      bitrate,
      timeStamp: Date.now(),
    };
    this.bitrateSwitch = newBitrateSwitch;
  }

  setBufferingEvent(duration: number) {
    const newBufferingEvent: BufferingEvent = {
      timeStamp: Date.now(),
      duration,
    };
    this.videoBufferingEvent = newBufferingEvent;
  }

  clear() {
    this.bitrateSwitch = undefined;
    this.videoBufferingEvent = undefined;
  }
}
