import { promisify } from 'util';
import * as zlib from 'zlib';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

// Compress data before storing in Redis
export async function compressData(data: any): Promise<Buffer> {
    return await gzip(JSON.stringify(data));
}

// Decompress data retrieved from Redis
export async function decompressData(compressedData: Buffer): Promise<any> {
    return JSON.parse((await gunzip(compressedData)).toString());
}