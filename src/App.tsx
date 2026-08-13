import { StatusBar } from "expo-status-bar";
import { FontFamilyPreferenceProvider } from "./hooks/FontFamilyPreferenceContext";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <FontFamilyPreferenceProvider>
      <HomeScreen />
      <StatusBar style="auto" />
    </FontFamilyPreferenceProvider>
  );
}
