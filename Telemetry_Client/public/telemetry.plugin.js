var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Telemetry } from "./Classes/telemetry.js";
import { reportTelemetry } from "./utils.js";
export let telemetryPLugin = amp.plugin("telemetry", function (options) {
    let telemetry;
    //@ts-ignore
    var player = this;
    var init = function () {
        return __awaiter(this, void 0, void 0, function* () {
            telemetry = new Telemetry("123", options);
            telemetry.setVideoHeight(player.height());
            telemetry.setVideoWidth(player.width());
            yield reportTelemetry(telemetry);
            // report available bitrates
            player.addEventListener(amp.eventName.loadedmetadata, function () {
                return __awaiter(this, void 0, void 0, function* () {
                    telemetry.setAvailableBitrates(player.currentVideoStreamList().streams[0].tracks);
                    yield reportTelemetry(telemetry);
                });
            });
            // report playback switch
            player.addEventListener(amp.eventName.playbackbitratechanged, function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const currentPlayBitrate = player
                        .currentVideoStreamList()
                        .streams[0].tracks.find((bitrateElement) => {
                        return bitrateElement.bitrate === player.currentPlaybackBitrate();
                    });
                    if (currentPlayBitrate) {
                        telemetry.clear();
                        telemetry.setBitrateSwitch(currentPlayBitrate);
                        yield reportTelemetry(telemetry);
                    }
                });
            });
            // report buffering event
            let videoBuffer = player.videoBufferData();
            if (videoBuffer) {
                let requestTime;
                let endTime;
                videoBuffer.addEventListener(amp.bufferDataEventName.downloadrequested, function () {
                    requestTime = new Date().getTime();
                });
                videoBuffer.addEventListener(amp.bufferDataEventName.downloadcompleted, function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        endTime = new Date().getTime();
                        const diff = endTime - requestTime;
                        telemetry.clear();
                        telemetry.setBufferingEvent(diff / 1000);
                        yield reportTelemetry(telemetry);
                    });
                });
            }
        });
    };
    // initialize the plugin
    init();
});
