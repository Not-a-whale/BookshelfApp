import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { ItemFolder } from '../models/ItemFolder';
import { ItemFile } from '../models/Item';
import { AppBookshelfService } from '../bookshelf-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
  checkboxForm: FormGroup;

  constructor(private bookshelfService: AppBookshelfService, private router: Router) {}

  ngOnInit(): void {
    this.bookshelfService.getFiles();
    this.bookshelfService.filesSubj.subscribe(data => {
      this.files = data;
      let groupOfCheckboxes = {};
      this.files.forEach(element => {
        groupOfCheckboxes[element.id.toString()] = new FormControl("");
      });
      this.checkboxForm = new FormGroup(groupOfCheckboxes);
    });

    // this.getFolders();
  }

  startCreatingFolder() {
    this.isFolderBeingCreated = !this.isFolderBeingCreated;
  }

  createFile(id: number) {
    this.bookshelfService.emitIdForFile(id);
    this.router.navigate(['create']);
    window.location.reload();
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
    window.location.reload();
  }

  onSubmit() {
    let arr = Object.values(this.checkboxForm.value);
    let indexArr = [];
    arr.forEach((item, index) => {
      if(item) {
        indexArr.push(index + 1);
      }
    })
    this.bookshelfService.deleteItems(indexArr);
  }
}
