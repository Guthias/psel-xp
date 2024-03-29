# Desafio XP Back-end

Olá meu nome é Gustavo Mathias, mas pode me chamar de Guthias e seja bem vind@ ao meu repositorio, Esse desafio foi feito em um mometo da minha vida em que eu tive que equilibrar diversos pratos ao mesmo tempo. 

Mas como já disse Sócrates: `Uma vida sem desafios não vale a pena ser vivida.`

![](https://i.gifer.com/51aX.gif)
## 📖 Indice

- [Sobre](#sobre)
- [Como rodar o projeto localmente](#rodando-localmente)
- [Ferramentas utilizdas](#ferramentas)
- [Testes e TDD](#testes)

<h2 id="sobre">📌 Sobre</h2>

- Esse projeto tem a intenção de criar uma API que simula um sistema de compra e venda de ações

- A API foi feita com `TypeScript` e `Express` e segue a arquitetura MSC

- Para acessar a maior parte das rotas é necessario ter um token JWT valido

- A compra e venda de ações é feita atráves de ordens de compra e venda que só se concluem quando a um pedido de compra e um de venda com o mesmo valor

- O deploy está nesse link: [https://guthias-psel-xp.herokuapp.com](https://guthias-psel-xp.herokuapp.com)

<details>
<summary><strong>Diagrama do banco de dados</strong></summary>

![](https://i.ibb.co/0DccgmW/diagrama-sql.png)

</details>

<h2 id="rodando-localmente">💻 Como rodar o projeto localmente</h2>
<details>
<summary><strong>Rodando sem o Docker</strong></summary>

- Faça o clone do projeto
```
git clone git@github.com:Guthias/psel-xp.git
```

- Acesse a pasta do projeto
```
cd psel-xp
```

- Instale as dependencias com o npm install
```
npm install
```

- Renomeie o arquivo .env.example para .env e preencha as vairaveis de ambiente
```
DB_USERNAME="nome do seu usuario SQL"
DB_PASSWORD="senha do seu usuario SQL"
DB_DATABASE="nome para o banco local"
DB_HOST="localhost"
DB_PORT="3306"
DB_DIALECT="mysql"
SECRET="codigoSecretoJWT"
```

- Rode o comando npm start
> Tenha certeza que as portas 3000 e 3306 estão disponiveis
> Você precisa ter instalado
<br>

```
npm start
```
</details>

<h2 id="ferramentas">🛠️ Ferramentas Utilizadas</h2>
<details>

<summary><strong>Principais ferramentas utilizadas</strong></summary>

- **TypeSript:** Decidi utilizar o Typescript que devido a sua tipagem forte é mais fácil identificar erros durante o desenvolvimento o'que aumenta a produtividade na hora de desenvolver

- **ESlint:** Para garantir um código limpo, utilizei o ESlint com as regras do AIrbnb para Node.js em typescript
 
- **MySql:** Decidi utilizar o MySQL por ser um banco de dados relacional que tenho mais familiaridade 

- **Sequelize:** Decidi usar o Sequelize como ferramenta de ORM para criar/popular e buscar tabelas no banco sem precisar escrever as queries SQL manualmente

- **Express:** Utilizei o Express já que ele possui um sistema de rotas completo e torna bem rapido e simples a criação de uma API Rest

</details>

<details>
<summary><strong>Ferramentas adicionais</strong></summary>

-  **Json Web Token:** Para poder gerar um código temporario de acesso utilizei o JWT

-  **BCrypt:** Como senhas são um dado sensivel utilizei o BCrypt para criptografar as senhas antes de salva-las no banco de dados

-  **Joi:** Para poder fazer validações no formato das requisições utilizei o Joi já que ele é simples e eficiente

-  **express-async-errors:** Para tratar os erros gerados durante a execução utilizei o express-async-errors para poder criar um middleware de erro

-  **http-status-code:** Para tornar mais compreensivel o significado dos codigos de status, durante o desenvolvimento, utilizei o http-status-code

</details>

<h2 id="testes">🧪 Testes e TDD</h2>

<details>
<summary><strong>Por que TDD?</strong></summary>
Inicialmente o meu objetivo era implementar todo o código e posteriormente, escrever os testes mas quando comecei a impementar o sistema de trocas, começou ocorrer diversos <i>bugs</i> e apenas com o Insomnia e verificando o banco no Workbench, estava sendo muito contra-produtivo identificar os problemas

<br>
<br>

Nesse momento decidi começar a utilizar a metodologia TDD (Test Development Driven) para poder encontrar e corrigir os erros durante o desenvolvimento com menos dificuldade além de poder garantir que aplicação esta funcionando como o esperado
</details>

<details>

<summary><strong>96% de cobertura total com testes de integração</strong></summary>

![](https://i.ibb.co/rG0FkPr/cobertura-de-testes.png)

Devido a falta de tempo e por não saber como fazer testes unitarios com o Sequelize resolvi fazer testes de integração

Durante a execução dos testes é criado um novo banco de dados, que é utilizado exclusivamente na execução dos testes
</details>
  
<details>
<summary><strong>Ferramentas utilizadas durante os testes</strong></summary>

-  **Jest:** O jest foi escolhido como ferramenta principal para rodar os testes. decidi usar o Jest devido a sua documentação clara e por ter mais familiaridade do que com o Mocha / Chai e Sinon

-  **SuperTest:** Em conjunto com o Jest utilizei o super test, por ser uma excelente ferramenta para testar servidores HTTP    

-  **Shell js:** Por estar utilizando Sequelize para interagir com o banco de dados, durante os testes eu eventualmente precisava reiniciar o banco, para isso o Shell JS para rodar os comandos do sequelize-cli

-  **Cross-env:** Durante a configuração do Sequelize para testes surgiu a necessidade de definir uma nova variavel de ambiente, antes de executar os testes, para isso usei o Cross-env já que ele é compativel com Windows / Mac e Linux
</details>
