import {Entity, model, property, hasMany} from '@loopback/repository';
import {OrderItem} from './order-item.model';

@model()
export class MenuItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  image?: string;

  @hasMany(() => OrderItem)
  orderItems: OrderItem[];

  constructor(data?: Partial<MenuItem>) {
    super(data);
  }
}

export interface MenuItemRelations {
  // describe navigational properties here
}

export type MenuItemWithRelations = MenuItem & MenuItemRelations;
