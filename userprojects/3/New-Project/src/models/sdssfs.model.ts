import { Column, Entity, Index, JoinColumn, ManyToOne, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { GlobalScopes } from "typeorm-global-scopes";
import { BaseEntityModel } from "./base.model";


//EXTRA_IMPORTS

@GlobalScopes<Sdssfs>([(qb, alias) => qb.andWhere(`${alias}.isActive = 1`)])
@Entity("sdssfs")
export class Sdssfs extends BaseEntityModel {
    


@Column({ nullable: false })
subscrisption_name!: string;



@Column({ nullable: false })
desscription!: string;

}
 