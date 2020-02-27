# [DLX] Smart Contracts

Foobar is a Python library for dealing with word pluralization.

## Instalação

Use [yarn](https://yarnpkg.com/) para instalar as dependencias.

```bash
yarn
```

## Uso

Para executar os testes, o comando `yarn test`deve ser usado. Assim como para lint e cobertura de testes, deve ser `yarn lint` e `yarn coverage` respetivamente.

Para usar localmente para desenvolvimento, é recomendado que use os scripts definidos.
Com eles vai iniciar um simulação de um nó, através do ganache, com 10 contas disponiveis. O ganache vai criar um diretorio `db_ganache` onde guarda o estado da rede e assim só será necessário fazer deploy dos contratos a primeira vez. Para reiniciar a rede, é necessário parar o ganache e remover o diretorio.

`yarn start:ganache:development` para iniciar o ganache e noutra linha de comandos `yarn deploy:ganache:development`.

## Contribuir
Pull requests são bem vindos. Para alterações grandes, por favor abre um issue para discutir essa mesma alteraçãp.

Por favor, verifica que os testes funciona como desejado.

## License
[GPL-3](LICENSE)
