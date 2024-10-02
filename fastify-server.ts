import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { DataSource } from 'typeorm';
import { Product } from './src/Entities/Product';
import 'reflect-metadata';

const fastify: FastifyInstance = Fastify();

const ds = new DataSource({
	type: 'mysql',
	//host: '192.168.16.1',
	//host: '192.168.6.183',
	host: '127.0.0.1',
	port: 3306,
	database: 'products',
	username: 'root',
	password: 'password',
	logging: true,
	synchronize: true,
	entities: [Product]
});

ds.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err);
	});

fastify.post('/api/products', async (req, reply) => {
	const products: [Product] = req.body as [Product];
	try {
		await ds.transaction(async (transactionalEntityManager) => {
			const prodRepo = transactionalEntityManager.getRepository(Product);
			await prodRepo.insert(products);
		});
		reply.status(201).send({ message: products.length + ' rows inserted' });
	} catch (err) {
		reply.status(500).send({ error: 'Database query failed', message: err.message });
	}
});

// Register the CORS plugin
fastify.register(cors, {
	origin: 'http://localhost:5173'
});

// Healthcheck route
fastify.get('/healthcheck', async (request, reply) => {
	reply.send('ok');
});

fastify.get('/favicon.ico', async (request, reply) => {
	reply.status(204).send(); // Respond with no content
});

// Start the server
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: '0.0.0.0' });
		console.log('Server listening on http://localhost:3000');
	} catch (err) {
		console.error(err);
		throw new Error('error starting server');
	}
};

start();
