import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {Customer} from './customer.model';
import {OrderItem} from './order-item.model';

@model({settings: {strict: true}})
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Customer)
  customerId: number;

  @property({
    type: 'date',
    required: true,
  })
  orderDate: string;

  @property({
    type: 'number',
    required: true,
  })
  totalAmount: number;

  @hasMany(() => OrderItem, {keyTo: 'orderId'})
  orderItems: OrderItem[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  customer?: Customer;
  orderItems?: OrderItem[];
}

export type OrderWithRelations = Order & OrderRelations;
