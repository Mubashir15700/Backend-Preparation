import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  // This will be called after the application initializes
  async onModuleInit() {
    const isConnected = await this.checkDatabaseConnection();
    if (isConnected) {
      console.log('Database is connected!');
    } else {
      console.log('Database connection failed!');
    }
  }

  private async checkDatabaseConnection(): Promise<boolean> {
    try {
      // Try running a simple query to check if the DB is reachable
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Error connecting to the database:', error);
      return false;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
