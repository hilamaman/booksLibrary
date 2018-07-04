import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {LibraryService} from '../library/library.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              private libraryService: LibraryService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.libraryService.resetModes();
  }
  onClose() {
    this.dialogRef.close();
  }
}
