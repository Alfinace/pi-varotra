import { Category } from 'src/category/entities/category.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Article } from 'src/article/entities/article.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categorieRepository: typeof Category,
  ) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categorieRepository.create<Category>({ ...createCategoryDto });
  }

  findAll(offset?: number, limit?: number) {
    return this.categorieRepository.findAndCountAll({
      include: [
        { all: true }
      ],
      limit,
      offset,
      order: [['name', 'ASC']],
      distinct: true,
    });
  }

  findOne(id: number) {
    return this.categorieRepository.findByPk<Category>(id, {
      include: [Article],
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categorieRepository.update<Category>(updateCategoryDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.categorieRepository.destroy({ where: { id } });
  }
}
