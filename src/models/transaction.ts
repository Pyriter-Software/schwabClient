import * as Trader from './trader';

export interface GetTransactionsConfig {
  accountId: string;
  transactionId?: string | number;
  symbol?: string;
  startDate?: string;
  endDate?: string;
  types?: QueryTransactionType | Trader.TransactionType;
}

export enum QueryTransactionType {
  TRADE = 'TRADE',
  RECEIVE_AND_DELIVER = 'RECEIVE_AND_DELIVER',
  DIVIDEND_OR_INTEREST = 'DIVIDEND_OR_INTEREST',
  ACH_RECEIPT = 'ACH_RECEIPT',
  ACH_DISBURSEMENT = 'ACH_DISBURSEMENT',
  CASH_RECEIPT = 'CASH_RECEIPT',
  CASH_DISBURSEMENT = 'CASH_DISBURSEMENT',
  ELECTRONIC_FUND = 'ELECTRONIC_FUND',
  WIRE_OUT = 'WIRE_OUT',
  WIRE_IN = 'WIRE_IN',
  JOURNAL = 'JOURNAL',
  MEMORANDUM = 'MEMORANDUM',
  MARGIN_CALL = 'MARGIN_CALL',
  MONEY_MARKET = 'MONEY_MARKET',
  SMA_ADJUSTMENT = 'SMA_ADJUSTMENT',
}

export interface GetTransactionsByQueryConfig {
  accountId: string;
  types: QueryTransactionType | Trader.TransactionType;
  symbol?: string;
  startDate: string;
  endDate: string;
}

export enum TransactionType {
  TRADE = 'TRADE',
  RECEIVE_AND_DELIVER = 'RECEIVE_AND_DELIVER',
  DIVIDEND_OR_INTEREST = 'DIVIDEND_OR_INTEREST',
  ACH_RECEIPT = 'ACH_RECEIPT',
  ACH_DISBURSEMENT = 'ACH_DISBURSEMENT',
  CASH_RECEIPT = 'CASH_RECEIPT',
  CASH_DISBURSEMENT = 'CASH_DISBURSEMENT',
  ELECTRONIC_FUND = 'ELECTRONIC_FUND',
  WIRE_OUT = 'WIRE_OUT',
  WIRE_IN = 'WIRE_IN',
  JOURNAL = 'JOURNAL',
  MEMORANDUM = 'MEMORANDUM',
  MARGIN_CALL = 'MARGIN_CALL',
  MONEY_MARKET = 'MONEY_MARKET',
  SMA_ADJUSTMENT = 'SMA_ADJUSTMENT',
}

export enum AchStatusType {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancel = 'Cancel',
  Error = 'Error',
}

/** Current Schwab transaction schema, with optional legacy aliases. */
export interface Transaction extends Trader.Transaction {
  /** @deprecated Schwab identifies transactions with activityId. */
  transactionId?: string;
  /** @deprecated Use time. */
  transactionDate?: string;
}

export type TransferItem = Trader.TransferItem;

export interface GetTransactionConfig {
  accountId: string;
  transactionId: string | number;
}

export interface OptionTransactionInstrument {
  assetType: string;
  status: string;
  symbol: string;
  description: string;
  instrumentId: string;
  closingPrice: string;
  expirationDate: string;
  optionPremiumMultiplier: number;
  putCall: string;
  strikePrice: number;
  type: string;
  underlyingSymbol: string;
}
