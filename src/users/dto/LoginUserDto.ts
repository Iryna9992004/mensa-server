import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto{
    @ApiProperty({example:'a@gmail.com', description:'Email'})
    readonly email:string;

    @ApiProperty({example:'a4hjUUUL', description:'Password'})
    readonly password:string;
}