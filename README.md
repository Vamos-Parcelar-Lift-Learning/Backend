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