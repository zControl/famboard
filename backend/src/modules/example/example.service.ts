import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExampleDto } from 'src/modules/example/dto/create-example.dto';
import { ExampleSummaryDto } from 'src/modules/example/dto/example-summary.dto';
import { Example } from 'src/modules/example/entities/example.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {}

  async create(createExampleDto: CreateExampleDto): Promise<Example> {
    const newExample = this.exampleRepository.create(createExampleDto);
    return this.exampleRepository.save(newExample);
  }

  findAll(): Promise<Example[]> {
    return this.exampleRepository.find();
  }

  findOne(id: string): Promise<Example> {
    return this.exampleRepository.findOneBy({ id });
  }

  async update(id: string, updatedExample: Partial<Example>): Promise<Example> {
    await this.exampleRepository.update(id, updatedExample);
    return this.exampleRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.exampleRepository.delete(id);
  }

  async findAllSummaries(): Promise<ExampleSummaryDto[]> {
    return this.exampleRepository.find({
      select: ['name', 'count', 'isActive'],
    });
  }
}
