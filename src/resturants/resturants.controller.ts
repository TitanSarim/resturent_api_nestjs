import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateResturantDto } from './dto/create-resturant.dto';
import { UpdateResturantDto } from './dto/update-resturant.dto';
import { ResturantsService } from './resturants.service';
import { Resturant } from './schemas/resturants.scheema';
import {
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('resturants')
export class ResturantsController {
  constructor(private resturantsService: ResturantsService) {}

  @Get()
  async getAllResturants(@Query() query: ExpressQuery): Promise<Resturant[]> {
    return this.resturantsService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async createResturant(
    @Body()
    resturant: CreateResturantDto,
    @currentUser() user: User,
  ): Promise<Resturant> {
    return this.resturantsService.create(resturant, user);
  }

  @Get(':id')
  async getResturant(
    @Param('id')
    id: string,
  ): Promise<Resturant> {
    return this.resturantsService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateResturant(
    @Param('id')
    id: string,
    @Body()
    resturant: UpdateResturantDto,
    @currentUser() user: User,
  ): Promise<Resturant> {
    const res = await this.resturantsService.findById(id);

    if (res.user !== user.id) {
      throw new ForbiddenException('You Update this resturant.');
    }

    return this.resturantsService.updateById(id, resturant);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
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
