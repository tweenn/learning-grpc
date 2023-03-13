
const HOST = '0.0.0.0';
const PORT = 8080;

// Run the server!
require('./server')().listen({
	port: PORT,
	host: HOST
}, (err, address) => {
	if (err) throw err

	console.log('-----------');
	console.log(`Client:\n💻 ${HOST}\n🚪 ${PORT}`)
	console.log('-----------');
})
