var routes = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');

module.exports = function(app){
	app.use('/', routes);
	app.use('/users', users);
	// app.use('/api/todos', todos);
}
