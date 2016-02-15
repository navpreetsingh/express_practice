var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var Netcat = require('node-netcat');



/* GET home page. */
router.get('/login', function(req, res, next) {
	// ----------    Listening on Same Machine ---------
	// PythonShell.run("example.py", function (err, results){
	// 	if (err) throw err;
	// 	console.log("results: %j", results);
	// 	res.send(results);
	// });

	// ----------    Listening on Different Machine ------
	// --- run this on other machine "while true; do nc -l 9900 < example.py; done"   -------
	var client = Netcat.client(9900, '192.168.1.55');
	client.on('open', function () {
	  console.log('connect');
	  client.send('this is a test' + '\n');
	});

	client.on('data', function (data) {
	  res.send(data.toString('ascii'));
	  client.send('Goodbye!!!', true);
	});

	client.on('error', function (err) {
	  console.log(err);
	});

	client.on('close', function () {
	  console.log('close');
	});

	client.start();



  //res.render('index', { title: 'Express' });
  // res.send("Hello");
});

module.exports = router;
