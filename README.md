# Rogério & Aurelice

Landing page de casamento criada com Next.js para apresentar a celebração das bodas de prata de Rogério e Aurelice.

## Visão geral

O projeto foi pensado para uma experiência visual elegante e responsiva, com foco em apresentação do evento, confirmação de presença e informações úteis para os convidados.

## Tecnologias

- Next.js 14.2.5
- React 18
- CSS Modules
- JavaScript
- App Router

## Funcionalidades

- Hero section de abertura com identidade visual personalizada
- Seção com informações do evento
- Carrossel de imagens
- Lista de presentes
- Modal de confirmação de presença
- Painel administrativo em `/admin`
- Layout responsivo para mobile e desktop

## Como executar

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Abra em seguida `http://localhost:3000`.

### Build de produção

```bash
npm run build
```

### Iniciar em produção

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Estrutura principal

```text
src/
  app/
    admin/
    page.jsx
    layout.jsx
  components/
    Carousel/
    ConfirmModal/
    GiftList/
    Hero/
    WeddingInfo/
public/
  images/
```

## Observações

- O projeto usa `#modal-root` em `src/app/layout.jsx` para renderização de modais via portal.
- As imagens locais ficam em `public/images`.
- O alias `@` aponta para a pasta `src`.
