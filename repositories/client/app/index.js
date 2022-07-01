
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, './notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject)

const client = new NotesDefinition.NoteService('grpc_server:50051', grpc.credentials.createInsecure())

client.list({}, (err, notes) => {
	if (err) throw err;
	console.log('All notes:', notes);
});

client.find({ id: 2 }, (err, { note }) => {
	if (err) return console.error(err.details);
	if (!note) return console.error('Not Found');
	return console.log('Single Note:', note);
});
