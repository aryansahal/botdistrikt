import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MenuItem} from '../models';
import {MenuItemRepository} from '../repositories';

export class MenuItemControllerController {
  constructor(
    @repository(MenuItemRepository)
    public menuItemRepository : MenuItemRepository,
  ) {}

  @post('/menu-items')
  @response(200, {
    description: 'MenuItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(MenuItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MenuItem, {
            title: 'NewMenuItem',
            exclude: ['id'],
          }),
        },
      },
    })
    menuItem: Omit<MenuItem, 'id'>,
  ): Promise<MenuItem> {
    return this.menuItemRepository.create(menuItem);
  }

  @get('/menu-items/count')
  @response(200, {
    description: 'MenuItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MenuItem) where?: Where<MenuItem>,
  ): Promise<Count> {
    return this.menuItemRepository.count(where);
  }

  @get('/menu-items')
  @response(200, {
    description: 'Array of MenuItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MenuItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MenuItem) filter?: Filter<MenuItem>,
  ): Promise<MenuItem[]> {
    return this.menuItemRepository.find(filter);
  }

  @patch('/menu-items')
  @response(200, {
    description: 'MenuItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MenuItem, {partial: true}),
        },
      },
    })
    menuItem: MenuItem,
    @param.where(MenuItem) where?: Where<MenuItem>,
  ): Promise<Count> {
    return this.menuItemRepository.updateAll(menuItem, where);
  }

  @get('/menu-items/{id}')
  @response(200, {
    description: 'MenuItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MenuItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MenuItem, {exclude: 'where'}) filter?: FilterExcludingWhere<MenuItem>
  ): Promise<MenuItem> {
    return this.menuItemRepository.findById(id, filter);
  }

  @patch('/menu-items/{id}')
  @response(204, {
    description: 'MenuItem PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MenuItem, {partial: true}),
        },
      },
    })
    menuItem: MenuItem,
  ): Promise<void> {
    await this.menuItemRepository.updateById(id, menuItem);
  }

  @put('/menu-items/{id}')
  @response(204, {
    description: 'MenuItem PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() menuItem: MenuItem,
  ): Promise<void> {
    await this.menuItemRepository.replaceById(id, menuItem);
  }

  @del('/menu-items/{id}')
  @response(204, {
    description: 'MenuItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.menuItemRepository.deleteById(id);
  }
}
