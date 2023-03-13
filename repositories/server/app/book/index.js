
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoObject = protoLoader.loadSync(path.resolve(__dirname, './book.proto'));
const BookDefinition = grpc.loadPackageDefinition(protoObject);

const books = require('./books');

const Find = ({
	request: { jsonRequest }
}, callback) => {
	const parsedJsonRequest = JSON.parse(jsonRequest);
	let response = {};

	console.log(parsedJsonRequest)

	if (parsedJsonRequest.id) {
		response = books.find((book) => book.id === parsedJsonRequest.id)
	}
	else if (parsedJsonRequest.isbn) {
		response = books.find((book) => book.isbn === parsedJsonRequest.isbn)
	}

	if (!response.id) return callback(new Error('Not found'), null);
	
	return callback(null, { book: { data: JSON.stringify(response) } })
};

module.exports = () => {
	return {
		definition: BookDefinition,
		actions: {
			Find
		}
	}
};
