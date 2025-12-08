import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        const oneMb = 1024 * 1024; 

        if (!value) 
            throw new BadRequestException('Файл не был загружен');
        

        if(value.size > oneMb)
            throw new BadRequestException("Размер файла слишком большой. Макс. размер: 1Mb")
    
        return value
    }
}