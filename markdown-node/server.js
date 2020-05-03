const express = require('express');
const app = express();
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs');

app.use('/articles', articleRouter);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const articles = [{
        title: 'Text article',
        createdAt: new Date(),
        description: 'Test description'
    }]
    res.render('index', {articles : articles});
});

app.listen(5000);


// 16:15