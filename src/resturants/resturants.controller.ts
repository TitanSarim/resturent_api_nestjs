import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateResturantDto } from './dto/create-resturant.dto';
import { UpdateResturantDto } from './dto/update-resturant.dto';
import { ResturantsService } from './resturants.service';
import { Resturant } from './schemas/resturants.scheema';

@Controller('resturants')
export class ResturantsController {
  constructor(private resturantsService: ResturantsService) {}

  @Get()
  async getAllResturants(@Query() query: ExpressQuery): Promise<Resturant[]> {
    return this.resturantsService.findAll(query);
  }

  @Post()
  async createResturant(
    @Body()
    resturant: CreateResturantDto,
  ): Promise<Resturant> {
    return this.resturantsService.create(resturant);
  }

  @Get(':id')
  async getResturant(
    @Param('id')
    id: string,
  ): Promise<Resturant> {
    return this.resturantsService.findById(id);
  }

  @Put(':id')
  async updateResturant(
    @Param('id')
    id: string,
    @Body()
    resturant: UpdateResturantDto,
  ): Promise<Resturant> {
    return this.resturantsService.updateById(id, resturant);
  }

  @Delete(':id')
  async deleteResturant(
    @Param('id')
    id: string,
  ): Promise<{ deleted: boolean }> {
    const resturant = this.resturantsService.deleteById(id);

    if (resturant) {
      return {
        deleted: true,
      };
    }
  }
}
