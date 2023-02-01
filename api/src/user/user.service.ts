import { CreateImageUserDto } from './../image-user/dto/create-image-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ImageArticle } from './../image-article/entities/image-article.entity';
import { ImageUser } from './../image-user/entities/image-user.entity';
import { Article } from 'src/article/entities/article.entity';
import { User } from './entities/user.entity';
import { Inject, Injectable, Res, HttpException, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,

    @Inject('IMAGE_USER_REPOSITORY')
    private imageUserRepository: typeof ImageUser,


  ) { }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashed = await bcrypt.hash(createUserDto.password, saltOrRounds);
    await this.userRepository.update({ ...createUserDto, password: hashed }, { where: { email: createUserDto.email }, returning: true });
    return { email: createUserDto.email }
  }

  async createUserByAccessPi(payload: { username: string, uid: string, accessToken: string }) {
    return await this.userRepository.create(payload);
  }

  async createEmail(payload: { email: string, confirmCodeEmail: number }) {
    return await this.userRepository.create(payload);
  }

  async createFakeUser(createUserDto: any) {
    const saltOrRounds = 10;
    const hashed = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.userRepository.create({ ...createUserDto, password: hashed });
  }


  findAll(offset: number = 0, limit: number = 10) {
    console.log(offset, limit);

    return this.userRepository.findAndCountAll({
      include: [
        { all: true }
        // {
        //   model: Article,
        //   as: 'articles',
        // },
        // { model: ImageUser, as: 'images' }
      ],
      distinct: true,
      attributes: {
        exclude: [
          'password',
          'confirmationCode',
        ],
      },
      limit,
      offset,
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  findByArgs(data: any) {
    return this.userRepository.findOne({
      where: data,
      include: { all: true },
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email }, include: [
        {
          all: true
        }
      ]
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return this.userRepository.update(
      { ...updateUserDto },
      { where: { id }, returning: true },
    );
  }

  updateByEmail(email: string, code: string) {
    return this.userRepository.update(
      { confirmCodeEmail: code },
      { where: { email }, returning: true },
    );
  }


  updateByUid(uid: string, data: any) {
    return this.userRepository.update(
      { ...data },
      { where: { uid }, returning: true },
    );
  }

  updateByuserId(id: number, data: any) {
    return this.userRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }

  updateUidAccessToken(email: string, data: any) {
    return this.userRepository.update(
      { ...data },
      { where: { email }, returning: true },
    );
  }

  async confirmEmail(email: string, code: number) {
    try {
      let user = await this.userRepository.findOne({ where: { email }, attributes: ['verifiedEmail', 'confirmCodeEmail'] });
      if (!user) {
        return Promise.reject('User not found');
      } else {
        if (user.verifiedEmail) {
          return Promise.reject('User already verified');
        } else {
          if (user.confirmCodeEmail === code) {
            return this.userRepository.update({ verifiedEmail: true, confirmCodeEmail: null }, { where: { email }, returning: true });
          } else {
            return Promise.reject('Code not valid');
          }
        }
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  remove(id: number) {
    return this.userRepository.destroy({ where: { id } });
  }

  async addImageUser(id: number, createImageUserDto: CreateImageUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    console.log(createImageUserDto.filename);
    if (!user) {
      return Promise.reject('User not found');
    }
    const imageUser = await this.imageUserRepository.create({ userId: id, ...createImageUserDto });
    // user.$add('imageUser', imageUser);
    return Promise.resolve(imageUser);
  }

  removeImageUser(id: number, imageId: number) {
    return this.imageUserRepository.destroy({ where: { id: imageId } });
  }
}
