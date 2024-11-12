import { Injectable } from '@nestjs/common';
import { mockData } from '../../mockDB/db';
import {
  Data,
  HelloByIdResponse,
  HelloResponse,
} from 'src/modules/hello/interfaces';

@Injectable()
export class HelloService {
  private readonly data: Data[] = mockData;

  getHello(): HelloResponse {
    return {
      status: 'success',
      message: 'Data fetched successfully',
      data: this.data,
    };
  }

  getByIdHello(id: number): HelloByIdResponse {
    const data = this.data.find((item) => item.id === id);
    if (data) {
      return {
        status: 'success',
        message: `Data with ID ${id} found successfully`,
        data,
      };
    } else {
      return {
        status: 'error',
        message: `Data with ID ${id} not found`,
      };
    }
  }

  postHello(newData: Data): HelloResponse {
    this.data.push(newData);
    return {
      status: 'success',
      message: 'Data added successfully',
      data: this.data,
    };
  }

  putHello(id: number, updatedData: Data): HelloResponse {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = updatedData;
      return {
        status: 'success',
        message: `Data with ID ${id} updated successfully`,
        data: this.data,
      };
    } else {
      return {
        status: 'error',
        message: `Data with ID ${id} not found`,
        data: this.data,
      };
    }
  }

  patchHello(id: number, partialData: Partial<Data>): HelloResponse {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...partialData };
      return {
        status: 'success',
        message: `Data with ID ${id} partially updated successfully`,
        data: this.data,
      };
    } else {
      return {
        status: 'error',
        message: `Data with ID ${id} not found`,
        data: this.data,
      };
    }
  }

  deleteHello(id: number): HelloResponse {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return {
        status: 'success',
        message: `Data with ID ${id} deleted successfully`,
        data: this.data,
      };
    } else {
      return {
        status: 'error',
        message: `Data with ID ${id} not found`,
        data: this.data,
      };
    }
  }
}
