var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
                    <div> ${date} </div>
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

var counter=0;
app.get('/counter',function(req,res){
    counter= counter+1;
    res.send(counter.toString());
});

app.get('/:articleName',function(req,res) {
    //articleName== article-one
    //articles[articleName]=={}content object for article one
    var articleName= req.params.articleName;
    res.send(createTemplete(articles[articleName]));
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

var names = [];
app.get('/submit-name', function(req,res){
    var name= req.query.names;
    names.push(name);
    
    res.send(JSON.stringify(names));
    
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
