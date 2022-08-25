import { Client } from "./Classes/client";
import {
  BitrateSwitch,
  BufferingEvent,
} from "./Interfaces/telemetry.interface";

export const checkBitrateSwitches = (
  client: Client,
  bitrateSwitch: BitrateSwitch
) => {
  // CHECK HIGHEST BITRATE POSSIBLE
  if (
    bitrateSwitch.bitrate._height &&
    bitrateSwitch.bitrate._width &&
    client.videoHeight &&
    client.videoWidth
  ) {
    if (
      bitrateSwitch.bitrate._height < client.videoHeight ||
      bitrateSwitch.bitrate._width < client.videoWidth
    ) {
      console.log(`ClientID ${client.clientID}: HIGHEST_BITRATE_POSSIBLE`);
    }
  }

  // CHECK TOO MANY BITRATE SWITCHES
  if (
    client.bitrateSwitches.length >
    client.telemetryOptions.MAX_BITRATE_SWITCH_REPS - 1
  ) {
    let nLastBitrateSwitch =
      client.bitrateSwitches[
        client.bitrateSwitches.length -
          client.telemetryOptions.MAX_BITRATE_SWITCH_REPS
      ];
    if (
      bitrateSwitch.timeStamp - nLastBitrateSwitch.timeStamp <
      client.telemetryOptions.MAX_BITRATE_SWITCH_TIME * 1000
    ) {
      console.log(`ClientID ${client.clientID}: TOO_MANY_BITRATE_SWITCHES`);
    }
  }
};

export const checkBufferingEvent = (
  client: Client,
  bufferingEvent: BufferingEvent
) => {
  // any buffering event longer than 1s
  if (
    bufferingEvent.duration > client.telemetryOptions.MAX_BUFFERING_EVENT_TIME
  ) {
    console.log(
      `ClientID ${client.clientID}: TOO_MANY_BUFFERING: ${bufferingEvent.duration}s`
    );
  }

  // more than 3 buffering events with >0.5s in 30s
  if (
    bufferingEvent.duration >
    client.telemetryOptions.MAX_BUFFERING_EVENT_TIME_IN_INTERVAL
  ) {
    // get all events above 0.5s
    const filteredEvents = client.videoBufferingEvents.filter(
      (bufferingEvent) => {
        return (
          bufferingEvent.duration >
          client.telemetryOptions.MAX_BUFFERING_EVENT_TIME_IN_INTERVAL
        );
      }
    );

    if (
      filteredEvents.length >
      client.telemetryOptions.MAX_BUFFERING_EVENT_REPS - 1
    ) {
      let nLastBufferingEvent =
        filteredEvents[
          filteredEvents.length -
            client.telemetryOptions.MAX_BUFFERING_EVENT_REPS
        ];
      if (
        bufferingEvent.timeStamp - nLastBufferingEvent.timeStamp <
        client.telemetryOptions.MAX_BUFFERING_EVENT_INTERVAL * 1000
      ) {
        console.log(
          `ClientID ${client.clientID}: TOO_MANY_BUFFERING_IN_INTERVAL`
        );
      }
    }
  }
};
