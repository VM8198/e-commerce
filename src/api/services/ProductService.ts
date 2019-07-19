/*
 * spurtcommerce API
 * version 2.1
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

 import {Service} from 'typedi';
 import {OrmRepository} from 'typeorm-typedi-extensions';
 import {Logger, LoggerInterface} from '../../decorators/Logger';
 import {Product} from '../models/ProductModel';
 import {ProductRepository} from '../repositories/ProductRepository';
 // import {Like} from 'typeorm';
 import {getManager} from "typeorm";

 @Service()
 export class ProductService {

     constructor(@OrmRepository() private productRepository: ProductRepository,
         @Logger(__filename) private log: LoggerInterface) {
     }

     // find product
     public find(product: any): Promise<any> {
         return this.productRepository.find(product);
     }

     // find one product
     public findOne(findCondition: any): Promise<any> {
         this.log.info('Find all product');
         return this.productRepository.findOne(findCondition);
     }

     // product list
     public async list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean): Promise<any> {
         // const condition: any = {};

        

     }

     // create product
     public async create(product: Product): Promise<Product> {
         const newProduct = await this.productRepository.save(product);
         return newProduct;
     }

     // update product
     public update(id: any, product: Product): Promise<Product> {
         this.log.info('Update a product');
         return this.productRepository.save(product);
     }

     // delete product
     public async delete(id: number): Promise<any> {
         this.log.info('Delete a product');
         const newProduct = await this.productRepository.delete(id);
         return newProduct;
     }

     // product list
     public async productList(): Promise<any> {
         // return await this.productRepository.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);

          const manager = getManager(); // or connection.manager
         const productData = await manager.find(Product, {});
         console.log("productData",productData);
         return productData;
     }

     // Recent selling product
     public async recentProductSelling(limit: number): Promise<any> {
         return await this.productRepository.recentProductSelling(limit);
     }

     // Maximum Product price
     public async productMaxPrice(maximum: any): Promise<any> {
         return await this.productRepository.productMaxPrice(maximum);
     }
 }
