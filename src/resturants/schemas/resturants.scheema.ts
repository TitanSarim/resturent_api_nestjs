/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Location{

  @Prop({type: String, enum: ['Point']})
  type: string

  @Prop({index: '2dsphere'})
  coordinates: number[]

  formattedAddress: string
  city: string
  state: string
  zipcode: string
  country: string
}


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
    images?: object[]

    @Prop({type: Object, ref: 'Location'})
    location?: Location

}

export const ResturantSchema = SchemaFactory.createForClass(Resturant)