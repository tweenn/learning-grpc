const qs = require('qs');

const router = require('./router');

module.exports = () => {
	let fastify = require('fastify')({
		logger: true
	});

	fastify.register(require('@fastify/formbody'), {
		parser: str => qs.parse(str)
	});

	fastify = router(fastify);

	return fastify;
};
