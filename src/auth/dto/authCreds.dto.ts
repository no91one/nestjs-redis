import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthCredsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "It's a Weak Password",
  })
  password: string;
}
