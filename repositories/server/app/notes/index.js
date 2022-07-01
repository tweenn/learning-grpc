
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoObject = protoLoader.loadSync(path.resolve(__dirname, './notes.proto'));
const NotesDefinition = grpc.loadPackageDefinition(protoObject);

const notes = [
	{ id: 1, title: 'Note 1', description: 'Content 1'},
	{ id: 2, title: 'Note 2', description: 'Content 2'}
];

const List = (_, callback) => {
	return callback(null, { notes })
};
  
const Find = ({ request: { id } }, callback) => {
	const note = notes.find((note) => note.id === id)
	if (!note) return callback(new Error('Not found'), null)
	return callback(null, { note })
};

module.exports = () => {
	return {
		definition: NotesDefinition,
		actions: {
			List,
			Find
		}
	}
};
