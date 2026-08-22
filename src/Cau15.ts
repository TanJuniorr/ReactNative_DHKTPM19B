import { Book } from "./Cau6";
import { User } from "./Cau7";

export class Library {
    books: Book[] = [];
    users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }
}

const library = new Library();
library.addBook({ id: 1, title: "Lập trình TypeScript" } as any); 
console.log("Thư viện hiện có:", library.books);