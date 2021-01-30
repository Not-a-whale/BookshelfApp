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
      console.log(data)
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

  onSubmit() {
    //  Gets an array of values from all the checkboxes
    let arr = Object.values(this.checkboxForm.value);
    // An array for their indexes (the ones that are true/checked)
    let indexArr = [];
    // An array for the actual elements
    let idsArr = [];
    // 1) Fill the indexArr with all the idexes in an array of checkboxes that were checked
    arr.forEach((item, index) => {
      if(item === true) {
        indexArr.push(index);
      }
    })
    // 2) Getting the ids for all the checked inputs
    indexArr.forEach((item, index) => {
      idsArr.push(this.bookshelfService.filesAndFolders[item].id);
    })
    // 3) Feeding the array with all the items to the deleting function
   this.bookshelfService.deleteItems(idsArr);
  }
}
