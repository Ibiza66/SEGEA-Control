import { ScrollView, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getProfile } from "../../src/utils/profileStorage";
import PrimaryActionCard from "@/src/components/common/home/PrimaryActionCard";
import { Theme } from "@/src/theme/theme";
import GradientBackground from "@/src/components/layout/GradientBackground";
import HomeHeader from "@/src/components/common/home/HomeHeader";
import SummaryCard from "@/src/components/common/home/SummaryCard";
import QuickActions from "@/src/components/common/home/QuickActions";
export default function HomeScreen() {
    const [profile, setProfile] = useState({
  name: "Administrador",
  email: "",
  position: "",
});

useFocusEffect(
  useCallback(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    }

    loadProfile();
  }, [])
);
const hour = new Date().getHours();

const greeting =

  hour < 12
    ? "Buenos días"
    : hour < 19
    ? "Buenas tardes"
    : "Buenas noches";
    const today = new Date().toLocaleDateString("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const dashboardSummary = {
  pendingInspections: 7,
  expiringCertificates: 3,
  approvedInspections: 15,
};
  return (
  <GradientBackground>
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >
  <HomeHeader
  greeting={greeting}
  name={profile.name}
  position={profile.position}
  today={today}
/>
      
      <PrimaryActionCard />
<SummaryCard
  inspections={dashboardSummary.pendingInspections}
  expiring={dashboardSummary.expiringCertificates}
  approved={dashboardSummary.approvedInspections}
/>
<QuickActions />
        </ScrollView>
  </GradientBackground>
);
  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"transparent"
},

  content: {
    flexGrow: 1,
    paddingTop: Theme.spacing.xxl,
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.layout.bottomBarHeight + Theme.spacing.md,
  },
  
  
});
