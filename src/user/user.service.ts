import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
  private readonly ISSUER: string;
  private readonly ZITADEL_QASAR_PROJECT_ID: string;

  constructor(private configService: ConfigService) {
    this.ISSUER = this.configService.get<string>("ISSUER");
    this.ZITADEL_QASAR_PROJECT_ID = this.configService.get<string>(
      "ZITADEL_QASAR_PROJECT_ID"
    );
  }

  async create(createUserDto: CreateUserDto, token: string) {
    try{
      const response = await axios.post(
        `${this.ISSUER}/v2/users/human`,
        createUserDto,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );//
      return response.data;
    }catch (error){
      throw new HttpException(
        error.response?.data?.message || "Error creating user",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(token: string) {
    try{
      const response = await axios.post(
        `${this.ISSUER}/v2/users`,
        {
          query: {
            offset: "0",
            limit: 100,
            asc: true
          }
        },//
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        }
      );
      return response.data;
    }catch (error){
      console.log(error);
      throw new HttpException(
        error.response?.data?.message || "Error fetching users",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, token: string) {
    try{
      const response = await axios.put(
        `${this.ISSUER}/v2/users/human/${id}`,
        updateUserDto,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        }
      );
      return response.data;
    }catch (error){
      throw new HttpException(
        error.response?.data?.message || "Error updating user",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: string, token: string) {
    try{
      console.log(token);
      const response = await axios.delete(
        `${this.ISSUER}/v2/users/${id}`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        }
      );
      return response.data;
    }catch (error){
      throw new HttpException(
        error.response?.data?.message || "Error deleting user",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
