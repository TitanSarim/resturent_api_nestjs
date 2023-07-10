/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsPhoneNumber, IsEmail, IsEnum } from 'class-validator';
import { Category } from '../schemas/resturants.scheema';



export class CreateResturantDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({},  {message: 'Please enter correct Email'})
  readonly email: string;

  @IsNotEmpty()
  // @IsPhoneNumber('US', {message: 'Please enter correct Phone no'})
  readonly phoneNo: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, {message: 'Please enter correct category'})
  readonly category: Category;

  readonly images: object[]

}
