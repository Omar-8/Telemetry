import { BitrateSwitch, BufferingEvent } from "./telemetry.interface";
import { TelemetryOptions } from "./telemetry.options.interface";

export interface ClientInterface {
  clientID: string;
  telemetryOptions: TelemetryOptions;
  videoWidth?: number;
  videoHeight?: number;
  bitrateSwitches?: BitrateSwitch[];
  availableBitrates?: amp.VideoTrack[];
  videoBufferingEvents?: BufferingEvent[];
  totalVideoBufferingDuration?: number;

  setAvailableBitrates: (bitrates: amp.VideoTrack[]) => void;
  setVideoHeight: (height: number) => void;
  setVideoWidth: (height: number) => void;
  addBitrateSwitch: (bitrate: BitrateSwitch) => void;
  addBufferingEvent: (bufferingEvent: BufferingEvent) => void;
}
