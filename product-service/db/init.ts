import { ClientConfig, Client } from 'pg';

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
} = process.env;
const clientConfig: ClientConfig = {
  host: PG_HOST,
  port: +PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
};

const getClient = async (): Promise<Client> => {
  const client: Client = new Client(clientConfig);
  await client.connect();

  return client;
}

export const getProductsList = async () => {
  const client = await getClient();

  try {
    const { rows } = await client.query('SELECT * FROM product');

    return rows;
  } catch (error) {
    throw new Error(`DB query error (get all products): ${JSON.stringify(error)}`);
  } finally {
    client.end();
  }
};

export const getProductById = async (id) => {
  const client = await getClient();

  try {
    const { rows } = await client.query('SELECT * FROM product WHERE id = $1', [id]);

    return rows[0];
  } catch (error) {
    throw new Error(`DB query error (get product by id ${id})`);
  } finally {
    client.end();
  }
};

export const addProduct = async ({
  title,
  description,
  price,
  img
}) => {
  const client = await getClient();

  try {
    const response = await client.query(
      'INSERT INTO product(title, description, price, img) VALUES($1, $2, $3, $4)', 
      [title, description, price, img]
    );

    return { succsess: !!response };
  } catch (error) {
    throw new Error(`DB query error (create product)`);
  } finally {
    client.end();
  }
};