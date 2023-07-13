/* eslint-disable prettier/prettier */
import { User } from 'src/auth/schemas/user.schema';
import { Category } from '../schemas/meal.schema';
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMealDto {

  @IsNotEmpty() 
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, {message: 'Please enter correct category for this meal'})
  readonly category: Category

  @IsNotEmpty()
  @IsString()
  readonly resturant: string

  @IsEmpty({message: 'You cannot provide a user ID'})
  readonly user: User
}
