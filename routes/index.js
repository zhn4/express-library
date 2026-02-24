var express = require('express')
var router = express.Router()
const Book = require('../models/book')

// /* GET home page. */
// // router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' })
// })
// GET 请求主页
router.get('/', (req, res) => {
  res.redirect('/catalog')
})

// Route to fetch the list of books
router.get('/books', async (req, res, next) => {
  res.json({
    message: 'This will eventually return a list of books from the database.',
  })
  // try {
  //   const books = await Book.find()
  //   res.json(books)
  // } catch (err) {
  //   next(err)
  // }
})

module.exports = router
