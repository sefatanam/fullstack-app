import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return {
      message: `App running in ${
        environment.production ? 'production' : 'development'
      } environment.`,
    };
  }
}
