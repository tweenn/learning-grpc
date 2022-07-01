const grpc = require('@grpc/grpc-js');

const notes = require('./notes')();

const server = new grpc.Server()
server.addService(notes.definition.NoteService.service, notes.actions)

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (callback) => {
	server.start();
	console.log('Listening');
});
