import { Client } from "./Classes/client";
import {
  BitrateSwitch,
  BufferingEvent,
  Telemetry,
} from "./Interfaces/telemetry.interface";
import { checkBitrateSwitches, checkBufferingEvent } from "./utils";

let clients: Client[] = [];

export const handleTelemetry = (telemetry: Telemetry) => {
  const client = findClient(telemetry);
  // console.log(`ClientID ${client.clientID}: Telemetry received`);

  if (telemetry.videoHeight) client.setVideoHeight(telemetry.videoHeight);
  if (telemetry.videoWidth) client.setVideoWidth(telemetry.videoWidth);
  if (telemetry.availableBitrates)
    client.setAvailableBitrates(telemetry.availableBitrates);
  if (telemetry.bitrateSwitch)
    handleBitrateSwitch(client, telemetry.bitrateSwitch);
  if (telemetry.videoBufferingEvent)
    handleBufferingEvent(client, telemetry.videoBufferingEvent);
};

export const registerClient = (telemetry: Telemetry) => {
  const newClient = new Client(telemetry.clientID, telemetry.telemetryOptions);
  clients.push(newClient);
  console.log(`ClientID ${newClient.clientID}: Client registered`);
  return newClient;
};

export const findClient = (telemetry: Telemetry) => {
  const client = clients.find((client) => {
    return client.clientID === telemetry.clientID;
  });
  if (!client) {
    return registerClient(telemetry);
  }
  return client;
};

const handleBitrateSwitch = (client: Client, newBitrate: BitrateSwitch) => {
  console.log(
    `ClientID ${client.clientID}: Bitrate Switch: ${newBitrate.bitrate._bitrate}`
  );
  checkBitrateSwitches(client, newBitrate);
  client.addBitrateSwitch(newBitrate);
};

const handleBufferingEvent = (
  client: Client,
  bufferingEvent: BufferingEvent
) => {
  // console.log(`ClientID ${client.clientID}: Buffering Event`);
  checkBufferingEvent(client, bufferingEvent);
  client.addBufferingEvent(bufferingEvent);
};
