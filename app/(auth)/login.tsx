import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from "../../lib/auth";

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Redirect href="/(app)/" />;

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Entrar</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 12 }} />
      <TextInput placeholder="senha" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 12 }} />
      <Button title="Login" onPress={() => login(email, password)} />
      <Link href="/(auth)/register">Criar conta</Link>
    </View>
  );
}
