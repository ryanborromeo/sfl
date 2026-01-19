import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findAll(
    @Query('tags') tags?: string,
    @Query('maxCookTimeMins') maxCookTimeMins?: string,
    @Query('excludeIngredients') excludeIngredients?: string,
  ) {
    return this.recipesService.findAll({
      tags: tags ? tags.split(',') : undefined,
      maxCookTimeMins: maxCookTimeMins ? parseInt(maxCookTimeMins, 10) : undefined,
      excludeIngredients: excludeIngredients ? excludeIngredients.split(',') : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }
}
