import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { LoggingInterceptor } from './common/interceptors';
import { FileSizeValidationPipe } from './common/pipes/file-size.pipe';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, 
		{cors: 
			{
				origin: [
					"http://localhost:3000"
				],
				credentials: true
			}
		});

	app.useGlobalInterceptors(new LoggingInterceptor())
	app.useGlobalPipes(new ValidationPipe(), new FileSizeValidationPipe());
	app.use(cookieParser());
	
	const config = new DocumentBuilder()
		.setTitle('Stamps api')
		.setDescription('API для управления штампами и кафе')
		.setVersion('0.1')
		.addTag('stamps')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
