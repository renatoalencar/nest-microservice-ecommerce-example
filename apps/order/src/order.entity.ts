import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { User } from '../user/user.entity'
import { OrderItem } from './order-item.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, user => user.orders)
  user: User

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  items: OrderItem[]

  @Column('decimal')
  total: number
}
