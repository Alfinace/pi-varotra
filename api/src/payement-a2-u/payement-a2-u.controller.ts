import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayementA2UService } from './payement-a2-u.service';
import { CreatePayementA2UDto } from './dto/create-payement-a2-u.dto';
import { UpdatePayementA2UDto } from './dto/update-payement-a2-u.dto';

@Controller('payement-a2-u')
export class PayementA2UController {
  constructor(private readonly payementA2UService: PayementA2UService) {}

  @Post()
  create(@Body() createPayementA2UDto: CreatePayementA2UDto) {
    return this.payementA2UService.create(createPayementA2UDto);
  }

  @Get()
  findAll() {
    return this.payementA2UService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payementA2UService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayementA2UDto: UpdatePayementA2UDto) {
    return this.payementA2UService.update(+id, updatePayementA2UDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payementA2UService.remove(+id);
  }
}
