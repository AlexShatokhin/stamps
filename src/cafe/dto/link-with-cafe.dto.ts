import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LinkWithCafeDto {
    
    @IsString()
    @ApiProperty({description: ""})
    cafeSlug: string;

    
    @IsString()
    @ApiProperty({description: ""})
    userId: string;

}