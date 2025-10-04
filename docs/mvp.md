# ROADMAP DE DESENVOLVIMENTO: MARKETPLACE DE AGENDAMENTOS (MVP)

Este roadmap define as prioridades e a ordem de construção dos módulos, dividindo o projeto em fases para garantir um lançamento rápido e focado nas funcionalidades essenciais para validação do negócio.

**Base de Dados Definida:** PostgreSQL

---

## FASE 1: O Core do Agendamento (MVP Base)

**Foco:** Garantir que o Prestador possa gerenciar a agenda e o Cliente possa agendar.

| Módulo | Funcionalidades Essenciais | Prioridade |
| :--- | :--- | :--- |
| **Backend/Banco de Dados (PostgreSQL)** | Estrutura de dados para **Serviços**, **Agenda/Slots** e **Agendamentos**. Lógica de **travamento** para evitar duplo agendamento. | **Alta** |
| **Autenticação (Passwordless)** | Fluxo completo de **Login/Cadastro por E-mail** (Código Mágico/OTP) para Cliente e Prestador. | **Alta** |
| **Portal do Prestador - Agenda** | Criação de slots de horário, bloqueios e visualização de agendamentos. **(Foco em 1 Unidade)**. | **Alta** |
| **Portal do Prestador - Serviços** | Cadastro de serviços básicos (Nome, Duração, Preço) e associação a profissionais. **(Sem Categorias)**. | **Média** |
| **Notificações Básicas** | Envio de **E-mail de Confirmação** de agendamento. (Utilizando um provedor como SendGrid/Mailgun). | **Média** |

---

## FASE 2: O Funil de Monetização e Busca (Lançamento Oficial do MVP)

**Foco:** Integrar o pagamento, a busca e liberar o sistema para o público.

| Módulo | Funcionalidades Essenciais | Prioridade |
| :--- | :--- | :--- |
| **Busca do Cliente** | Página inicial com a **Barra de Busca Multifuncional** (Estilo Airbnb). Exibição da lista de resultados (ranqueamento simples por distância/avaliação). | **Alta** |
| **Fluxo de Agendamento** | O fluxo completo de **4 Passos** (Serviço, Profissional, Data/Hora, Checkout Dinâmico Logado/Convidado). | **Alta** |
| **Portal do Prestador - Planos** | Integração com **Gateway de Pagamento** (Ex: Stripe) para processar assinaturas dos planos **Standard** e **Premium** (apenas o fluxo de pagamento recorrente). | **Alta** |
| **Perfil do Cliente** | Tela de perfil com **Reservas Futuras/Anteriores** e opções de reagendamento/cancelamento. | **Média** |
| **Ranqueamento (Base)** | Implementação das regras básicas de ranqueamento, priorizando o **Tier de Plano** (Premium sobre Standard). | **Alta** |

---

## FASE 3: Escalabilidade e Robustez (*MVP+*)

**Foco:** Lançar recursos avançados para suportar o crescimento e aumentar a retenção.

| Módulo | Funcionalidades Essenciais | Prioridade |
| :--- | :--- | :--- |
| **Múltiplas Lojas** | Funcionalidade para o Prestador cadastrar **Múltiplas Unidades**, gerenciar horários específicos por filial e associar profissionais. | **Alta** |
| **Notificações SMS (Redução de No-Show)** | Integração com API de SMS (Ex: Twilio) para envio de **Lembretes de 24h/1h** antes do serviço. | **Média** |
| **Gerenciamento de Categorias** | Módulo para o Prestador criar e gerenciar categorias e o uso dessas categorias como filtro na busca do Cliente. | **Média** |
| **Favoritos** | Implementação da funcionalidade de **Favoritos** no perfil do Cliente. | **Baixa** |
| **Ranqueamento (Avançado)** | Inclusão de fatores de qualidade avançados no ranqueamento (Taxa de No-Show/Cancelamento). | **Média** |