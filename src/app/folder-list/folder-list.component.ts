import { Component, OnInit } from '@angular/core';
//import { ItemFolder } from '../models/ItemFolder';
import { ItemFile } from '../models/Item';
import { AppBookshelfService } from '../bookshelf-service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {
  //folders: ItemFolder[];
  files = [];

  constructor(private bookshelfService: AppBookshelfService) {}

  ngOnInit(): void {
    this.getFiles();
    // this.getFolders();
  }

  getFiles() {
    this.bookshelfService.getFiles().subscribe((file: any) => {
      file.items[0].forEach((item) => {
        this.files.push(item);
      });
      console.log(file.items);
      console.log(this.files);
    });
    console.log(this.files);
  }

  /*   getFolders() {
    this.folders = this.bookshelfService.getFolders();
  } */
}
