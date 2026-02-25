const Author = require('../models/author')
const Book = require('../models/book')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

// 显示完整的作者列表
// exports.author_list = (req, res) => {
//   res.send('未实现：作者列表')
// }
// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
  const list_authors = await Author.find()
    .sort([['family_name', 'ascending']])
    .exec()
  // console.log(`%c author_list`, 'color: green; font-weight: bold;')
  // console.log(list_authors)
  if (list_authors.err) {
    return next(list_authors.err)
  }
  //Successful, so render
  res.render('author_list', {
    title: 'Author List',
    author_list: list_authors,
  })
})

// exports.bookinstance_list = asyncHandler(async (req, res, next) => {
//   const allBookInstances = await BookInstance.find().populate('book').exec()

//   res.render('bookinstance_list', {
//     title: 'Book Instance List',
//     bookinstance_list: allBookInstances,
//   })
// })

// 为每位作者显示详细信息的页面
// exports.author_detail = asyncHandler(async (req, res, next) => {
//   res.send('未实现：作者详细信息：' + req.params.id)
// })
exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, books] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }).exec(),
  ])

  if (author == null) {
    const err = new Error('Author not found')
    err.status = 404
    return next(err)
  }

  res.render('author_detail', {
    title: 'Author Detail',
    author,
    books: books,
  })
})

// 由 GET 显示创建作者的表单
exports.author_create_get = asyncHandler(async (req, res, next) => {
  // res.send('未实现：创建作者的 GET')
  res.render('author_form', { title: 'Create Author' })
})

// 由 POST 处理作者创建操作
// exports.author_create_post = asyncHandler(async (req, res, next) => {
//   res.send('未实现：创建作者的 POST')
// })
// 处理 POST 方法提交的创建作者表单
exports.author_create_post = [
  // 验证并且清理字段
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ values: 'falsy' }).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death').optional({ values: 'falsy' }).isISO8601().toDate(),

  // 在验证和修整完字段后处理请求
  asyncHandler(async (req, res, next) => {
    // 从请求中提取验证错误
    const errors = validationResult(req)

    // 使用经转义和去除空白字符处理的数据创建作者对象
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    })

    if (!errors.isEmpty()) {
      // 出现错误。使用清理后的值/错误信息重新渲染表单
      res.render('author_form', {
        title: 'Create Author',
        author: author,
        errors: errors.array(),
      })
      return
    } else {
      // 表格中的数据有效

      // 保存作者信息
      await author.save()
      // 重定向到新的作者记录
      res.redirect(author.url)
    }
  }),
]

// 由 GET 显示删除作者的表单
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send('未实现：删除作者的 GET')
})

// 由 POST 处理作者删除操作
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send('未实现：删除作者的 POST')
})

// 由 GET 显示更新作者的表单
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send('未实现：更新作者的 GET')
})

// 由 POST 处理作者更新操作
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send('未实现：更新作者的 POST')
})
