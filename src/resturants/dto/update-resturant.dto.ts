/* eslint-disable prettier/prettier */
import { Category } from '../schemas/resturants.scheema';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateResturantDto {

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEmail({},  {message: 'Please enter correct Email'})
  @IsOptional()
  readonly email: string;

  // @IsPhoneNumber('US', {message: 'Please enter correct Phone no'})
  @IsOptional()
  readonly phoneNo: number;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Category, {message: 'Please enter correct category'})
  @IsOptional()
  readonly category: Category;

  readonly images: object[]

}
