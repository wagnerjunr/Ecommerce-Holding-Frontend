      
# E-commerce Frontend

Um projeto de e-commerce desenvolvido em React com TypeScript, utilizando as melhores práticas de desenvolvimento frontend.

## 🚀 Tecnologias Utilizadas

### Principais Dependências

- **React 19.1.0** - Biblioteca principal para construção da interface
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Roteamento da aplicação
- **Tailwind CSS** - Framework CSS utilitário
- **Zustand** - Gerenciamento de estado global
- **React Query (@tanstack/react-query)** - Gerenciamento de estado do servidor e cache
- **Axios** - Cliente HTTP para requisições

### UI e Componentes

- **Radix UI** - Componentes acessíveis e sem estilo
  - Avatar, Dropdown Menu, Label, Radio Group, Separator, Slot
- **Lucide React** - Ícones
- **Shadcn/ui** - Sistema de componentes baseado em Radix UI
- **Class Variance Authority** - Utilitário para variantes de componentes
- **Tailwind Merge** - Merge inteligente de classes Tailwind
- **CLSX** - Utilitário para classes condicionais

### Funcionalidades Específicas

- **React Input Mask** - Máscaras para inputs

### Outras Dependências
- **ESLint** - Linter para JavaScript
- **Prettier** - Formatação de código


## 📦 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/wagnerjunr/Ecommerce-Holding-Frontend.git
<<<<<<< HEAD
cd Ecommerce-Holding-Frontend
=======
>>>>>>> 4264661331e8e25fb85fee75d20d505f82af7691
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`


## 🎯 Decisões Técnicas

### 1. Padronização de Imagens
**Problema:** Erros nas imagens fornecidas pela API  
**Solução:** Substituição de todas as imagens por uma imagem padrão (`ImagemTeste.webp`) para garantir consistência visual e evitar quebras na interface.

### 2. React Query para Gerenciamento de Requisições
**Motivação:** Melhor controle e otimização das requisições HTTP  
**Benefícios:**
- Cache automático de dados
- Sincronização em background
- Estados de loading, error e success
- Invalidação inteligente de cache
- Retry automático em caso de falha

### 3. Sistema de Usuários e Histórico de Compras
**Implementação:** Criação de sistema completo de autenticação e registro  
**Funcionalidades:**
- Registro e login de usuários
- Associação de pedidos ao usuário logado
- Histórico completo de compras
- Possibilidade de repetir pedidos anteriores

### 4. Zustand para Gerenciamento de Estado
**Stores Implementadas:**
- **User Store:** Informações do usuário logado disponíveis globalmente
- **Cart Store:** Gerenciamento completo do carrinho de compras
  - Adicionar/remover produtos
  - Controle de quantidades
  - Cálculo de totais
  - Persistência no localStorage
- **Drawer Store:** Controle do drawer que aparece ao adicionar itens

**Vantagens do Zustand:**
- API simples e intuitiva
- Menos boilerplate que Redux
- TypeScript nativo
- Performance otimizada

### 5. Arquitetura de Componentes
**Organização Modular:**
- **Componentes de Produto:** Cards, banners, detalhes
- **Layout:** Navbar, footer, containers
- **Checkout:** Fluxo completo de pagamento
  - Seleção de endereço
  - Dados de pagamento
  - Confirmação de pedido
  - Página de sucesso
- **Formulários:** Validação e máscaras

**Fluxo de Checkout:**
- Simulação de pagamento (sem gateway real)
- Criação de pedidos no backend
- Integração com sistema de endereços
- Feedback visual em cada etapa

### 6. Estilização com Tailwind CSS e Shadcn/ui
**Tailwind CSS:**
- Desenvolvimento rápido com classes utilitárias
- Consistência visual
- Responsividade nativa
- Customização através de configuração

**Shadcn/ui:**
- Componentes pré-construídos e acessíveis
- Baseado em Radix UI
- Totalmente customizável
- Design system consistente

### 7. Integração com Backend
**API Endpoints:**
- `/api/products` - Lista de produtos
- `/api/orders` - Gerenciamento de pedidos
- `/api/users` - Autenticação e registro de usuários
- '/api/addresses` - Gerenciamento de endereços

## 🔄 Fluxo da Aplicação

1. **Autenticação:** Login/Registro de usuários
2. **Catálogo:** Navegação e busca de produtos
3. **Carrinho:** Adição e gerenciamento de itens
4. **Checkout:** Processo completo de compra
5. **Histórico:** Visualização de pedidos anteriores
6. **Repetição:** Possibilidade de refazer pedidos

---

**Desenvolvido com ❤️ usando React, TypeScript e as melhores práticas de desenvolvimento frontend.**
        
