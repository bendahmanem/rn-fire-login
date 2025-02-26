import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/context/auth";
import { Text } from "react-native";

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return <Stack />;
}
