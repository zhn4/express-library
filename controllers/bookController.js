const Book = require('../models/book')

const BookInstance = require('../models/bookinstance')

const asyncHandler = require('express-async-handler')

const Author = require('../models/author')

const Genre = require('../models/genre')

const { body, validationResult } = require('express-validator')

// NOTE: API 变动，废弃
// const { sanitizeBody } = require('express-validator/filter')

exports.index = asyncHandler(async (req, res, next) => {
  res.send('未实现：网站主页')
})

// 显示所有的图书
// exports.book_list = asyncHandler(async (req, res, next) => {
//   res.send('未实现：图书列表')
// })
// 呈现数据库中所有书本的列表
exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'title author').sort({ title: 1 }).populate('author').exec()

  res.render('book_list', { title: 'Book List', book_list: allBooks })
  // res.json(allBooks)
})

// 显示特定图书的详情页面。
// exports.book_detail = asyncHandler(async (req, res, next) => {
//   res.send(`未实现：图书详情页面：${req.params.id}`)
// })
// 显示特定书籍的详细信息页面。
exports.book_detail = asyncHandler(async (req, res, next) => {
  // 获取书籍的详细信息，以及特定书籍的实例
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre').exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ])

  if (book === null) {
    // 没有结果。
    const err = new Error('Book not found')
    err.status = 404
    return next(err)
  }

  res.render('book_detail', {
    title: book.title,
    book: book,
    book_instances: bookInstances,
  })
})

// 通过 GET 显示创建图书。
// exports.book_create_get = asyncHandler(async (req, res, next) => {
//   res.send('未实现：创建图书 GET')
// })
// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  // NOTE: 版本问题，直接使用 Promise.all 处理多个异步查询
  const [authors, genres] = await Promise.all([Author.find(), Genre.find()])

  if (authors == null || genres == null) {
    const err = new Error('Author or Genres not found')
    err.status = 404
    return next(err)
  }

  res.render('book_form', {
    title: 'Create Book',
    authors,
    genres,
  })
})

// 以 POST 方式处理创建图书。
// exports.book_create_post = asyncHandler(async (req, res, next) => {
//   res.send('未实现：Book 创建 POST')
// })
// Handle book create on POST.
exports.book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = new Array(req.body.genre)
    }
    next()
  },

  // Validate fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

  // Sanitize fields (using wildcard).
  // NOTE: API 变动 start
  // sanitizeBody('*').trim().escape(),
  // sanitizeBody('genre.*').escape(),
  // NOTE: API 变动 end
  body('*').trim().escape(),
  body('genre.*').escape(),
  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a Book object with escaped and trimmed data.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      // NOTE: 语法问题，使用 Promise.all 处理多个异步查询 start
      // async.parallel(
      //   {
      //     authors: function (callback) {
      //       Author.find(callback)
      //     },
      //     genres: function (callback) {
      //       Genre.find(callback)
      //     },
      //   },
      //   function (err, results) {
      //     if (err) {
      //       return next(err)
      //     }

      //     // Mark our selected genres as checked.
      //     for (let i = 0; i < results.genres.length; i++) {
      //       if (book.genre.indexOf(results.genres[i]._id) > -1) {
      //         results.genres[i].checked = 'true'
      //       }
      //     }
      //     res.render('book_form', {
      //       title: 'Create Book',
      //       authors: results.authors,
      //       genres: results.genres,
      //       book: book,
      //       errors: errors.array(),
      //     })
      //   },
      // )
      // NOTE: 语法问题，使用 Promise.all 处理多个异步查询 end
      const [authors, genres] = await Promise.all([Author.find(), Genre.find()])
      if (authors.length == 0) {
        const err = new Error('Author not found 没有作者')
        err.status = 404
        return next(err)
      }
      if (genres.length == 0) {
        const err = new Error('Genre not found 没有分类')
        err.status = 404
        return next(err)
      }
      // Mark our selected genres as checked.
      for (let i = 0; i < genres.length; i++) {
        if (book.genre.indexOf(genres[i]._id) > -1) {
          genres[i].checked = 'true'
        }
      }
      res.render('book_form', {
        title: 'Create Book',
        authors: authors,
        genres: genres,
        book: book,
        errors: errors.array(),
      })
      return
    } else {
      // NOTE: 语法问题，不支持回调函数，使用链式调用 start
      // // Data from form is valid. Save book.
      // book.save(function (err) {
      //   if (err) {
      //     return next(err)
      //   }
      //   //successful - redirect to new book record.
      //   res.redirect(book.url)
      // })
      // NOTE: 语法问题，不支持回调函数，使用链式调用 end
      book.save().then(() => {
        res.redirect(book.url)
      }).catch((err) => {
        return next(err)
      })
    }
  },
]

// 通过 GET 显示删除图书。
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send('未实现：删除 GET')
})

// 以 POST 方式处理删除图书。
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send('未实现：删除 POST')
})

// 通过 GET 显示更新图书。
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send('未实现：更新图书 GET')
})

// 处理 POST 时的更新图书。
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send('未实现：更新图书 POST')
})
