import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as yup from "yup";

export const jokeSchema = yup.object().shape({
  titel: yup.string().required(),
  text: yup.string().required(),
  //....
});



@Entity()
export class Joke {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  titel!: string;

  @Column()
  text!: string;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updateAt?: string;

  @Column({default: true})
  visible?: boolean;

  @Column({default: 0})
  funniness?: number;

}
