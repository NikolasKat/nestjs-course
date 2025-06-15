import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { In, Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { ActorEntity } from "src/actor/entities/actor.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: { isPublic: true },
      order: { createdAt: "asc" },
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ["actors"],
    });

    if (!movie) throw new NotFoundException("Фильм не найден");

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const { tittle, releaseYear, actorIds } = dto;

    const actors = await this.actorRepository.find({
      where: { id: In(actorIds) },
    });

    if (!actors || !actors.length)
      throw new NotFoundException("Actors are not found");

    const movie = this.movieRepository.create({ tittle, releaseYear, actors });

    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: CreateMovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    Object.assign(movie, dto);

    await this.movieRepository.save(movie);

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const movie = await this.findById(id);

    await this.movieRepository.remove(movie);

    return true;
  }
}
