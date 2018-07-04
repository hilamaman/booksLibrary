import {Book} from '../shared/book.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class LibraryService {
    book = new Book('', '', '', '', '');
    totalItems = 0;
    bookHasChanged = new Subject();
    totalItemsHasChanged = new Subject();
    arrBooks: Book [] = [];
    arrBooksHasChanged = new Subject();
    editMode = false;
    deleteMode = false;
    AddMode = false;

    setTotalItems(data) {
        this.totalItems = data.totalItems;
        this.totalItemsHasChanged.next(this.totalItems);
    }

    getTotalItems() {
        return this.totalItems;
    }

    toUpper(str) {
        str = str.toLowerCase().split(' ').map(function (word) {
            return word[0] === undefined ?  '' + word.substr(1) : word[0].toUpperCase() + word.substr(1);
        }).join(' ');
        return str;
    }

    setArrBooks(data) {
        for (const item of data.items) {
            const book = new Book('', '', '', '', '');
            book.id = item.id;
            book.title = item.volumeInfo.title === undefined ? '' : this.toUpper(item.volumeInfo.title.toString());
            book.author = item.volumeInfo.authors === undefined ? '' : this.toUpper(item.volumeInfo.authors[0]);
            book.imagePath = item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.smallThumbnail : '../assets/books-stack.svg';
            book.publicationDate = item.volumeInfo.publishedDate === undefined ? '' : (item.volumeInfo.publishedDate.indexOf('-') < 0 ? item.volumeInfo.publishedDate : item.volumeInfo.publishedDate.substr(0, item.volumeInfo.publishedDate.indexOf('-')));
            (this.arrBooks === undefined ? this.arrBooks[0] = book : this.arrBooks.push(book));
        }
        this.arrBooksHasChanged.next(this.arrBooks);
    }

    updateArrBooks(data) {
        const newArr: Book[] = [];
        for (const item of data.items) {
            const book = new Book('', '', '', '', '');
            book.id = item.id;
            book.title = item.volumeInfo.title === undefined ? '' : this.toUpper(item.volumeInfo.title);
            book.author = item.volumeInfo.authors === undefined ? '' : this.toUpper(item.volumeInfo.authors[0]);
            book.imagePath = item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.smallThumbnail : '../assets/books-stack.svg';
            book.publicationDate = item.volumeInfo.publishedDate === undefined ? '' : (item.volumeInfo.publishedDate.indexOf('-') < 0 ? item.volumeInfo.publishedDate : item.volumeInfo.publishedDate.substr(0, item.volumeInfo.publishedDate.indexOf('-')));
            this.arrBooks.push(book);
        }
        console.log(newArr);

        console.log(this.arrBooks);
        this.arrBooksHasChanged.next(this.arrBooks);
    }

    getArrBooks() {
        return this.arrBooks;
    }

    setEditMode() {
        this.editMode = true;
    }

    setDeleteMode() {
        this.deleteMode = true;
    }

    setAddMode() {
        this.AddMode = true;
    }

    resetModes() {
        this.deleteMode = false;
        this.editMode = false;
        this.AddMode = false;
    }

    setBook(book: Book) {
        this.book = book;
        this.bookHasChanged.next(this.book);

    }

    getBook() {
        return this.book;
    }


    changeBookDetails(bookToChange) {
        let index = 0;
        for (const book of this.arrBooks) {
            if (book.id === bookToChange.id) {
                this.arrBooks[index] = bookToChange;
            }
            index = index + 1;
        }
        this.arrBooksHasChanged.next(this.arrBooks);
    }

    deleteBook(bookToDelete) {
        let index = 0;
        let found = -1;
        for (const book of this.arrBooks) {
            if (book.id === bookToDelete.id) {
                found = index;
            }
            index = index + 1;
        }
        if (found > -1) {
            this.arrBooks.splice(found, 1);
        }
        this.arrBooksHasChanged.next(this.arrBooks);
    }

    addNewBook(bookToAdd) {
        this.arrBooks.push(bookToAdd);
        this.totalItems = this.totalItems + 1;
        this.arrBooksHasChanged.next(this.arrBooks);
    }
}
