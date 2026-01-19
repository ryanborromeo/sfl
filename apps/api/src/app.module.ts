import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [PrismaModule, RecipesModule, PlansModule],
})
export class AppModule {}
