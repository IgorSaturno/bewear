# 🛍️ Bewear - E-commerce Moderno

Bewear é uma plataforma de e-commerce completa e moderna desenvolvida com as mais recentes tecnologias web, oferecendo uma experiência de compra fluida e intuitiva para produtos de moda e lifestyle.

## 🚀 Características Principais

- **🔐 Autenticação Completa**: Login/cadastro com email/senha e integração com Google OAuth
- **🛒 Carrinho de Compras**: Gerenciamento completo de produtos no carrinho com persistência
- **💳 Pagamentos Seguros**: Integração com Stripe para processamento de pagamentos
- **📦 Gestão de Pedidos**: Histórico completo de pedidos e acompanhamento de status
- **📍 Endereços de Entrega**: Cadastro e gerenciamento de múltiplos endereços
- **🏷️ Catálogo Organizado**: Produtos organizados por categorias com variações
- **📱 Design Responsivo**: Interface otimizada para desktop e mobile
- **⚡ Performance**: Otimizado com Next.js 15 e React 19

## 🛠️ Stack Tecnológica

### Frontend

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI modernos e acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **React Query** - Gerenciamento de estado do servidor

### Backend

- **Next.js API Routes** - APIs serverless
- **BetterAuth** - Autenticação moderna e segura
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM type-safe para TypeScript
- **Stripe** - Processamento de pagamentos

### Ferramentas de Desenvolvimento

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Drizzle Kit** - Migrations e schema management

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- Conta Stripe (para pagamentos)
- Conta Google Cloud (para OAuth)

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/bewear.git
cd bewear
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

Preencha as seguintes variáveis no arquivo `.env.local`:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bewear"

# Authentication
BETTER_AUTH_SECRET="seu-secret-key-aqui"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# Stripe
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Configure o banco de dados**

```bash
# Execute as migrations
npx drizzle-kit push

# (Opcional) Popule o banco com dados de exemplo
npm run seed
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
bewear/
├── src/
│   ├── actions/           # Server Actions do Next.js
│   ├── app/              # App Router (páginas e layouts)
│   ├── components/       # Componentes React reutilizáveis
│   ├── db/              # Configuração do banco e schemas
│   ├── hooks/           # Hooks personalizados (queries/mutations)
│   ├── lib/             # Utilitários e configurações
│   └── providers/       # Providers do React (Context, Query Client)
├── public/              # Arquivos estáticos
└── drizzle/            # Migrations do banco de dados
```

### Organização de Componentes

- **`/components/ui/`** - Componentes base do shadcn/ui
- **`/components/common/`** - Componentes reutilizáveis da aplicação
- **`/app/[page]/components/`** - Componentes específicos de páginas

### Server Actions

Cada Server Action possui sua própria pasta com:

- `index.ts` - Implementação da action
- `schema.ts` - Validação com Zod

### Hooks Personalizados

- **`/hooks/queries/`** - React Query hooks para busca de dados
- **`/hooks/mutations/`** - React Query hooks para mutações

## 🗄️ Modelo de Dados

O banco de dados possui as seguintes entidades principais:

### Usuários e Autenticação

- **Users** - Dados dos usuários
- **Sessions** - Sessões ativas
- **Accounts** - Contas vinculadas (OAuth)
- **Verifications** - Tokens de verificação

### Catálogo de Produtos

- **Categories** - Categorias de produtos
- **Products** - Produtos base
- **ProductVariants** - Variações dos produtos (cores, tamanhos, preços)

### Carrinho e Pedidos

- **Carts** - Carrinhos de compra
- **CartItems** - Itens no carrinho
- **Orders** - Pedidos finalizados
- **OrderItems** - Itens dos pedidos

### Endereços

- **ShippingAddresses** - Endereços de entrega dos usuários

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linting

# Banco de Dados
npx drizzle-kit push      # Aplica mudanças no schema
npx drizzle-kit generate  # Gera migrations
npx drizzle-kit studio    # Interface visual do banco
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Funcionalidades Implementadas

### ✅ Autenticação

- [x] Registro com email/senha
- [x] Login com email/senha
- [x] Login com Google OAuth
- [x] Gerenciamento de sessões
- [x] Proteção de rotas

### ✅ Catálogo

- [x] Listagem de produtos
- [x] Categorias de produtos
- [x] Variações de produtos
- [x] Páginas de detalhes
- [x] Busca e filtros

### ✅ Carrinho de Compras

- [x] Adicionar/remover produtos
- [x] Alterar quantidades
- [x] Persistência do carrinho
- [x] Cálculo de totais

### ✅ Checkout

- [x] Seleção de endereço
- [x] Resumo do pedido
- [x] Integração com Stripe
- [x] Confirmação de pagamento

### ✅ Pedidos

- [x] Histórico de pedidos
- [x] Status dos pedidos
- [x] Detalhes dos pedidos

### ✅ Endereços

- [x] Cadastro de endereços
- [x] Múltiplos endereços
- [x] Validação de CEP

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Convenções de Código

- **Nomenclatura**: kebab-case para arquivos e pastas
- **Componentes**: PascalCase
- **Hooks**: camelCase iniciando com 'use'
- **Tipos**: PascalCase terminando com 'Type' ou 'Schema'
- **Sem comentários**: O código deve ser autoexplicativo

## Demo

[BeweardemoLink](https://bewear-bay.vercel.app/)

---

Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento web moderno.
