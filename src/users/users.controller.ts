import { Body, ConflictException, Controller, Inject, Post } from "@nestjs/common";
import { UsersServiceToken } from "./constants";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./services/users.service";

@Controller('users')
export class UsersController {

    private readonly usersService: UsersService;

    constructor(@Inject(UsersServiceToken) usersService: UsersService) {
        this.usersService = usersService;
    }


    @Post()
    async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        const userEmail = createUserDto.email;
        const isUserWithSameEmailExist = await this.usersService.findUserByEmail(userEmail);
        if(isUserWithSameEmailExist) {
            throw new ConflictException(`User with email ${userEmail} already exists`);
        }
        return await this.usersService.createUser(createUserDto);
    }
}