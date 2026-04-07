const zod = require("zod");

const userSchema = zod.object({
  email:zod.string().max(25).min(2),
  password:zod.string()
})

const todoSchema = zod.object({
  title:zod.string()
})




module.exports = {
  userType:userSchema,
  todoType:todoSchema
}