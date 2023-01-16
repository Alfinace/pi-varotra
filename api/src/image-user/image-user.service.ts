import { CreateImageUserDto } from './dto/create-image-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateImageUserDto } from './dto/update-image-user.dto';
import { ImageUser } from './entities/image-user.entity';

@Injectable()
export class ImageUserService {
  constructor(
    @Inject('IMAGE_USER_REPOSITORY')
    private imageUserRepository: typeof ImageUser,
  ) { }
  create(createImageUserDto: CreateImageUserDto) {
    return this.imageUserRepository.create({ ...createImageUserDto });
  }

  findAll() {
    return `This action returns all imageUser`;
  }

  getAllImageUser(userId: number) {
    return this.imageUserRepository.findAll({
      where: { userId },
    });
  }

  update(id: number, updateImageUserDto: UpdateImageUserDto) {
    return `This action updates a #${id} imageUser`;
  }
}
