import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";


export class ClearStampDto {
    @IsUUID()
    @ApiProperty({ description: 'The ID of the user whose stamps will be cleared' })
    userId: string;

    @IsUUID()
    @ApiProperty({ description: 'The ID of the cafe where stamps will be cleared' })
    cafeId: string;
}