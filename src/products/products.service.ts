import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto)
    try {
      
      return await this.productRepository.save(product)
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    return await this.productRepository.find();
  }
  
  async findOne(id: number) {
    
    return await this.productRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
   
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
  

      if (Object.keys(updateProductDto).length === 0) {
        throw new Error('No se proporcionaron valores para actualizar');
      }
  
     
      await this.productRepository.update(id, updateProductDto);
  

      return this.productRepository.findOne({ where: { id } });
    }

  

  async remove(id: number) {
    return await this.productRepository.delete({id});
  }

  async searchByName(name:String) {
    if (!name || typeof name !== 'string') {
      throw new Error('El nombre de búsqueda no es válido');
    }
  
    console.log("El nombre:", name);
  
    try {
      return await this.productRepository
        .createQueryBuilder('Product')
        .where('LOWER(Product.name) LIKE LOWER(:name)', { name: `%${name}%` })
        .getMany();
    } catch (error) {
      console.error("Error en la búsqueda de productos:", error);
      throw new Error('No se pudo realizar la búsqueda');
    }
  }
}
