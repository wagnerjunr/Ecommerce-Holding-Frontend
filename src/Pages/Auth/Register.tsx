'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegisterUser } from '@/hooks/Auth/useRegisterUser'
import { ArrowBigLeft } from 'lucide-react'
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const { mutateAsync: registerUser, isPending } = useRegisterUser()

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleRegister = async () => {
    if (!isValidEmail) return

    const res = await registerUser({
      data: {
        email,
        password,
        name,
      },
    })
    if (res) {
      window.location.href = '/login'
    }
  }

  const handleGoBack = () => {
    window.history.back()
  }

  const handleGoToLogin = () => {
    window.location.href = '/login'
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start md:justify-center">
      <div className="flex flex-col md:border rounded-xl p-10 gap-4 w-[380px]">
        <div className="flex gap-2 items-center justify-center mb-7 relative">
          <Button
            variant="ghost"
            className="w-fit absolute left-0 opacity-60 rounded-full border border-border px-4 py-3 h-fit"
            onClick={handleGoBack}
          >
            <ArrowBigLeft size={18} />
          </Button>
        </div>
        <p className="text-lg w-full text-center leading-tight text-neutral font-semibold">
          Crie sua conta para continuar!
        </p>
        <div className="flex flex-col gap-2 mt-6">
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
          <label htmlFor="name" className="text-xs text-neutral/70">
            Nome
          </label>
          <Input
            placeholder="Insira seu nome"
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-xs text-neutral/70">
            Confirme a Senha
          </label>
          <Input
            placeholder="Confirme sua senha"
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          className="w-full mt-4"
          disabled={
            !isValidEmail ||
            isPending ||
            password !== confirmPassword ||
            !name ||
            !password ||
            !confirmPassword ||
            !email
          }
          onClick={handleRegister}
        >
          Registrar
        </Button>
        <p className="text-sm">
          Já possui conta?
          <span
            onClick={handleGoToLogin}
            className="hover:underline text-primary cursor-pointer"
          >
            {' '}
            Entrar
          </span>
        </p>
      </div>
    </main>
  )
}
