# Commit Message Template

## Padrão de Commit Semântico

Este projeto utiliza commit messages em **inglês** seguindo o padrão de Conventional Commits com estrutura expandida, criar mensagem de commit se baseando apenas nas mudanças em staged.

## Formato

```
<type>(<scope>): <short-description>

## Summary

<direct-and-brave-description>

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

| Emoji | Categoria      | Uso                              |
| ----- | -------------- | -------------------------------- |
| ✨    | Features       | Novas funcionalidades            |
| ♻️    | Refactoring    | Reorganização/melhoria de código |
| 🐛    | Bug Fixes      | Correções de bugs                |
| 🎨    | UI/UX          | Mudanças visuais/experiência     |
| 📝    | Docs           | Documentação                     |
| 🔧    | Implementation | Detalhes de implementação        |
| 📊    | Stats          | Métricas de mudanças             |
