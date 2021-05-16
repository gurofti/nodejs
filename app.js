const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const {requiredAuth, checkUser} = require('./middlewares/authMiddleware')

const app = express()
const dbURL = ''
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((err) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })

app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))
app.use(cookieParser())

app.use('*', checkUser)
app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use('/', authRoutes)
app.use('/blog', blogRoutes)
app.use('/admin', requiredAuth, adminRoutes)

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.ejs', {root: __dirname})
    res.render('about', {
        title: 'Hakkımızda'
    })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    //res.status(404).sendFile('./views/404.ejs', {root: __dirname})
    res.status(404).render('404')
})
