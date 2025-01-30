import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RoleService {
  private readonly ISSUER: string;
  private readonly ZITADEL_QASAR_PROJECT_ID: string;

  constructor(private configService: ConfigService) {
    this.ISSUER = this.configService.get<string>("ISSUER");
    this.ZITADEL_QASAR_PROJECT_ID = this.configService.get<string>(
      "ZITADEL_QASAR_PROJECT_ID"
    );
  }

  async create(createRoleDto: CreateRoleDto, token: string) {
    try {
      const response = await axios.post(
        `${this.ISSUER}/management/v1/projects/${this.ZITADEL_QASAR_PROJECT_ID}/roles`,
        createRoleDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json", //
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || "Error creating role",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(roleKey: string, updateRoleDto: UpdateRoleDto, token: string) {
    try {
      const response = await axios.put(
        `${this.ISSUER}/management/v1/projects/${this.ZITADEL_QASAR_PROJECT_ID}/roles/${roleKey}`,
        updateRoleDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || "Error updating role",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(roleKey: string, token: string) {
    try {
      const response = await axios.delete(
        `${this.ISSUER}/management/v1/projects/${this.ZITADEL_QASAR_PROJECT_ID}/roles/${roleKey}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || "Error deleting role",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async read(token: string) {
    try {
      const response = await axios.post(
        `${this.ISSUER}/management/v1/projects/${this.ZITADEL_QASAR_PROJECT_ID}/roles/_search`,
        {
          query: {
            offset: "0",
            limit: 100,
            asc: true
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || "Error reading roles",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
