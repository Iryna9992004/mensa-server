import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start(){
    const app=await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    const config=new DocumentBuilder()
    .setTitle('Mensa')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('Mensa Candle')
    .build()

    const document=SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs',app,document)

    app.listen(process.env.PORT, ()=>console.log(`Server started on port = ${process.env.PORT}`))
}

start();