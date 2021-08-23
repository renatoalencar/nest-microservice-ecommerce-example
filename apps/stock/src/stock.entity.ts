import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  sku: string

  @Column()
  name: string

  @Column()
  description: string

  @Column('int', { default: 0 })
  quantity: number

  @Column('int', { default: 0 })
  available: number

  /* This is the cost of purchasing the product from the provider */
  @Column('decimal')
  price: number
}
