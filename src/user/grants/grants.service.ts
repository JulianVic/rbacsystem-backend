import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGrantDto } from './dto/create-grant.dto';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SearchGrantsDto } from './dto/search-grants.dto';

@Injectable()
export class GrantsService {
  private readonly ISSUER: string;

  constructor(private configService: ConfigService) {
    this.ISSUER = this.configService.get<string>('ISSUER');
  }

  async create(userId: string, createGrantDto: CreateGrantDto, token: string) {
    try {
      const response = await axios.post(
        `${this.ISSUER}/management/v1/users/${userId}/grants`,
        createGrantDto,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error creating grant',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(searchGrantsDto: SearchGrantsDto, token: string) {
    try {
      const response = await axios.post(
        `${this.ISSUER}/management/v1/users/grants/_search`,
        searchGrantsDto,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error searching grants',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(userId: string, grantId: string, token: string) {
    try {
      const response = await axios.get(
        `${this.ISSUER}/management/v1/users/${userId}/grants/${grantId}`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error fetching grant',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async update(userId: string, grantId: string, updateGrantDto: UpdateGrantDto, token: string) {
    try {
      const response = await axios.put(
        `${this.ISSUER}/management/v1/users/${userId}/grants/${grantId}`,
        updateGrantDto,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error updating grant',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(userId: string, grantId: string, token: string) {
    try {
      const response = await axios.delete(
        `${this.ISSUER}/management/v1/users/${userId}/grants/${grantId}`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error removing grant',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
