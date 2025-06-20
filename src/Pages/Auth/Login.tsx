import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "@/hooks/Auth/useLoginUser";
import useUserStore from "@/store/userStore";
import { ArrowBigLeft } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutateAsync: loginUser, isPending } = useLoginUser();
  const { setUser } = useUserStore();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!isValidEmail) return;
    const res = await loginUser({
      data: {
        email,
        password,
      },
    });
    console.log(res);
    if (res?.user) {
      setUser(res?.user);
      window.location.href = "/";
    }
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  const handleGoToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start md:justify-center mt-12 md:mt-0">
      <div className="flex flex-col md:border rounded-xl p-10 gap-4 w-[380px]">
        <div className="flex gap-2 items-center justify-center mb-7 relative w-full">
          <Button
            variant="ghost"
            className="w-fit absolute left-0 opacity-60 rounded-full border border-border px-4 py-3 h-fit"
            onClick={handleGoBack}
          >
            <ArrowBigLeft size={18} />
          </Button>
        </div>
        <p className="text-lg w-full text-center leading-tight text-neutral font-semibold">
          Faça login para continuar!
        </p>
        <div className="flex flex-col gap-2 mt-6 w-full">
          <label htmlFor="email" className="text-xs text-neutral/70">
            Email
          </label>
          <Input
            placeholder="Insira seu endereço de email"
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-xs text-neutral/70">
            Senha
          </label>
          <Input
            placeholder="Insira sua senha"
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="w-full mt-4"
          disabled={!isValidEmail || isPending}
          onClick={handleLogin}
        >
          Entrar
        </Button>
        <p className="text-sm">
          Ainda não possui conta?
          <span
            onClick={handleGoToRegister}
            className="hover:underline text-primary cursor-pointer"
          >
            {" "}
            Registre-se
          </span>
        </p>
      </div>
    </main>
  );
}
