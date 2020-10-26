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

# Instale as dependências
$ yarn install

# Rode o serviço
$ yarn dev:server
```