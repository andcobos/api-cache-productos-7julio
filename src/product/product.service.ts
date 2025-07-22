import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
 
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
 
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) { }
 
    async findAll() {
        const cacheKey = 'products_all';
        const cached = await this.cacheManager.get(cacheKey);
        console.log('ver cache', cached);
        if (cached) {
            console.log('📦 Usando datos del caché');
            return cached;
        }
 
        console.log('💾 Consultando BD y guardando en caché');
        const products = await this.productRepo.find();
        // Set cache with 30 seconds TTL (30000 milliseconds)
        await this.cacheManager.set(cacheKey, products, 30000);
        return products;
    }
 
    async create(data: Partial<Product>) {
        await this.cacheManager.del('products_all');
        const newProduct = this.productRepo.create(data);
        return this.productRepo.save(newProduct);
    }
}