import {Component, OnInit} from '@angular/core';
import {LibraryService} from '../../library/library.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  editMode = false;
  deleteMode = false;
  AddMode = false;


  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
      this.editMode = this.libraryService.editMode;
      this.deleteMode = this.libraryService.deleteMode;
      this.AddMode = this.libraryService.AddMode;

  }

}
