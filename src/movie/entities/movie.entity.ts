import { ReviewEntity } from "src/review/entities/review.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum Genre {
  ACTION = "action",
  COMEDY = "comedy",
  DRAMA = "drama",
  HORROR = "horror",
}

@Entity({ name: "movies" })
export class MovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tittle: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "enum", enum: Genre, default: Genre.DRAMA })
  genre: Genre;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @Column({ type: "int", unsigned: true })
  releaseYear: number;

  @Column({ type: "boolean", default: false })
  isPublic: boolean;

  @CreateDateColumn({ type: "date", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date", name: "updated_at" })
  updatedAt: Date;
}
