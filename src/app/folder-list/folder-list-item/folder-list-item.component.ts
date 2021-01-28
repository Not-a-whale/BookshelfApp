import { Component, OnInit, Input, ViewChild } from '@angular/core';
//import { ItemFolder } from '../../models/ItemFolder';
import { MatExpansionPanel } from '@angular/material/expansion';
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
  @ViewChild('MatExpansionPanel', { static: true })
  matExpansionPanelElement: MatExpansionPanel;

  constructor(private bookshelfService: AppBookshelfService) {}

  ngOnInit(): void {
    this.files = this.bookshelfService.filesAndFolders;
  }

  notClosePanel() {
    this.matExpansionPanelElement.close();
  }
}
