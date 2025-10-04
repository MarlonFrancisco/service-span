# regras-busca-ranqueamento.md

## Documentação: Regras de Ranqueamento e Visibilidade na Busca

Esta documentação detalha o algoritmo de pontuação que determina a ordem de exibição das empresas nos resultados de busca do cliente. Nosso objetivo é garantir que as empresas que oferecem a melhor qualidade de serviço e que estão ativamente investindo na plataforma recebam a maior visibilidade.

O ranqueamento é um processo de duas fases: **Filtro de Elegibilidade** e **Pontuação Final de Ordenação**.

---

### 1. Fase de Elegibilidade (Filtros Primários)

Antes de serem ranqueadas, as empresas devem atender a critérios obrigatórios. Empresas que não atenderem a qualquer um destes filtros **não serão exibidas** no resultado da busca do cliente, independentemente do seu Plano de Assinatura.

| Filtro | Requisito de Elegibilidade |
| :--- | :--- |
| **Status do Plano** | A empresa deve ter um plano de assinatura (**Standard, Premium ou Business**) com status **Ativo**. |
| **Disponibilidade** | A empresa/profissional deve ter **horários disponíveis** na data e hora solicitadas pelo cliente. |
| **Localização** | A **Unidade (Loja)** da empresa deve estar dentro do raio de busca do cliente. |
| **Serviços** | A empresa deve oferecer pelo menos **um dos serviços** ou pertencer à **categoria** buscada. |

---

### 2. Fase de Ordenação (Algoritmo de Pontuação)

As empresas que passarem pelos filtros primários serão ordenadas com base em uma pontuação final. A ordenação é dada primeiramente pelo **Fator Monetário (Plano)** e depois pelos **Fatores de Qualidade**.

#### A. Fator Nível de Assinatura (Fator de Prioridade Principal)

O nível de assinatura é o fator de maior peso, garantindo que o investimento nos planos superiores se traduza em maior visibilidade. A busca sempre agrupará e exibirá primeiro as empresas com planos mais altos.

| Plano | Prioridade de Exibição (Tier) | Benefício de Ranqueamento |
| :--- | :--- | :--- |
| **Business** | **Tier 1 (Máxima)** | Empresas Business **sempre** aparecerão no topo da lista, acima de todos os outros planos. |
| **Premium** | **Tier 2 (Alta)** | Empresas Premium aparecerão logo abaixo das Business, e acima de todas as Standard. |
| **Standard** | **Tier 3 (Padrão)** | Empresas Standard aparecerão na parte inferior dos resultados, ordenadas apenas pelos fatores de qualidade abaixo. |

#### B. Fatores de Qualidade (Critérios de Desempate Interno)

Dentro de um mesmo Tier de plano (ex: todas as empresas Business), o desempate e a ordenação interna serão determinados por estes fatores, na ordem de peso:

| Fator de Qualidade | Detalhe e Peso no Ranqueamento |
| :--- | :--- |
| **1. Avaliação Média (Estrelas)** | **Maior Peso:** A média de estrelas dada pelos clientes (Ex: 4.8 ranqueia antes de 4.5). O volume total de avaliações também é considerado. |
| **2. Proximidade (Distância)** | A **proximidade física** da unidade (loja) em relação ao ponto de busca do cliente. Empresas mais próximas são priorizadas. |
| **3. Taxa de Confiabilidade (Baixo *No-Show*)** | Prioriza empresas com um histórico baixo de **cancelamentos próprios** e de não comparecimento (*no-show*) dos clientes. |
| **4. Detalhamento do Perfil** | **Menor Peso:** Critério de desempate. Pontua empresas que têm o perfil 100% completo (fotos, descrição, horários definidos). |

**Regra Final de Ordenação:**

1.  Todas as empresas **Business** (ordenadas internamente por Avaliação, Distância, etc.).
2.  Todas as empresas **Premium** (ordenadas internamente por Avaliação, Distância, etc.).
3.  Todas as empresas **Standard** (ordenadas internamente por Avaliação, Distância, etc.).