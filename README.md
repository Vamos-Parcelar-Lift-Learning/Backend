# Backend

## Instalação

### Pacotes necessários

  * docker
  * git
  * node

### Subindo o banco de dados

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

Crie na raiz do projeto um arquivo .env com as seguintes configurações

DB_PORT=27017

DB_URL="mongodb://127.0.0.1:27017/vp"

SECRET=\<secret>

```bash
# Instale as dependências
$ yarn install

# Rode o serviço
$ yarn dev:server
```

## Endpoints

\<host> = deploy-vp ou "http://localhost:3333"

### Administrador (não necessitam de autenticação)
* **[GET]** \<host>/admin/users - listar todos os usuários
* **[GET]** \<host>/admin/locators - listar todos os localizadores

### Autenticação

**[POST]** \<host>/sessions/

```json
{
	"email": "elizethe6@bol.com.br",
	"password": "121041"
}
```

### Users (necessitam de autenticação)

**[PUT]** \<host>/users/ - atualizar dados de um usuário autenticado
```json
{
	"name": "Elizete II",
	"birthdate": "1980-05-14T06:02:11.010Z",
	"cpf": "16273726523"
}
```

### Locators (necessitam de autenticação)

**[GET]** \<host>/locators/\<code:string> - buscar os dados de um localizador