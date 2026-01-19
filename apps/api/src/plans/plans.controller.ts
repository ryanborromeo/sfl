import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlansService } from './plans.service';

interface GeneratePlanDto {
  days: number;
  tagsInclude?: string[];
  tagsExclude?: string[];
  excludeIngredients?: string[];
  maxCookTimeMins?: number;
}

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post('generate')
  async generate(@Body() dto: GeneratePlanDto) {
    return this.plansService.generate(dto);
  }

  @Get(':shareCode')
  async findByShareCode(@Param('shareCode') shareCode: string) {
    return this.plansService.findByShareCode(shareCode);
  }

  @Get(':shareCode/grocery-list')
  async getGroceryList(@Param('shareCode') shareCode: string) {
    return this.plansService.getGroceryList(shareCode);
  }
}
