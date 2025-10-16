import { useLocalSearchParams, Stack, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useQuery({ queryKey: ["task", id], queryFn: async () => (await api.get("/tasks")).data });
  const task = (data || []).find((t: any) => String(t.id) === String(id));
  const [title, setTitle] = useState("");

  useEffect(() => { if (task) setTitle(task.title); }, [task]);

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Stack.Screen options={{ title: "Editar tarefa" }} />
      <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, padding: 10 }} />
      <Button title="Salvar" onPress={async () => { await api.patch(`/tasks/${id}`, { title }); router.back(); }} />
    </View>
  );
}
