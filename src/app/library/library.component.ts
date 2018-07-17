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
export class LibraryComponent implements OnChanges, OnDestroy {

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
    validKeyword = false;
    keyword = '';
    url = 'https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=12&fields=kind,'
      + 'totalItems,items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/imageLinks)';
    updateUrl = '';


    onLoad () {
        this.httpService.get(this.url + '&q=' + this.keyword)
            .subscribe(
                data => {
                    this.libraryService.setTotalItems(data);
                    this.totalItems = this.libraryService.getTotalItems();
                    this.libraryService.setArrBooks(data);
                    this.newArrBooks = this.libraryService.getArrBooks();
                    this.validKeyword = true;
                    this.updateUrl = this.url + '&q=' + this.keyword;
                },
                (err: HttpErrorResponse) => {
                    this.validKeyword = false;
                    console.log(err);
                }
            );
    }

    searchKeyword(keyword) {
      this.keyword = keyword;
      this.onLoad();
    }

    onSearch() {
      this.validKeyword = false;
      this.libraryService.setKeywordChanged(true);
    }

    ngOnChanges() {
        if (this.libraryService.arrBooksHasChanged) {
            this.newArrBooks = this.libraryService.getArrBooks();
        }
    }
    keyPress(e, keyword) {
      if (e.keyCode === 13) {
        this.searchKeyword(keyword);
      }
    }
    onLoadMore() {
      this.libraryService.setKeywordChanged(false);
        if (this.totalItems - this.index > 0) {
            this.httpService.get(this.updateUrl + '&startIndex=' + this.index)
                .subscribe(
                    data => {
                        this.libraryService.setArrBooks(data);
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
      this.onChangeBook(item);
      this.libraryService.setEditMode();
      this.openEditBook = true;
    }

    onDelete(item) {
      this.onChangeBook(item);
      this.libraryService.setDeleteMode();
      this.openDeleteBook = true;
    }
    onChangeBook(item) {
      const book = new Book(item.id,
        item.title,
        item.author,
        item.publicationDate,
        item.imagePath);
      this.openDialog();
      this.libraryService.setBook(book);
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
