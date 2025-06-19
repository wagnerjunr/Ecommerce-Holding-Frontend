import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="bg-gray-800 py-8">
        <div className="max-w-[1324px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Fique por dentro das novidades
              </h3>
              <p className="text-gray-300">
                Receba ofertas exclusivas e lançamentos em primeira mão
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                placeholder="Seu e-mail"
                className="bg-white text-black border-0 md:w-80"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Inscrever
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-[1324px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h2 className="text-2xl font-bold">SHOPPER</h2>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sua loja online de confiança com os melhores produtos nacionais
                e importados. Qualidade garantida e entrega rápida em todo o
                Brasil.
              </p>
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-gray-700"
                >
                  <Facebook size={20} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-gray-700"
                >
                  <Instagram size={20} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-gray-700"
                >
                  <Twitter size={20} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-gray-700"
                >
                  <Youtube size={20} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Início
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Produtos
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Ofertas
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Categorias
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Marcas
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Novidades
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Atendimento</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Perguntas Frequentes
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Trocas e Devoluções
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Política de Entrega
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Garantia
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Fale Conosco
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contato</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-blue-400" />
                  <div>
                    <p className="text-gray-300">(11) 99999-9999</p>
                    <p className="text-gray-400 text-xs">
                      Segunda a Sexta, 8h às 18h
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-400" />
                  <div>
                    <p className="text-gray-300">contato@shopper.com.br</p>
                    <p className="text-gray-400 text-xs">Resposta em até 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-blue-400 mt-1" />
                  <div>
                    <p className="text-gray-300">Rua das Compras, 123</p>
                    <p className="text-gray-300">São Paulo - SP</p>
                    <p className="text-gray-300">CEP: 01234-567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      <div className="py-6">
        <div className="max-w-[1324px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} SHOPPER. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="/privacidade"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="/termos"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
