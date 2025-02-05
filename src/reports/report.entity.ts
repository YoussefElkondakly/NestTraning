import User from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column()
  mileage: number;
  @Column()
  lng: number;
  @Column()
  lat: number;
  @Column()
  price: number;
  @Column(
{    default:false
}  )
  approved:boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
