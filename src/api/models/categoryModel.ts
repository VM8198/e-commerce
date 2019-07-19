/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany,ObjectID,ObjectIdColumn} from 'typeorm';
// import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from './BaseModel';
import moment from 'moment';
import {ProductToCategory} from './ProductToCategory';
@Entity('category')
export class Category extends BaseModel {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    public name: string;

    @Column()
    public image: string;    

    @Column()
    public imagePath: string;

    @Column()
    public parentInt: number;

    @Column()
    public sortOrder: number;

    @Column()
    public metaTagTitle: string;

    @Column()
    public metaTagDescription: string;

    @Column()
    public metaTagKeyword: string;

    @Column()
    public isActive: number;

    @OneToMany(type => ProductToCategory, productToCategory => productToCategory.category)
    public productToCategory: ProductToCategory[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
