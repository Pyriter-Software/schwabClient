import axios, { AxiosRequestConfig } from 'axios';
import { SchwabClient, Trader, QueryTransactionType } from '../index';
import { Interceptor } from './interceptor';

class PassthroughInterceptor extends Interceptor {}

// Exercise the public client through Axios without credentials or network access.
describe('Trader production endpoints', () => {
  let client: SchwabClient;
  let requests: AxiosRequestConfig[];
  let responseData: unknown;
  let responseHeaders: Record<string, string>;

  beforeEach(() => {
    requests = [];
    responseData = [];
    responseHeaders = {};
    const instance = axios.create({
      adapter: async (config) => {
        requests.push(config);
        return { config, data: responseData, headers: responseHeaders, status: 200, statusText: 'OK' };
      },
    });
    jest.spyOn(axios, 'create').mockReturnValue(instance);
    client = new SchwabClient({ authorizationInterceptor: new PassthroughInterceptor() });
  });

  afterEach(() => jest.restoreAllMocks());

  const accountId = 'encrypted/account';
  const accountPath = 'https://api.schwabapi.com/trader/v1/accounts/encrypted%2Faccount';
  const dates = { fromEnteredTime: '2026-10-01T00:00:00.000Z', toEnteredTime: '2026-10-31T00:00:00.000Z' };
  const order: Trader.OrderRequest = {
    session: 'NORMAL',
    duration: 'DAY',
    orderType: 'MARKET',
    orderStrategyType: 'SINGLE',
    orderLegCollection: [{ instruction: 'BUY', quantity: 1, instrument: { assetType: 'EQUITY', symbol: 'AAPL' } }],
  };

  it('exposes account number hashes', async () => {
    responseData = [{ accountNumber: '123', hashValue: 'hash' }];
    expect(await client.getAccountNumbers()).toEqual(responseData);
    expect(requests[0].url).toBe('https://api.schwabapi.com/trader/v1/accounts/accountNumbers');
  });

  it('requests positions on all accounts and retains account metadata', async () => {
    // Both account responses and account-number metadata pass through the adapter.
    const instance = axios.create();
    instance.defaults.adapter = async (config) => {
      requests.push(config);
      return {
        config,
        data: config.url?.endsWith('/accountNumbers')
          ? [{ accountNumber: '123', hashValue: 'hash' }]
          : [{ securitiesAccount: { accountNumber: '123', positions: [{ longQuantity: 1 }] } }],
        headers: {},
        status: 200,
        statusText: 'OK',
      };
    };
    const result = await client.getAllAccounts({ fields: 'positions' });
    expect(result[0]).toMatchObject({ accountNumber: '123', hashValue: 'hash', positions: [{ longQuantity: 1 }] });
    expect(requests[0].params).toEqual({ fields: 'positions' });
    expect(requests[1].params).toBeUndefined();
  });

  it('requests positions for an encrypted account', async () => {
    responseData = { securitiesAccount: { accountNumber: '123', positions: [] } };
    expect(await client.getAccountByHash(accountId, { fields: 'positions' })).toMatchObject({
      hashValue: accountId,
      positions: [],
    });
    expect(requests[0]).toMatchObject({ method: 'get', url: accountPath, params: { fields: 'positions' } });
  });

  it('queries account orders without putting the account hash in the query', async () => {
    const config = Object.freeze({ accountId, ...dates, maxResults: 10, status: 'AWAITING_STOP_CONDITION' as const });
    await client.getOrdersForAccount(config);
    expect(requests[0]).toMatchObject({
      method: 'get',
      url: `${accountPath}/orders`,
      params: { ...dates, maxResults: 10, status: config.status },
    });
    expect(requests[0].params.accountId).toBeUndefined();
  });

  it('queries orders across all accounts', async () => {
    await client.getOrdersByQuery(dates);
    expect(requests[0]).toMatchObject({
      method: 'get',
      url: 'https://api.schwabapi.com/trader/v1/orders',
      params: dates,
    });
  });

  it('places an order and reads the Location header', async () => {
    responseHeaders = { location: `${accountPath}/orders/123` };
    expect(await client.placeOrder({ accountId, order })).toEqual({ orderId: '123' });
    expect(requests[0]).toMatchObject({ method: 'post', url: `${accountPath}/orders` });
    expect(JSON.parse(requests[0].data)).toEqual(order);
  });

  it('retrieves a specific order', async () => {
    responseData = { orderId: 123, status: 'NEW', accountNumber: 123 };
    expect(await client.getOrder({ accountId, orderId: '123' })).toEqual(responseData);
    expect(requests[0]).toMatchObject({ method: 'get', url: `${accountPath}/orders/123` });
  });

  it('cancels a specific order', async () => {
    await client.cancelOrder({ accountId, orderId: '123' });
    expect(requests[0]).toMatchObject({ method: 'delete', url: `${accountPath}/orders/123` });
  });

  it('replaces an order without mutating its input', async () => {
    const replacement = Object.freeze({ ...order, orderType: 'LIMIT' as const, price: 10.123 });
    responseHeaders = { location: `${accountPath}/orders/456` };
    expect(await client.replaceOrder({ accountId, orderId: '123', order: replacement })).toEqual({ orderId: '456' });
    expect(requests[0]).toMatchObject({ method: 'put', url: `${accountPath}/orders/123` });
    expect(JSON.parse(requests[0].data).price).toBe(10.123);
    expect(replacement.price).toBe(10.123);
  });

  it('previews using the documented PreviewOrder request and response', async () => {
    const preview: Trader.PreviewOrder = {
      orderStrategy: {
        orderType: 'MARKET',
        orderLegs: [{ finalSymbol: 'AAPL', quantity: 1, instruction: 'BUY', assetType: 'EQUITY' }],
      },
    };
    responseData = { ...preview, orderValidationResult: { accepts: [{ message: 'Accepted' }] } };
    expect(await client.previewOrder({ accountId, order: preview })).toEqual(responseData);
    expect(requests[0]).toMatchObject({ method: 'post', url: `${accountPath}/previewOrder` });
    expect(JSON.parse(requests[0].data)).toEqual(preview);
  });

  it('queries transactions without mutating the config and encodes symbols once', async () => {
    const config = Object.freeze({
      accountId,
      startDate: dates.fromEnteredTime,
      endDate: dates.toEnteredTime,
      types: QueryTransactionType.TRADE,
      symbol: '/ES',
    });
    responseData = [{ activityId: 12, time: dates.fromEnteredTime }];
    expect(await client.getTransactionsByQuery(config)).toEqual(responseData);
    expect(requests[0].url).toBe(`${accountPath}/transactions`);
    expect(requests[0].params.accountId).toBeUndefined();
    expect(requests[0].paramsSerializer!(requests[0].params)).toContain('symbol=%2FES');
    expect(config.accountId).toBe(accountId);
  });

  it('retrieves a transaction by ID without requiring or sending query dates', async () => {
    responseData = [{ activityId: 12 }];
    expect(await client.getTransaction({ accountId, transactionId: 12 })).toEqual(responseData);
    expect(requests[0]).toMatchObject({ method: 'get', url: `${accountPath}/transactions/12` });
    expect(requests[0].params).toBeUndefined();
  });

  it('keeps the legacy getTransactions entry point for queries and IDs', async () => {
    await client.getTransactions({ accountId, transactionId: '12' });
    expect(requests[0].url).toBe(`${accountPath}/transactions/12`);
    await client.getTransactions({
      accountId,
      startDate: dates.fromEnteredTime,
      endDate: dates.toEnteredTime,
      types: QueryTransactionType.TRADE,
      symbol: 'AAPL',
    });
    expect(requests[1].params.symbol).toBe('AAPL');
    await expect(client.getTransactions({ accountId })).rejects.toThrow('startDate, endDate and types are required');
  });

  it('retrieves user preferences and streaming connection metadata', async () => {
    responseData = [{ accounts: [], streamerInfo: [{ streamerSocketUrl: 'wss://example.test' }], offers: [] }];
    expect(await client.getUserPreference()).toEqual(responseData);
    expect(requests[0]).toMatchObject({ method: 'get', url: 'https://api.schwabapi.com/trader/v1/userPreference' });
  });
});
