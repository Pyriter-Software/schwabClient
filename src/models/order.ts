import * as Trader from './trader';

export interface GetOrderConfig {
  accountId: string;
  orderId: string;
}

export interface PlaceOrderResponse {
  orderId: string;
}

export interface OrdersConfig {
  accountId: string;
  order: Order | Trader.OrderRequest;
}

export interface CancelOrderConfig {
  accountId: string;
  orderId: string;
}

export interface ReplaceOrdersConfig {
  accountId: string;
  orderId: string;
  order: Order | Trader.OrderRequest;
}

export interface CancelTime {
  date: string;
  shortFormat: boolean;
}

export enum RequestedDestination {
  INET = 'INET',
  ECN_ARCA = 'ECN_ARCA',
  CBOE = 'CBOE',
  AMEX = 'AMEX',
  PHLX = 'PHLX',
  ISE = 'ISE',
  BOX = 'BOX',
  NYSE = 'NYSE',
  NASDAQ = 'NASDAQ',
  BATS = 'BATS',
  C2 = 'C2',
  AUTO = 'AUTO',
}

export enum StopPriceLinkBasis {
  MANUAL = 'MANUAL',
  BASE = 'BASE',
  TRIGGER = 'TRIGGER',
  LAST = 'LAST',
  BID = 'BID',
  ASK = 'ASK',
  ASK_BID = 'ASK_BID',
  MARK = 'MARK',
  AVERAGE = 'AVERAGE',
}

export enum StopPriceLinkType {
  VALUE = 'VALUE',
  PERCENT = 'PERCENT',
  TICK = 'TICK',
}

export enum StopType {
  STANDARD = 'STANDARD',
  BID = 'BID',
  ASK = 'ASK',
  LAST = 'LAST',
  MARK = 'MARK',
}

export enum PriceLinkBasis {
  MANUAL = 'MANUAL',
  BASE = 'BASE',
  TRIGGER = 'TRIGGER',
  LAST = 'LAST',
  BID = 'BID',
  ASK = 'ASK',
  ASK_BID = 'ASK_BID',
  MARK = 'MARK',
  AVERAGE = 'AVERAGE',
}

export interface Order {
  session: SessionType;
  duration: DurationType;
  orderType: OrderType;
  cancelTime?: CancelTime | string;
  complexOrderStrategyType: ComplexOrderStrategyType;
  quantity?: number;
  filledQuantity?: number;
  remainingQuantity?: number;
  requestedDestination?: RequestedDestination;
  destinationLinkName?: string;
  releaseTime?: string;
  stopPrice?: number;
  stopPriceLinkBasis?: StopPriceLinkBasis;
  stopPriceLinkType?: StopPriceLinkType;
  stopPriceOffset?: number;
  stopType?: StopType;
  priceLinkBasis?: PriceLinkBasis;
  priceLinkType?: PriceLinkType;
  price: number;
  taxLotMethod?: TaxLotMethod;
  orderLegCollection: OrderLeg[];
  activationPrice: number;
  specialInstruction: SpecialInstruction;
  orderStrategyType: OrderStrategyType;
  orderId: number;
  cancelable: boolean;
  editable: boolean;
  status: StatusType;
  enteredTime: string;
  closeTime: string;
  accountId: number;
  accountNumber?: number;
  tag?: string;
  orderActivityCollection: Execution[];
  replacingOrderCollection: object[];
  childOrderStrategies: object[];
  statusDescription: string;
}

export declare type SpecialInstruction = 'ALL_OR_NONE' | 'DO_NOT_REDUCE' | 'ALL_OR_NONE_DO_NOT_REDUCE';

export enum TaxLotMethod {
  FIFO = 'FIFO',
  LIFO = 'LIFO',
  HIGH_COST = 'HIGH_COST',
  LOW_COST = 'LOW_COST',
  AVERAGE_COST = 'AVERAGE_COST',
  SPECIFIC_LOT = 'SPECIFIC_LOT',
  LOSS_HARVESTER = 'LOSS_HARVESTER',
}

export enum PriceLinkType {
  VALUE = 'VALUE',
  PERCENT = 'PERCENT',
  TICK = 'TICK',
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  STOP = 'STOP',
  STOP_LIMIT = 'STOP_LIMIT',
  TRAILING_STOP = 'TRAILING_STOP',
  MARKET_ON_CLOSE = 'MARKET_ON_CLOSE',
  EXERCISE = 'EXERCISE',
  TRAILING_STOP_LIMIT = 'TRAILING_STOP_LIMIT',
  NET_DEBIT = 'NET_DEBIT',
  NET_CREDIT = 'NET_CREDIT',
  NET_ZERO = 'NET_ZERO',
  CABINET = 'CABINET',
  NON_MARKETABLE = 'NON_MARKETABLE',
  LIMIT_ON_CLOSE = 'LIMIT_ON_CLOSE',
  UNKNOWN = 'UNKNOWN',
}

export enum SessionType {
  NORMAL = 'NORMAL',
  AM = 'AM',
  PM = 'PM',
  SEAMLESS = 'SEAMLESS',
}

export enum DurationType {
  DAY = 'DAY',
  GOOD_TILL_CANCEL = 'GOOD_TILL_CANCEL',
  FILL_OR_KILL = 'FILL_OR_KILL',
  IMMEDIATE_OR_CANCEL = 'IMMEDIATE_OR_CANCEL',
  END_OF_WEEK = 'END_OF_WEEK',
  END_OF_MONTH = 'END_OF_MONTH',
  NEXT_END_OF_MONTH = 'NEXT_END_OF_MONTH',
  UNKNOWN = 'UNKNOWN',
}

export enum OrderStrategyType {
  SINGLE = 'SINGLE',
  OCO = 'OCO',
  TRIGGER = 'TRIGGER',
  CANCEL = 'CANCEL',
  RECALL = 'RECALL',
  PAIR = 'PAIR',
  FLATTEN = 'FLATTEN',
  TWO_DAY_SWAP = 'TWO_DAY_SWAP',
  BLAST_ALL = 'BLAST_ALL',
}

export enum OrderLegType {
  EQUITY = 'EQUITY',
  OPTION = 'OPTION',
  INDEX = 'INDEX',
  MUTUAL_FUND = 'MUTUAL_FUND',
  CASH_EQUIVALENT = 'CASH_EQUIVALENT',
  FIXED_INCOME = 'FIXED_INCOME',
  CURRENCY = 'CURRENCY',
}

export interface OrderLeg {
  orderLegType: OrderLegType;
  legId?: number;
  instruction: InstructionType;
  quantity: number;
  positionEffect: PositionEffect;
  quantityType?: QuantityType;
  instrument: Instrument | OptionInstrument; // TODO
}

export enum AssetType {
  EQUITY = 'EQUITY',
  OPTION = 'OPTION',
  INDEX = 'INDEX',
  MUTUAL_FUND = 'MUTUAL_FUND',
  CASH_EQUIVALENT = 'CASH_EQUIVALENT',
  FIXED_INCOME = 'FIXED_INCOME',
  CURRENCY = 'CURRENCY',
  FUTURE = 'FUTURE',
  FOREX = 'FOREX',
  PRODUCT = 'PRODUCT',
  COLLECTIVE_INVESTMENT = 'COLLECTIVE_INVESTMENT',
}

export enum OptionInstrumentType {
  VANILLA = 'VANILLA',
  BINARY = 'BINARY',
  BARRIER = 'BARRIER',
}

export enum PutCall {
  PUT = 'PUT',
  CALL = 'CALL',
}

export interface OptionInstrument {
  assetType: AssetType;
  cusip?: string;
  symbol: string;
  description: string;
  type?: OptionInstrumentType;
  putCall: PutCall;
  underlyingSymbol: string;
  optionMultiplier: number;
  optionDeliverables: OptionDeliverable[];
}

export interface OptionDeliverable {
  symbol: string;
  deliverableUnits: number;
  currencyType: CurrencyType;
  assetType: AssetType;
}

export enum CurrencyType {
  USD = 'USD',
  CAD = 'CAD',
  EUR = 'EUR',
  JPY = 'JPY',
}

export enum QuantityType {
  ALL_SHARES = 'ALL_SHARES',
  DOLLARS = 'DOLLARS',
  SHARES = 'SHARES',
}

export enum PositionEffect {
  OPENING = 'OPENING',
  CLOSING = 'CLOSING',
  AUTOMATIC = 'AUTOMATIC',
}

export enum InstructionType {
  BUY = 'BUY',
  SELL = 'SELL',
  BUY_TO_COVER = 'BUY_TO_COVER',
  SELL_SHORT = 'SELL_SHORT',
  BUY_TO_OPEN = 'BUY_TO_OPEN',
  BUY_TO_CLOSE = 'BUY_TO_CLOSE',
  SELL_TO_OPEN = 'SELL_TO_OPEN',
  SELL_TO_CLOSE = 'SELL_TO_CLOSE',
  EXCHANGE = 'EXCHANGE',
  SELL_SHORT_EXEMPT = 'SELL_SHORT_EXEMPT',
}

export interface Instrument {
  symbol: string;
  assetType: AssetType;
}

export interface OrdersByQueryConfig {
  maxResults?: number;
  fromEnteredTime: string; // ISO-8601 timestamp
  toEnteredTime: string; // ISO-8601 timestamp
  status?: StatusType | Trader.status;
}

export enum ComplexOrderStrategyType {
  NONE = 'NONE',
  COVERED = 'COVERED',
  VERTICAL = 'VERTICAL',
  BACK_RATIO = 'BACK_RATIO',
  CALENDAR = 'CALENDAR',
  DIAGONAL = 'DIAGONAL',
  STRADDLE = 'STRADDLE',
  STRANGLE = 'STRANGLE',
  COLLAR_SYNTHETIC = 'COLLAR_SYNTHETIC',
  BUTTERFLY = 'BUTTERFLY',
  CONDOR = 'CONDOR',
  IRON_CONDOR = 'IRON_CONDOR',
  VERTICAL_ROLL = 'VERTICAL_ROLL',
  COLLAR_WITH_STOCK = 'COLLAR_WITH_STOCK',
  DOUBLE_DIAGONAL = 'DOUBLE_DIAGONAL',
  UNBALANCED_BUTTERFLY = 'UNBALANCED_BUTTERFLY',
  UNBALANCED_CONDOR = 'UNBALANCED_CONDOR',
  UNBALANCED_IRON_CONDOR = 'UNBALANCED_IRON_CONDOR',
  UNBALANCED_VERTICAL_ROLL = 'UNBALANCED_VERTICAL_ROLL',
  CUSTOM = 'CUSTOM',
  MUTUAL_FUND_SWAP = 'MUTUAL_FUND_SWAP',
}

export enum StatusType {
  AWAITING_PARENT_ORDER = 'AWAITING_PARENT_ORDER',
  AWAITING_CONDITION = 'AWAITING_CONDITION',
  AWAITING_MANUAL_REVIEW = 'AWAITING_MANUAL_REVIEW',
  ACCEPTED = 'ACCEPTED',
  AWAITING_UR_OUT = 'AWAITING_UR_OUT',
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  QUEUED = 'QUEUED',
  WORKING = 'WORKING',
  REJECTED = 'REJECTED',
  PENDING_CANCEL = 'PENDING_CANCEL',
  CANCELED = 'CANCELED',
  PENDING_REPLACE = 'PENDING_REPLACE',
  REPLACED = 'REPLACED',
  FILLED = 'FILLED',
  EXPIRED = 'EXPIRED',
  AWAITING_STOP_CONDITION = 'AWAITING_STOP_CONDITION',
  NEW = 'NEW',
  AWAITING_RELEASE_TIME = 'AWAITING_RELEASE_TIME',
  PENDING_ACKNOWLEDGEMENT = 'PENDING_ACKNOWLEDGEMENT',
  PENDING_RECALL = 'PENDING_RECALL',
  UNKNOWN = 'UNKNOWN',
}

export interface Execution {
  activityType: 'EXECUTION' | 'ORDER_ACTION';
  executionType: 'FILL';
  quantity: number;
  orderRemainingQuantity: number;
  executionLegs: ExecutionLeg[];
}

export interface ExecutionLeg {
  legId: number;
  quantity: number;
  mismarkedQuantity: number;
  price: number;
  time: string;
}

/** accountId must be the encrypted hash returned by getAccountNumbers(). */
export interface AccountOrdersConfig extends OrdersByQueryConfig {
  accountId: string;
}

export interface PreviewOrderConfig {
  accountId: string;
  order: Trader.PreviewOrder;
}

export type OrderRequest = Trader.OrderRequest;
export type PreviewOrder = Trader.PreviewOrder;

export type OrderResponse = Trader.Order;
