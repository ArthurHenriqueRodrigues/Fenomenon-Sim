# O Fenômeno?

Simulador de carreira de futebol feito com HTML, CSS e JavaScript puro.

## Como jogar

Abra `index.html` no navegador ou publique o projeto usando o GitHub Pages. O jogo funciona sem servidor e salva o progresso no `localStorage` do navegador.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto para a branch `main`.
3. Acesse **Settings > Pages** e selecione **GitHub Actions** como fonte.
4. O workflow em `.github/workflows/deploy-pages.yml` fará a publicação automaticamente.

Depois da primeira execução, o endereço ficará parecido com:

`https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

## Arquivos principais

- `index.html`: estrutura das telas do jogo.
- `style.css`: visual e responsividade.
- `data.js`: dados das lendas, ligas, eventos e escolhas.
- `game.js`: regras, simulação, salvamento e interações.
