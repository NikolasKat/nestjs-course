import { ActorEntity } from "src/actor/entities/actor.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: "movie_actors",
    joinColumn: { name: "movie_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "actor_id", referencedColumnName: "id" },
  })
  actors: ActorEntity[];

  @Column({ type: "int", unsigned: true })
  releaseYear: number;

  @Column({ type: "boolean", default: false })
  isPublic: boolean;

  @CreateDateColumn({ type: "date", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date", name: "updated_at" })
  updatedAt: Date;
}
