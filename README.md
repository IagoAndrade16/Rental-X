# Rental-X
API developed in NodeJS and TypeScriptr using eslint and Prettier for code standardization, using SOLID principles and documented with Swagger

# Análise de requisitos

## Cadastro de carros

**RF**

deve ser possivel cadastrar um novo carro

**RN**

 Não deve - ser possível cadastrar um carro com uma placa já existente.

 O carro / deve ser cadastrado, por padrão, com disponibilidade.

 *O usuário responsável pelo cadastro deve ser um usuário administrador.


## Listagem de carros
 **RF**

 Deve ser - possível listar todos os carros disponíveis

 Deve ser possível listar todos os carros disponíveis pelo nome da categoria

 Deve ser possível listar todos os carros disponíveis pelo nome da marca

 Deve ser possível listar todos os darros disponíveis pelo nome do carro

 **RN**

 O usuário não precisar estar logado no sistema.


## Cadastro de Especificação no carro
 
 **RF**
 
 Deve ser possível cadastrar uma especificação para um carro

 Deve ser possível listar todas as especificações
 
 Deve ser possível listar todos os carros
 
 **RN**
 
 Não deve ser possível cadastrar uma especificação para um carro


## Cadastro de imagens do carro
 
 **RF**
 
 Deve ser possível cadastrar a imagem do carro
 
 Deve ser possível listar todos os carros
 
 **RNF**
 
 Utilizar o multer para upload dos arquivos
 
 **RN**
 
 O usuário deve poder cadastrar mais de uma imagem para 0 mesmo carro
 
 O usuário responsável pelo cadastro deve ser um usuário administrador.
 

## - Alugel de carro
 
 **RF**
 
 Deve ser possível cadastrar um aluguel

**RNF**

 **RN**
 
 O aluguel deve ter duração mínima de 24 horas.
 
 nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
 
 nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro