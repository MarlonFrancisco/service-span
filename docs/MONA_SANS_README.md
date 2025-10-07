# Mona Sans - Guia de Uso

## 🎯 Fonte Padrão do Projeto

A **Mona Sans** está configurada como a **fonte padrão** de todo o projeto web. Todos os textos usarão automaticamente a Mona Sans, substituindo as fontes padrão do sistema.

## 📁 Arquivos de Fonte Configurados

A fonte Mona Sans foi configurada com todas as variações disponíveis na pasta `static/`:

### Pesos (Weights)

- **200** - ExtraLight
- **300** - Light
- **400** - Regular (padrão)
- **500** - Medium
- **600** - SemiBold
- **700** - Bold
- **800** - ExtraBold
- **900** - Black

### Estilos (Styles)

- **normal** - Estilo normal
- **italic** - Estilo itálico

### Larguras (Widths)

- **normal** - Largura padrão
- **condensed** - Largura condensada
- **expanded** - Largura expandida

## 🎨 Classes CSS Disponíveis

### Classes Básicas

```css
.font-mona-sans          /* Família Mona Sans */
.font-mona-italic        /* Estilo itálico */
```

### Classes de Peso

```css
.font-mona-200           /* ExtraLight */
.font-mona-300           /* Light */
.font-mona-400           /* Regular */
.font-mona-500           /* Medium */
.font-mona-600           /* SemiBold */
.font-mona-700           /* Bold */
.font-mona-800           /* ExtraBold */
.font-mona-900           /* Black */
```

### Classes de Largura

```css
.font-mona-condensed     /* Condensada */
.font-mona-condensed-400 /* Condensada Regular */
.font-mona-condensed-700 /* Condensada Bold */
.font-mona-expanded      /* Expandida */
.font-mona-expanded-400  /* Expandida Regular */
.font-mona-expanded-700  /* Expandida Bold */
```

## 🚀 Como Usar

### Uso Básico (Fonte Padrão)

```tsx
<h1>Título com Mona Sans (automático)</h1>
<p>Texto padrão com Mona Sans</p>
```

### Com Peso Específico

```tsx
<h1 className="font-mona-600">Título SemiBold</h1>
<p className="font-mona-400">Texto Regular</p>
<p>Texto padrão (Mona Sans 400)</p>
```

### Com Estilo Itálico

```tsx
<p className="font-mona-italic">Texto em itálico</p>
<em className="font-mona-500 font-mona-italic">Ênfase</em>
```

### Com Largura Condensada/Expandida

```tsx
<h2 className="font-mona-condensed-700">Título Condensado</h2>
<h2 className="font-mona-expanded-400">Título Expandido</h2>
```

### Combinação de Classes

```tsx
<h1 className="font-mona-sans font-mona-800 font-mona-italic">
  Título Especial
</h1>
```

## 📁 Localização dos Arquivos

- **Configuração da fonte**: `apps/web/app/layout.tsx`
- **Classes CSS**: `apps/web/app/globals.css`
- **Arquivos de fonte**: `apps/web/app/fonts/Mona_Sans/static/`

## ⚡ Performance

- Todas as variações são carregadas automaticamente
- `display: swap` para melhor performance de carregamento
- Fallbacks configurados para `system-ui` e `sans-serif`

## 🔧 Configuração

A Mona Sans é aplicada automaticamente em todo o projeto através da configuração no `layout.tsx` e `globals.css`. Não é necessário adicionar classes básicas como `font-mona-sans` para usar a fonte - ela já é a padrão.
