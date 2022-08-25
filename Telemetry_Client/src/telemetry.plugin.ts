import { Telemetry } from "./Classes/telemetry.js";
import { reportTelemetry } from "./utils.js";

export let telemetryPLugin = amp.plugin(
  "telemetry",
  function (options: TelemetryOptions) {
    let telemetry: Telemetry;

    //@ts-ignore
    var player = this as amp.Player;

    var init = async function () {
      telemetry = new Telemetry("123", options);
      telemetry.setVideoHeight(player.height() as number);
      telemetry.setVideoWidth(player.width() as number);

      await reportTelemetry(telemetry);

      // report available bitrates
      player.addEventListener(amp.eventName.loadedmetadata, async function () {
        telemetry.setAvailableBitrates(
          player.currentVideoStreamList().streams[0].tracks
        );
        await reportTelemetry(telemetry);
      });

      // report playback switch
      player.addEventListener(
        amp.eventName.playbackbitratechanged,
        async function () {
          const currentPlayBitrate = player
            .currentVideoStreamList()
            .streams[0].tracks.find((bitrateElement) => {
              return bitrateElement.bitrate === player.currentPlaybackBitrate();
            });
          if (currentPlayBitrate) {
            telemetry.clear();
            telemetry.setBitrateSwitch(currentPlayBitrate);
            await reportTelemetry(telemetry);
          }
        }
      );

      // report buffering event
      let videoBuffer = player.videoBufferData();

      if (videoBuffer) {
        let requestTime: number;
        let endTime: number;
        videoBuffer.addEventListener(
          amp.bufferDataEventName.downloadrequested,
          function () {
            requestTime = new Date().getTime();
          }
        );

        videoBuffer.addEventListener(
          amp.bufferDataEventName.downloadcompleted,
          async function () {
            endTime = new Date().getTime();
            const diff = endTime - requestTime;
            telemetry.clear();
            telemetry.setBufferingEvent(diff / 1000);
            await reportTelemetry(telemetry);
          }
        );
      }
    };

    // initialize the plugin
    init();
  }
);
