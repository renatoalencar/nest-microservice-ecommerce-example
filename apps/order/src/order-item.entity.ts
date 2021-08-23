import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Order } from './order.entity'
import { Product } from '../product/product.entity'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Product)
  product: Product

  @ManyToOne(() => Order, order => order.items)
  order: Order

  @Column('int')
  quantity: number
}
