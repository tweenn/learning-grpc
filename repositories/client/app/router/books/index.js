
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, './book.proto'));
const BookDefinition = grpc.loadPackageDefinition(protoObject);

module.exports = (fastify) => {
	fastify.post('/books/find', async (request, reply) => {
		const jsonRequest = {};

		if (request.body?.id) {
			jsonRequest.id = parseInt(request.body.id);
		}

		if (request.body?.isbn) {
			jsonRequest.isbn = parseInt(request.body.isbn);
		}

		if (Object.keys(jsonRequest).length > 0) {
			const client = new BookDefinition.BookService('server:50051', grpc.credentials.createInsecure());

			const response = await new Promise((resolve) => {
				client.find({
					jsonRequest: JSON.stringify(jsonRequest)
				}, (err, { book }) => {
					if (err) return resolve({
						error: true,
						data: err.details
					});
					if (!book) return resolve({
						error: false,
						data: {}
					});
					return resolve({
						error: false,
						data: JSON.parse(book.data)
					});
				});
			});

			reply.send(response);
		}

		reply.send({
			error: false,
			data: {}
		});
	});

	return fastify;
}
