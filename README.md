# Golden Raspberry Awards - API
### Texo IT - Avaliação Técnica para Desenvolvedor Node.js

----
## Instalação

- Clonar este repo:

```
$ git clone https://github.com/jbsathler/gra-api.git /caminho/para/gra-api
```

- Instalar dependências específicas do projeto:

```
$ cd /caminho/para/gra-api
$ npm install
```

- Iniciar o servidor:

```
$ npm start
```

### Outros scripts pré-configurados:

- Iniciar servidor de desenvolvimento (com hot-reload ativado):

```
$ npm run watch
```

- Executar testes de integração (Jest + Supertest):

```
$ npm test
```

----
## Instruções de execução dos testes automatizados

- Iniciar o servidor:

```
$ npm start
```

- Com o servidor em execução, executar o script dos testes de integração:

```
$ npm test
```

----
## Acesso à API

A API possui uma única rota relacionada ao teste: ```/awards```, e um único verbo interage com a mesma: ```GET```.

A URI padrão é: ```http://localhost:3003/``` e pode-se acessar a API através de um *REST Client* (como o **[Postman](https://www.getpostman.com/)**, por exemplo).

Também é possível acessá-la pelo terminal (com o **cURL**, por exemplo, como demonstrado na linha a seguir):
```$ curl -X GET http://localhost:3003/awards```

----
## Desenvolvido por

- Jaderson Barreto Sathler
- E-mail: [jbsathler@gmail.com](mailto:jbsathler@gmail.com)