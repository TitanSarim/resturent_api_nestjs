import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resturant } from './schemas/resturants.scheema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import APIFeatures from '../utils/apiFeatures.utils';
import { ignoreElements } from 'rxjs';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ResturantsService {
  constructor(
    @InjectModel(Resturant.name)
    private resturantModel: mongoose.Model<Resturant>,
  ) {}

  //   get All resturants => Get /resturants
  async findAll(query: Query): Promise<Resturant[]> {
    const resPerPage = 3;
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
  async create(resturant: Resturant, user: User): Promise<Resturant> {
    const location = await APIFeatures.getResturantLocation(resturant.address);
    console.log(location);

    const data = Object.assign(resturant, { user: user._id, location });

    const res = await this.resturantModel.create(data);

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

  // upload images => PUT /resturants/upload/:id
  async uploadImages(id, files) {
    const images = await APIFeatures.upload(files);

    const resturant = await this.resturantModel.findByIdAndUpdate(
      id,
      {
        // eslint-disable-next-line @typescript-eslint/ban-types
        images: images as Object[],
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return resturant;
  }

  // delete images => delete /resturants/:id
  async deleteImages(images) {
    if (images.length === 0) return true;
    const res = await APIFeatures.deleteImages(images);
    return res;
  }
}
