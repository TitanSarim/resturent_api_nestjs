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
import { UseInterceptors, UploadedFiles } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';

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
    const resturant = await this.resturantsService.findById(id);

    const isDeleted = await this.resturantsService.deleteImages(
      resturant.images,
    );

    if (isDeleted) {
      this.resturantsService.deleteById(id);
      return {
        deleted: true,
      };
    } else {
      return {
        deleted: false,
      };
    }
    //
  }

  @Put('upload/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    await this.resturantsService.findById(id);

    const res = await this.resturantsService.uploadImages(id, files);
    return res;
  }
}
