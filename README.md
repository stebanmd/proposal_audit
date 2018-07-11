# Sistema de Propostas
O objetivo do projeto é desenvolver um sistema que informatiza o processo de aprovação das propostas de fornecedores.

# Banco de Dados
 - Este projeto foi criado e testado utilizando o SQL Server Express 2017
 - Os scripts criação encontram-se em: /Banco de Dados/script_db.sql
 - Execute os scripts

# Propostas API
 - Abra a solução Propostas.API/Propostas.sln no Visual Studio 2017 (para criação foi utilizado a versão Community)
 - Ajuste a string de conexão com o Banco de Dados no arquivo Web.Config de acordo com a instância criada
 - Restaure os pacotes do Nuget
 - Defina o projeto Propostas.API para inicialização
 - Execute
 
# Configuração Client

 - Instalar nodejs: https://nodejs.org/en/
 - Instalat o Bower:  npm install -g bower
 - Instalar gulp global: npm install -g gulp-cli
 - Instalar angular-cli: npm install -g @angular/cli

# Propostas Proposta.Site (AngularJS)
  - Caso a API não abra no endereço: "http://localhost:58259" deverá ser configurado o caminho padrão no arquivo: "...\Propostas.Site\Frontend\config\appConfig.provider.js"
  - Abrir o Prompt como administrador e navegar até o diretório "Propostas.Site"
  - Executar os comandos em sequencia: "npm install", "bower install" e "gulp"
  
Após utilizar a primeira vez, para rodar novamente o build, utilize o comando "gulp".
Obs: A primeira instalação é demorada. Caso ocorra algum problema na instalação, pare a execução e rode novamente o "gulp"

# Propostas Proposta-a5 (Angular 5)
 - Caso a API não abra no endereço: "http://localhost:58259" deverá ser configurado o caminho padrão no arquivo: "...\Propostas-a5\src\environments\environment.ts"
 - Abrir o Prompt como administrador e navegar até o diretório "Propostas-a5"
 - Executar os comandos em sequencia: "npm install", e "ng serve --open"

Algumas das configurações de negócio e de ambiente (p.e. "Prazo padrão para expiração de propostas", "diretório dos arquivos", ...) podem ser encontradas no arquivo Settings.config dentro da solução server-side.

#Acesso

Para acessar o sistema, utilize os dados:
  CPF: 000.000.000-00
Senha: admin

# Possíveis problemas #

O Windows não adicionar o npm a variável PATH na hora da instalação do NodeJs.
   - Instalar novamente, reiniciar a maquina, verificar a variável de ambiente, caso não contenha o caminho do npm, adicionar manualmente.
   
Versão client do angularJS não encontrar certa dependência dentro do gulp file.
   - Executar novamente o comando "gulp"

