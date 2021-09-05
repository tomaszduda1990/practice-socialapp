const express = require('express');
const connectDB = require('../config/db');
const path = require('path')
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
const app = express();

connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);

// serve static assets  in prod
// if(process.env.NODE_ENV === 'production'){
//     //set static folder
   
// }

app.use(express.static(path.join(__dirname, '../', 'client', 'build')))
app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
