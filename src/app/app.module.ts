import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LibraryComponent } from './library/library.component';
import { HeaderComponent } from './header/header.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewItemComponent } from './dialog/view-item/view-item.component';
import {LibraryService} from './library/library.service';
import {FormsModule} from '@angular/forms';
import { DeleteBookComponent } from './dialog/view-item/delete-book/delete-book.component';
import { EditBookComponent } from './dialog/view-item/edit-book/edit-book.component';
import { AddBookComponent } from './dialog/view-item/add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    HeaderComponent,
    DialogComponent,
    ViewItemComponent,
    DeleteBookComponent,
    EditBookComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatDialogModule,
      FormsModule
  ],
    entryComponents: [
        DialogComponent
    ],
  providers: [
      LibraryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
