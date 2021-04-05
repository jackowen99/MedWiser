import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500})
    templateName: string;

    @Column({ length: 500})
    username: string;

    @Column()
    isPublic: boolean;

    @Column({
        type:"jsonb"
    })
    templateDetail:any
}
