import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
  imports: [RecipesModule],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
