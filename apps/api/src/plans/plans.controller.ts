import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { PlansService } from './plans.service';
import { GeneratePlanDto } from './dto/generate-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
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
