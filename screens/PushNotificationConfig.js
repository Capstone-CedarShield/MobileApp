// PushNotificationConfig.js
import PushNotification from 'react-native-push-notification';

// 1. Configure the library
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("LOCAL NOTIFICATION ==>", notification);
  },
  popInitialNotification: true,
});

PushNotification.createChannel(
  {
    channelId: "default-channel-id", // (required)
    channelName: "Default Channel",  // (required)
    channelDescription: "A channel to categorize your notifications", 
    soundName: "default",
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

export default PushNotification;
