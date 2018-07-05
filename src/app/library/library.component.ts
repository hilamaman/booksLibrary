import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DialogComponent} from '../dialog/dialog.component';
import {Book} from '../shared/book.model';
import {LibraryService} from './library.service';
import {MatDialog, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnChanges, OnDestroy {

    constructor (private httpService: HttpClient,
                 private libraryService: LibraryService,
                 public dialog: MatDialog) { }

    newArrBooks: Book [];
    index = 12;
    totalItems = 0;
    endOfFile = false;
    openEditBook = false;
    openDeleteBook = false;
    openAddBook = false;
    dialogRef: MatDialogRef<DialogComponent>;


    ngOnInit () {
        this.httpService.get('https://www.googleapis.com/books/v1/volumes?q=flowers&printType=books&maxResults=12' +
            '&fields=kind,totalItems,items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/imageLinks)')
            .subscribe(
                data => {
                    this.libraryService.setTotalItems(data);
                    this.totalItems = this.libraryService.getTotalItems();
                    this.libraryService.setArrBooks(data);
                    this.newArrBooks = this.libraryService.getArrBooks();
                },
                (err: HttpErrorResponse) => {
                    console.log (err.message);
                }
            );
    }

    ngOnChanges() {
        if (this.libraryService.arrBooksHasChanged) {
            this.newArrBooks = this.libraryService.getArrBooks();
        }
    }

    onLoadMore() {
        if (this.totalItems - this.index > 0) {
            this.httpService.get('https://www.googleapis.com/books/v1/volumes?q=flowers&printType=books&maxResults=12' +
                '&fields=kind,totalItems,items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/imageLinks)' +
                '&startIndex=' + this.index)
                .subscribe(
                    data => {
                        this.libraryService.updateArrBooks(data);
                    },
                    (err: HttpErrorResponse) => {
                        console.log(err.message);
                    }
                );
            this.index = this.index + 12;
        }
        this.newArrBooks = this.libraryService.getArrBooks();
        if (this.totalItems - this.index <= 0) {
            this.endOfFile = true;
        }
    }


    onEdit(item) {
        const book = new Book(item.id,
            item.title,
            item.author,
            item.publicationDate,
            item.imagePath);
        this.openDialog();
        this.libraryService.setEditMode();
        this.libraryService.setBook(book);
        this.openEditBook = true;
    }

    onDelete(item) {
        const book = new Book(item.id,
            item.title,
            item.author,
            item.publicationDate,
            item.imagePath);
        this.openDialog();
        this.libraryService.setDeleteMode();
        this.libraryService.setBook(book);
        this.openDeleteBook = true;
    }

    onAddNew() {
        this.openDialog();
        this.libraryService.setAddMode();
        this.openAddBook = true;
    }

    ngOnDestroy() {
        this.openEditBook = false;
        this.openDeleteBook = false;
        this.openAddBook = false;
    }

    openDialog() {
        this.dialogRef = this.dialog.open(DialogComponent, {panelClass: 'myapp-no-padding-dialog'});
        this.dialogRef.afterClosed().subscribe(
            (result) => {

                console.log('result' + result);
            });
    }
}
