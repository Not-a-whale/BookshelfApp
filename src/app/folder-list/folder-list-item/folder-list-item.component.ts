import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('MatExpansionPanel', { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  isFolderBeingCreated = false;
  @ViewChild("folderInput", {static: false}) folderNameInput: ElementRef;

  constructor(private bookshelfService: AppBookshelfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.files = this.bookshelfService.filesAndFolders;
    this.relevantFolders = this.bookshelfService.getRelevantItems(this.folder.id);
    console.log(this.relevantFolders)
  }

  startCreatingFolder() {
    this.matExpansionPanelElement.close();
    this.isFolderBeingCreated = !this.isFolderBeingCreated;
  }

  addFolder(event, parentId: number) {
    event.stopPropagation();
    console.log(parentId)
    this.bookshelfService.emitIdForFile(parentId);
    const folder = {
      name: this.folderNameInput.nativeElement.value,
      description: "",
      imageLink: "",
      isDeleted: 0,
      parentId: parentId,
      isFolder: 1
    }
    this.bookshelfService.postFile(folder);
    this.folderNameInput.nativeElement.value = "";
    this.isFolderBeingCreated = false;
  }

  addFile(parentId: number) {
    this.matExpansionPanelElement.close();
    this.bookshelfService.emitIdForFile(parentId);
    this.router.navigate(['create']);
  }
}
