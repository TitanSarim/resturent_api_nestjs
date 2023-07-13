import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from './schemas/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { currentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meals')
export class MealController {
  constructor(private mealService: MealService) {}

  @Post()
  @UseGuards(AuthGuard())
  createMeal(
    @Body() createMealDto: CreateMealDto,
    @currentUser() user: User,
  ): Promise<Meal> {
    return this.mealService.create(createMealDto, user);
  }

  @Get()
  async getAllMeals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Get('resturant/:id')
  async getMealsByResturant(@Param('id') id: string): Promise<Meal[]> {
    return this.mealService.findByResturant(id);
  }

  @Get(':id')
  async getMeal(@Param('id') id: string): Promise<Meal> {
    return this.mealService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateMeal(
    @Body() updateMealDto: UpdateMealDto,
    @Param('id') id: string,
    @currentUser() user: User,
  ): Promise<Meal> {
    const meal = await this.mealService.findById(id);
    return this.mealService.updateById(id, updateMealDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteMeal(
    @Param('id')
    id: string,
  ): Promise<{ deleted: boolean }> {
    const meal = await this.mealService.findById(id);
    return this.mealService.deleteMeal(id);
  }
}
