import { Client } from 'pg';

const connectionString =
    'postgresql://durgakiran:durgakiran@journal-auth-pg-srv:5432/users';

const client = new Client({ connectionString });

// eslint-disable-next-line import/prefer-default-export
export { client as clientDB };
