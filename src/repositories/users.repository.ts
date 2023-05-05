import * as bcrypt from 'bcrypt';
import { Token } from '../entities/token';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/signup.dto';
import { AppDataSource } from '../data-source';

export class UserRepository {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, phoneNumber } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = AppDataSource.getRepository(User).create({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
    });

    return AppDataSource.getRepository(User).save(user);
  }

  // in this case id is the email of user
  async findUserByEmail(id: string): Promise<User> {
    const user = AppDataSource.getRepository(User).findOne({
      where: { email: id },
    });
    return user;
  }

  // here id is actually the id of user
  async findUserById(id: any): Promise<User> {
    const user = AppDataSource.getRepository(User).findOne({
      where: { id },
    });
    return user;
  }

  async insertRefreshToken(value: string, userId: string): Promise<void> {
    const refreshToken = AppDataSource.getRepository(Token).create({
      value,
      user_id: userId,
    });

    await AppDataSource.getRepository(Token).save(refreshToken);
  }

  async getRefreshToken(token: string): Promise<string> {
    const refreshToken = await AppDataSource.getRepository(Token).findOne({
      where: { value: token },
    });

    return refreshToken.value;
  }

  async deleteRefreshTokenByValue(value: string): Promise<void> {
    const refreshToken = await AppDataSource.getRepository(Token).findBy({
      value,
    });

    await AppDataSource.getRepository(Token).remove(refreshToken);
  }
}

export const userRepository = new UserRepository();
