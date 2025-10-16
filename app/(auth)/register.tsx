import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from "../../lib/auth";

export default function Register() {
  const { user, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Redirect href="/(app)/" />;

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Criar conta</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 12 }} />
      <TextInput placeholder="senha" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 12 }} />
      <Button title="Registrar" onPress={() => register(email, password)} />
      <Link href="/(auth)/login">Já tenho conta</Link>
    </View>
  );
}
