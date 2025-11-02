# Documento: Métricas dos Dashboards Partner

Guia de referência com todas as métricas utilizadas nos dashboards do módulo Partner.

## Índice

1. [Dashboard 1: Visão Geral](#dashboard-1-visão-geral)
2. [Dashboard 2: Vendas & Receita](#dashboard-2-vendas--receita)
3. [Dashboard 3: Operacional](#dashboard-3-operacional)
4. [Dashboard 4: Clientes](#dashboard-4-clientes)
5. [Formatos e Tipos de Dados](#formatos-e-tipos-de-dados)

---

## Dashboard 1: Visão Geral

**Rota:** `/partner/dashboard`

### Métricas Principais

#### 1. Receita Semanal

- **Tipo:** Moeda (R$)
- **Formato:** R$ X.XXX (com separador de milhar)
- **Comparação:** vs dia/semana/mes(de acordo com o filtro) anterior (%)
- **Descrição:** Receita total da semana atual

#### 2. Taxa de Ocupação

- **Tipo:** Percentual
- **Formato:** XX% (1 casa decimal)
- **Comparação:** vs dia/semana/mes(de acordo com o filtro) anterior (%)
- **Descrição:** Percentual de horários preenchidos em relação à capacidade total

#### 3. Ticket Médio

- **Tipo:** Moeda (R$)
- **Formato:** R$ XXX (sem decimais)
- **Comparação:** vs semana anterior (R$)
- **Descrição:** Receita média por agendamento

#### 4. Avaliação Média

- **Tipo:** Decimal (0-5)
- **Formato:** X.X (1 casa decimal)
- **Comparação:** vs semana anterior
- **Descrição:** Média das avaliações recebidas na semana
- **Contexto:** Baseado em número de avaliações desta semana

### Métricas Secundárias

#### 5. Meta Semanal

- **Tipo:** Moeda (R$)
- **Valor Atual:** Receita semanal atual
- **Meta:** Meta de receita definida
- **Progresso:** Percentual de conclusão da meta (%)
- **Descrição:** Progresso em relação à meta semanal de receita

#### 6. Novos Clientes

- **Tipo:** Número inteiro
- **Formato:** XXX
- **Descrição:** Quantidade de clientes novos na semana

#### 7. Clientes Recorrentes

- **Tipo:** Número inteiro
- **Formato:** XXX
- **Descrição:** Quantidade de clientes que retornaram na semana

#### 8. Taxa de Cancelamento

- **Tipo:** Percentual
- **Formato:** X.X% (1 casa decimal)
- **Descrição:** Percentual de agendamentos cancelados

#### 9. Taxa de Conversão

- **Tipo:** Percentual
- **Formato:** XX% (sem decimais)
- **Descrição:** Taxa de conversão de visitas em agendamentos

#### 10. Horários de Pico

- **Tipo:** Texto/Horário
- **Formato:** XXh - XXh
- **Descrição:** Período do dia com maior demanda
- **Exemplo:** 14h - 18h

### Dados Temporais

#### 11. Agendamentos por Dia (Últimos 7 dias)

- **Tipo:** Séries temporais
- **Dimensões:** Dia da semana (Seg, Ter, Qua, Qui, Sex, Sáb, Dom)
- **Métricas:**
  - Número de agendamentos por dia
  - Receita por dia (R$)
  - Agendamentos concluídos por dia
  - Agendamentos cancelados por dia

#### 12. Top Serviços por Demanda

- **Tipo:** Categórico
- **Dimensões:** Nome do serviço
- **Métricas:**
  - Número de agendamentos por serviço
  - Receita total por serviço (R$)
- **Top 5:** Serviços mais demandados no período

---

## Dashboard 2: Vendas & Receita

**Rota:** `/partner/dashboard/sales`

### Métricas Principais

#### 1. Receita do Mês

- **Tipo:** Moeda (R$)
- **Formato:** R$ XX.XXX (com separador de milhar)
- **Comparação:** vs mês anterior (%)
- **Variação Absoluta:** Diferença em R$
- **Descrição:** Receita total do mês atual

#### 2. Ticket Médio

- **Tipo:** Moeda (R$)
- **Formato:** R$ XXX (sem decimais)
- **Comparação:** vs mês anterior (%)
- **Variação Absoluta:** Diferença em R$
- **Descrição:** Receita média por agendamento no mês

#### 3. Taxa de Conversão

- **Tipo:** Percentual
- **Formato:** XX.X% (1 casa decimal)
- **Comparação:** vs mês anterior (%)
- **Variação:** Diferença em pontos percentuais
- **Descrição:** Percentual de conversão de visitas em agendamentos

#### 4. Receita/Hora

- **Tipo:** Moeda (R$)
- **Formato:** R$ XXX (sem decimais)
- **Comparação:** vs mês anterior (%)
- **Descrição:** Receita média por hora de funcionamento

### Métricas de Meta

#### 5. Meta Mensal de Receita

- **Tipo:** Moeda (R$)
- **Valor Atual:** Receita atual do mês
- **Meta:** Meta de receita mensal definida
- **Progresso:** Percentual de conclusão (%)
- **Restante:** Valor em R$ para atingir a meta
- **Prazo:** Dias restantes no mês
- **Descrição:** Progresso em relação à meta mensal de receita

### Dados Temporais

#### 6. Evolução de Receita (Últimos 6 meses)

- **Tipo:** Séries temporais
- **Dimensões:** Mês (Jan, Fev, Mar, Abr, Mai, Jun, etc.)
- **Métricas:**
  - Receita real mensal (R$)
  - Meta mensal (R$)
  - Número de agendamentos mensais
- **Descrição:** Comparação entre receita realizada e meta ao longo dos meses

#### 7. Receita por Dia da Semana

- **Tipo:** Categórico
- **Dimensões:** Dia da semana (Seg, Ter, Qua, Qui, Sex, Sáb, Dom)
- **Métricas:**
  - Receita diária média (R$)
  - Ticket médio por dia (R$)
  - Número de agendamentos por dia
- **Descrição:** Padrão médio semanal de faturamento

### Métricas Categóricas

#### 8. Receita por Categoria de Serviço

- **Tipo:** Categórico
- **Categorias:** Cabelo, Barba, Estética, Combo
- **Métricas por categoria:**
  - Receita total (R$)
  - Crescimento vs período anterior (%)
- **Descrição:** Receita e crescimento por tipo de serviço

#### 9. Top 5 Serviços por Receita

- **Tipo:** Ranking
- **Métricas por serviço:**
  - Nome do serviço
  - Receita total (R$)
  - Número de agendamentos
  - Percentual da receita total (%)
  - Crescimento vs período anterior (%)
- **Descrição:** Ranking dos serviços mais rentáveis

#### 10. Horários Mais Rentáveis

- **Tipo:** Temporal
- **Dimensões:** Horário (9h, 10h, 11h, 14h, 15h, 16h, 17h, 18h)
- **Métricas:**
  - Receita por horário (R$)
  - Taxa de utilização (%)
- **Descrição:** Horários com maior geração de receita

### Insights e Alertas

- **Dia mais rentável:** Identificação do dia da semana com maior receita média
- **Oportunidades:** Categorias ou períodos com queda de receita que requerem atenção

---

## Dashboard 3: Operacional

**Rota:** `/partner/dashboard/operational`

### Métricas Principais

#### 1. Taxa de Ocupação

- **Tipo:** Percentual
- **Formato:** XX.X% (1 casa decimal)
- **Comparação:** vs semana anterior (%)
- **Descrição:** Percentual médio de capacidade utilizada
- **Contexto:** Média de ocupação durante o período

#### 2. Tempo Médio

- **Tipo:** Tempo (minutos)
- **Formato:** XX min
- **Comparação:** vs semana anterior (minutos)
- **Descrição:** Tempo médio de atendimento
- **Contexto:** Otimização de tempo vs período anterior

#### 3. Eficiência da Equipe

- **Tipo:** Percentual
- **Formato:** XX.X% (1 casa decimal)
- **Comparação:** vs semana anterior (%)
- **Contexto:** Número de profissionais ativos vs total
- **Descrição:** Métrica de eficiência geral da equipe

#### 4. Taxa de Pontualidade

- **Tipo:** Percentual
- **Formato:** XX.X% (1 casa decimal)
- **Comparação:** vs semana anterior (%)
- **Contexto:** Taxa de no-show (%)
- **Descrição:** Percentual de agendamentos realizados no horário

### Métricas de Utilização

#### 5. Utilização de Capacidade por Dia

- **Tipo:** Séries temporais
- **Dimensões:** Dia da semana (Seg, Ter, Qua, Qui, Sex, Sáb, Dom)
- **Métricas:**
  - Capacidade total (%)
  - Capacidade utilizada (%)
  - Capacidade ociosa (%)
  - Receita gerada (R$)
- **Descrição:** Análise diária de utilização vs capacidade disponível

#### 6. Status dos Agendamentos

- **Tipo:** Distribuição percentual
- **Status:**
  - Concluídos (%)
  - Confirmados (%)
  - Aguardando (%)
  - Cancelados (%)
- **Métricas:** Quantidade e percentual por status
- **Descrição:** Distribuição atual dos agendamentos por status

### Métricas por Serviço

#### 7. Duração Média por Serviço

- **Tipo:** Categórico
- **Dimensões:** Nome do serviço
- **Métricas:**
  - Tempo médio real (minutos)
  - Tempo planejado (minutos)
  - Variação (minutos)
- **Descrição:** Comparação entre tempo real vs tempo planejado por serviço

### Métricas Temporais

#### 8. Distribuição por Período do Dia

- **Tipo:** Categórico
- **Períodos:**
  - Manhã (8h-12h)
  - Tarde (12h-18h)
  - Noite (18h-22h)
- **Métricas por período:**
  - Número de agendamentos
  - Percentual do total (%)
  - Tendência vs período anterior (%)
- **Descrição:** Concentração de agendamentos ao longo do dia

#### 9. Mapa de Calor - Ocupação por Horário e Dia

- **Tipo:** Matriz temporal
- **Dimensões:**
  - **Linhas:** Horários (8h, 9h, 10h, 11h, 14h, 15h, 16h, 17h, 18h)
  - **Colunas:** Dias da semana (Seg, Ter, Qua, Qui, Sex, Sáb, Dom)
- **Métrica:** Taxa de ocupação (%)
- **Níveis de ocupação:**
  - 0-50%
  - 50-70%
  - 70-90%
  - 90-100%
- **Descrição:** Visualização de ocupação detalhada por horário e dia da semana

#### 10. Oportunidades de Tempo Ocioso

- **Tipo:** Categórico
- **Dimensões:** Dia da semana + Período do dia
- **Métricas:**
  - Horários vazios (quantidade)
  - Receita potencial (R$)
- **Descrição:** Identificação de períodos com baixa ocupação e potencial de receita adicional

### Métricas por Profissional

#### 11. Performance Detalhada por Profissional

- **Tipo:** Ranking
- **Dimensões:** Nome do profissional
- **Métricas:**
  - Número de agendamentos
  - Avaliação média (rating 0-5)
  - Receita gerada (R$)
  - Eficiência (%)
  - Taxa de pontualidade (%)
  - Tempo médio de atendimento (minutos)
  - Taxa de utilização (%)
- **Descrição:** Métricas individuais de performance por profissional

---

## Dashboard 4: Clientes

**Rota:** `/partner/dashboard/customers`

### Métricas Principais

#### 1. Base de Clientes

- **Tipo:** Número inteiro
- **Formato:** X.XXX (com separador de milhar)
- **Comparação:** vs mês anterior (%)
- **Variação:** Quantidade de novos clientes
- **Descrição:** Total de clientes únicos cadastrados

#### 2. Taxa de Retenção

- **Tipo:** Percentual
- **Formato:** XX.X% (1 casa decimal)
- **Comparação:** vs mês anterior (%)
- **Descrição:** Taxa de retenção de clientes
- **Contexto:** Classificação (ex: Excelente, Bom, etc.)

#### 3. LTV Médio (Lifetime Value)

- **Tipo:** Moeda (R$)
- **Formato:** R$ XXX (sem decimais)
- **Comparação:** vs mês anterior (%)
- **Contexto:** CAC (Custo de Aquisição por Cliente) em R$
- **Descrição:** Valor médio gerado por cliente durante seu ciclo de vida

#### 4. NPS Score

- **Tipo:** Decimal (0-5)
- **Formato:** X.X (1 casa decimal)
- **Comparação:** vs mês anterior
- **Contexto:** Número de avaliações coletadas
- **Descrição:** Net Promoter Score baseado nas avaliações dos clientes

### Métricas Temporais

#### 5. Evolução de Clientes (Últimos 6 meses)

- **Tipo:** Séries temporais
- **Dimensões:** Mês (Jan, Fev, Mar, Abr, Mai, Jun, etc.)
- **Métricas:**
  - Novos clientes (quantidade)
  - Clientes recorrentes (quantidade)
  - Churn (quantidade)
  - Total de clientes
- **Descrição:** Evolução mensal da base de clientes com separação entre novos, recorrentes e churn

### Métricas de Aquisição

#### 6. Canais de Aquisição

- **Tipo:** Categórico
- **Dimensões:** Nome do canal
- **Métricas por canal:**
  - Número de clientes
  - Participação percentual (%)
  - CAC - Custo de Aquisição por Cliente (R$)
- **Canais:** Indicação, Redes Sociais, Google/Busca, Marketing Local, Outros
- **Descrição:** Performance e custo de aquisição por canal de origem

### Métricas de Retenção

#### 7. Funil de Retenção

- **Tipo:** Funil de conversão
- **Etapas:**
  - Primeira Visita
  - Segunda Visita
  - Cliente Regular
  - Cliente Frequente
  - Cliente VIP
- **Métricas por etapa:**
  - Número de clientes
  - Percentual de conversão (%)
- **Descrição:** Jornada de conversão de cliente novo até VIP

#### 8. Lifetime Value por Segmento

- **Tipo:** Categórico
- **Dimensões:** Segmento de cliente
- **Segmentos:**
  - VIPs
  - Frequentes
  - Regulares
  - Ocasionais
  - Novos
- **Métricas por segmento:**
  - LTV médio (R$)
  - Número de clientes
  - Visitas médias por mês
  - Taxa de retenção (%)
- **Descrição:** Valor gerado e comportamento por segmento de cliente

#### 9. Top 5 Clientes VIP

- **Tipo:** Ranking
- **Dimensões:** Nome do cliente
- **Métricas:**
  - Número de visitas
  - Valor total gasto (R$)
  - Data da última visita
  - Status (ativo/inativo)
  - Nível de risco (baixo/médio/alto)
- **Descrição:** Clientes com maior valor gerado

### Métricas de Jornada

#### 10. Frequência Média

- **Tipo:** Decimal
- **Formato:** X.X visitas/mês (1 casa decimal)
- **Comparação:** vs período anterior (variação)
- **Descrição:** Média de visitas por cliente ao mês

#### 11. Tempo até Retorno

- **Tipo:** Tempo (dias)
- **Formato:** XX dias
- **Comparação:** vs período anterior (dias)
- **Descrição:** Tempo médio entre visitas consecutivas

#### 12. Taxa de Indicação

- **Tipo:** Percentual
- **Formato:** XX% (sem decimais)
- **Comparação:** vs período anterior (%)
- **Descrição:** Percentual de clientes que indicaram novos clientes

### Métricas de Segmentação RFM

#### 13. Análise RFM (Recência, Frequência, Monetário)

- **Tipo:** Segmentação
- **Segmentos:**
  - Champions (555)
  - Loyal (445)
  - At Risk (244)
  - Lost (111)
- **Métricas por segmento:**
  - Score RFM
  - Número de clientes
  - Receita total (R$)
- **Descrição:** Segmentação de clientes baseada em Recência, Frequência e Valor Monetário

### Alertas e Oportunidades

#### 14. Aniversariantes

- **Tipo:** Lista
- **Métricas:** Nome, data aniversário, segmento, gasto médio (R$)
- **Potencial:** Receita estimada com campanha de aniversário (R$)
- **Descrição:** Clientes com aniversário no período atual

#### 15. Clientes em Risco de Churn

- **Tipo:** Lista
- **Dimensões:** Nome do cliente
- **Métricas:**
  - Score de risco (0-100)
  - Última visita (dias atrás)
  - Frequência média histórica
  - LTV (R$)
  - Razão do risco (texto)
- **Descrição:** Clientes identificados com alto risco de churn

---

## Formatos e Tipos de Dados

### Tipos de Métrica

#### Percentual (%)

- **Formato padrão:** XX.X% (1 casa decimal) ou XX% (sem decimais)
- **Exemplo:** 87.3% ou 68%
- **Uso:** Sem decimais para valores inteiros, 1 casa decimal para precisão

#### Número Inteiro

- **Formato padrão:** XXX ou X.XXX (com separador de milhar para valores altos)
- **Exemplo:** 28 ou 1.247
- **Uso:** Sem decimais

#### Decimal

- **Formato padrão:** X.X (1 casa decimal) ou X.XX (2 casas decimais quando necessário)
- **Exemplo:** 4.7 ou 2.8
- **Uso:** Ratings, médias, frequências

#### Tempo

- **Formato padrão:**
  - Minutos: XX min
  - Dias: XX dias
  - Horário: XXh
  - Período: XXh - XXh
- **Exemplo:** 48 min, 12 dias, 14h - 18h

#### Rating (0-5)

- **Formato padrão:** X.X (1 casa decimal)
- **Exemplo:** 4.7, 4.8
- **Escala:** 0 a 5 estrelas

### Comparações e Tendências

#### Comparação Padrão

- **vs período anterior:** Semana anterior, mês anterior
- **Formato:** +XX% ou -XX%
- **Variação absoluta:** Quando aplicável (ex: +R$ 12.350)

#### Indicadores de Tendência

- **Alta:** Seta para cima (+)
- **Baixa:** Seta para baixo (-)
- **Neutro:** Sem variação significativa

### Dimensões Comuns

#### Períodos

- **Hoje:** Dados do dia atual
- **Esta Semana:** Últimos 7 dias
- **Este Mês:** Mês atual
- **Trimestre:** Trimestre atual
- **Personalizado:** Período selecionado pelo usuário

#### Loja/Filial

- **Quando aplicável:** Filtro por loja específica
- **Todas as lojas:** Agregação de todas as filiais

#### Dia da Semana

- **Formato:** Seg, Ter, Qua, Qui, Sex, Sáb, Dom

#### Mês

- **Formato:** Jan, Fev, Mar, Abr, Mai, Jun (e demais meses)

#### Horário

- **Formato:** 8h, 9h, 10h, etc.
- **Períodos:** Manhã (8h-12h), Tarde (12h-18h), Noite (18h-22h)

---
