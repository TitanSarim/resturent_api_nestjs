/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  FAST_FOOD = 'Fast Food',
  CAFE = 'Cafe',
  FINE_DINNING = 'Find Dinning',
}

@Schema()
export class Resturant {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    email: string

    @Prop()
    phoneNo: number

    @Prop()
    address: string

    @Prop()
    category: Category

    @Prop()
    images: object[]

}

export const ResturantSchema = SchemaFactory.createForClass(Resturant)