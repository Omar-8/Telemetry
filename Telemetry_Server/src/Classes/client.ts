import {
  BitrateSwitch,
  BufferingEvent,
} from "../Interfaces/telemetry.interface";
import { ClientInterface } from "../Interfaces/client.interface";
import { TelemetryOptions } from "../Interfaces/telemetry.options.interface";

export class Client implements ClientInterface {
  clientID: string;
  telemetryOptions: TelemetryOptions;
  videoWidth?: number;
  videoHeight?: number;
  availableBitrates: amp.VideoTrack[] = [];
  bitrateSwitches: BitrateSwitch[] = [];
  videoBufferingEvents: BufferingEvent[] = [];
  totalVideoBufferingDuration: number = 0;

  constructor(clientID: string, options: TelemetryOptions) {
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

  addBitrateSwitch(bitrate: BitrateSwitch) {
    this.bitrateSwitches?.push(bitrate);
  }

  addBufferingEvent(bufferingEvent: BufferingEvent) {
    this.totalVideoBufferingDuration += bufferingEvent.duration;
    this.videoBufferingEvents?.push(bufferingEvent);
  }
}
