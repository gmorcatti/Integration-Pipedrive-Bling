# Integração PipeDrive e Bling
## API que realiza a integração de negócios ganhos no PipeDrive e salva eles como Pedidos no Bling. Além disso, também faz uma contabilização do valor agregado diário de negócios inseridos no Bling e salva em um banco de dados Mongo.

***

## Autor
* Gabriel Morcatti - gabriel.morcatti@yahoo.com.br

## Tecnologias Utilizadas
* NodeJs
* Express Framework
* MongoDB

## Rotas
* GET /dailyAggregate - Retorna o valor agregado diário de negócio inseridos no Bling.

## Pré-requisitos
* NodeJs instalado
* Parametrização de todo arquivo "example.env" e transforma-lo em um ".env"

### .ENV
As variáveis de ambiente deste projeto são:
* PIPEDRIVE_API_KEY - ApiKey para conexão com sua conta do PipeDrive
* PIPEDRIVE_FILTER_ONLY_NOT_INTEGRATE_WON_DEALS_ID - ID de um filtro criado no PipeDrive que retorna todos negócios ganhos, mas que não tem o campo "Bling Integrated" como "Sim".
* PIPEDRIVE_BLING_INTEGRATED_DEAL_FIELD_KEY - Key do campo (na seção Details do Negócio no PipeDrive) "Bling Integrated" no PipeDrive.
* PIPEDRIVE_URL - Url de conexão da Api do PipeDrive. Ex: "https://api.pipedrive.com/v1"
* BLING_API_KEY - ApiKey para conexão com sua conta no Bling (Deve-se criar um usuário Api para consegui-la).
* BLING_URL - Url de conexão da Api do Bling. Ex: "https://bling.com.br/Api/v2"
* MONGO_URL - Url de conexão com o MongoDB

## CheckList
- [x] Criar uma integração entre as plataformas Pipedrive e Bling:
    - [x] A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling.
- [x] Criar banco de dados Mongo.
- [x] Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.
- [x] Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## Como testar
### Configuração pré-requisitos
1. Criar um "Custom Field" na Seção "Details" de um negócio no PipeDrive. O nome sugerido é: Bling Integrated. O tipo deve ser "Single Option", com adição dos valores "Sim" e "Não".
    - A função desse campo é reconhecer se aquele negócio já foi integrado no Bling ou não.
2. Criar um Filtro na tela de visualização de negócios. O nome sugerido é "Deal is won but not Integrated on Bling" e deve atender as seguintes regras:
    - Deal - "Bling Integrated" is NOT "Sim"
    - Deal - "Status" is "Won".
3. Através da API do PipeDrive (rota: {{baseUrl}}/dealFields), buscar a "key" do campo "Bling Integrated" Criado e preenche-la no .env.
4. Através da API do PipeDrive (rota: {{baseUrl}}/filters?type=deals), buscar o id do filtro "Deal is won but not Integrated on Bling" e preenche-lo no .env.
5. Preencher todo o restante do .env com as URLS de conexão nos serviços (tanto dos softwares, quanto do Mongo) e com as ApiKeys para conexão nos mesmos.

### Instalar dependencias
* Executar comando: 
```npm install```

### Iniciar Aplicação
* Para ambiente de desenvolvimento (Nodemon) executar o comando: 
```npm run dev```
* Para rodar com Node puro:
```npm start```