import { Telemetry } from "./Classes/telemetry";

export const reportTelemetry = async (telemetry: Telemetry) => {
  let res = await fetch("http://localhost:3000/telemetry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(telemetry),
  });
  return res;
};
