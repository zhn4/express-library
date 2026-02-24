// NOTE: AI 版本
const mongoose = require('mongoose')

// 替换为你的 MongoDB 连接字符串
const mongoURI = 'mongodb://localhost:27017/admin'

// 连接到 MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    process.exit(1) // 退出进程
  }
}

module.exports = connectDB

// // NOTE: 教程版本
// // 设置 Mongoose 连接
// const mongoose = require('mongoose')

// const mongoDB = 'localhost:27017'

// mongoose.connect(mongoDB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// mongoose.Promise = global.Promise

// const db = mongoose.connection

// db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))
