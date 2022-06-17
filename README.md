# Cadastro de Carro

## Requisitos Funcionais
- Deve ser possível cadastrar um novo carro.
- *Deve ser possível listar todas as categorias.*

## Regra de Negócio
- Não deve ser possível cadastrar um carro com uma placa já existente.
- *Não deve ser possível alterar a placa de um carro para uma placa cadastrada para outro veículo. *
- Um carro deve ser cadastrado como disponível por padrão.
- **Apenas usuários administradores podem cadastrar carros**

# Listagem de Carros

## Requisitos Funcionais
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca do carro.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

## Regra de Negócio
- O usuário não precisa estar logado no sistema

# Cadastro de Especificações de Carros

## Requisitos Funcionais
- Deve ser possível cadastrar uma especificação para carros
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

## Regra de Negócio
- Não deve ser possível cadastrar uma especificação para um carro inexistente.
- Não deve ser possível cadastrar a mesma especificação para o mesmo carro mais de uma vez.
- Apenas usuários administradores podem cadastrar carros

# Cadastro de Imagens de Carros

## Requisito Funcionais
- Deve ser possível cadastrar uma imagem do carro.
- Deve ser possível listar todos os carros.

## Requisito Não Funcional
- Utilizar o multer para upload dos arquivos de imagens.

## Regra de Negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Apenas usuários administradores podem cadastrar carros

# Aluguel de Carro

## Requisito Funcional
- Deve ser possível cadastrar um aluguel.

## Regra de Negócio
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel em aberto para o usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel em aberto para o carro.