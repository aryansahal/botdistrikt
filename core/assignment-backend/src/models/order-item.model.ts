import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';
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
