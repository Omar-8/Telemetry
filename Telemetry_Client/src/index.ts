let playerOptions: amp.Player.Options = {
  autoplay: true,
  controls: true,
  width: "640",
  height: "400",
  techOrder: ["AzureHtml5JS"],
  plugins: {
    telemetry: {
      MAX_BITRATE_SWITCH_REPS: 2, // repitions
      MAX_BITRATE_SWITCH_TIME: 10, // in secs
      MAX_BUFFERING_EVENT_TIME: 1, // in secs
      MAX_BUFFERING_EVENT_TIME_IN_INTERVAL: 0.5, // in secs
      MAX_BUFFERING_EVENT_REPS: 3, // repitions
      MAX_BUFFERING_EVENT_INTERVAL: 30, // in secs
    },
  },
};

let myPlayer = amp("vid1", playerOptions);

myPlayer.src([
  {
    src: "https://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest(format=mpd-time-csf)",
    type: "application/dash+xml",
  },
]);
