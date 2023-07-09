/* eslint-disable prettier/prettier */
import { Category } from '../schemas/resturants.scheema';

export class CreateResturantDto {
  readonly name: string;

  readonly description: string;

  readonly email: string;

  readonly phoneNo: number;

  readonly address: string;

  readonly category: Category;

  readonly images: object[]

}
