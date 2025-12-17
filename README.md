# MyWish frontend

Esse projeto foi gerado usando Angular 20 e [Angular CLI](https://github.com/angular/angular-cli) version 20.3.12.

Ele representa o frontend de uma aplicação voltada para a consulta de cartas de Pokémon, assim como o cadastro
de novas coleções e listas de desejo de usuários.

Nesse momento essa solução representa apenas o MVP, o que significa que há ainda muitas outras alterações a serem feitas
e features a serem adicionadas.

### Diagrama

![diagrama](diagrama.png)

### API Externa

Conforme a requisição do MVP, esse projeto foi montado pensando em soluções com mais de um serviço conectado,
sendo assim foi utilizada uma API externa, via SDK, para a requisição das cartas em diversas línguas.

A API, TCGDex, pode ser encontrada no seguinte link [https://tcgdex.dev/](https://tcgdex.dev/) e é uma API opensource
e gratuita.

## Execução

Existem várias maneiras para a execução do projeto, mas para fins avaliativos da pós (e para a facilidade de execução)
um Dockerfile foi preparado que contém o build da versão de produção do Angular, bem como todas as configurações necessárias.

### Docker compose

A execução é tão simples quanto rodar 

```shell script
docker compose up
```

O frontend estará rodando no path [http://localhost:4200](http://localhost:4200).

### Execução local

Assumindo que você possua o npm instalado na máquina, basta executar

```bash
npm install
ng serve
```
