# Charles Schwab Client for Nodejs

[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/Pyriter)

## Overview

A Javascript client for the Charles Schwab Restful API written in Typescript for NodeJs.

## Features

1. Auto fetch refresh token when access token expires.
2. Credentials can be fetched and stored using these providers
    1. Local cache
    2. Local file
    3. Customizable (e.g. connect to datastore such as S3 or DynamoDB)
3. Get user account information
4. Get user preferences and streaming connection metadata
5. Get option chain
6. Get quote
7. Manage orders
8. Get transactions
9. Get market hours
10. Get price history
11. Place, replace, cancel, and preview orders

## Install

```bash
$ npm install @pyriter/schwab-client
```

## Getting an Access Token

To gain access to the Schwab (TDA) APIs, you will need to get an access token from your trading account.

## How to use it

### Instantiate the SchwabClient object

At the bare minimum, you will need to provide an access token and client id and client secret in order to instantiate the schwabClient.

### Accounts and Trading API

The client supports every action in the [Schwab Accounts and Trading Production specification](https://developer.schwab.com/products/trader-api--individual/details/specifications/Retail%20Trader%20API%20Production).
All paths below are relative to `https://api.schwabapi.com/trader/v1`.

| Method | Endpoint | Client method |
| --- | --- | --- |
| GET | `/accounts/accountNumbers` | `getAccountNumbers()` |
| GET | `/accounts` | `getAllAccounts({ fields: 'positions' })` |
| GET | `/accounts/{accountNumber}` | `getAccountByHash(hash, { fields: 'positions' })` |
| GET | `/accounts/{accountNumber}/orders` | `getOrdersForAccount(config)` |
| POST | `/accounts/{accountNumber}/orders` | `placeOrder(config)` |
| GET | `/accounts/{accountNumber}/orders/{orderId}` | `getOrder(config)` |
| DELETE | `/accounts/{accountNumber}/orders/{orderId}` | `cancelOrder(config)` |
| PUT | `/accounts/{accountNumber}/orders/{orderId}` | `replaceOrder(config)` |
| GET | `/orders` | `getOrdersByQuery(config)` |
| POST | `/accounts/{accountNumber}/previewOrder` | `previewOrder(config)` |
| GET | `/accounts/{accountNumber}/transactions` | `getTransactionsByQuery(config)` |
| GET | `/accounts/{accountNumber}/transactions/{transactionId}` | `getTransaction(config)` |
| GET | `/userPreference` | `getUserPreference()` |

`accountId` in request configs is the **encrypted hash**, obtained from `getAccountNumbers()`,
rather than a plain account number. `getAccountByNumber(number, config?)` resolves that hash for you.
Account methods return the unwrapped securities account with `accountId` and `hashValue` metadata.
The optional `fields: 'positions'` flag works for all account retrieval methods.

Order queries require `fromEnteredTime` and `toEnteredTime` as ISO-8601 timestamps and accept
`maxResults` and `status`. Account order queries support a maximum date range of one year;
for queries across accounts, the documented start date must be within the last 60 days.
Transaction queries require `startDate`, `endDate`, and `types`, accept an optional raw `symbol`,
and support a maximum date range of one year with at most 3000 results. Symbols are URL encoded
by the client; do not pre-encode them. These methods do not automatically paginate.

```ts
import { SchwabClient, Trader } from '@pyriter/schwab-client';

// Use your configured SchwabClient instance.
async function readTradingData(client: SchwabClient, accountId: string) {
  const orders = await client.getOrdersForAccount({
    accountId,
    fromEnteredTime: '2026-10-01T00:00:00.000Z',
    toEnteredTime: '2026-10-31T23:59:59.000Z',
    status: 'WORKING',
  });
  const transactions = await client.getTransactionsByQuery({
    accountId,
    startDate: '2026-10-01T00:00:00.000Z',
    endDate: '2026-10-31T23:59:59.000Z',
    types: 'TRADE',
    symbol: 'AAPL',
  });
  return { orders, transactions };
}

async function preview(client: SchwabClient, accountId: string) {
  // The portal specifies PreviewOrder for previews, distinct from OrderRequest.
  const order: Trader.PreviewOrder = {
    orderStrategy: {
      session: 'NORMAL',
      duration: 'DAY',
      orderType: 'MARKET',
      orderStrategyType: 'SINGLE',
      orderLegs: [{ finalSymbol: 'AAPL', assetType: 'EQUITY', instruction: 'BUY', quantity: 1 }],
    },
  };
  return client.previewOrder({ accountId, order });
}
```

All 84 documented schemas are exported under `Trader`, including `Trader.OrderRequest`,
`Trader.PreviewOrder`, `Trader.Position`, `Trader.Transaction`, and `Trader.UserPreference`.
Place and replace configs accept `Trader.OrderRequest`; their responses contain the new order ID
from the `Location` header. Order query responses use `OrderResponse` (`Trader.Order`).
Order prices are sent exactly as supplied, without automatic rounding to five-cent increments.

Transaction responses use Schwab's `activityId`, `time`, and transfer-item schema. Both transaction
endpoints and user preferences return arrays as documented by the portal. `getTransactions(config)`
remains available: supplying `transactionId` selects the detail endpoint without requiring dates;
otherwise it requires the same fields as `getTransactionsByQuery`. Request configs are not mutated.

To run the endpoint contract tests without credentials or network access:

```bash
npx jest src/connection/traderEndpoints.test.ts --runInBand --coverage=false
```

### Development setup for running tests

1. Create a credentials.json file at the package root level with the following information:
```json
{
  "client_id": "",
  "client_secret": "",
  "redirect_uri": "http://localhost/"
}
```
2. Run the script to generate the login url
```bash
node ./generateAuthUrl.js
```
3. Open the url provided from the output of step #2 in a browser and login to Schwab.
4. After logging in and agreeing to the terms. You will then get to a redirect to `localhost` with the code as part of the query params. Copy this url link in its entirety.
5. Within the terminal run the script to generate the auth token
```bash
node ./extractAuthCode.js [paste-your-url-from-step-4-here]
```
6. Run the tests
```bash
npm tests
```
### Publishing to npm

This command will update the package version and then publish to the public npm repo

```bash
$ npm version [patch | minor major]
$ npm publish
```

## Appendix


## License

Schwab Client is [MIT licensed](./LICENSE).
