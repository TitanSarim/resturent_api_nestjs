import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, * as Mongoose from 'mongoose';
import { Meal } from './schemas/meal.schema';
import { Resturant } from 'src/resturants/schemas/resturants.scheema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name)
    private mealModel: Mongoose.Model<Meal>,

    @InjectModel(Resturant.name)
    private resturantModel: Mongoose.Model<Resturant>,
  ) {}

  // Get all meals = Get /meals
  async findAll(): Promise<Meal[]> {
    const meals = await this.mealModel.find();
    return meals;
  }

  // Get all meals of resturant = Get /meals/:resturant
  async findByResturant(id: string): Promise<Meal[]> {
    const meals = await this.mealModel.find({ resturant: id });
    return meals;
  }

  // create a new Meal => POST /meals/:resturant
  async create(meal: Meal, user: User): Promise<Meal> {
    const data = Object.assign(meal, { user: user._id });

    // Saving mealID in the restuant menu
    const resturant = await this.resturantModel.findById(meal.resturant);

    if (!resturant) {
      throw new NotFoundException('Resturant not found with this id');
    }

    // check ownership of the resturant
    // if (
    //   !resturant.user ||
    //   !user._id ||
    //   resturant.user.toString() !== user._id.toString()
    // ) {
    //   throw new ForbiddenException('You cannot add meal to this resturant');
    // }

    const mealCreated = await this.mealModel.create(data);

    resturant.menu.push(mealCreated);
    await resturant.save();

    return mealCreated;
  }

  // Get a meal with ID => Get /meals/:id
  async findById(id: string): Promise<Meal> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Wrong Id error');
    }
    const meal = await this.mealModel.findById(id);

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return meal;
  }

  //  Update a meal with ID => PUT /meals/:id
  async updateById(id: string, meal: Meal): Promise<Meal> {
    return await this.mealModel.findByIdAndUpdate(id, meal, {
      new: true,
      runValidators: true,
    });
  }

  // Delete meal bu ID => Delete /meals/:id
  async deleteMeal(id: string): Promise<{ deleted: boolean }> {
    const res = await this.mealModel.findByIdAndDelete(id);
    if (res) return { deleted: true };
    return { deleted: false };
  }
}
