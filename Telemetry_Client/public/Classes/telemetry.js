const defaultTelemetryOptions = {
    MAX_BITRATE_SWITCH_REPS: 2,
    MAX_BITRATE_SWITCH_TIME: 10,
    MAX_BUFFERING_EVENT_TIME: 1,
    MAX_BUFFERING_EVENT_TIME_IN_INTERVAL: 0.5,
    MAX_BUFFERING_EVENT_REPS: 3,
    MAX_BUFFERING_EVENT_INTERVAL: 30, // in secs
};
export class Telemetry {
    constructor(clientID, options = defaultTelemetryOptions) {
        this.clientID = clientID;
        this.telemetryOptions = options;
    }
    setAvailableBitrates(bitrates) {
        this.availableBitrates = bitrates;
    }
    setVideoWidth(width) {
        this.videoWidth = width;
    }
    setVideoHeight(height) {
        this.videoHeight = height;
    }
    setBitrateSwitch(bitrate) {
        const newBitrateSwitch = {
            bitrate,
            timeStamp: Date.now(),
        };
        this.bitrateSwitch = newBitrateSwitch;
    }
    setBufferingEvent(duration) {
        const newBufferingEvent = {
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
