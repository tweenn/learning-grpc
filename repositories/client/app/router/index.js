
module.exports = (fastify) => {
	fastify = require('./books')(fastify);
	fastify = require('./notes')(fastify);

	fastify.get('*', (request, reply) => {
		reply.send({ hello: 'world' })
	});

	return fastify;
};
