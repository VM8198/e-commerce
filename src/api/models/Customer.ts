/*
 * spurtcommerce API
 * version 2.1
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, BeforeInsert, BeforeUpdate, ObjectID, ObjectIdColumn, OneToMany} from 'typeorm';
import {BaseModel} from './BaseModel';
import * as bcrypt from 'bcrypt';
import moment = require('moment/moment');
import {Exclude} from 'class-transformer';
import {ProductRating} from './ProductRating';

@Entity('customer')
export class Customer extends BaseModel {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: Customer, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @ObjectIdColumn()
    public id: ObjectID;

    @Column({name: 'first_name'})
    public firstName: string;
  
    @Column({name: 'last_name'})
    public lastName: string;

    @Column({name: 'username'})
    public username: string;
    
    @Column({name: 'password'})
    public password: string;

    @Column({name: 'email'})
    public email: string;

    @Exclude()
    @Column({name: 'mobile'})
    public mobileNumber: number;

    @Column({name: 'address'})
    public address: string;

    @Column({name: 'country_id'})
    public countryId: number;

    @Column({name: 'zone_id'})
    public zoneId: number;

    @Column({name: 'city'})
    public city: string;

    @Column({name: 'avatar'})
    public avatar: string;
    @Exclude()
    @Column({name: 'newsletter'})
    public newsletter: number;

    @Column({name: 'avatar_path'})
    public avatarPath: string;
    @Exclude()
    @Column({name: 'customer_group_id'})
    public customerGroupId: number;

    @Column({name: 'last_login'})
    public lastLogin: string;
    @Exclude()
    @Column({name: 'safe'})
    public safe: number;

    @Column({name: 'ip'})
    public ip: number;
    @Exclude()
    @Column({name: 'mail_status'})
    public mailStatus: number;
    @Exclude()
    @Column({name: 'pincode'})
    public pincode: string;
    @Exclude()
    @Column({name: 'delete_flag'})
    public deleteFlag: number;
    @Exclude()
    @Column({name: 'is_active'})
    public isActive: number;

    @OneToMany(type => ProductRating, productRating => productRating.product)
    public productRating: ProductRating[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
