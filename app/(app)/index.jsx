import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { api } from "../../lib/api";
import { useAuth } from "../../lib/auth";

export default function TasksScreen() {
  const { user, logout } = useAuth();
  if (!user) return <Redirect href="/(auth)/login" />;

  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => (await api.get("/tasks")).data,
  });

  const [title, setTitle] = useState("");
  const create = useMutation({
    mutationFn: async () => (await api.post("/tasks", { title })).data,
    onSuccess: () => { setTitle(""); qc.invalidateQueries({ queryKey: ["tasks"] }); }
  });

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>Tarefas</Text>
        <Button title="Sair" onPress={logout} />
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput value={title} onChangeText={setTitle} placeholder="Nova tarefa..."
          style={{ flex: 1, borderWidth: 1, padding: 10 }} />
        <Button title="Add" onPress={() => title && create.mutate()} />
      </View>

      <FlatList
        data={data || []}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginVertical: 6 }}>
            <Text style={{ fontSize: 16 }}>{item.title} {item.done ? "✅" : ""}</Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
              <Link href={`/ (app)/tasks/${item.id}`} asChild>
                <Button title="Editar" />
              </Link>
              <Button title={item.done ? "Desfazer" : "Concluir"}
                onPress={async () => { await api.patch(`/tasks/${item.id}`, { done: !item.done }); qc.invalidateQueries({ queryKey: ["tasks"] }); }} />
              <Button title="Excluir" color={"red"}
                onPress={async () => { await api.delete(`/tasks/${item.id}`); qc.invalidateQueries({ queryKey: ["tasks"] }); }} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
