import { Component, OnInit } from '@angular/core';
import { ItemFolder } from '../models/ItemFolder';
import { ItemFile } from '../models/ItemFile';
import { AppBookshelfService } from '../bookshelf-service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {
  folders: ItemFolder[];
  files: ItemFile[];

  constructor(private bookshelfService: AppBookshelfService) {}

  ngOnInit(): void {
    this.getFiles();
    this.getFolders();
  }

  getFiles() {
    this.files = this.bookshelfService.getFiles();
    console.log(this.files);
  }

  getFolders() {
    this.folders = this.bookshelfService.getFolders();
  }
}
