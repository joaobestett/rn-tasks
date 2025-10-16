import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Tela de tarefa {id}</Text>
    </View>
  );
}
