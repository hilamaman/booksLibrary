import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {LibraryService} from '../../../library/library.service';
import {DialogComponent} from '../../dialog.component';
import {Book} from '../../../shared/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Book;
  validTitle = true;
  validDate = true;
  @ViewChild('add') addForm: NgForm;
  newId: string;
  addMode = false;
  editMode = false;


  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              private libraryService: LibraryService) { }

  ngOnInit() {
    this.book = new Book('', '', '', 0, '');
    this.addMode = this.libraryService.AddMode;
    this.editMode = this.libraryService.editMode;
  }

  isValidId() {
      let id = this.libraryService.getNewId();
      const allBooks = this.libraryService.getArrBooks();
      let foundNewId = false;
      while (!foundNewId) {
          for (const book of allBooks) {
              if (book.id === id.toString()) {
                  id = id + 1;
              }
          }
          foundNewId = true;
      }
      this.newId = id.toString();
      this.libraryService.setNewId(id + 1);
  }

  isValidTitle() {
      this.validTitle = true;
      const titleToCheck = this.addForm.value.title.replace(/[^a-zA-Z_ ]/g, '').toString().toLowerCase();
      const allBooks = this.libraryService.getArrBooks();
      for (const book of allBooks) {
          if (book.title.toLowerCase() === titleToCheck) {
                  this.validTitle = false;
          }
      }
  }

    isValidDate() {
        this.validDate = true;
        const date = this.addForm.value.date;
        if ( date > 2018 || date < 1500) {
                this.validDate = false;
            }
    }

  onSave() {
      this.isValidId();
      this.isValidTitle();
      this.isValidDate();
      if (this.validTitle && this.validDate) {
          const titleToCheck = this.addForm.value.title.replace(/[^a-zA-Z_ ]/g, '').toString();
          this.book.title = titleToCheck;
          this.book.author = this.addForm.value.author.replace(/[^a-zA-Z_, ]/g, '').toString();
          this.book.publicationDate = this.addForm.value.date;
        if (this.addMode) {
          this.book.id = this.newId;
          this.book.imagePath = './assets/books-stack.svg';
          this.libraryService.addNewBook(this.book);
          this.onCancel();
        }
        if (this.editMode) {
          this.book.id = this.addForm.value.id;
          this.libraryService.changeBookDetails(this.book);
          this.onCancel();
        }
          this.onCancel();
      }
  }

  onCancel() {
      this.libraryService.resetModes();
      this.dialogRef.close();
  }
}
