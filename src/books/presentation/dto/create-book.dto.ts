import { IsString, IsDate, IsBoolean, IsOptional } from "class-validator";

export class CreateBookDto {
    @IsString()
    title: string;
    
    @IsString()
    author: string;
    
    @IsString()
    isbn: string;
    
    @IsDate()
    @IsOptional()
    publishedDate: Date;
}