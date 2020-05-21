const express = require('express');
const app = express();
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');

const PORT = 5001;

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, connection) => {
    if(err) {
        console.error(err)
        return
    }
    console.log('Connected to DB');
    app.listen({ port: PORT }, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    }) 
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    const articles = [{
        title: 'Text article',
        createdAt: new Date(),
        description: 'Test description'
    }]
    res.render('index', {articles : articles});
});

app.use('/articles', articleRouter);
// app.listen(5000);
