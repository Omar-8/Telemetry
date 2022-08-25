import { TelemetryOptions } from "./telemetry.options.interface";

export interface Telemetry {
  clientID: string;
  telemetryOptions: TelemetryOptions;

  videoWidth?: number;
  videoHeight?: number;
  bitrateSwitch?: BitrateSwitch;
  availableBitrates?: amp.VideoTrack[];
  videoBufferingEvent?: BufferingEvent;
}

export interface BufferingEvent {
  timeStamp: number;
  duration: number;
}

export interface BitrateSwitch {
  timeStamp: number;
  bitrate: amp.VideoTrack;
}
