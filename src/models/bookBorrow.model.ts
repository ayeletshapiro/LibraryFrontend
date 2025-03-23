import { category } from "../enums/categoryEnum"
import { Book } from "./book.models"

export class bookBorrow {//מה שהשאיל
   name!: string
   author!: string
   category!: category
   constructor(name: string, author: string, category: category) {
      this.name = name
      this.author = author
      this.category = category
   }
}