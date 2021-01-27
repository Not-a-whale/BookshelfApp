import { Component, OnInit, Input, ViewChild } from '@angular/core';
//import { ItemFolder } from '../../models/ItemFolder';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-folder-list-item',
  templateUrl: './folder-list-item.component.html',
  styleUrls: ['./folder-list-item.component.scss'],
})
export class FolderListItemComponent implements OnInit {
  //  @Input() folder: ItemFolder;
  @ViewChild('MatExpansionPanel', { static: true })
  matExpansionPanelElement: MatExpansionPanel;

  constructor() {}

  ngOnInit(): void {
    console.log(this.matExpansionPanelElement);
  }

  notClosePanel() {
    this.matExpansionPanelElement.close();
  }
}
