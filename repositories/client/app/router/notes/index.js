
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, './notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject)

module.exports = (fastify) => {
	fastify.post('/notes/find', async (request, reply) => {
		const id = request.body?.id || false;


		if (id) {
			const client = new NotesDefinition.NoteService('server:50051', grpc.credentials.createInsecure())

			const response = await new Promise((resolve) => {
				client.find({ id }, (err, { note }) => {
					if (err) return resolve({
						error: true,
						data: err.details
					});
					if (!note) return resolve({
						error: false,
						data: {}
					});
					return resolve({
						error: false,
						data: note
					});
				});
			});

			reply.send(response);
		}

		reply.send({ hello: 'world' });
	});

	fastify.post('/notes/list', async (request, reply) => {
		const id = request.body?.id || false;


		if (id) {
			const client = new NotesDefinition.NoteService('server:50051', grpc.credentials.createInsecure())

			const response = await new Promise((resolve) => {
				client.list({}, (err, { notes }) => {
					if (err) return resolve({
						error: true,
						data: err.details
					});
					if (!notes) return resolve({
						error: false,
						data: []
					});
					return resolve({
						error: false,
						data: notes
					});
				});
			});

			reply.send(response);
		}

		reply.send({ hello: 'world' });
	});

	return fastify;
}
