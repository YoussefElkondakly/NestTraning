import Report from "src/reports/report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email:string;
    
    @Column()
    password:string;
    @Column({default:false})
    admin:boolean
@OneToMany(()=>Report,//Our user is going to be associated with something with type report
(report)=>report.user //
)

reports: Report[];
}