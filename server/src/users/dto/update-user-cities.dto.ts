// users/dto/update-user-cities.dto.ts
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateUserCitiesDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  cityIds: string[];
}
