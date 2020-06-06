const app = require('./app');

app.set('port', (process.env.PORT || 3333));

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});