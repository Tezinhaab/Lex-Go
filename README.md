# Lex GO - Plataforma de Ensino Jurídico Gamificado

![Lex GO](https://img.shields.io/badge/Lex%20GO-Direito%20Interativo-0A2342?style=for-the-badge)

## Sobre o Projeto

**Lex GO** é uma plataforma de ensino jurídico inspirada no Duolingo, desenvolvida para tornar o aprendizado do Direito mais interativo, gamificado e acessível. Com o mascote **Juriton**, um simpático pássaro advogado, os estudantes podem aprender através de trilhas jurídicas, conquistar badges, preparar-se para a OAB e interagir com uma comunidade de estudantes de Direito.

## Funcionalidades Principais

### Implementadas no MVP
- ✅ Tela de Login/Cadastro com design jurídico profissional
- ✅ Dashboard principal com estatísticas do usuário
- ✅ Sistema de trilhas de aprendizado (Direito Penal, Civil, Constitucional)
- ✅ Barra de progresso e sistema de XP
- ✅ Navegação inferior com 5 seções principais
- ✅ Design responsivo com tema claro e escuro
- ✅ Paleta de cores jurídica (Azul Marinho #0A2342 + Dourado #C6A664)

### Em Desenvolvimento
- 🚧 Trilhas Jurídicas completas com quizzes interativos
- 🚧 Modo "Rumo à OAB" com simulados
- 🚧 Feed de Notícias Jurídicas (Juriton News)
- 🚧 Sistema de Conquistas (100+ badges)
- 🚧 Chat com IA Jurídica (Juriton)
- 🚧 Consultoria Jurídica telepresencial
- 🚧 Comunidade Jurídica (feed social)
- 🚧 Vade Mecum integrado
- 🚧 Sistema de revisão espaçada

## Tecnologias Utilizadas

- **Frontend:** Next.js 16 + React 19
- **Estilização:** TailwindCSS v4 + shadcn/ui
- **Tipografia:** Poppins (Google Fonts)
- **Ícones:** Lucide React
- **Animações:** Framer Motion (planejado)
- **Backend:** Node.js + Express (planejado)
- **Banco de Dados:** PostgreSQL + Prisma (planejado)
- **IA:** OpenAI API (planejado)
- **Desktop:** Electron (planejado)

## Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório ou baixe o código
\`\`\`bash
git clone <seu-repositorio>
cd lex-go
\`\`\`

2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

3. Execute o servidor de desenvolvimento
\`\`\`bash
npm run dev
\`\`\`

4. Abra o navegador em [http://localhost:3000](http://localhost:3000)

### Build para Produção

\`\`\`bash
npm run build
npm start
\`\`\`

## Estrutura do Projeto

\`\`\`
lex-go/
├── app/
│   ├── layout.tsx          # Layout principal com fonte Poppins
│   ├── page.tsx            # Página inicial (Login)
│   └── globals.css         # Tema jurídico customizado
├── components/
│   ├── login-screen.tsx    # Tela de autenticação
│   ├── home-screen.tsx     # Dashboard principal
│   └── ui/                 # Componentes shadcn/ui
├── public/                 # Assets estáticos
└── README.md              # Este arquivo
\`\`\`

## Paleta de Cores

### Modo Claro
- **Primária:** Azul Marinho (#0A2342)
- **Secundária:** Dourado Jurídico (#C6A664)
- **Background:** Cinza Claro (#F5F5F5)
- **Foreground:** Preto Jurídico (#1A1A1A)

### Modo Escuro
- **Background:** #0D1117
- **Foreground:** Branco (#FFFFFF)
- **Acentos:** Dourado e Azul

## Roadmap de Desenvolvimento

### Fase 1: MVP (Atual)
- [x] Design system e identidade visual
- [x] Autenticação UI
- [x] Dashboard principal
- [x] Navegação básica

### Fase 2: Core Features
- [ ] Sistema de trilhas completo com quizzes
- [ ] Integração com banco de dados
- [ ] Sistema de conquistas
- [ ] Feed de notícias

### Fase 3: IA e Interatividade
- [ ] Chat com Juriton (IA)
- [ ] Geração de minutas e petições
- [ ] Busca de jurisprudência

### Fase 4: Comunidade e Monetização
- [ ] Feed social (Comunidade Jurídica)
- [ ] Sistema de consultoria
- [ ] Planos Premium
- [ ] Notificações push

### Fase 5: Desktop e Mobile
- [ ] Build Electron para Windows (.exe)
- [ ] App React Native para Android/iOS
- [ ] Sincronização cross-platform

## Contribuindo

Este é um projeto em desenvolvimento ativo. Contribuições são bem-vindas!

## Licença

Projeto desenvolvido para fins educacionais.

## Contato

Para dúvidas ou sugestões sobre o Lex GO, entre em contato através do repositório.

---

**Lex GO** - O Direito do seu jeito ⚖️
