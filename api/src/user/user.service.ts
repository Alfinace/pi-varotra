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
import { Store } from 'src/store/entities/store.entity';

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

  async createUserByAccessPi(payload: { username: string, uid: string, accessToken: string, longitude: number, latitude: number }) {
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

    return this.userRepository.findAndCountAll({
      include: [
        { all: true }
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

  findLocalization() {
    return this.userRepository.findAndCountAll({
      distinct: true,
      attributes: ['username', 'long', 'lat'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  findOneWithStore(id: number) {
    return this.userRepository.findOne({ where: { id },
      include: {
        model: Store,
        as: 'store'
      }
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


  updateByUid(uid: string, data: { username: string, uid: string, accessToken: string, longitude: number, latitude: number }) {
    console.log(data);

    // return this.userRepository.update(
    //   { ...data },
    //   { where: { uid }, returning: true },
    // );
    console.log(this.userRepository.update(
      { ...data },
      { where: { uid }, returning: true },
    ));

  }

  updateByuserId(id: number, data: any) {
    return this.userRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }

  updateUidAccessToken(uid: string, data: any) {
    return this.userRepository.update(
      { ...data },
      { where: { uid }, returning: true },
    );
  }

  // async confirmEmail(email: string, code: number) {
  //   try {
  //     let user = await this.userRepository.findOne({ where: { email }, attributes: ['verifiedEmail', 'confirmCodeEmail'] });
  //     if (!user) {
  //       return Promise.reject('User not found');
  //     } else {
  //       if (user.verifiedEmail) {
  //         return Promise.reject('User already verified');
  //       } else {
  //         if (user.confirmCodeEmail === code) {
  //           return this.userRepository.update({ verifiedEmail: true, confirmCodeEmail: null }, { where: { email }, returning: true });
  //         } else {
  //           return Promise.reject('Code not valid');
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     throw new HttpException(error, 500);
  //   }
  // }

  remove(id: number) {
    return this.userRepository.destroy({ where: { id } });
  }

  async addImageUser(id: number, createImageUserDto: CreateImageUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
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
