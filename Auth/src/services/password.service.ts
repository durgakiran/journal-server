import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
}

export async function comparePasswords(
    stored: string,
    supplied: string,
): Promise<boolean> {
    const [hashed, salt] = stored.split('.');
    const buf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return hashed === buf.toString('hex');
}
