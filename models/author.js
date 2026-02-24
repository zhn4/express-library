const mongoose = require('mongoose')

const Schema = mongoose.Schema

const { DateTime } = require('luxon')

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
})

// 虚拟属性'name'：表示作者全名
AuthorSchema.virtual('name').get(function () {
  return this.family_name + ', ' + this.first_name
})

// 虚拟属性'lifespan'：作者寿命
AuthorSchema.virtual('lifespan').get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
})

// 格式化时间
AuthorSchema.virtual('lifespan_str').get(function () {
  // return (
  //   this.date_of_death.getYear() - this.date_of_birth.getYear()
  // ).toString()
  if (this.date_of_birth && this.date_of_death && this.date_of_birth !== null && this.date_of_death !== null) {
    return `
      ${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)}
      - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}
    `
  }
  if (this.date_of_birth && this.date_of_birth !== null) {
    return `
      ${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)}
      -
    `
  }
  if (this.date_of_death && this.date_of_death !== null) {
    return `
      -
      ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}
    `
  }
  return `no birth and no death date`
})

// 虚拟属性'url'：作者 URL
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id
})

// 导出 Author 模型
module.exports = mongoose.model('Author', AuthorSchema)
