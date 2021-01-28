import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { ItemFolder } from '../models/ItemFolder';
import { ItemFile } from '../models/Item';
import { AppBookshelfService } from '../bookshelf-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {
  //folders: ItemFolder[];
  files: any;
  isFolderBeingCreated = false;
  @ViewChild("folderInput", {static: false}) folderNameInput: ElementRef;

  constructor(private bookshelfService: AppBookshelfService, private router: Router) {}

  ngOnInit(): void {
    this.bookshelfService.getFiles();
    this.bookshelfService.filesSubj.subscribe(data => {
      this.files = data;
      console.log(data)
    });

    // this.getFolders();
  }

  startCreatingFolder() {
    this.isFolderBeingCreated = !this.isFolderBeingCreated;
  }

  createFile(id: number) {
    this.bookshelfService.emitIdForFile(id);
    this.router.navigate(['create']);
  }

  createFolder(event, id) {
    const folder = {
      name: this.folderNameInput.nativeElement.value,
      description: "",
      imageLink: "",
      isDeleted: 0,
      parentId: id,
      isFolder: 1
    }
    this.bookshelfService.postFile(folder);
    this.isFolderBeingCreated = false;
  }

/*   getFiles() {
    this.bookshelfService.getFiles().subscribe((file: any) => {
      
      file.items.forEach((item) => {
        this.files.push(item);
      });
      console.log(this.files);
    });
    console.log(this.files);
  }
 */
  /*   getFolders() {
    this.folders = this.bookshelfService.getFolders();
  } */
}
