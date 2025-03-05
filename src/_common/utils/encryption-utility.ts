import * as crypto from 'crypto';

// Utility: Calculate SHA-256 hash
export function sha256(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
}