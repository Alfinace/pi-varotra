import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRateDto: CreateRateDto, @User() user) {

    return this.ratesService.create({ ...createRateDto, userId: user.userId });
  }

  @Get(':id/article')
  async findAll(@Query('page') page: number, @Query('size') size: number, @Param('id') id: number) {
    let rates = await this.ratesService.findAll(id);
    rates.map((rate) => {
      rate.user.avatar = process.env.BASE_URL_IMAGE + rate.user.avatar;
      return rate;
    });
    return rates;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.ratesService.update(+id, updateRateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratesService.remove(+id);
  }
}
