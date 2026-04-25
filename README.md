<div align="center">

# Mais Soro
### Mais Soro. Mais Vida.

**Aplicativo nacional de saúde pública que localiza o hospital mais próximo com soro específico para acidentes com animais peçonhentos no Brasil.**

[🔗 Acessar o aplicativo](https://maissoro.org)

---

</div>

## Sobre o projeto

O **Mais Soro** é um programa de saúde pública digital de escopo nacional, concebido como contribuição independente para reduzir a mortalidade em acidentes com animais peçonhentos no Brasil. O aplicativo conecta a vítima ao hospital mais próximo que disponha do soro antiveneno específico para o tipo de envenenamento sofrido, cruzando geolocalização, base de dados oficial do Cadastro Nacional de Estabelecimentos de Saúde (CNES) e protocolos clínicos do Ministério da Saúde.

### Contexto

Acidentes com serpentes, aranhas, escorpiões e taturanas são classificados pela Organização Mundial da Saúde como doenças tropicais negligenciadas. No Brasil, a maior parte dos casos graves ocorre em áreas rurais e o desfecho clínico depende diretamente do tempo até a administração do antiveneno correto. A janela terapêutica varia de 2 a 6 horas conforme o tipo de acidente.

A ferramenta endereça três problemas simultâneos: localizar o hospital mais próximo, verificar se aquele hospital dispõe do soro específico necessário, e gerar informações clínicas estruturadas que aceleram o atendimento na chegada.

## Cobertura

**Cobertura nacional desde o lançamento:** mais de 2.200 unidades hospitalares mapeadas nas 27 unidades federativas, com dados oficiais do Cadastro Nacional de Estabelecimentos de Saúde (CNES) e enriquecimento autoral.

A base de dados foi estruturada a partir do Relatório de Unidades com Antivenenos publicado pelo Ministério da Saúde, cruzado com o cadastro CNES oficial e enriquecido com geolocalização precisa para roteamento em emergência.

## Funcionalidades

- **Identificação guiada do tipo de acidente** com fluxo visual projetado para leigos em situação de pânico
- **Geolocalização automática** via GPS do dispositivo, com fallback em cascata para triangulação por Wi-Fi e torres celulares
- **Ranqueamento de hospitais** por proximidade e disponibilidade do soro específico necessário
- **Modo "não sei o que me picou"** que ranqueia hospitais por cobertura máxima de antivenenos disponíveis
- **Cronômetro de Atendimento Pré-Hospitalar (APH)** que monitora visualmente a janela terapêutica desde o horário do acidente
- **Ficha de transferência APH** gerada automaticamente com dados clínicos estruturados para entrega ao médico receptor ou envio prévio via WhatsApp
- **Card de urgência clínica** por tipo de envenenamento, contendo sintomas esperados, janela terapêutica, riscos para crianças e idosos, e informações para relatar ao hospital
- **Badges informativos por unidade**: turno de atendimento (24h ou horário restrito), capacidade de internação, centro cirúrgico, tipo de unidade
- **Diferenciação visual de unidades inativas no CNES**: hospitais com cadastro desativado aparecem na lista marcados, mantendo transparência sem direcionar pacientes para esses pontos
- **Contatos de emergência sempre visíveis** (SAMU 192, CIATox 0800-722-6001, Bombeiros 193)
- **Funcionamento offline** via Progressive Web App (PWA) com Service Worker e cache estratificado
- **Status discreto de cache offline** que sinaliza quando os dados estão prontos para uso sem conexão
- **Instalável na tela inicial** de dispositivos Android e iOS, com botão de instalação integrado quando o navegador permite

## Arquitetura técnica

- **React 18 via CDN**, sem necessidade de build step
- **Progressive Web App** com Service Worker que aplica cache estratificado:
  - Shell crítico (HTML, manifest, dependências React) carrega na primeira visita
  - Dados (`hospitais.json` e `overrides.json`) carregam em segundo plano após o shell
  - Estratégia stale-while-revalidate para os dados, garantindo resposta imediata e atualização em background
- **HTML5 Geolocation API** com detecção de contexto seguro
- **SVG vetorial inline** para logotipo
- **Design System alinhado ao Gov.br**, padrão visual oficial do governo federal brasileiro
- **Estrutura de dados externalizada** em `data/hospitais.json` (base CNES + geocoding) e `data/overrides.json` (correções pontuais auditáveis)

### Estrutura de pastas

```
mais-soro/
├── index.html          # Componente React principal
├── sw.js               # Service Worker com cache estratificado
├── manifest.json       # PWA manifest
├── CNAME               # Domínio personalizado (maissoro.org)
├── data/
│   ├── hospitais.json  # 2.246 unidades CNES com geocoding
│   └── overrides.json  # Correções manuais de coordenadas
└── README.md
```

## Fonte dos dados

Base composta pelo cruzamento de:

- **Cadastro Nacional de Estabelecimentos de Saúde (CNES)** — Ministério da Saúde
- **Relatório de Unidades com Antivenenos** — Secretaria de Vigilância em Saúde / Ministério da Saúde
- **Geolocalização** — Nominatim/OpenStreetMap, com sanity check por bounding box estadual e correções manuais auditáveis para casos com cadastro CNES inconsistente

A curadoria da base de dados constitui obra intelectual protegida pelo artigo 7º, inciso XIII, da Lei 9.610/98, como coletânea que, por sua seleção, organização e disposição, representa criação intelectual original.

**Importante:** os dados de contato e a disponibilidade de soro são públicos, mas o estoque real em cada unidade varia ao longo do tempo. Sempre confirme por telefone antes do deslocamento.

## Inovações conceituais

O projeto integra as seguintes inovações autorais, parte integrante da obra registrada:

- Fluxo de triagem comportamental para usuário leigo em estado de emergência
- Algoritmo de ranqueamento por cobertura máxima para casos sem identificação do animal
- Cronômetro APH com coloração progressiva conforme proximidade da janela terapêutica
- Ficha de transferência clínica gerada automaticamente para acelerar o atendimento hospitalar
- Sistema de tiebreakers no ranqueamento que considera capacidade de internação e centro cirúrgico para casos graves
- Diferenciação transparente de unidades desativadas no CNES, mantendo registro histórico sem direcionar pacientes

## Autoria e direitos

**Concepção, desenvolvimento e curadoria:** Anderson Pires

PMO Sênior e pesquisador independente em saúde pública digital, baseado em Cascavel, Paraná, Brasil. Membro IEEE e Senior Member ISA.

- 💼 LinkedIn: [linkedin.com/in/andersonpires](https://www.linkedin.com/in/andersonpires)
- 📷 Instagram: [@andersonpires.me](https://www.instagram.com/andersonpires.me/)

© 2026 Mais Soro, Anderson Pires. Todos os direitos reservados.

Marca e conteúdo protegidos pelas Leis brasileiras 9.279/96 (Propriedade Industrial) e 9.610/98 (Direitos Autorais).

## Aviso legal

Este aplicativo é um protótipo conceitual de saúde pública e **não substitui atendimento médico profissional**. Em caso de emergência, ligue imediatamente para o SAMU (192) ou Bombeiros (193). O projeto é uma iniciativa independente, sem vínculo oficial com qualquer órgão governamental, desenvolvida com aspiração de adoção institucional futura.
