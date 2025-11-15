## 0.9.0 (2025-11-15)

### Feat

- **web**: enhance mobile responsiveness and simplify navigation
- **web/booking**: implement business days blocking in date picker
- **web**: implement seo optimization with sitemap and robots.txt
- **web**: implement legal pages and modernize browser targeting
- **web**: enhance homepage and search with loading states, empty states, and mobile UX improvements
- **web/partner**: implement bulk time blocking with drag and shift selection

### Fix

- **api/review**: import wrong module

### Refactor

- **api/notification**: migrate from aws ses/sns to sendgrid

## 0.8.0 (2025-11-12)

### Feat

- **api/review**: enhance review module with public access and relation loading
- **api**: implement favorites module with user relations
- **web**: implement NotFound component with customizable actions
- **web**: implement favorites system with mutations and service layer

### Fix

- **web**: update plan card component styling

### Refactor

- **web**: modularize reviews modal with hook-driven architecture
- **web**: enhance homepage ui with auto-scroll carousels and performance optimizations
- **web**: improve checkout flow and schedule management
- **web**: enhance booking showcase with favorites integration
- **web**: restructure profile page with modular component architecture

## 0.7.0 (2025-11-09)

### Feat

- **web**: redesign profile page with tabbed interface and enhanced hero section
- **api**: implement recommendation module with upstash abstraction and multi-service scheduling
- **api/db**: populate mock data with professionals and service assignments
- **api/search**: implement upstash search module with store indexing and migration
- **search**: implement virtualized search results with infinite scroll
- **api/partner**: implement dashboard customers metrics module
- **api/partner**: add operational metrics module
- **api/partner**: implement dashboard 2 sales metrics
- **web/partner**: integrate dashboard sales metrics with dynamic API data and skeleton loading
- **web/partner**: integrate dashboard 1 metrics query with dynamic period filtering
- **api/partner**: implement dashboard 1 metrics with period filtering and reviews management
- **api/subscription**: implement getCurrentPlan endpoint with unlimited access support
- **web/partner**: implement plans module and refactor AdminSidebar with unlimited access support
- **api**: add notifications settings and history modules with nested routes
- **web/partner**: refactor notifications module with separate email and SMS settings pages
- **api**: add business hours to stores and improve entity relations

### Refactor

- **web**: adapt header layout for integrated profile and update ui color scheme
- **web**: enhance booking flow validation and simplify checkout
- **web/partner**: extract TrendBadge component and standardize trend display across all dashboard metrics
- **ui**: standardize imports and enhance dark mode support
- **web/partner**: standardize empty states and enhance UI consistency
- **web**: modernize homepage with hero section and recomendation system
- **web/booking**: migrate to server-side rendering and hook-driven architecture
- **web/partner**: simplify customer metrics UI and remove unused features
- **web/partner**: refactor partner modules with improved mutations and component structure

### Perf

- **api/metrics**: migrate dashboard customers and operational to sql with database optimizations
- **api/metrics**: migrate dashboard sales to sql
- **api/metrics**: migrate dashboard overview to sql

## 0.6.0 (2025-11-01)

### Feat

- **api/partner**: add blocked-time and schedule modules with nested routes structure

### Refactor

- **web/partner**: refactor agenda module with improved grid view and responsive components

## 0.5.0 (2025-10-29)

### Feat

- **api/partner**: align partner services with professional linking
- **web/partner**: refactor services module and link professionals

### Refactor

- **api/partner**: added category and service module, and finish crud on store module
- **web/partner**: improves on service and stores module on partner context

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
