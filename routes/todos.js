var express = require('express');
var router = express.Router();
//API
// require("../database");
var mongoose = require('mongoose');                  // mongoose for mongodb
mongoose.connect('mongodb://localhost:27017/express_practice');   // connect to mongoDB database on modulus.io
// define model ===========================
var Todo = mongoose.model('Todo', {
  text : String
});

// GET all TODOS
router.get('/', function(req, res) {
	console.log("todo", Todo);
	// use mongoose to get all todos in the database
	Todo.find(function(err, todos) {
		// if there is an error retrieving, send the error, nothing after res.send(err) will execute
		if (err)
			res.send(err)
		res.json(todos);  // return all todos in JSON format
	});
});

// cCREATE todo and send back all todos after creation
router.post("/api/todos", function(req, res) {
	// create a todo, information comes from AJAX request from Angular
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});

// DELETE a todo
router.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err)
		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});

module.exports = router;