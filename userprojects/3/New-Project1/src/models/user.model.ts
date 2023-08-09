import { Entity, Column } from "typeorm";
import { GlobalScopes } from "typeorm-global-scopes";
import { Role } from "../enums";
import { BaseUser } from "./base-user.model";
@GlobalScopes<User>([(qb, alias) => qb.andWhere(`${alias}.isActive = 1`)])
@Entity("user")
export class User extends BaseUser {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: "phone_number", unique: true })
  phoneNumber!: string;

  @Column({ type: "enum", enum: Role })
  role!: Role;


  @Column({ nullable: true, default: null })
  fcm!: string;

  @Column()
  state: string = "Chhattisgarh";

  @Column({ default: "" })
  pinCode!: string;

  @Column()
  country: string = "India";

}
