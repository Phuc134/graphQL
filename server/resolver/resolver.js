const Book = require("../model/book");
const Author = require("../model/author");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resolver = {
  Query: {
    books: async (parent, args) => {
      return await Book.find({});
    },

    book: async function (parent, args) {
      let a = await Book.findOne({ _id: args.id });
      console.log(a);
      return a;
    },
    author: async function (parent, args) {
      return await Author.findOne({ _id: args.id });
    },
    authors: async () => await Author.find({}),
  },
  Book: {
    author: async function (parent, args) {
      let a = await Author.findOne({ _id: parent.authorID });
      console.log(a);
      return a;
    },
  },
  Author: {
    books: async function (parent, args) {
      let a = await Book.find({ authorID: parent._id });
      console.log(a);
      return a;
    },
  },
  //MUTATION
  Mutation: {
    // async signUp(parent, args) {
    //   const user = await User.findOne({ username: args.username });
    //   if (user != null) {
    //     return {
    //       error: "username already exists",
    //     };
    //   } else {
    //     const salt = await bcrypt.genSalt(10);
    //     const hashed = await bcrypt.hash(args.password, salt);
    //     //Create User
    //     const newUser = await new User({
    //       username: args.username,
    //       password: hashed,
    //       role: args.role,
    //     });
    //     //save to DB
    //     await newUser.save();
    //     return {
    //       status: "success",
    //     };
    //   }
    // },

    // async login(parent, args, context) {
    //   const user = await User.findOne({ username: args.username });
    //   if (!user) {
    //     return { error: "username wrong" };
    //   } else {
    //     const validPassword = await bcrypt.compare(
    //       args.password,
    //       user.password
    //     );
    //     if (!validPassword) {
    //       return { error: "password wrong" };
    //     } else {
    //       return {
    //         token: jwt.sign(
    //           {
    //             id: user._id,
    //             role: user.role,
    //           },
    //           "1",
    //           { expiresIn: "3000s" }
    //         ),
    //       };
    //     }
    //   }
    // },
    async createAuthor(parent, args) {
      await Author.create(args);
      return args;
    },
    async createBook(parent, args) {
      await Book.create(args);
      return args;
    },
    async updateBook(parent, args) {
      await Book.updateOne({ _id: args.id }, args);
      return args;
    },
    async deleteBook(parent, args, context) {
      await Book.deleteOne({ _id: args.id });
      return args;
    },
  },
};
module.exports = resolver;
