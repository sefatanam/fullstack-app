import { Controller, Get, HttpStatus } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Products')
@Controller('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'Check running application environment.' })
  @ApiResponse({
    description: `Check running application environment.`,
    status: HttpStatus.OK,
    type: String,
  })
  @Get()
  getData() {
    return this.appService.getData();
  }
}
