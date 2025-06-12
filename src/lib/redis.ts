import Redis from 'ioredis';

const redisClientSingleton = () => {
    if (!process.env.REDIS_URL) {
        return undefined;
    }
    return new Redis(process.env.REDIS_URL);
};

declare const globalThis: {
    redisGlobal: ReturnType<typeof redisClientSingleton>;
} & typeof global;

const redis = globalThis.redisGlobal ?? redisClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.redisGlobal = redis;

export default redis; 

// credit-ignore