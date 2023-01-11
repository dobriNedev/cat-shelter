const http = require('http');

const cats = require('./cats.json');

const catShelter = require('./views/shelterCat');

const addCat = require('./views/addCat');

const homePage = require('./views/index.html.js');

const siteCss = require('./css/site.css.js');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (req.url == '/') {
        res.write(homePage);
    } else if (/cats\/\d+\/shelterCat/.test(req.url)) {
        let catId = req.url.split('/')[2];
        let cat = cats.find( c => c.id == catId);
        res.write(catShelter(cat));
        
    } else if (req.url == '/css/site.css'){
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        res.write(siteCss);
        
    } else if (req.url == '/cats/add-cat') {
        res.write(addCat);
    }
    else {
        res.write(`
        <h1>404 Not found!</hi>
        `);
    }
    res.end();
});

server.listen(5001);
console.log('Server is running on port 5001...');