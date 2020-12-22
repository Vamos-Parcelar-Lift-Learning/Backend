<h1 align="center">
  BACKEND
</h1>

<p align="justify">
  O projeto em conjunto com o Lift Learning e a <a href="https://vamosparcelar.com.br/blog/vamos-parcelar-e-escolhida-para-o-lift-learning/)">Vamos Parcelar</a> tem como objetivo um estudo sobre a inclusão de uma nova forma de pagamento aos sistemas da Vamos Parcelar, sendo ele o PIX e todos os passos de seu processamento.

  Repositório da aplicação <b>backend</b> com a finalidade de servir de interface entre os serviços externos e o <b>frontend</b>. Além de gerenciar as transações, localizadores e o processo de autenticação.</p>

<p>Este repositório contempla as seguintes funcinalidades:</p>

- Realizar consultas do localizadores e suas respectivas contas;
- Requisitar log in paara o usuário;
- Requisitar a criação de uma transação;
- Realizar consultas das transações de um usuário;
- Realizar verificação de existência da chave pix;
- Requisitar edição dos dados de perfil de um usuário;

## Status do Projeto:

**Em desenvolvimento**

## Acesso ao Deploy do Projeto:

<p align="justify">
É possivel acessar a partir do seguinte link:
  <p align="center">
    <a href="https://vp-backend.herokuapp.com" target="_blank">
    <img alt="Demo on Heroku" src="./docs/demo_on_heroku.png"></a>
  </p>
</p>

## Pré requisitos para rodar a aplicação e os comandos para instalação.

### Pacotes necessários

  * git
  * node
    - A partir da versão 12.

### Subindo o banco de dados

Para rodar o projeto se faz necessário possuir uma instância de MongoDB, e utilizar a **url** do mesmo no arquivo **.env**.

* Utilizando o docker, podemos subir a instância de forma limpa e rápida através do seguinte comando:

```bash
$ docker run --name mongo -p 27017:27017 -d mongo
```

### Subindo o serviço
```bash
# Clone o repositório
$ git clone https://github.com/Vamos-Parcelar-Lift-Learning/Backend

# Vá para o diretório do projeto
$ cd Backend
```

#### Variáveis de Ambiente

Crie um arquivo **.env** na raiz do projeto utilizando como exemplo o arquivo **.env.example**.

#### Instalação de dependências

```bash
# Instale as dependências
$ yarn install
```

## Rodando o serviço

Após instalação da dependências, basta rodar o seguinte comando:

```bash
# Rode o serviço
$ yarn dev:server
```

## Endpoints

\<host> = deploy-vp ou "http://localhost:3333"

### Administrador (não necessitam de autenticação)
* **[GET]** \<host>/admin/users - listar todos os usuários.
* **[GET]** \<host>/admin/locators - listar todos os localizadores.

### Autenticação

**[POST]** \<host>/sessions/ - autentica um usuário.

```json
{
	"email": "elizethe6@bol.com.br",
	"password": "121041"
}
```

### Users (necessitam de autenticação)

**[PUT]** \<host>/users/ - atualizar dados de um usuário autenticado.
```json
{
	"name": "Elizete II",
	"birthdate": "1980-05-14T06:02:11.010Z",
	"cpf": "16273726523"
}
```

### Locators (necessitam de autenticação)

**[GET]** \<host>/locators/\<code:string> - buscar os dados de um localizador.

### Transactions (necessitam de autenticação)

**[GET]** \<host>/transactions - busca as transações de um usuário logado.

**[GET]** \<host>/transactions/\<code:string> - busca os dados de uma transação de um usuário logado.

**[POST]** \<host>/transactions - Cria uma transação de um usuário logado.

```json
{
	"key": "hans65@hotmail.com",
	"cashback": 0,
	"transaction": {
		"nickname": "minhas contas",
		"bills": [
        {
          "code": "597364863907",
          "name": "Celular",
          "description": "Conta de Celular",
          "issuer": "Costa - Reis",
          "expiration_date": "2020-11-17T09:53:39.469Z",
          "amount": 174
        }
		]
	}
}
```

## Como rodar os testes

Basta rodar o seguinte comando na raiz do projeto:

```bash
# Abra os testes da aplicação
$ yarn tests
```

As informações podem ser visualizadas no **terminal** ou de forma mais clara em um html de cobertura gerado de forma automática presente no seguinte diretório:
```
./coverage/lcov-report/index.html
```


## Licença do Repositório
