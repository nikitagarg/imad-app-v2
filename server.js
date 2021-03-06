var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var config = {
    user: 'nikitagarg',
    database: 'nikitagarg',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    //password: 'db-nikitagarg-89148'
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.JSON());
var articles = {
    'article-one': {
        title: 'Article One | Nikita Garg',
        heading: 'Article One',
        date: 'March 1,2017',
        content:`
                    <p>
                        helloo.. lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                        hgj jgj hj .
                    </p>
                    <p>
                        helloo.. lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                        hgj jgj hj .
                    </p>
                    <p>
                        hello.!! this is Nikita Garg from Lucknow.lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                        hgj jgj hj .
                    </p>`
        },
    'article-two': {
    title: 'Article Two | Nikita Garg',
    heading: 'Article Two',
    date: 'March 2,2017',
    content:`
                <p>
                    helloo.. lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                    hgj jgj hj .
                </p>
                <p>
                    helloo.. lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                    hgj jgj hj .
                </p>
                <p>
                    hello.!! this is Nikita Garg from Lucknow.lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                    hgj jgj hj .
                </p>`
},
    'article-three': {
    title: 'Article Three | Nikita Garg',
    heading: 'Article Three',
    date: 'March 3,2017',
    content:`
                <p>
                    helloo.. lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                    hgj jgj hj .
                </p>
                <p>
                    helloo.. lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                    hgj jgj hj .
                </p>
                <p>
                    hello.!! this is Nikita Garg from Lucknow.lorem epsum tyghkyk. nhijk gjgvvhf..bhggmjk..jgfhgdfhgy ggstgf jjyhgc gdbgu hfh hgb hj mhfh,.
                    hgj jgj hj .
                </p>`
}

}
 
function createTemplete(data) {
    var  title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplete= `
        <html>
            <head>
                <title> ${title} </title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            
            <body>
                <div class = "container">
                    <div>
                        <a href='/'>Home</a>
                    </div>
                    <hr/>
                    <h3>  ${heading} </h3>
                    <div> ${date.toDateString()} </div>
                    <div>
                        ${content}
                    </div>
                </div>
            </body>
        </html>
    `;
    return htmlTemplete;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input, salt) {
    
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}


app.get('/hash/:input', function(req, res){
    hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query("INSERT INTO 'user' (usrname, password) VALUES ($1, $2)", [username, dbString], function(err, result){
        if(err){
           res.status(500).send(err.toString());
       }else{
           res.send('User successfully created: ' + username);
       }
    });
});

var pool = new Pool(config)
app.get('/test-db', function (req, res){
   //make a select request
   //return the result
   pool.query("SELECT * FROM test", function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
   });
});

var counter=0;
app.get('/counter',function(req,res){
    counter= counter+1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res){
    //var name= req.params.name;
    var name=req.query.name;
    names.push(name);
   // res.send(names);
    res.send(JSON.stringify(names));
    
});

app.get('/articles/:articleName', function(req, res) {
    
    //articleName== article-one
    //articles[articleName]=={}content object for article one
    
    //"SELECT * FROM article WHERE title = 'article-one'"
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                res.status(404).send("Articles not found");
            }
            else{
                var articleData = result.rows[0];
                res.send(createTemplete(articleData));
            }
        }
    });
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
