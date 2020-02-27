const express =  require('express');
const path = require('path');

// app init
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

// Home Route
app.get('/', (req, res) => {

    let articles = [
        {
            id: 1,
            title: "article one",
            author: "souhardya",
            body:"this is article one",
        },
        {
            id: 2,
            title: "article two",
            author: "souhardya",
            body: "this is article two",
        }
    ];

    res.render('index', {
        title: 'Articles',
        articles: articles,
    });

});

// add article
app.get('/article/add', (req, res) => {
    res.render('add_article', {
        title: "add article",
    });
});

// set server
const port = process.env.port || 3000;
app.listen(3000, () => {

    console.log(`server running in ${port}` );
    
});