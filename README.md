<div align="center">

# Mais Soro
### Mais Soro. Mais Vida.

**Aplicativo de saúde pública que localiza o hospital mais próximo com soro específico para acidentes com animais peçonhentos na Região Sul do Brasil.**

[🔗 Acessar o aplicativo](https://andersonpiresme.github.io/mais-soro/)

---

</div>

## Sobre o projeto

O **Mais Soro** é um protótipo conceitual de saúde pública digital desenvolvido como contribuição independente para reduzir o tempo de resposta em emergências com animais peçonhentos. O aplicativo integra uma base de 410 hospitais de referência dos estados do Paraná, Santa Catarina e Rio Grande do Sul, cruzando a localização da vítima com a disponibilidade de soros específicos para cada tipo de envenenamento.

### Contexto

Acidentes com serpentes, aranhas, escorpiões e taturanas são classificados pela Organização Mundial da Saúde como doenças tropicais negligenciadas. No Brasil, a maior parte dos casos graves ocorre em áreas rurais e o desfecho clínico depende diretamente do tempo até a administração do soro correto. A janela terapêutica varia de 2 a 6 horas conforme o tipo de acidente.

A ferramenta endereça três problemas simultâneos: localizar o hospital mais próximo, verificar se aquele hospital dispõe do soro específico necessário, e gerar informações clínicas estruturadas para acelerar o atendimento na chegada.

## Funcionalidades

- **Identificação guiada do tipo de acidente** com fluxo visual para leigos em pânico
- **Geolocalização automática** via GPS do dispositivo
- **Ranqueamento de hospitais** por proximidade e disponibilidade de soro específico
- **Modo "não sei o que me picou"** que ranqueia por cobertura máxima de antivenenos
- **Cronômetro APH** que monitora a janela terapêutica desde o acidente
- **Ficha de transferência para o hospital** gerada automaticamente com dados clínicos
- **Card de urgência clínica** por tipo de envenenamento com sintomas esperados, janela terapêutica e conduta
- **Contatos de emergência sempre visíveis** (SAMU 192, CIATox 0800-722-6001, Bombeiros 193)
- **Funcionamento offline** via Progressive Web App (PWA)
- **Instalável na tela inicial** de dispositivos Android e iOS

## Tecnologias

- React 18 (via CDN, sem build necessário)
- Progressive Web App com Service Worker para cache offline
- HTML5 Geolocation API
- SVG inline para logotipo vetorial
- Design System alinhado ao Gov.br (padrão visual do governo federal brasileiro)

## Fonte dos dados

Base curada a partir de documentos oficiais das Secretarias Estaduais de Saúde do Paraná, Santa Catarina e Rio Grande do Sul, com enriquecimento autoral incluindo georreferenciamento, normalização de categorias de atendimento e estruturação relacional por tipo de soro.

**Importante:** os dados de contato são públicos, mas a disponibilidade de soro varia. Sempre confirme por telefone antes do deslocamento.

## Autoria e direitos

**Concepção, desenvolvimento e curadoria:** Anderson Pires

PMO Sênior e pesquisador independente em saúde pública digital.

- 📱 WhatsApp: [(41) 99554-7920](https://wa.me/5541995547920)
- 💼 LinkedIn: [linkedin.com/in/andersonpires](https://www.linkedin.com/in/andersonpires)
- 📷 Instagram: [@andersonpires.me](https://www.instagram.com/andersonpires.me/)

© 2026 Mais Soro, Anderson Pires. Todos os direitos reservados.

Marca e conteúdo protegidos pelas Leis brasileiras 9.279/96 (Propriedade Industrial) e 9.610/98 (Direitos Autorais).

## Aviso

Este aplicativo é um protótipo conceitual e **não substitui atendimento médico profissional**. Em caso de emergência, ligue imediatamente para o SAMU (192) ou Bombeiros (193).
