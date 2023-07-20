# Swaply
An API service that converts cryptocurrencies using [Binance API](https://binance-docs.github.io/apidocs/spot/en/#general-api-information), built by [divofred](https://www.linkedin.com/in/divofred/).

To start the Swaply API service, do the following:
- Create a `.env` file in the home directory and add the following:
  ```env
  PORT=8000
  API_URL=https://api3.binance.com/api/v3/ticker/price
  ```
- Run `npm install`. This will install all dependencies.
- Run `npm start`. This will start the API.

## Routes and responses
- `GET` /api/getprices. Shows the prices of different cryptocurrencies
  ### Responses
  - Status code `500` and message `API not found` when `API_Url` was not provided.
  - Status code `200` and `result` which shows the prices of different cryptocurrencies in USDT
  - Status code `500` and `error.message` which returns any error that may occur.
    
- `POST` /api/convert. Converts from a cryptocurrency to USDT
  ### Parameters
  - `from` It holds the cryptocurrency, i.e. ETH, BTH.
  - `amount` It holds the amount of the cryptocurrencies, i.e. 20, 20.111
  ### Responses
  - Status code `500` and message `API not found` when `API_Url` was not provided.
  - Status code `400` and message `Invalid amount` when the `amount` provided is not a number.
  - Status code `400` and message `Invalid request` when an invalid cryptocurrency was provided.
  - Status code `200` and `result` which shows the price of cryptocurrency in USDT
    
- `POST` /api/bonus. Converts from a cryptocurrency to a desired cryptocurrency.
  ### Parameters
  - `from` It holds the current cryptocurrency, i.e. ETH, BTH.
  - `to` It holds the desired cryptocurrency, i.e. ADA, LTC
  - `amount` It holds the amount of the cryptocurrencies, i.e. 20, 20.111
  ### Responses
  - Status code `500` and message `API not found` when `API_Url` was not provided.
  - Status code `400` and message `Invalid amount` when the `amount` provided is not a number.
  - Status code `400` and message `Invalid request` when an invalid cryptocurrency(s) was provided.
  - Status code `200` and `result` show the cryptocurrency price in the desired cryptocurrency.
