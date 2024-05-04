import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:"Yurych",description:'Surname'})
    readonly surname:string;
    @ApiProperty({example:"Vasyl",description:'Name'})
    readonly name:string;
    @ApiProperty({example:"+(380)-566-34-21",description:'Phone number'})
    readonly phoneNumber:string;
    @ApiProperty({example:"yurych@gmail.com",description:'Email'})
    readonly email:string;
    @ApiProperty({example:"yurych6790",description:'Password'})
    readonly password:string;
}