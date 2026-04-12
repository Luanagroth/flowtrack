# FlowTrack

[![CI](https://github.com/Luanagroth/flowtrack/actions/workflows/main.yml/badge.svg)](https://github.com/Luanagroth/flowtrack/actions/workflows/main.yml)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/Luanagroth/flowtrack/actions/workflows/main.yml)
[![Vercel](https://vercel.com/button)](https://vercel.com/new)

FlowTrack é uma aplicação de produtividade pessoal com foco em rotina, organização e constância. O projeto foi construído para centralizar tarefas, hábitos diários, metas da semana, horário local e um ciclo de Pomodoro com persistência local.

## Preview

### Tela principal reformulada

![FlowTrack reformulado](public/README/flowtrack%20reformulado.png)

### Seções em uso

![FlowTrack em teste](public/README/flowtrack%20em%20teste.png)

## Produção

Aplicação publicada em:

[flowtrack-seven.vercel.app](https://flowtrack-seven.vercel.app)

Implantação mais recente:

`flowtrack-etc3mh6xk-luanas-projects-b69a8269.vercel.app`

## Objetivo do projeto

- Criar um dashboard de produtividade claro, responsivo e fácil de usar.
- Demonstrar domínio em Next.js, TypeScript, Tailwind, testes e CI/CD.
- Entregar um MVP funcional com persistência via `localStorage`.
- Estruturar uma base pronta para evoluir para backend no futuro.

## Funcionalidades implementadas

- Dashboard principal com identidade visual refinada.
- Cabeçalho com marca FlowTrack em destaque.
- Hora local e data em tempo real.
- Pomodoro com:
  - início, pausa e reset
  - ciclo automático `25 min -> 5 min -> 25 min`
  - som configurável
  - notificações nativas do navegador
- Hábitos diários com:
  - adicionar
  - editar
  - remover
  - marcar como concluído
  - nota opcional
- Tarefas com:
  - adicionar
  - remover
  - separar pendentes e concluídas
  - marcar por bolinha de status
  - nota opcional
- Metas da semana com:
  - adicionar
  - editar
  - remover
  - acompanhar progresso
  - concluir e reabrir
  - nota opcional
- Campos com exemplos visuais para facilitar o preenchimento manual.
- Persistência local para tarefas, hábitos, metas e Pomodoro.

## Atualizações recentes

- Reorganização completa da ordem visual dos cards.
- Refinamento do cabeçalho e da hierarquia da interface.
- Revisão de português e acentuação dos textos do sistema.
- Placeholders com exemplos claros em hábitos, tarefas e metas.
- Inclusão de notas opcionais em tarefas, hábitos e metas.
- Edição inline mais fluida em hábitos.
- Card de tarefas simplificado, sem mistura entre pendentes e concluídas.
- Metas da semana expandidas para edição completa.
- Alerta sonoro e notificações nativas no Pomodoro.
- Opção de ligar e desligar o som do Pomodoro.

## Stack técnica

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9
- Jest
- React Testing Library
- GitHub Actions
- Vercel

## Arquitetura do projeto

- `app/`: estrutura principal da aplicação
- `components/`: componentes de interface e cards do dashboard
- `hooks/`: hooks reutilizáveis como `useLocalStorage`, `usePomodoro` e `useCurrentTime`
- `lib/`: dados iniciais e utilidades
- `types/`: tipos do domínio
- `public/`: assets estáticos e imagens do README
- `__tests__/`: testes de fluxo principal

## Qualidade e testes

O projeto possui testes cobrindo os fluxos principais:

- renderização do dashboard
- criação e conclusão de tarefas
- notas em tarefas
- criação, edição e conclusão de hábitos
- notas em hábitos
- edição, conclusão e notas em metas
- renderização do Pomodoro

Comandos:

```bash
npm run lint
npm run test
npm run build
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abra:

```bash
http://localhost:3000
```

## CI/CD

O pipeline em `.github/workflows/main.yml` executa:

- lint
- testes
- build
- deploy em produção na Vercel

Secrets esperados no GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Deploy

Deploy em produção via Vercel:

[flowtrack-seven.vercel.app](https://flowtrack-seven.vercel.app)

Se quiser publicar manualmente:

```bash
npx vercel --prod
```

## Roadmap

- autenticação de usuário
- histórico e analytics
- gráficos de progresso
- PWA offline
- acessibilidade mais avançada
- backend com banco de dados

## Contato

- [GitHub](https://github.com/Luanagroth)
- [LinkedIn](https://www.linkedin.com/in/luanagroth)
- [E-mail](mailto:luanaeulalia56@gmail.com)
- [Repositório do projeto](https://github.com/Luanagroth/flowtrack)
