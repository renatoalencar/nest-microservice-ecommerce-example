import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
//import { Order } from '../order/order.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  //@OneToMany(() => Order, order => order.user)
  //orders: Order[]
}
