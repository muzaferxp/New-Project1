import { Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntityModel } from "./base.model";

export class BaseUser extends BaseEntityModel {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  initials: string = "";
  
  @Column({ nullable: true })
  email!: string;
}
