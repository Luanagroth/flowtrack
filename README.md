# FlowTrack 🚀

[![CI](https://github.com/Luanagroth/flowtrack/actions/workflows/main.yml/badge.svg)](https://github.com/Luanagroth/flowtrack/actions/workflows/main.yml)
[![Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/Luanagroth/flowtrack/actions/workflows/main.yml)

FlowTrack é uma aplicação de produtividade pessoal (SaaS-style) desenhada para resolver um problema real do usuário: foco, ritmo e disciplina em uma rotina de trabalho remoto. Este projeto demonstra full-stack frontend profissional com foco em arquitetura, qualidade, testes e pipeline de entrega contínua.

---

## 🌟 Objetivo do projeto

- Provar domínio em Next.js + TypeScript + Tailwind + testes e CI/CD.
- Entregar um MVP completo que funciona offline via localStorage e escala para backend no futuro.
- Criar um case claro para portfólio que uma equipe de recrutamento entenda em 30 segundos.

---

## ✅ Funcionalidades implementadas

- Dashboard principal com interface limpa e responsiva
- Cards métricos: tarefas feitas, foco acumulado, ritmo diário
- Gerenciamento de tarefas: criar, concluir, remover, filtrar (all/active/completed)
- Gestão de hábitos: toggles diários e progresso visual
- Metas semanais: progresso incremental e feedback visual em barras
- Pomodoro completo: iniciar, pausar, reset, modos foco/pause curta/pause longa
- Notificações do navegador (com permissão): ciclo de foco e pausa
- Relógio em tempo real com atualização cada 1s
- Persistência local (`localStorage`) para tarefas, hábitos, metas e estado do pomodoro

---

## 🧩 Arquitetura e padrões

- Componentes funcionais React + hooks customizados
- Composição limpa (responsável pelo componente e funcionalidade isolada)
- Tipagem robusta com interfaces para Task, Habit, WeeklyGoal, PomodoroMode
- Reutilização via hooks:
  - `useLocalStorage` (sincroniza estado local e localStorage)
  - `usePomodoro` (lógica de timer + ciclos + notificações + persistência)
  - `useCurrentTime` (relógio atual)

---

## 🛠️ Stack técnica

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- Jest + React Testing Library
- GitHub Actions
- Deploy: Vercel

---

## 📁 Estrutura do repositório

- `app/` (página principal)
- `components/` (UI + feature modules)
- `hooks/` (lógica reaproveitável)
- `lib/data.ts` (dados fake seeds)
- `types/index.ts` (tipos do domínio)
- `__tests__/App.test.tsx` (cobertura de fluxo crítico)
- `.github/workflows/main.yml` (CI/CD completa)

---

## 🧪 Qualidade e testes

- Todos os testes unitários e integrados foram implementados em `__tests__/App.test.tsx`.
- Cobertura chave:
  - renderização do dashboard
  - adicionar tarefa
  - marcar tarefa completa
  - filtro de tarefas
  - interação de hábitos
  - fluxo do timer do pomodoro
- Comando de execução local:

```bash
npm run test
```

---

## ⚙️ CI/CD em GitHub Actions

Arquivo: `.github/workflows/main.yml`

### Job `ci`
- roda em `push` e `pull_request` na `main`
- `actions/checkout@v4`
- `actions/setup-node@v5` (Node 20)
- `npm ci`
- `npm run lint`
- `npm run test -- --runInBand`
- `npm run build`

### Job `deploy`
- depende de `ci` (`needs: ci`)
- só executa em `refs/heads/main`
- usa `amondnet/vercel-action@v20`
- parâmetros:
  - `VERCEL_TOKEN` (secret)
  - `VERCEL_ORG_ID` (secret)
  - `VERCEL_PROJECT_ID` (secret)
  - `vercel-args: --prod`

### Secrets GitHub necessários
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## ▶️ Rodando local

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`

---

## 🧹 Rodando checks

```bash
npm run lint
npm run test
npm run build
```

---

## 📦 Deploy (placeholder)

- Produção: `https://flowtrack.vercel.app` (substituir pelo link real após deploy)

---

## 🔭 Próximos passos e roadmap

- Evoluir backend (Next.js API/Node/Prisma + PostgreSQL)
- Autenticação (NextAuth/DigitalOcean) e perfil do usuário
- Histórico analítico (gráficos, heatmap, visão do progresso)
- E2E com Cypress ou Playwright
- Mobile PWA offline (cache + service workers)
- Feature de modo escuro e acessibilidade WCAG 2.1

---

## 💼 Por que este projeto foi excelente para o meu portfolio

- Era um desafio completo de produto: UX, persistência, timers e métricas
- Valida habilidades comuns exigidas para vagas de mid/senior: arquitetura, testes e entrega contínua
- Demonstrou habilidade de transformar um requisito em produto usável em tempo curto
- Permite conversa técnica sobre trade-offs (localStorage vs backend, SSR vs CSR, TDD, CI/CD)
- Código organizado e escalável, com foco em manutenção e boas práticas

---

## � Cases e projetos relacionados

### Palavri-metro (Chrome extension) - visão rápida

- Extensão Chrome para análise de frequência de palavras em página inteira ou seleção
- Detecção automática de idioma (pt/en/es)
- Persistência local de preferências via `chrome.storage`
- Análise local no navegador (sem backend)
- Arquitetura modular: `manifest.json`, `background.js`, `content.js`, `popup.js`, `analyzer.js`
- Testes unitários no núcleo de análise (`tests/analyzer.test.js`)
- Funcionalidade: total de palavras, únicas, top termo, ranking, busca por palavra, remoção de stopwords
- Flow de UI: escolha de modo, idioma, análise, resultado e feedback

Esse case demonstra outra frente de expertise: arquitetura de extensão, segurança de permissões e análise de texto em tempo real.

---

## 📫 Contato

- GitHub: https://github.com/Luanagroth
- E-mail: luanaeulalia56@gmail.com
- LinkedIn: https://www.linkedin.com/in/luanagroth
- Projeto GitHub: https://github.com/Luanagroth/flowtrack

---

> Se quiser, posso aplicar ícones de badge de pipeline, status de testes e deploy automático no topo do README para destacar no portfólio.


