<div align="center">

# Mais Soro
### Mais Soro. Mais Vida.

**Aplicativo nacional de saúde pública que localiza o hospital mais próximo com soro específico para acidentes com animais peçonhentos no Brasil.**

[🔗 Acessar o aplicativo](https://andersonpiresme.github.io/mais-soro/)

---

</div>

## Sobre o projeto

O **Mais Soro** é um programa de saúde pública digital de escopo nacional, concebido como contribuição independente para reduzir a mortalidade em acidentes com animais peçonhentos no Brasil. O aplicativo conecta a vítima ao hospital mais próximo que disponha do soro antiveneno específico para o tipo de envenenamento sofrido, cruzando geolocalização, base de dados hospitalar curada e protocolos clínicos do Ministério da Saúde.

### Contexto

Acidentes com serpentes, aranhas, escorpiões e taturanas são classificados pela Organização Mundial da Saúde como doenças tropicais negligenciadas. No Brasil, a maior parte dos casos graves ocorre em áreas rurais e o desfecho clínico depende diretamente do tempo até a administração do antiveneno correto. A janela terapêutica varia de 2 a 6 horas conforme o tipo de acidente.

A ferramenta endereça três problemas simultâneos: localizar o hospital mais próximo, verificar se aquele hospital dispõe do soro específico necessário, e gerar informações clínicas estruturadas que aceleram o atendimento na chegada.

## Cobertura

O projeto é concebido como programa de cobertura nacional, estruturado em arquitetura modular que permite expansão progressiva por unidade federativa.

**Lançamento inicial:** Paraná, Santa Catarina e Rio Grande do Sul, com mais de 410 unidades hospitalares de referência curadas.

**Expansão planejada para 2026:** incorporação das 24 unidades federativas restantes, com meta de cobertura integral do território brasileiro.

## Funcionalidades

- **Identificação guiada do tipo de acidente** com fluxo visual projetado para leigos em situação de pânico
- **Geolocalização automática** via GPS do dispositivo, com fallback em cascata para triangulação por Wi-Fi e torres celulares
- **Ranqueamento de hospitais** por proximidade e disponibilidade do soro específico necessário
- **Modo "não sei o que me picou"** que ranqueia hospitais por cobertura máxima de antivenenos disponíveis
- **Cronômetro de Atendimento Pré-Hospitalar (APH)** que monitora visualmente a janela terapêutica desde o horário do acidente
- **Ficha de transferência APH** gerada automaticamente com dados clínicos estruturados para entrega ao médico receptor ou envio prévio via WhatsApp
- **Card de urgência clínica** por tipo de envenenamento, contendo sintomas esperados, janela terapêutica, riscos para crianças e idosos, e informações para relatar ao hospital
- **Contatos de emergência sempre visíveis** (SAMU 192, CIATox 0800-722-6001, Bombeiros 193)
- **Funcionamento offline** via Progressive Web App (PWA) com Service Worker
- **Instalável na tela inicial** de dispositivos Android e iOS

## Tecnologias

- React 18 via CDN, sem necessidade de build
- Progressive Web App com Service Worker para cache offline
- HTML5 Geolocation API com detecção de contexto seguro
- SVG vetorial inline para logotipo
- Design System alinhado ao Gov.br, padrão visual oficial do governo federal brasileiro

## Fonte dos dados

Base curada a partir de documentos públicos das Secretarias Estaduais de Saúde, com enriquecimento autoral incluindo georreferenciamento, normalização de categorias de atendimento, cruzamento com protocolos clínicos de soroterapia antipeçonhenta e estruturação relacional por tipo de urgência.

A curadoria da base de dados constitui obra intelectual protegida pelo artigo 7º, inciso XIII, da Lei 9.610/98, como coletânea que, por sua seleção, organização e disposição, representa criação intelectual original.

**Importante:** os dados de contato são públicos, mas a disponibilidade real de soro em cada unidade varia ao longo do tempo. Sempre confirme por telefone antes do deslocamento.

## Inovações conceituais

O projeto integra as seguintes inovações autorais, parte integrante da obra registrada:

- Fluxo de triagem comportamental para usuário leigo em estado de emergência
- Algoritmo de ranqueamento por cobertura máxima para casos sem identificação do animal
- Cronômetro APH com coloração progressiva conforme proximidade da janela terapêutica
- Ficha de transferência clínica gerada automaticamente para acelerar o atendimento hospitalar

## Autoria e direitos

**Concepção, desenvolvimento e curadoria:** Anderson Pires

PMO Sênior e pesquisador independente em saúde pública digital, baseado em Cascavel, Paraná, Brasil.

- 💼 LinkedIn: [linkedin.com/in/andersonpires](https://www.linkedin.com/in/andersonpires)
- 📷 Instagram: [@andersonpires.me](https://www.instagram.com/andersonpires.me/)

© 2026 Mais Soro, Anderson Pires. Todos os direitos reservados.

Marca e conteúdo protegidos pelas Leis brasileiras 9.279/96 (Propriedade Industrial) e 9.610/98 (Direitos Autorais).

## Aviso legal

Este aplicativo é um protótipo conceitual de saúde pública e **não substitui atendimento médico profissional**. Em caso de emergência, ligue imediatamente para o SAMU (192) ou Bombeiros (193). O projeto é uma iniciativa independente, sem vínculo oficial com qualquer órgão governamental, desenvolvida com aspiração de adoção institucional futura.
