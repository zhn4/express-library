const BookInstance = require('../models/bookinstance')

const Book = require('../models/book')

const asyncHandler = require('express-async-handler')

const { body, validationResult } = require('express-validator')

// NOTE: API 变动，废弃
// const { sanitizeBody } = require('express-validator/filter')

// 显示所有的 BookInstances
// exports.bookinstance_list = asyncHandler(async (req, res, next) => {
//   res.send('未实现：BookInstance 列表')
// })
// 呈现所有书本实例（BookInstance）的列表
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate('book').exec()

  res.render('bookinstance_list', {
    title: 'Book Instance List',
    bookinstance_list: allBookInstances,
  })
})

// 显示特定 BookInstance 的详情页
// exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
//   res.send(`未实现：BookInstance 详情页面：${req.params.id}`)
// })
// 展示特定 BookInstance 的详情页。
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec()

  if (bookInstance === null) {
    // 没有结果。
    const err = new Error('Book copy not found')
    err.status = 404
    return next(err)
  }

  res.render('bookinstance_detail', {
    title: 'Book:',
    bookinstance: bookInstance,
  })
})

// 由 GET 显示创建 BookInstance 的表单
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  // res.send('未实现：BookInstance 创建 GET')
  const books = await Book.find({}, 'title')
  if (books.err) {
    return next(books.err)
  }
  res.render('bookinstance_form', {
    title: 'Create BookInstance',
    book_list: books,
  })
})

// 由 POST 处理创建 BookInstance
// exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
//   res.send('未实现：BookInstance 创建 POST')
// })
// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // Validate fields.
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  // NOTE: API 变动 start
  // sanitizeBody('book').trim().escape(),
  // sanitizeBody('imprint').trim().escape(),
  // sanitizeBody('status').trim().escape(),
  // sanitizeBody('due_back').toDate(),
  // NOTE: API 变动 end
  body('book').trim().escape(),
  body('imprint').trim().escape(),
  body('status').trim().escape(),
  body('due_back').toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a BookInstance object with escaped and trimmed data.
    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      // NOTE: 语法问题，exec() 不再回调 start
      // Book.find({}, 'title').exec(function (err, books) {
      //   if (err) {
      //     return next(err)
      //   }
      //   // Successful, so render.
      //   res.render('bookinstance_form', {
      //     title: 'Create BookInstance',
      //     book_list: books,
      //     selected_book: bookinstance.book._id,
      //     errors: errors.array(),
      //     bookinstance: bookinstance,
      //   })
      // })
      // NOTE: 语法问题，exec() 不再回调 end
      const books = await Book.find({}, 'title').exec()
      if (books.err) {
        const err = new Error('Book not found')
        err.status = 404
        return next(err)
      }
      res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list: books,
        selected_book: bookinstance.book._id,
        errors: errors.array(),
        bookinstance: bookinstance,
      })
      return
    } else {
      // Data from form is valid.
      // NOTE: 语法问题，不支持回调函数，使用链式调用 start
      // bookinstance.save(function (err) {
      //   if (err) {
      //     return next(err)
      //   }
      //   // Successful - redirect to new record.
      //   res.redirect(bookinstance.url)
      // })
      // NOTE: 语法问题，不支持回调函数，使用链式调用 end
      bookinstance
        .save()
        .then(() => {
          res.redirect(bookinstance.url)
        })
        .catch(err => {
          return next(err)
        })
    }
  },
]

// 由 GET 显示删除 BookInstance 的表单
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send('未实现：BookInstance 删除 GET')
})

// 由 POST 删除 BookInstance
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send('未实现：BookInstance 删除 POST')
})

// 由 GET 显示更新 BookInstance 的表单
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send('未实现：BookInstance 更新 GET')
})

// 由 POST 处理更新 BookInstance
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send('未实现：BookInstance 更新 POST')
})
