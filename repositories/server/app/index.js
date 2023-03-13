
const HOST = '0.0.0.0';
const PORT = 50051;

const grpc = require('@grpc/grpc-js');

const notes = require('./notes')();
const books = require('./book')();

const server = new grpc.Server()
server.addService(notes.definition.NoteService.service, notes.actions);
server.addService(books.definition.BookService.service, books.actions);

server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(), (callback) => {
	server.start();

	console.log('-----------');
	console.log(`Server:\n💻 ${HOST}\n🚪 ${PORT}`);
	console.log('-----------');
});
