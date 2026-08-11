import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
};

export default function GradientBackground({ children }: Props) {
  return (
    <LinearGradient
      colors={[
  "#d5e7f7",
  "#F2F8FD",
  "#d6f6e2",
]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});