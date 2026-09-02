# Rótulo Falante

Aplicativo web que lê a embalagem em voz alta para pessoas cegas ou com baixa visão.
A pessoa aponta a câmera para o código de barras e o app fala o nome do produto,
os alérgenos e, no caso de medicamento, para que serve, como tomar e quando não tomar —
em linguagem simples.

Projeto da disciplina **Laboratório de Software e Projetos** — FMU.

## Como rodar

Precisa de servidor HTTP: câmera, voz e instalação do PWA exigem contexto seguro
(`https://` ou `localhost`). Abrir o arquivo direto pelo `file://` não funciona.

    python -m http.server 8080
    # abra http://localhost:8080

## Como testar

Sem câmera, clique nos botões de exemplo ou digite um código de barras.
Com câmera, use "Escanear com a câmera" — no Android usa a API nativa
`BarcodeDetector`; no iOS cai automaticamente na biblioteca ZXing.

No celular, abra a URL publicada e use "Adicionar à tela de início".

## Fontes de dados

| Categoria | Fonte |
|---|---|
| Alimentos | API pública do Open Food Facts |
| Medicamentos | Base curada manualmente pela equipe (`CATALOGO_LOCAL` em `index.html`) |

A base de medicamentos ser manual é intencional: é a abordagem **MVP Concierge**.
Num domínio onde errar a dose machuca alguém, a informação passa por revisão humana
antes de entrar.

## Acessibilidade

O produto é para pessoas com deficiência visual, então a acessibilidade da própria
interface é requisito, não enfeite:

- resultado anunciado por região `aria-live`; alérgeno usa `role="alert"`
- alvos de toque acima de 44 px (WCAG 2.5.5)
- foco visível de 4 px em todos os controles
- controle de tamanho de fonte e modo alto contraste (preto/amarelo)
- vibração ao reconhecer o código
- voz em pt-BR pela Web Speech API, nativa do navegador

Testado com NVDA (desktop) e TalkBack (Android).

## Arquivos

    index.html            aplicação inteira: interface, lógica e base curada
    sw.js                 service worker: casca em cache, funciona offline
    manifest.webmanifest  instalação na tela inicial
    icon-192.png          ícones do app
    icon-512.png

## Aviso

Protótipo acadêmico. Os dados de medicamento são de demonstração e **não substituem
a bula nem a orientação de médico ou farmacêutico**.
