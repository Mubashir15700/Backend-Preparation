import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // Define a cron job that runs every minute (* * * * *)
  @Cron('* * * * *')
  handleCron() {
    console.log('This cron job runs every minute!');
  }
}
