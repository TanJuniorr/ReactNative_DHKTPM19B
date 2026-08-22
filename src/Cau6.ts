
export class Book {
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

const myBook = new Book("Clean Code", "Robert C. Martin", 2008);
console.log(myBook);