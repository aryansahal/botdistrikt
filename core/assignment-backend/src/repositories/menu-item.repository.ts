import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MenuItem, MenuItemRelations} from '../models';

export class MenuItemRepository extends DefaultCrudRepository<
  MenuItem,
  typeof MenuItem.prototype.id,
  MenuItemRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MenuItem, dataSource);
  }
}
