import { clientDB } from '../db';

// eslint-disable-next-line import/prefer-default-export
export async function findUserByEmail(email: string): Promise<[number, any[]]> {
    const query = 'SELECT * FROM users where email = $1';
    const res = await clientDB.query(query, [email]);
    return [res.rowCount, res.rows];
}
