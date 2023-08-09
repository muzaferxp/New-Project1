import { Column, Entity, Index, JoinColumn, ManyToOne, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { GlobalScopes } from "typeorm-global-scopes";
import { BaseEntityModel } from "./base.model";


//EXTRA_IMPORTS

@GlobalScopes<Sdfs>([(qb, alias) => qb.andWhere(`${alias}.isActive = 1`)])
@Entity("sdfs")
export class Sdfs extends BaseEntityModel {
    


@Column({ nullable: false })
subscription_name!: string;



@Column({ nullable: false })
description!: string;

}
 