import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resturant } from './schemas/resturants.scheema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ResturantsService {
  constructor(
    @InjectModel(Resturant.name)
    private resturantModel: mongoose.Model<Resturant>,
  ) {}

  //   get All resturants => Get /resturants
  async findAll(query: Query): Promise<Resturant[]> {
    const resPerPage = 1;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const resturants = await this.resturantModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return resturants;
  }

  //   Create new Resturant => Post /resturants
  async create(resturant: Resturant): Promise<Resturant> {
    const res = await this.resturantModel.create(resturant);

    return res;
  }

  //   Get Resturant by id => GET  /resturant/:id
  async findById(id: string): Promise<Resturant> {
    const isVlaidId = mongoose.isValidObjectId(id);

    if (!isVlaidId) {
      throw new NotFoundException('Resturant with this ID not Found');
    }

    const resturant = await this.resturantModel.findById(id);

    if (!resturant) {
      throw new NotFoundException('Resturant Not Found');
    }

    return resturant;
  }

  // Get Resturant by id => PUT /resturant/:id
  async updateById(id: string, resturant: Resturant): Promise<Resturant> {
    const updatedResturant = await this.resturantModel.findOneAndUpdate(
      { _id: id },
      resturant,
      { new: true, runValidators: true },
    );

    if (!updatedResturant) {
      throw new NotFoundException('Resturant Not Found');
    }

    return updatedResturant;
  }

  // Delete Resturant by id => Delete /resturant/:id
  async deleteById(id: string): Promise<Resturant> {
    return await this.resturantModel.findByIdAndDelete(id);
  }
}
