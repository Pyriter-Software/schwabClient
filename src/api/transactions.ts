import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { ACCOUNTS } from '../connection/routes.config';
import {
  GetTransactionConfig,
  GetTransactionsByQueryConfig,
  GetTransactionsConfig,
  Transaction,
} from '../models/transaction';
import { Client } from '../connection/client';

interface TransactionUrl {
  accountId: string;
  transactionId?: string | number;
}

export class TransactionsApi {
  constructor(private client: Client) {}

  async getTransactions(config: GetTransactionsConfig): Promise<Transaction[]> {
    if (config.transactionId !== undefined) {
      return this.getTransaction({ accountId: config.accountId, transactionId: config.transactionId });
    }
    if (!config.startDate || !config.endDate || !config.types) {
      throw new Error('startDate, endDate and types are required for transaction queries');
    }
    return this.getTransactionsByQuery({
      accountId: config.accountId,
      startDate: config.startDate,
      endDate: config.endDate,
      types: config.types,
      symbol: config.symbol,
    });
  }

  async getTransaction(config: GetTransactionConfig): Promise<Transaction[]> {
    const response = await this.client.get({
      url: this.generateTransactionsUrl(config),
      responseType: ResponseType.JSON,
    } as Request);
    return response.data;
  }

  async getTransactionsByQuery(config: GetTransactionsByQueryConfig): Promise<Transaction[]> {
    const { accountId, ...params } = config;
    const response = await this.client.get({
      url: this.generateTransactionsUrl({ accountId }),
      params,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data;
  }

  generateTransactionsUrl(config: TransactionUrl) {
    const { accountId, transactionId } = config;
    const transactionIdUrlString = transactionId !== undefined ? '/' + encodeURIComponent(String(transactionId)) : '';
    return `${ACCOUNTS}/${encodeURIComponent(accountId)}/transactions${transactionIdUrlString}`;
  }
}
