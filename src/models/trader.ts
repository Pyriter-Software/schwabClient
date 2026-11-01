// Types transcribed from Schwab Trader API production specification (1.0.0).
// https://developer.schwab.com/products/trader-api--individual/details/specifications/Retail%20Trader%20API%20Production

export interface AccountNumberHash {
  accountNumber?: string;
  hashValue?: string;
}

export type session = 'NORMAL' | 'AM' | 'PM' | 'SEAMLESS';

export type duration =
  | 'DAY'
  | 'GOOD_TILL_CANCEL'
  | 'FILL_OR_KILL'
  | 'IMMEDIATE_OR_CANCEL'
  | 'END_OF_WEEK'
  | 'END_OF_MONTH'
  | 'NEXT_END_OF_MONTH'
  | 'UNKNOWN';

export type orderType =
  | 'MARKET'
  | 'LIMIT'
  | 'STOP'
  | 'STOP_LIMIT'
  | 'TRAILING_STOP'
  | 'CABINET'
  | 'NON_MARKETABLE'
  | 'MARKET_ON_CLOSE'
  | 'EXERCISE'
  | 'TRAILING_STOP_LIMIT'
  | 'NET_DEBIT'
  | 'NET_CREDIT'
  | 'NET_ZERO'
  | 'LIMIT_ON_CLOSE'
  | 'UNKNOWN';

export type orderTypeRequest =
  | 'MARKET'
  | 'LIMIT'
  | 'STOP'
  | 'STOP_LIMIT'
  | 'TRAILING_STOP'
  | 'CABINET'
  | 'NON_MARKETABLE'
  | 'MARKET_ON_CLOSE'
  | 'EXERCISE'
  | 'TRAILING_STOP_LIMIT'
  | 'NET_DEBIT'
  | 'NET_CREDIT'
  | 'NET_ZERO'
  | 'LIMIT_ON_CLOSE';

export type complexOrderStrategyType =
  | 'NONE'
  | 'COVERED'
  | 'VERTICAL'
  | 'BACK_RATIO'
  | 'CALENDAR'
  | 'DIAGONAL'
  | 'STRADDLE'
  | 'STRANGLE'
  | 'COLLAR_SYNTHETIC'
  | 'BUTTERFLY'
  | 'CONDOR'
  | 'IRON_CONDOR'
  | 'VERTICAL_ROLL'
  | 'COLLAR_WITH_STOCK'
  | 'DOUBLE_DIAGONAL'
  | 'UNBALANCED_BUTTERFLY'
  | 'UNBALANCED_CONDOR'
  | 'UNBALANCED_IRON_CONDOR'
  | 'UNBALANCED_VERTICAL_ROLL'
  | 'MUTUAL_FUND_SWAP'
  | 'CUSTOM';

export type requestedDestination =
  | 'INET'
  | 'ECN_ARCA'
  | 'CBOE'
  | 'AMEX'
  | 'PHLX'
  | 'ISE'
  | 'BOX'
  | 'NYSE'
  | 'NASDAQ'
  | 'BATS'
  | 'C2'
  | 'AUTO';

export type stopPriceLinkBasis =
  | 'MANUAL'
  | 'BASE'
  | 'TRIGGER'
  | 'LAST'
  | 'BID'
  | 'ASK'
  | 'ASK_BID'
  | 'MARK'
  | 'AVERAGE';

export type stopPriceLinkType = 'VALUE' | 'PERCENT' | 'TICK';

export type stopPriceOffset = number;

export type stopType = 'STANDARD' | 'BID' | 'ASK' | 'LAST' | 'MARK';

export type priceLinkBasis = 'MANUAL' | 'BASE' | 'TRIGGER' | 'LAST' | 'BID' | 'ASK' | 'ASK_BID' | 'MARK' | 'AVERAGE';

export type priceLinkType = 'VALUE' | 'PERCENT' | 'TICK';

export type taxLotMethod =
  | 'FIFO'
  | 'LIFO'
  | 'HIGH_COST'
  | 'LOW_COST'
  | 'AVERAGE_COST'
  | 'SPECIFIC_LOT'
  | 'LOSS_HARVESTER';

export type specialInstruction = 'ALL_OR_NONE' | 'DO_NOT_REDUCE' | 'ALL_OR_NONE_DO_NOT_REDUCE';

export type orderStrategyType =
  | 'SINGLE'
  | 'CANCEL'
  | 'RECALL'
  | 'PAIR'
  | 'FLATTEN'
  | 'TWO_DAY_SWAP'
  | 'BLAST_ALL'
  | 'OCO'
  | 'TRIGGER';

export type status =
  | 'AWAITING_PARENT_ORDER'
  | 'AWAITING_CONDITION'
  | 'AWAITING_STOP_CONDITION'
  | 'AWAITING_MANUAL_REVIEW'
  | 'ACCEPTED'
  | 'AWAITING_UR_OUT'
  | 'PENDING_ACTIVATION'
  | 'QUEUED'
  | 'WORKING'
  | 'REJECTED'
  | 'PENDING_CANCEL'
  | 'CANCELED'
  | 'PENDING_REPLACE'
  | 'REPLACED'
  | 'FILLED'
  | 'EXPIRED'
  | 'NEW'
  | 'AWAITING_RELEASE_TIME'
  | 'PENDING_ACKNOWLEDGEMENT'
  | 'PENDING_RECALL'
  | 'UNKNOWN';

export type amountIndicator = 'DOLLARS' | 'SHARES' | 'ALL_SHARES' | 'PERCENTAGE' | 'UNKNOWN';

export type settlementInstruction = 'REGULAR' | 'CASH' | 'NEXT_DAY' | 'UNKNOWN';

export interface OrderStrategy {
  accountNumber?: string;
  advancedOrderType?: 'NONE' | 'OTO' | 'OCO' | 'OTOCO' | 'OT2OCO' | 'OT3OCO' | 'BLAST_ALL' | 'OTA' | 'PAIR';
  closeTime?: string;
  enteredTime?: string;
  orderBalance?: OrderBalance;
  orderStrategyType?:
    | 'SINGLE'
    | 'CANCEL'
    | 'RECALL'
    | 'PAIR'
    | 'FLATTEN'
    | 'TWO_DAY_SWAP'
    | 'BLAST_ALL'
    | 'OCO'
    | 'TRIGGER';
  orderVersion?: number;
  session?: 'NORMAL' | 'AM' | 'PM' | 'SEAMLESS';
  status?: apiOrderStatus;
  allOrNone?: boolean;
  discretionary?: boolean;
  duration?:
    | 'DAY'
    | 'GOOD_TILL_CANCEL'
    | 'FILL_OR_KILL'
    | 'IMMEDIATE_OR_CANCEL'
    | 'END_OF_WEEK'
    | 'END_OF_MONTH'
    | 'NEXT_END_OF_MONTH'
    | 'UNKNOWN';
  filledQuantity?: number;
  orderType?:
    | 'MARKET'
    | 'LIMIT'
    | 'STOP'
    | 'STOP_LIMIT'
    | 'TRAILING_STOP'
    | 'CABINET'
    | 'NON_MARKETABLE'
    | 'MARKET_ON_CLOSE'
    | 'EXERCISE'
    | 'TRAILING_STOP_LIMIT'
    | 'NET_DEBIT'
    | 'NET_CREDIT'
    | 'NET_ZERO'
    | 'LIMIT_ON_CLOSE'
    | 'UNKNOWN';
  orderValue?: number;
  price?: number;
  quantity?: number;
  remainingQuantity?: number;
  sellNonMarginableFirst?: boolean;
  settlementInstruction?: 'REGULAR' | 'CASH' | 'NEXT_DAY' | 'UNKNOWN';
  strategy?: complexOrderStrategyType;
  amountIndicator?: 'DOLLARS' | 'SHARES' | 'ALL_SHARES' | 'PERCENTAGE' | 'UNKNOWN';
  orderLegs?: OrderLeg[];
}

export interface OrderLeg {
  askPrice?: number;
  bidPrice?: number;
  lastPrice?: number;
  markPrice?: number;
  projectedCommission?: number;
  quantity?: number;
  finalSymbol?: string;
  legId?: number;
  assetType?:
    | 'EQUITY'
    | 'MUTUAL_FUND'
    | 'OPTION'
    | 'FUTURE'
    | 'FOREX'
    | 'INDEX'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'PRODUCT'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  instruction?:
    | 'BUY'
    | 'SELL'
    | 'BUY_TO_COVER'
    | 'SELL_SHORT'
    | 'BUY_TO_OPEN'
    | 'BUY_TO_CLOSE'
    | 'SELL_TO_OPEN'
    | 'SELL_TO_CLOSE'
    | 'EXCHANGE'
    | 'SELL_SHORT_EXEMPT';
}

export interface OrderBalance {
  orderValue?: number;
  projectedAvailableFund?: number;
  projectedBuyingPower?: number;
  projectedCommission?: number;
}

export interface OrderValidationResult {
  alerts?: OrderValidationDetail[];
  accepts?: OrderValidationDetail[];
  rejects?: OrderValidationDetail[];
  reviews?: OrderValidationDetail[];
  warns?: OrderValidationDetail[];
}

export interface OrderValidationDetail {
  validationRuleName?: string;
  message?: string;
  activityMessage?: string;
  originalSeverity?: APIRuleAction;
  overrideName?: string;
  overrideSeverity?: APIRuleAction;
}

export type APIRuleAction = 'ACCEPT' | 'ALERT' | 'REJECT' | 'REVIEW' | 'UNKNOWN';

export interface CommissionAndFee {
  commission?: Commission;
  fee?: Fees;
  trueCommission?: Commission;
}

export interface Commission {
  commissionLegs?: CommissionLeg[];
}

export interface CommissionLeg {
  commissionValues?: CommissionValue[];
}

export interface CommissionValue {
  value?: number;
  type?: FeeType;
}

export interface Fees {
  feeLegs?: FeeLeg[];
}

export interface FeeLeg {
  feeValues?: FeeValue[];
}

export interface FeeValue {
  value?: number;
  type?: FeeType;
}

export type FeeType =
  | 'COMMISSION'
  | 'SEC_FEE'
  | 'STR_FEE'
  | 'R_FEE'
  | 'CDSC_FEE'
  | 'OPT_REG_FEE'
  | 'ADDITIONAL_FEE'
  | 'MISCELLANEOUS_FEE'
  | 'FTT'
  | 'FUTURES_CLEARING_FEE'
  | 'FUTURES_DESK_OFFICE_FEE'
  | 'FUTURES_EXCHANGE_FEE'
  | 'FUTURES_GLOBEX_FEE'
  | 'FUTURES_NFA_FEE'
  | 'FUTURES_PIT_BROKERAGE_FEE'
  | 'FUTURES_TRANSACTION_FEE'
  | 'LOW_PROCEEDS_COMMISSION'
  | 'BASE_CHARGE'
  | 'GENERAL_CHARGE'
  | 'GST_FEE'
  | 'TAF_FEE'
  | 'INDEX_OPTION_FEE'
  | 'TEFRA_TAX'
  | 'STATE_TAX'
  | 'UNKNOWN';

export interface Account {
  securitiesAccount?: SecuritiesAccount;
}

export interface DateParam {
  date?: string;
}

export interface Order {
  session?: 'NORMAL' | 'AM' | 'PM' | 'SEAMLESS';
  duration?:
    | 'DAY'
    | 'GOOD_TILL_CANCEL'
    | 'FILL_OR_KILL'
    | 'IMMEDIATE_OR_CANCEL'
    | 'END_OF_WEEK'
    | 'END_OF_MONTH'
    | 'NEXT_END_OF_MONTH'
    | 'UNKNOWN';
  orderType?:
    | 'MARKET'
    | 'LIMIT'
    | 'STOP'
    | 'STOP_LIMIT'
    | 'TRAILING_STOP'
    | 'CABINET'
    | 'NON_MARKETABLE'
    | 'MARKET_ON_CLOSE'
    | 'EXERCISE'
    | 'TRAILING_STOP_LIMIT'
    | 'NET_DEBIT'
    | 'NET_CREDIT'
    | 'NET_ZERO'
    | 'LIMIT_ON_CLOSE'
    | 'UNKNOWN';
  cancelTime?: string;
  complexOrderStrategyType?:
    | 'NONE'
    | 'COVERED'
    | 'VERTICAL'
    | 'BACK_RATIO'
    | 'CALENDAR'
    | 'DIAGONAL'
    | 'STRADDLE'
    | 'STRANGLE'
    | 'COLLAR_SYNTHETIC'
    | 'BUTTERFLY'
    | 'CONDOR'
    | 'IRON_CONDOR'
    | 'VERTICAL_ROLL'
    | 'COLLAR_WITH_STOCK'
    | 'DOUBLE_DIAGONAL'
    | 'UNBALANCED_BUTTERFLY'
    | 'UNBALANCED_CONDOR'
    | 'UNBALANCED_IRON_CONDOR'
    | 'UNBALANCED_VERTICAL_ROLL'
    | 'MUTUAL_FUND_SWAP'
    | 'CUSTOM';
  quantity?: number;
  filledQuantity?: number;
  remainingQuantity?: number;
  requestedDestination?:
    | 'INET'
    | 'ECN_ARCA'
    | 'CBOE'
    | 'AMEX'
    | 'PHLX'
    | 'ISE'
    | 'BOX'
    | 'NYSE'
    | 'NASDAQ'
    | 'BATS'
    | 'C2'
    | 'AUTO';
  destinationLinkName?: string;
  releaseTime?: string;
  stopPrice?: number;
  stopPriceLinkBasis?: 'MANUAL' | 'BASE' | 'TRIGGER' | 'LAST' | 'BID' | 'ASK' | 'ASK_BID' | 'MARK' | 'AVERAGE';
  stopPriceLinkType?: 'VALUE' | 'PERCENT' | 'TICK';
  stopPriceOffset?: number;
  stopType?: 'STANDARD' | 'BID' | 'ASK' | 'LAST' | 'MARK';
  priceLinkBasis?: 'MANUAL' | 'BASE' | 'TRIGGER' | 'LAST' | 'BID' | 'ASK' | 'ASK_BID' | 'MARK' | 'AVERAGE';
  priceLinkType?: 'VALUE' | 'PERCENT' | 'TICK';
  price?: number;
  taxLotMethod?: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'AVERAGE_COST' | 'SPECIFIC_LOT' | 'LOSS_HARVESTER';
  orderLegCollection?: OrderLegCollection[];
  activationPrice?: number;
  specialInstruction?: 'ALL_OR_NONE' | 'DO_NOT_REDUCE' | 'ALL_OR_NONE_DO_NOT_REDUCE';
  orderStrategyType?:
    | 'SINGLE'
    | 'CANCEL'
    | 'RECALL'
    | 'PAIR'
    | 'FLATTEN'
    | 'TWO_DAY_SWAP'
    | 'BLAST_ALL'
    | 'OCO'
    | 'TRIGGER';
  orderId?: number;
  cancelable?: boolean;
  editable?: boolean;
  status?:
    | 'AWAITING_PARENT_ORDER'
    | 'AWAITING_CONDITION'
    | 'AWAITING_STOP_CONDITION'
    | 'AWAITING_MANUAL_REVIEW'
    | 'ACCEPTED'
    | 'AWAITING_UR_OUT'
    | 'PENDING_ACTIVATION'
    | 'QUEUED'
    | 'WORKING'
    | 'REJECTED'
    | 'PENDING_CANCEL'
    | 'CANCELED'
    | 'PENDING_REPLACE'
    | 'REPLACED'
    | 'FILLED'
    | 'EXPIRED'
    | 'NEW'
    | 'AWAITING_RELEASE_TIME'
    | 'PENDING_ACKNOWLEDGEMENT'
    | 'PENDING_RECALL'
    | 'UNKNOWN';
  enteredTime?: string;
  closeTime?: string;
  tag?: string;
  accountNumber?: number;
  orderActivityCollection?: OrderActivity[];
  replacingOrderCollection?: Record<string, unknown>[];
  childOrderStrategies?: Record<string, unknown>[];
  statusDescription?: string;
}

export interface OrderRequest {
  session?: 'NORMAL' | 'AM' | 'PM' | 'SEAMLESS';
  duration?:
    | 'DAY'
    | 'GOOD_TILL_CANCEL'
    | 'FILL_OR_KILL'
    | 'IMMEDIATE_OR_CANCEL'
    | 'END_OF_WEEK'
    | 'END_OF_MONTH'
    | 'NEXT_END_OF_MONTH'
    | 'UNKNOWN';
  orderType?: orderTypeRequest;
  cancelTime?: string;
  complexOrderStrategyType?:
    | 'NONE'
    | 'COVERED'
    | 'VERTICAL'
    | 'BACK_RATIO'
    | 'CALENDAR'
    | 'DIAGONAL'
    | 'STRADDLE'
    | 'STRANGLE'
    | 'COLLAR_SYNTHETIC'
    | 'BUTTERFLY'
    | 'CONDOR'
    | 'IRON_CONDOR'
    | 'VERTICAL_ROLL'
    | 'COLLAR_WITH_STOCK'
    | 'DOUBLE_DIAGONAL'
    | 'UNBALANCED_BUTTERFLY'
    | 'UNBALANCED_CONDOR'
    | 'UNBALANCED_IRON_CONDOR'
    | 'UNBALANCED_VERTICAL_ROLL'
    | 'MUTUAL_FUND_SWAP'
    | 'CUSTOM';
  quantity?: number;
  filledQuantity?: number;
  remainingQuantity?: number;
  destinationLinkName?: string;
  releaseTime?: string;
  stopPrice?: number;
  stopPriceLinkBasis?: 'MANUAL' | 'BASE' | 'TRIGGER' | 'LAST' | 'BID' | 'ASK' | 'ASK_BID' | 'MARK' | 'AVERAGE';
  stopPriceLinkType?: 'VALUE' | 'PERCENT' | 'TICK';
  stopPriceOffset?: number;
  stopType?: 'STANDARD' | 'BID' | 'ASK' | 'LAST' | 'MARK';
  priceLinkBasis?: 'MANUAL' | 'BASE' | 'TRIGGER' | 'LAST' | 'BID' | 'ASK' | 'ASK_BID' | 'MARK' | 'AVERAGE';
  priceLinkType?: 'VALUE' | 'PERCENT' | 'TICK';
  price?: number;
  taxLotMethod?: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'AVERAGE_COST' | 'SPECIFIC_LOT' | 'LOSS_HARVESTER';
  orderLegCollection?: OrderLegCollection[];
  activationPrice?: number;
  specialInstruction?: 'ALL_OR_NONE' | 'DO_NOT_REDUCE' | 'ALL_OR_NONE_DO_NOT_REDUCE';
  orderStrategyType?:
    | 'SINGLE'
    | 'CANCEL'
    | 'RECALL'
    | 'PAIR'
    | 'FLATTEN'
    | 'TWO_DAY_SWAP'
    | 'BLAST_ALL'
    | 'OCO'
    | 'TRIGGER';
  orderId?: number;
  cancelable?: boolean;
  editable?: boolean;
  status?:
    | 'AWAITING_PARENT_ORDER'
    | 'AWAITING_CONDITION'
    | 'AWAITING_STOP_CONDITION'
    | 'AWAITING_MANUAL_REVIEW'
    | 'ACCEPTED'
    | 'AWAITING_UR_OUT'
    | 'PENDING_ACTIVATION'
    | 'QUEUED'
    | 'WORKING'
    | 'REJECTED'
    | 'PENDING_CANCEL'
    | 'CANCELED'
    | 'PENDING_REPLACE'
    | 'REPLACED'
    | 'FILLED'
    | 'EXPIRED'
    | 'NEW'
    | 'AWAITING_RELEASE_TIME'
    | 'PENDING_ACKNOWLEDGEMENT'
    | 'PENDING_RECALL'
    | 'UNKNOWN';
  enteredTime?: string;
  closeTime?: string;
  accountNumber?: number;
  orderActivityCollection?: OrderActivity[];
  replacingOrderCollection?: Record<string, unknown>[];
  childOrderStrategies?: Record<string, unknown>[];
  statusDescription?: string;
}

export interface PreviewOrder {
  orderId?: number;
  orderStrategy?: OrderStrategy;
  orderValidationResult?: OrderValidationResult;
  commissionAndFee?: CommissionAndFee;
}

export interface OrderActivity {
  activityType?: 'EXECUTION' | 'ORDER_ACTION';
  executionType?: 'FILL';
  quantity?: number;
  orderRemainingQuantity?: number;
  executionLegs?: ExecutionLeg[];
}

export interface ExecutionLeg {
  legId?: number;
  price?: number;
  quantity?: number;
  mismarkedQuantity?: number;
  instrumentId?: number;
  time?: string;
}

export interface Position {
  shortQuantity?: number;
  averagePrice?: number;
  currentDayProfitLoss?: number;
  currentDayProfitLossPercentage?: number;
  longQuantity?: number;
  settledLongQuantity?: number;
  settledShortQuantity?: number;
  agedQuantity?: number;
  instrument?: AccountsInstrument;
  marketValue?: number;
  maintenanceRequirement?: number;
  averageLongPrice?: number;
  averageShortPrice?: number;
  taxLotAverageLongPrice?: number;
  taxLotAverageShortPrice?: number;
  longOpenProfitLoss?: number;
  shortOpenProfitLoss?: number;
  previousSessionLongQuantity?: number;
  previousSessionShortQuantity?: number;
  currentDayCost?: number;
}

export interface ServiceError {
  message?: string;
  errors?: string[];
}

export interface OrderLegCollection {
  orderLegType?:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  legId?: number;
  instrument?: AccountsInstrument;
  instruction?:
    | 'BUY'
    | 'SELL'
    | 'BUY_TO_COVER'
    | 'SELL_SHORT'
    | 'BUY_TO_OPEN'
    | 'BUY_TO_CLOSE'
    | 'SELL_TO_OPEN'
    | 'SELL_TO_CLOSE'
    | 'EXCHANGE'
    | 'SELL_SHORT_EXEMPT';
  positionEffect?: 'OPENING' | 'CLOSING' | 'AUTOMATIC';
  quantity?: number;
  quantityType?: 'ALL_SHARES' | 'DOLLARS' | 'SHARES';
  divCapGains?: 'REINVEST' | 'PAYOUT';
  toSymbol?: string;
}

export type SecuritiesAccount = MarginAccount | CashAccount;

export interface SecuritiesAccountBase {
  type?: 'CASH' | 'MARGIN';
  accountNumber?: string;
  roundTrips?: number;
  isDayTrader?: boolean;
  isClosingOnlyRestricted?: boolean;
  pfcbFlag?: boolean;
  positions?: Position[];
}

export interface MarginAccount {
  type?: 'CASH' | 'MARGIN';
  accountNumber?: string;
  roundTrips?: number;
  isDayTrader?: boolean;
  isClosingOnlyRestricted?: boolean;
  pfcbFlag?: boolean;
  positions?: Position[];
  initialBalances?: MarginInitialBalance;
  currentBalances?: MarginBalance;
  projectedBalances?: MarginBalance;
}

export interface MarginInitialBalance {
  accruedInterest?: number;
  availableFundsNonMarginableTrade?: number;
  bondValue?: number;
  buyingPower?: number;
  cashBalance?: number;
  cashAvailableForTrading?: number;
  cashReceipts?: number;
  dayTradingBuyingPower?: number;
  dayTradingBuyingPowerCall?: number;
  dayTradingEquityCall?: number;
  equity?: number;
  equityPercentage?: number;
  liquidationValue?: number;
  longMarginValue?: number;
  longOptionMarketValue?: number;
  longStockValue?: number;
  maintenanceCall?: number;
  maintenanceRequirement?: number;
  margin?: number;
  marginEquity?: number;
  moneyMarketFund?: number;
  mutualFundValue?: number;
  regTCall?: number;
  shortMarginValue?: number;
  shortOptionMarketValue?: number;
  shortStockValue?: number;
  totalCash?: number;
  isInCall?: number;
  unsettledCash?: number;
  pendingDeposits?: number;
  marginBalance?: number;
  shortBalance?: number;
  accountValue?: number;
}

export interface MarginBalance {
  availableFunds?: number;
  availableFundsNonMarginableTrade?: number;
  buyingPower?: number;
  buyingPowerNonMarginableTrade?: number;
  dayTradingBuyingPower?: number;
  dayTradingBuyingPowerCall?: number;
  equity?: number;
  equityPercentage?: number;
  longMarginValue?: number;
  maintenanceCall?: number;
  maintenanceRequirement?: number;
  marginBalance?: number;
  regTCall?: number;
  shortBalance?: number;
  shortMarginValue?: number;
  sma?: number;
  isInCall?: number;
  stockBuyingPower?: number;
  optionBuyingPower?: number;
}

export interface CashAccount {
  type?: 'CASH' | 'MARGIN';
  accountNumber?: string;
  roundTrips?: number;
  isDayTrader?: boolean;
  isClosingOnlyRestricted?: boolean;
  pfcbFlag?: boolean;
  positions?: Position[];
  initialBalances?: CashInitialBalance;
  currentBalances?: CashBalance;
  projectedBalances?: CashBalance;
}

export interface CashInitialBalance {
  accruedInterest?: number;
  cashAvailableForTrading?: number;
  cashAvailableForWithdrawal?: number;
  cashBalance?: number;
  bondValue?: number;
  cashReceipts?: number;
  liquidationValue?: number;
  longOptionMarketValue?: number;
  longStockValue?: number;
  moneyMarketFund?: number;
  mutualFundValue?: number;
  shortOptionMarketValue?: number;
  shortStockValue?: number;
  isInCall?: number;
  unsettledCash?: number;
  cashDebitCallValue?: number;
  pendingDeposits?: number;
  accountValue?: number;
}

export interface CashBalance {
  cashAvailableForTrading?: number;
  cashAvailableForWithdrawal?: number;
  cashCall?: number;
  longNonMarginableMarketValue?: number;
  totalCash?: number;
  cashDebitCallValue?: number;
  unsettledCash?: number;
}

export interface TransactionBaseInstrument {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
}

export interface AccountsBaseInstrument {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
}

export type AccountsInstrument =
  | AccountCashEquivalent
  | AccountEquity
  | AccountFixedIncome
  | AccountMutualFund
  | AccountOption;

export type TransactionInstrument =
  | TransactionCashEquivalent
  | CollectiveInvestment
  | Currency
  | TransactionEquity
  | TransactionFixedIncome
  | Forex
  | Future
  | Index
  | TransactionMutualFund
  | TransactionOption
  | Product;

export interface TransactionCashEquivalent {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  type?: 'SWEEP_VEHICLE' | 'SAVINGS' | 'MONEY_MARKET_FUND' | 'UNKNOWN';
}

export interface CollectiveInvestment {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  type?: 'UNIT_INVESTMENT_TRUST' | 'EXCHANGE_TRADED_FUND' | 'CLOSED_END_FUND' | 'INDEX' | 'UNITS';
}

export type instruction =
  | 'BUY'
  | 'SELL'
  | 'BUY_TO_COVER'
  | 'SELL_SHORT'
  | 'BUY_TO_OPEN'
  | 'BUY_TO_CLOSE'
  | 'SELL_TO_OPEN'
  | 'SELL_TO_CLOSE'
  | 'EXCHANGE'
  | 'SELL_SHORT_EXEMPT';

export type assetType =
  | 'EQUITY'
  | 'MUTUAL_FUND'
  | 'OPTION'
  | 'FUTURE'
  | 'FOREX'
  | 'INDEX'
  | 'CASH_EQUIVALENT'
  | 'FIXED_INCOME'
  | 'PRODUCT'
  | 'CURRENCY'
  | 'COLLECTIVE_INVESTMENT';

export interface Currency {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
}

export interface TransactionEquity {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  type?:
    | 'COMMON_STOCK'
    | 'PREFERRED_STOCK'
    | 'DEPOSITORY_RECEIPT'
    | 'PREFERRED_DEPOSITORY_RECEIPT'
    | 'RESTRICTED_STOCK'
    | 'COMPONENT_UNIT'
    | 'RIGHT'
    | 'WARRANT'
    | 'CONVERTIBLE_PREFERRED_STOCK'
    | 'CONVERTIBLE_STOCK'
    | 'LIMITED_PARTNERSHIP'
    | 'WHEN_ISSUED'
    | 'UNKNOWN';
}

export interface TransactionFixedIncome {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  type?:
    | 'BOND_UNIT'
    | 'CERTIFICATE_OF_DEPOSIT'
    | 'CONVERTIBLE_BOND'
    | 'COLLATERALIZED_MORTGAGE_OBLIGATION'
    | 'CORPORATE_BOND'
    | 'GOVERNMENT_MORTGAGE'
    | 'GNMA_BONDS'
    | 'MUNICIPAL_ASSESSMENT_DISTRICT'
    | 'MUNICIPAL_BOND'
    | 'OTHER_GOVERNMENT'
    | 'SHORT_TERM_PAPER'
    | 'US_TREASURY_BOND'
    | 'US_TREASURY_BILL'
    | 'US_TREASURY_NOTE'
    | 'US_TREASURY_ZERO_COUPON'
    | 'AGENCY_BOND'
    | 'WHEN_AS_AND_IF_ISSUED_BOND'
    | 'ASSET_BACKED_SECURITY'
    | 'UNKNOWN';
  maturityDate?: string;
  factor?: number;
  multiplier?: number;
  variableRate?: number;
}

export interface Forex {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  type?: 'STANDARD' | 'NBBO' | 'UNKNOWN';
  baseCurrency?: Currency;
  counterCurrency?: Currency;
}

export interface Future {
  activeContract?: boolean;
  type?: 'STANDARD' | 'UNKNOWN';
  expirationDate?: string;
  lastTradingDate?: string;
  firstNoticeDate?: string;
  multiplier?: number;
}

export interface Index {
  activeContract?: boolean;
  type?: 'BROAD_BASED' | 'NARROW_BASED' | 'UNKNOWN';
}

export interface TransactionMutualFund {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  fundFamilyName?: string;
  fundFamilySymbol?: string;
  fundGroup?: string;
  type?:
    | 'NOT_APPLICABLE'
    | 'OPEN_END_NON_TAXABLE'
    | 'OPEN_END_TAXABLE'
    | 'NO_LOAD_NON_TAXABLE'
    | 'NO_LOAD_TAXABLE'
    | 'UNKNOWN';
  exchangeCutoffTime?: string;
  purchaseCutoffTime?: string;
  redemptionCutoffTime?: string;
}

export interface TransactionOption {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  expirationDate?: string;
  optionDeliverables?: TransactionAPIOptionDeliverable[];
  optionPremiumMultiplier?: number;
  putCall?: 'PUT' | 'CALL' | 'UNKNOWN';
  strikePrice?: number;
  type?: 'VANILLA' | 'BINARY' | 'BARRIER' | 'UNKNOWN';
  underlyingSymbol?: string;
  underlyingCusip?: string;
  deliverable?: TransactionInstrument;
}

export interface Product {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  type?: 'TBD' | 'UNKNOWN';
}

export interface AccountCashEquivalent {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  type?: 'SWEEP_VEHICLE' | 'SAVINGS' | 'MONEY_MARKET_FUND' | 'UNKNOWN';
}

export interface AccountEquity {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
}

export interface AccountFixedIncome {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  maturityDate?: string;
  factor?: number;
  variableRate?: number;
}

export interface AccountMutualFund {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
}

export interface AccountOption {
  assetType:
    | 'EQUITY'
    | 'OPTION'
    | 'INDEX'
    | 'MUTUAL_FUND'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
  cusip?: string;
  symbol?: string;
  description?: string;
  instrumentId?: number;
  netChange?: number;
  optionDeliverables?: AccountAPIOptionDeliverable[];
  putCall?: 'PUT' | 'CALL' | 'UNKNOWN';
  optionMultiplier?: number;
  type?: 'VANILLA' | 'BINARY' | 'BARRIER' | 'UNKNOWN';
  underlyingSymbol?: string;
}

export interface AccountAPIOptionDeliverable {
  symbol?: string;
  deliverableUnits?: number;
  apiCurrencyType?: 'USD' | 'CAD' | 'EUR' | 'JPY';
  assetType?:
    | 'EQUITY'
    | 'MUTUAL_FUND'
    | 'OPTION'
    | 'FUTURE'
    | 'FOREX'
    | 'INDEX'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'PRODUCT'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
}

export interface TransactionAPIOptionDeliverable {
  rootSymbol?: string;
  strikePercent?: number;
  deliverableNumber?: number;
  deliverableUnits?: number;
  deliverable?: TransactionInstrument;
  assetType?:
    | 'EQUITY'
    | 'MUTUAL_FUND'
    | 'OPTION'
    | 'FUTURE'
    | 'FOREX'
    | 'INDEX'
    | 'CASH_EQUIVALENT'
    | 'FIXED_INCOME'
    | 'PRODUCT'
    | 'CURRENCY'
    | 'COLLECTIVE_INVESTMENT';
}

export type apiOrderStatus =
  | 'AWAITING_PARENT_ORDER'
  | 'AWAITING_CONDITION'
  | 'AWAITING_STOP_CONDITION'
  | 'AWAITING_MANUAL_REVIEW'
  | 'ACCEPTED'
  | 'AWAITING_UR_OUT'
  | 'PENDING_ACTIVATION'
  | 'QUEUED'
  | 'WORKING'
  | 'REJECTED'
  | 'PENDING_CANCEL'
  | 'CANCELED'
  | 'PENDING_REPLACE'
  | 'REPLACED'
  | 'FILLED'
  | 'EXPIRED'
  | 'NEW'
  | 'AWAITING_RELEASE_TIME'
  | 'PENDING_ACKNOWLEDGEMENT'
  | 'PENDING_RECALL'
  | 'UNKNOWN';

export type TransactionType =
  | 'TRADE'
  | 'RECEIVE_AND_DELIVER'
  | 'DIVIDEND_OR_INTEREST'
  | 'ACH_RECEIPT'
  | 'ACH_DISBURSEMENT'
  | 'CASH_RECEIPT'
  | 'CASH_DISBURSEMENT'
  | 'ELECTRONIC_FUND'
  | 'WIRE_OUT'
  | 'WIRE_IN'
  | 'JOURNAL'
  | 'MEMORANDUM'
  | 'MARGIN_CALL'
  | 'MONEY_MARKET'
  | 'SMA_ADJUSTMENT';

export interface Transaction {
  activityId?: number;
  time?: string;
  user?: UserDetails;
  description?: string;
  accountNumber?: string;
  type?: TransactionType;
  status?: 'VALID' | 'INVALID' | 'PENDING' | 'UNKNOWN';
  subAccount?: 'CASH' | 'MARGIN' | 'SHORT' | 'DIV' | 'INCOME' | 'UNKNOWN';
  tradeDate?: string;
  settlementDate?: string;
  positionId?: number;
  orderId?: number;
  netAmount?: number;
  activityType?: 'ACTIVITY_CORRECTION' | 'EXECUTION' | 'ORDER_ACTION' | 'TRANSFER' | 'UNKNOWN';
  transferItems?: TransferItem[];
}

export interface UserDetails {
  cdDomainId?: string;
  login?: string;
  type?: 'ADVISOR_USER' | 'BROKER_USER' | 'CLIENT_USER' | 'SYSTEM_USER' | 'UNKNOWN';
  userId?: number;
  systemUserName?: string;
  firstName?: string;
  lastName?: string;
  brokerRepCode?: string;
}

export interface TransferItem {
  instrument?: TransactionInstrument;
  amount?: number;
  cost?: number;
  price?: number;
  feeType?:
    | 'COMMISSION'
    | 'SEC_FEE'
    | 'STR_FEE'
    | 'R_FEE'
    | 'CDSC_FEE'
    | 'OPT_REG_FEE'
    | 'ADDITIONAL_FEE'
    | 'MISCELLANEOUS_FEE'
    | 'FUTURES_EXCHANGE_FEE'
    | 'LOW_PROCEEDS_COMMISSION'
    | 'BASE_CHARGE'
    | 'GENERAL_CHARGE'
    | 'GST_FEE'
    | 'TAF_FEE'
    | 'INDEX_OPTION_FEE'
    | 'UNKNOWN';
  positionEffect?: 'OPENING' | 'CLOSING' | 'AUTOMATIC' | 'UNKNOWN';
}

export interface UserPreference {
  accounts?: UserPreferenceAccount[];
  streamerInfo?: StreamerInfo[];
  offers?: Offer[];
}

export interface UserPreferenceAccount {
  accountNumber?: string;
  primaryAccount?: boolean;
  type?: string;
  nickName?: string;
  accountColor?: string;
  displayAcctId?: string;
  autoPositionEffect?: boolean;
}

export interface StreamerInfo {
  streamerSocketUrl?: string;
  schwabClientCustomerId?: string;
  schwabClientCorrelId?: string;
  schwabClientChannel?: string;
  schwabClientFunctionId?: string;
}

export interface Offer {
  level2Permissions?: boolean;
  mktDataPermission?: string;
}
