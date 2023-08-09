import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntityModel {
  @Index({unique:true})
  @PrimaryColumn({ nullable: false })
  id: string = randomUUID();

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @Column({ name: "created_by" })
  createdBy!: string;

  @Column({ name: "updated_by" })
  updatedBy!: string;

  @Column({ default: true, name: "is_active" })
  isActive!: boolean;

  @Column({ default: false, name: "is_deleted", select: false })
  isDeleted!: boolean;
}
