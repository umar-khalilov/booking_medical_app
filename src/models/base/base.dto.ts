import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    MaxLength,
} from 'class-validator';

export class BaseDto {
    @ApiProperty({
        example: 'Arnold Schwarzenegger',
        description: 'The name',
        required: true,
    })
    @Length(3, 450, {
        message: 'name cannot be less 3 and more than 450 characters',
    })
    @IsString({ message: 'name must be a string value' })
    @IsNotEmpty({ message: 'name cannot be an empty value' })
    readonly name: string;

    @ApiProperty({
        example: 'arnold-classic@gmail.com',
        description: 'The email address',
        format: 'email',
        required: true,
    })
    @IsEmail({}, { message: 'email must be a valid email value' })
    @Length(5, 350, {
        message: 'email cannot be less 5 and more than 350 characters',
    })
    @IsString({ message: 'email must be a string value' })
    @IsNotEmpty({ message: 'email cannot be an empty value' })
    readonly email: string;

    @ApiProperty({
        example:
            'https://upload.wikimedia.org/wikipedia/commons/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg',
        description: 'The url address to photo picture',
        required: false,
    })
    @IsUrl({}, { message: 'photoAvatar must be a valid url' })
    @IsString({ message: 'photoAvatar must be a string value' })
    @IsOptional()
    readonly photoAvatar: string;

    @ApiProperty({
        example: '+380952499948',
        description: 'The phone number',
        required: true,
    })
    @MaxLength(15, {
        message: 'phone cannot be more than 15 characters',
    })
    @IsString({ message: 'phone must be a string value' })
    @IsNotEmpty({ message: 'phone cannot be an empty value' })
    readonly phone: string;
}
