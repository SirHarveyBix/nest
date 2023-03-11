import { IsString } from 'class-validator';

//DTO : Data Transfert Object
export class CreateMessageDto {
  @IsString()
  content: string;
}
