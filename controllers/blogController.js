const Blog = require('../models/blogs')

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {
                title: 'Anasayfa',
                blogs: result
            })
        })
        .catch((err) => {
            console.log('error')
            res.render('404')
        })
}

const blog_content = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blog', {blog: result, title: 'Detay'})
        })
        .catch((err) => {
            console.log(err)
            res.status(404).render('404', { title: 'Bulunamadı' })
        })
}

module.exports = {
    blog_index,
    blog_content
}
