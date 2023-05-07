const http = require('http');
const url = require('url');
const querystring = require('querystring');

function fibonacci(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
  }
}

http.createServer(function(req, res) {
  const query = url.parse(req.url).query;
  const params = querystring.parse(query);
  const n = parseInt(params.n);

  if (isNaN(n) || n < 0) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('Invalid input. Please enter a positive integer.');
  } else {
    const fib = fibonacci(n);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(fib));
  }
}).listen(3000);

console.log('Server running at http://localhost:3000/');