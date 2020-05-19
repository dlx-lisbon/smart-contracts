<div align="center">
    <img style="max-width: 768px; width: 100%" src="logo.webp">
</div>

<div align="center">
    <div>
        <a
            href="https://travis-ci.org/dlx-lisbon/smart-contracts"><img
                src="https://travis-ci.org/dlx-lisbon/smart-contracts.svg?branch=master" /></a>&emsp;
        <a
            href='https://coveralls.io/github/dlx-lisbon/smart-contracts?branch=master'><img
                src='https://coveralls.io/repos/github/dlx-lisbon/smart-contracts/badge.svg?branch=master' alt='Coverage Status' /></a>&emsp;
        <a
            href="https://dependabot.com"><img
                src="https://api.dependabot.com/badges/status?host=github&repo=dlx-lisbon/smart-contracts" /></a>&emsp;
    </div>
</div>


Este repositório contém o código para os smart-contracts.

## Contribuir
Lê as instruções de [contribuição](CONTRIBUTING.md).

## Desenvolvimento

Para executar os testes, o comando `yarn test`deve ser usado. Assim como para lint e cobertura de testes, deve ser `yarn lint` e `yarn coverage` respetivamente.

Para usar localmente para desenvolvimento, é recomendado que use os scripts definidos.
Com eles vai iniciar um simulação de um nó, através do ganache, com 10 contas disponiveis. O ganache vai criar um diretorio `db_ganache` onde guarda o estado da rede e assim só será necessário fazer deploy dos contratos a primeira vez. Para reiniciar a rede, é necessário parar o ganache e remover o diretorio.

`yarn start:ganache:development` para iniciar o ganache e noutra linha de comandos `yarn deploy:ganache:development`.


## Licença
[GNU General Public License v3](LICENSE)
