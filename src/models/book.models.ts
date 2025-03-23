import { category } from "../enums/categoryEnum"

export class Book {
    static idBook: number = 0
    id?: number
    name!: string
    author!: string
    category!: category
    isBorrowed: boolean = false

    constructor(name: string, author: string, category: category) {
        this.id = Book.idBook
        Book.idBook += 1
        this.name = name
        this.author = author
        this.category = category
    }

    


}

