// incidentIcon.js
import fireIcon from "../assets/ReactNativeImages/fireIcon.png";
import roadAccidentIcon from "../assets/ReactNativeImages/roadAccident.png";
import earthquakeIcon from "../assets/ReactNativeImages/earthquake.png";
import floodIcon from "../assets/ReactNativeImages/flood.png";
import gasLeakIcon from "../assets/ReactNativeImages/gasLeak.png";
import tornadoIcon from "../assets/ReactNativeImages/tornado.png";
import powerOutageIcon from "../assets/ReactNativeImages/powerOutage.png";
import landslideIcon from "../assets/ReactNativeImages/landslide.png";
import explosionIcon from "../assets/ReactNativeImages/explosion.png";
import medicalEmergencyIcon from "../assets/ReactNativeImages/medicalEmergency.png";
import theftIcon from "../assets/ReactNativeImages/theft.png";

export const getIncidentIcon = (title) => {
  if (title.toLowerCase().includes("fire")) {
    return fireIcon;
  } else if (title.toLowerCase().includes("accident")) {
    return roadAccidentIcon;
  } else if (title.toLowerCase().includes("earthquake")) {
    return earthquakeIcon;
  } else if (title.toLowerCase().includes("flood")) {
    return floodIcon;
  } else if (title.toLowerCase().includes("gas leak")) {
    return gasLeakIcon;
  } else if (title.toLowerCase().includes("tornado")) {
    return tornadoIcon;
  } else if (title.toLowerCase().includes("power outage")) {
    return powerOutageIcon;
  } else if (title.toLowerCase().includes("landslide")) {
    return landslideIcon;
  } else if (title.toLowerCase().includes("explosion")) {
    return explosionIcon;
  } else if (title.toLowerCase().includes("medical emergency")) {
    return medicalEmergencyIcon;
  } else if (title.toLowerCase().includes("theft")) {
    return theftIcon;
  }
  return ""; // Return a default image or an empty string if no match
};
