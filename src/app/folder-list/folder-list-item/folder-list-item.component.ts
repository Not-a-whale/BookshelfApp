import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import { ItemFolder } from '../../models/ItemFolder';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppBookshelfService } from 'src/app/bookshelf-service';
import { ItemFile } from 'src/app/models/Item';

@Component({
  selector: 'app-folder-list-item',
  templateUrl: './folder-list-item.component.html',
  styleUrls: ['./folder-list-item.component.scss'],
})
export class FolderListItemComponent implements OnInit {
  @Input() folder: ItemFile;
  files: any;
  relevantFolders = [];
  mode: string;
  @ViewChild('MatExpansionPanel', { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  isFolderBeingCreated = false;
  @ViewChild("folderInput", {static: false}) folderNameInput: ElementRef;
  @Input() public form: FormGroup;

  constructor(private bookshelfService: AppBookshelfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.files = this.bookshelfService.filesAndFolders;
    this.relevantFolders = this.bookshelfService.getRelevantItems(this.folder.id);
  }

  startCreatingFolder() {
    this.matExpansionPanelElement.close();
    this.isFolderBeingCreated = !this.isFolderBeingCreated;
    this.mode = "create";
  }

  addFolder(event, parentId: number) {
    event.stopPropagation();
    this.bookshelfService.emitIdForFile(parentId);
    const folder = {
      name: this.folderNameInput.nativeElement.value,
      description: "",
      imageLink: "",
      isDeleted: 0,
      parentId: parentId,
      isFolder: 1
    }
    if(this.mode === "create") {
      this.bookshelfService.postFile(folder);
    } 
    if(this.mode === "edit") {
      const editedFolder = {
        name: this.folderNameInput.nativeElement.value,
        description: "",
        imageLink: "",
        isDeleted: 0,
        parentId: this.folder.parentId,
        id: this.folder.id,
        isFolder: 1
      }
      this.bookshelfService.updateItem(editedFolder);
    }
    this.folderNameInput.nativeElement.value = "";
    this.isFolderBeingCreated = false;
  }

  startEditFolder(id: number) {
    this.matExpansionPanelElement.close();
    this.isFolderBeingCreated = !this.isFolderBeingCreated;
    if(this.folderNameInput) {
      this.folderNameInput.nativeElement.value = this.bookshelfService.filesAndFolders.find(elem => elem.id === id).name;
    }
    this.mode = "edit"
  }

  addFile(parentId: number) {
    this.matExpansionPanelElement.close();
    this.bookshelfService.emitIdForFile(parentId);
    this.router.navigate(['create']);
  }

  stopFolding() {
    this.matExpansionPanelElement.close();
  }
}
