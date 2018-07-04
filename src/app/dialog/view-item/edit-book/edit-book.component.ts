import {Component, OnInit, ViewChild} from '@angular/core';
import {LibraryService} from '../../../library/library.service';
import {DialogComponent} from '../../dialog.component';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Book} from '../../../shared/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

    book: Book;
    validTitle = true;
    validDate = true;
    @ViewChild('edit') editForm: NgForm;
  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              private libraryService: LibraryService) { }

  ngOnInit() {
      this.book = this.libraryService.getBook();
  }


    isValidTitle(touched) {
        if (touched) {
            this.validTitle = true;
            let titleToCheck = this.editForm.value.title.replace(/[^a-zA-Z_ ]/g, '').toString();
            titleToCheck = this.libraryService.toUpper(titleToCheck);
            const allBooks = this.libraryService.arrBooks;
            for (const book of allBooks) {
                if (book.title === titleToCheck) {
                    if (book.id === this.editForm.value.id) {
                        this.validTitle = true;
                        break;
                    }
                    if (book.id !== this.editForm.value.id) {
                        this.validTitle = false;
                    }
                }
            }
        }
        this.onSave();
    }

    isValidDate() {
        this.validDate = true;
        const date = this.editForm.value.date;
        if ( date > 2018 || date < 1500) {
            this.validDate = false;
        }
    }

    onSave() {
        this.isValidDate();
        if (this.validTitle && this.validDate) {
            this.book.id = this.editForm.value.id;
            const titleToCheck = this.editForm.value.title.replace(/[^a-zA-Z_ ]/g, '').toString();
            this.book.title = this.libraryService.toUpper(titleToCheck);
            this.book.author = this.libraryService.toUpper(this.editForm.value.author.replace(/[^a-zA-Z_ ]/g, '').toString());
            this.book.publicationDate = this.editForm.value.date;
            this.libraryService.changeBookDetails(this.book);
            this.onCancel();
        }
    }
    onCancel() {
        this.libraryService.resetModes();
        this.dialogRef.close();
    }
}
