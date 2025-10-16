import { Link, Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../../lib/auth";

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (user) return <Redirect href="/(app)/" />;

  const handleLogin = async () => {
    try {
      await login(email, password); // passa os valores reais
      router.push("/(app)/"); // navega para a tela principal
    } catch (err) {
      console.log("Erro ao logar:", err);
      // você pode mostrar uma mensagem de erro aqui
    }
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Entrar</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12 }}
      />
      <TextInput
        placeholder="senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/(auth)/register">Criar conta</Link>  
    </View>
  );
}
