## 0.4.0 (2025-10-26)

### Feat

- **api/partner**: implement stores backend with member management and gallery
- **web/partner**: implement modular dashboard and stores management

## 0.3.0 (2025-10-21)

### Feat

- **web**: add partner route protection middleware
- **api/subscription**: add subscription upgrade flow
- **api**: enhance user and subscription management
- **web/checkout**: add checkout flow with plan selection and payment

### Fix

- **web/subscription**: dont generate subscription on user is not authenticated
- **api/auth**: set lax value on sameSite setting on header set-cookie at response, and return user data on authentication

### Refactor

- **api/users**: simplify user service and add subscription check
- **api**: update plans and subscription services
- **web/booking**: restructure flow with mobile-first design and reviews
- **web**: search split overlay into modular components

### Perf

- **web**: added reverse proxy from next api to nest api

## 0.2.0 (2025-10-17)

### Feat

- **web**: feat(search): refactor search bar and add mobile overlay

## 0.1.2 (2025-10-17)

### Fix

- **api**: remove api package and migrate to app api
- **api**: build application on serveless function on vercel
- **api**: install module express

## 0.1.1 (2025-10-16)

### Fix

- **api**: change settings on vercel.json

## 0.1.0 (2025-10-16)

### Feat

- added commitizen settings and added all .env on .gitignore
- **web**: improved animation at homepage
- **api**: 🎸 added notification module and suport to serveless
- **subscription**: atualiza lógica da controller de subscription
- atualizar fluxo de autenticação e registro de usuário
- implement authentication, plans, sms, stripe, and database modules; update web and ui components; various fixes and refactors
- **web**: refatora dashboard do parceiro
- **api**: adiciona módulo de pagamento, estrutura inicial com controllers e serviços no pacote packages/api, e ajustes nos arquivos principais da API
- **agenda**: implementar calendário semanal para exibir compromissos, profissionais e controle de dias/horários de trabalho; adicionar bloqueio de horários e seleção de profissional; melhorias na experiência de usuário no módulo de agenda
- ajustes em layout, remoção de image-gallery antiga e melhorias em componentes de busca e header
- ajustes e novos componentes em auth, booking e layout; melhorias em páginas e estrutura de pastas
- ajustes em booking, header e remoção dos componentes ui antigos
- **notificações**: melhorias no preview de templates, ajustes em notificações internas e refatoração de componentes relacionados (email/sms), remoção de dashboard antigo e inclusão de estrutura inicial para partner
- **header**: animação e hook do header, melhorias no helper de animação, ajustes gerais nos componentes e UI
- **web**: adicionar páginas booking, contact, dashboard, help, privacy, profile, terms e src; ajustes em layout, config e UI; integração inicial de homepage com busca e categorias
- adiciona novos componentes e configurações iniciais do monorepo

### Fix

- **api**: export createApp to serveless enviroment
- export main module to enviroments serveless

### Refactor

- **auth, plans, subscription, users, eslint**: atualiza controllers, dtos, guards, services e configuração do eslint para melhorias gerais, incluindo ajustes de autenticação, plano e subscription
- **api,web**: reestruturação dos módulos principais, remoção e recriação dos diretórios de auth, database, plans, sms, stripe, subscription e users; atualização das rotas de privacidade e termos, ajustes em helpers e configuração
- ajustes em serviços do parceiro
- atualiza dependências e ajustes em configuração do projeto
- ajustes em UI, remoção de arquivos antigos e atualização de componentes
- reorganiza componentes de search, adiciona store de busca, integra homepage e UI shadcn
