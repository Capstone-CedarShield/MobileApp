// NotificationListener.js
import React, { useEffect } from "react";
import { Alert } from "react-native";
import io from "socket.io-client";
import PushNotification from "react-native-push-notification";

const SOCKET_SERVER_URL = "http://10.0.2.2:3000";

const NotificationListener = () => {
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socket.on("newNotification", (data) => {
        console.log("Notification received:", data);
        Alert.alert(data.title, data.description);
        PushNotification.localNotification({
            channelId: "default-channel-id", 
            title: data.title, 
            message: data.message,
            playSound: true, 
            soundName: "default", 
         
          });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default NotificationListener;
