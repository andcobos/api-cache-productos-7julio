import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis-yet';
 
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions {
        return {
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 30 * 1000, // 30 seconds in milliseconds
            isGlobal: true,
        };
    }
}
//me dio error pero solo instalo npm install cache-manager-ioredis-yet