import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsArray,
  IsString,
  ArrayMaxSize,
  MaxLength,
} from 'class-validator';

export class GeneratePlanDto {
  @IsInt({ message: 'Days must be a whole number' })
  @Min(1, { message: 'Days must be at least 1' })
  @Max(7, { message: 'Days cannot exceed 7' })
  days: number;

  @IsOptional()
  @IsArray({ message: 'Tags include must be an array' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @ArrayMaxSize(10, { message: 'Cannot include more than 10 tags' })
  tagsInclude?: string[];

  @IsOptional()
  @IsArray({ message: 'Tags exclude must be an array' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @ArrayMaxSize(10, { message: 'Cannot exclude more than 10 tags' })
  tagsExclude?: string[];

  @IsOptional()
  @IsArray({ message: 'Exclude ingredients must be an array' })
  @IsString({ each: true, message: 'Each ingredient must be a string' })
  @ArrayMaxSize(50, { message: 'Cannot exclude more than 50 ingredients' })
  @MaxLength(100, { each: true, message: 'Ingredient name too long' })
  excludeIngredients?: string[];

  @IsOptional()
  @IsInt({ message: 'Max cook time must be a whole number' })
  @Min(5, { message: 'Max cook time must be at least 5 minutes' })
  @Max(180, { message: 'Max cook time cannot exceed 180 minutes' })
  maxCookTimeMins?: number;
}
