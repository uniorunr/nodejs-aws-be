import { 
  Injectable,
  HttpStatus 
} from '@nestjs/common';

@Injectable()
export class AppService {
  checkConnection(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'Everything is OK!',
    };
  }
}