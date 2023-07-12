/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsPhoneNumber, IsEmail, IsEnum, IsEmpty } from 'class-validator';
import { Category } from '../schemas/resturants.scheema';
import { User } from 'src/auth/schemas/user.schema';



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

  @IsEmpty({message: 'You cannot provide the user ID'})
  readonly user: User

}
