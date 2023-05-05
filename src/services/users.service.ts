import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { userRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dtos/signup.dto';
import { SinginDto } from '../dtos/signin.dto';

class UserService {
  async signUp(createUserDto: CreateUserDto): Promise<{
    refreshToken: string;
  }> {
    const user: User = await userRepository.createUser(createUserDto);
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await userRepository.insertRefreshToken(refreshToken, user.id);
    return {
      refreshToken,
    };
  }

  async signin(signinDto: SinginDto): Promise<{
    accessToken: string;
  }> {
    const { id, password } = signinDto;
    // here id is users email
    const user = await userRepository.findUserByEmail(id);

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m',
      });

      return {
        accessToken,
      };
    } else {
      throw new Error('Check your credentials');
    }
  }

  async createNewToken(token: string): Promise<string> {
    const payload: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const userId = payload.id;
    const refreshToken = await userRepository.getRefreshToken(token);
    if (!refreshToken) {
      throw new Error('No refreshtoken for this user');
    }

    const user: User = await userRepository.findUserById(userId);
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });

    return accessToken;
  }

  async logout(token: string): Promise<string> {
    const payload: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const userId = payload.id;
    await userRepository.deleteRefreshTokenByValue(token);
    const newRefreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET
    );
    await userRepository.insertRefreshToken(newRefreshToken, userId);
    return newRefreshToken;
  }
}

export const usersService = new UserService();
