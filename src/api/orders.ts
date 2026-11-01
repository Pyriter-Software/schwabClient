import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { ACCOUNTS, ORDERS } from '../connection/routes.config';
import {
  AccountOrdersConfig,
  PreviewOrderConfig,
  PreviewOrder,
  CancelOrderConfig,
  GetOrderConfig,
  OrderResponse,
  OrdersByQueryConfig,
  OrdersConfig,
  PlaceOrderResponse,
  ReplaceOrdersConfig,
} from '../models/order';
import { Client } from '../connection/client';

export class OrdersApi {
  constructor(private client: Client) {}

  async getOrder(config: GetOrderConfig): Promise<OrderResponse> {
    const { accountId, orderId } = config;
    const url = this.generateOrderUrl(accountId, orderId);
    const response = await this.client.get({
      url,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data;
  }

  /*
  Orders for all linked accounts. Both ISO-8601 date bounds are required.
   */
  async getOrdersByQuery(config: OrdersByQueryConfig): Promise<OrderResponse[]> {
    const url = ORDERS;
    const response = await this.client.get({
      url,
      params: config,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data;
  }

  async getOrdersForAccount(config: AccountOrdersConfig): Promise<OrderResponse[]> {
    const { accountId, ...params } = config;
    const response = await this.client.get({
      url: this.generateOrderUrl(accountId),
      params,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data;
  }

  async previewOrder(config: PreviewOrderConfig): Promise<PreviewOrder> {
    const response = await this.client.post({
      url: `${ACCOUNTS}/${encodeURIComponent(config.accountId)}/previewOrder`,
      data: config.order,
      responseType: ResponseType.JSON,
    } as Request);
    return response.data;
  }

  async placeOrder(config: OrdersConfig): Promise<PlaceOrderResponse> {
    const url = this.generateOrderUrl(config.accountId);
    const order = this.processOrder(config.order);
    const response = await this.client.post({
      url,
      data: order,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    const orderId = this.extractOrderIdFromUrl(response.headers.location);
    return {
      orderId,
    };
  }

  /*
   Replace an existing order for an account. The existing order will be replaced by the new order.
   Once replaced, the old order will be canceled and a new order will be created.
   */
  async replaceOrder(config: ReplaceOrdersConfig): Promise<PlaceOrderResponse> {
    const url = this.generateOrderUrl(config.accountId, config.orderId);
    const order = this.processOrder(config.order);
    const response = await this.client.put({
      url,
      data: order,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    const orderId = this.extractOrderIdFromUrl(response.headers.location);
    return {
      orderId,
    };
  }

  processOrder<T extends { price?: number }>(order: T): T {
    return { ...order };
  }

  async cancelOrder(config: CancelOrderConfig): Promise<any> {
    if (!config.accountId) throw new Error('accountId is required');
    const url = this.generateOrderUrl(config.accountId, config.orderId);
    const response = await this.client.del({
      url,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data;
  }

  generateOrderUrl(accountId: string, orderId?: string): string {
    return `${ACCOUNTS}/${encodeURIComponent(accountId)}/orders${this.generateOrderIdUrl(orderId)}`;
  }

  generateOrderIdUrl(orderId?: string) {
    return orderId ? `/${encodeURIComponent(orderId)}` : '';
  }

  extractOrderIdFromUrl(url: string): string {
    const orderId = url.split('/').pop();
    if (!orderId || orderId.trim().length === 0) throw new Error('Unable to extract order Id');
    return orderId;
  }
}
