import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateExampleDto } from 'src/modules/example/dto/create-example.dto';
import { ExampleSummaryDto } from 'src/modules/example/dto/example-summary.dto';
import { Example } from 'src/modules/example/entities/example.entity';
import { ExampleService } from './example.service';

@ApiTags('Example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new example' })
  @ApiBody({
    type: CreateExampleDto,
    description: 'Payload for creating a new example object.',
    examples: {
      exampleData: {
        summary: 'Basic example object',
        value: {
          name: 'example name',
          description: 'example description',
          count: 1,
          price: 1.0,
          isActive: true,
          metadata: { key: 'value' },
        },
      },
    },
  })
  createExample(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Get()
  @ApiProperty()
  findAll(): Promise<Example[]> {
    return this.exampleService.findAll();
  }

  @Get('summaries')
  @ApiOperation({ summary: 'Get summaries of example data' })
  @ApiResponse({
    status: 200,
    type: [ExampleSummaryDto],
  })
  async getSummaries(): Promise<ExampleSummaryDto[]> {
    return this.exampleService.findAllSummaries();
  }

  @Get(':id')
  @ApiProperty()
  findOne(@Param('id') id: string): Promise<Example> {
    return this.exampleService.findOne(id);
  }

  @Put(':id')
  @ApiProperty()
  @ApiBody({
    type: Example,
    description: 'Update a row in the example table.',
    examples: {
      example1: {
        summary: 'Put to a row in the example table.',
        value: {
          name: 'Sample Name',
          description: 'Sample description',
          count: 1,
          price: '0.00',
          isActive: true,
          metadata: { key: 'value' },
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() example: Partial<Example>,
  ): Promise<Example> {
    return this.exampleService.update(id, example);
  }

  @Delete(':id')
  @ApiProperty()
  remove(@Param('id') id: string): Promise<void> {
    return this.exampleService.remove(id);
  }
}
