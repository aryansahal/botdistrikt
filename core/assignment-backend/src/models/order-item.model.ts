import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model'; // Ensure these imports point to the correct file
import {MenuItem} from './menu-item.model';

@model({settings: {strict: true}})
export class OrderItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Order)
  orderId: number;

  @belongsTo(() => MenuItem)
  menuItemId: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {
  // describe navigational properties here
  order?: Order;
  menuItem?: MenuItem;
}

export type OrderItemWithRelations = OrderItem & OrderItemRelations;
