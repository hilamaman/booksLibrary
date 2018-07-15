import {Component, OnInit} from '@angular/core';
import {LibraryService} from '../../library/library.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  deleteMode = false;
  AddMode = false;
  editMode = false;


  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
      this.deleteMode = this.libraryService.deleteMode;
      this.AddMode = this.libraryService.AddMode;
      this.editMode = this.libraryService.editMode;
  }

}
