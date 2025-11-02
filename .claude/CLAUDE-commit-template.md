# Commit Message Template

## Padrão de Commit Semântico

Este projeto utiliza commit messages em **inglês** seguindo o padrão de Conventional Commits com estrutura expandida.

## Formato

```
<type>(<scope>): <short-description>

## Summary

<detailed-description>

## Changes

### ✨ Features
- <feature-list>

### ♻️ Refactoring
- <refactoring-list>

### 🐛 Bug Fixes
- <bug-fixes-list>

### 🎨 UI/UX
- <ui-ux-changes-list>

### 📊 Files Changed
- <number> files modified
- +<lines> lines added
- -<lines> lines removed
```

## Tipos de Commit

- **feat**: Nova feature/funcionalidade
- **fix**: Correção de bug
- **refactor**: Refatoração de código
- **perf**: Melhoria de performance
- **docs**: Documentação
- **style**: Formatação (não afeta lógica)
- **test**: Testes
- **chore**: Tarefas de configuração/build
- **ci**: CI/CD
- **revert**: Reverter commit anterior

## Escopos Comuns

- **web/partner**: Módulo de partner no frontend
- **web/booking**: Módulo de booking
- **api/subscription**: Subscription na API
- **api/auth**: Autenticação na API
- **ui**: Componentes compartilhados
- **db**: Migrações e schema

## Exemplo Real

```
feat(web/partner): implement plans module and refactor AdminSidebar with unlimited access support

## Summary

Implement complete Plans module (current-plan and upgrade-plan) with support for unlimited access plans.
Refactor AdminSidebar following ANCR-FA architecture with improved separation of concerns and migration
from Zustand to React Query for subscription data management.

## Changes

### ✨ Features
- New Plans module with current-plan and upgrade-plan components (ANCR-FA pattern)
- Support for unlimited access plans: displays "Unlimited" when maxSchedules === 0
- Skeleton loading for upgrade-plan using Shadcn UI with darker shimmer
- PDF invoice download with automatic filename generation
- New custom hooks: use-subscription-query, use-plans-query, use-subscription-mutations

### ♻️ Refactoring
- AdminSidebar refactored into sub-components (header, footer, menu-item, menu-item-with-submenu)
- Extracted types, config, and hooks into separate files
- Migrated from Zustand to React Query for subscription data
- Removed legacy plans store
- Maximum 3 levels of component nesting (ANCR-FA compliance)

### 🎨 UI/UX
- Adapted interface for limited plans (orange theme) vs unlimited plans (blue theme)
- Dynamic progress bar with percentage calculation
- Informative badges for usage and status
- Differentiated cards for limited vs unlimited access
- Maintained responsiveness in collapsed/expanded sidebar states

### 📊 Files Changed
- 47 files modified
- +1562 lines added
- -1389 lines removed
```

## Como Usar

Quando solicitado:
```bash
# O Claude irá gerar a mensagem baseada em:
# 1. Análise de `git diff --cached`
# 2. Contagem de arquivos modificados
# 3. Contexto das mudanças
# 4. Este padrão como referência

git commit -m "<tipo>(<escopo>): <descrição-curta>" -m "<resumo-e-detalhes>"
```

## Dicas

- ✅ Use imperative mood ("implement" não "implemented")
- ✅ Primeira letra da descrição curta em minúscula
- ✅ Sem ponto final na descrição curta
- ✅ Máximo 50 caracteres na descrição curta
- ✅ Máximo 72 caracteres por linha no corpo
- ✅ Separe descrição curta do corpo com linha em branco
- ✅ Emojis para categorizar mudanças (✨ Features, ♻️ Refactor, 🐛 Bugs, 🎨 UI/UX)
- ❌ Não misture tipos (uma feature e um refactor = dois commits)

## Categorias de Mudanças

| Emoji | Categoria | Uso |
|-------|-----------|-----|
| ✨ | Features | Novas funcionalidades |
| ♻️ | Refactoring | Reorganização/melhoria de código |
| 🐛 | Bug Fixes | Correções de bugs |
| 🎨 | UI/UX | Mudanças visuais/experiência |
| 📝 | Docs | Documentação |
| 🔧 | Implementation | Detalhes de implementação |
| 📊 | Stats | Métricas de mudanças |
