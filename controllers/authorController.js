const Author = require('../models/author')
const Book = require('../models/book')
const asyncHandler = require('express-async-handler')

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
  res.send('未实现：创建作者的 GET')
})

// 由 POST 处理作者创建操作
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send('未实现：创建作者的 POST')
})

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
