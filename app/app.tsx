import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Slot } from "expo-router";

// 🔔 Foreground notification behaviour
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, // ✅ Added
    shouldShowList: true,   // ✅ Added
  }),
});

export default function App() {
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted!");
      }
    };
    requestPermission();
  }, []);

  return <Slot />;
}
