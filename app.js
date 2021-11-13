const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

const dbURL = ['mongodb+srv://dbUser:75GsvD3dg6azX9yM@cluster0.4xyfk.mongodb.net/blogster?retryWrites=true&w=majority', 'mongodb://localhost/blogster']


mongoose.connect(dbURL[0], { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('database connected!')
});


// app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const User = require('./user');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'internships1011@gmail.com',
        pass: 'omm@1234'
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname+'/contact.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname+'/post.html'));
});




app.post('/', async (req, res) => {
    const user = new User(req.body.user);
    await user.save().then(user => console.log(user));
    const mailOption = {
        from: 'internships1011@@gmail.com',
        to: user.mail,
        subject: 'New User SignUp',
        text: `Hey ${user.name} welcome to Blogster, there are many blogs  hope you get yours `
    };
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent' + info.response);
        }
    });
    res.redirect('/');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Open on port 3030!');
})