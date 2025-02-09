import { Column, Entity } from "typeorm";

@Entity()
export class User {
    @Column({primary:true, generated:true})
    id: Number; 

    @Column()
    fname: string;
    
    @Column({ nullable: true })
    sname: string;
    @Column({ nullable: true })
    flastname: string;
    @Column({ nullable: true })
    slastname: string;
    @Column({unique:true})
    email: string;
    @Column()
    password: string;
}
