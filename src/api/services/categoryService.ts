/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

 import { Service } from 'typedi';
 import { OrmRepository } from 'typeorm-typedi-extensions';
 import { Logger, LoggerInterface } from '../../decorators/Logger';
 import { Category } from '../models/categoryModel';
 import { CategoryRepository } from '../repositories/categoryRepository';
 // import {Like} from 'typeorm/index';
  import {getManager} from "typeorm";


 @Service()
 export class CategoryService {

     constructor(@OrmRepository() private categoryRepository: CategoryRepository,
         @Logger(__filename) private log: LoggerInterface) {
     }
     // create Category
     public async create(category: any): Promise<Category> {
         this.log.info('Create a new category => ', category.toString());
         return this.categoryRepository.save(category);
     }
     // findone category
     public findOne(category: any): Promise<any> {
         return this.categoryRepository.findOne(category);
     }

     // delete Category
     public async delete(id: number): Promise<any> {
         this.log.info('Delete a user');
         await this.categoryRepository.delete(id);
         return;
     }
     // categoryList
     public async list(limit: any, offset: any, sortOrder: number,keyword:any, count: number | boolean): Promise<any> {
         console.log("limit",limit);
         const manager = getManager(); // or connection.manager
         const categoryData = await manager.find(Category, {});
     
         return categoryData;
     }

     // find category
     public find(category: any): Promise<any> {
         return this.categoryRepository.find(category);
     }
 }
