import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'The root endpoint that returns a hello world message.',
  })
  @ApiResponse({ status: 200, description: 'Hello world message' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getHello() {
    return {
      timestamp: new Date().toISOString(),
      greeting: 'Welcome to the famboard API!',
      message: 'This is the backend API for famboard app.',
      environment: process.env.NODE_ENV || 'development',
      docsURL: 'v1/swagger',
      endpoints: {
        version: 'v1/version',
        health: 'v1/health',
      },
    };
  }

  @Get('version')
  @ApiOperation({ summary: 'Get API version information' })
  getStatus() {
    return {
      version: '0.1.1',
    };
  }
}
