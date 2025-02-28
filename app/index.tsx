import { Image, Text, TouchableOpacity, View } from "react-native";

import FeedScreen from "../components/FeedScreen"
import WelcomeScreen from "../components/WelcomeScreen"
import TripGuideScreen from "../components/TripGuideScreen"

export default function Index() {
  return (
    <TripGuideScreen />
    // <WelcomeScreen></WelcomeScreen>
    // <FeedScreen></FeedScreen>
  );
}
