import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";

export class SetStampDto {
    @IsUUID()
    @ApiProperty({ description: 'The ID of the user receiving the stamp' })
    userId: string;

    @IsUUID()
    @ApiProperty({ description: 'The ID of the barista giving the stamp' })
    baristaId: string;

    @IsOptional()
    @ApiProperty({ description: 'The number of stamps to set (default is 1)', required: false })
    @Min(1)
    @Max(100)
    @IsInt()
    stampCount?: number;
}