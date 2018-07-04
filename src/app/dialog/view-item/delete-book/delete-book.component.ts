import { Component, OnInit } from '@angular/core';
import {LibraryService} from '../../../library/library.service';
import {Book} from '../../../shared/book.model';
import {DialogComponent} from '../../dialog.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  book: Book;
  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              private libraryService: LibraryService) { }

  ngOnInit() {
      this.book = this.libraryService.getBook();
  }

  onDelete() {
      this.libraryService.deleteBook(this.book);
      this.onCancel();
  }
  onCancel() {
      this.libraryService.resetModes();
      this.dialogRef.close();
  }
}
