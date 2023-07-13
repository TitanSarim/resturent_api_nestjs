/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Resturant } from 'src/resturants/schemas/resturants.scheema';

export enum Category {
  SOUPS = 'Soups',
  SALADS = 'Salads',
  SANDWICHES = 'Sandwiches',
  PASTS = 'Pasta',
}

@Schema({
  timestamps: true,
})
export class Meal {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Resturant'})
  resturant: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User
}

export const MealSchema = SchemaFactory.createForClass(Meal)