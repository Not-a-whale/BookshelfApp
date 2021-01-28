import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ItemFile } from '../../../models/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-list-item',
  templateUrl: './file-list-item.component.html',
  styleUrls: ['./file-list-item.component.scss'],
})
export class FileListComponent implements OnInit {
  @Input() file: ItemFile;
  @ViewChild('MatExpansionPanel', { static: true })
  matExpansionPanelElement: MatExpansionPanel;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  notClosePanel() {
    this.matExpansionPanelElement.close();
  }

  redirectToPreview(id: string) {
    this.router.navigate([id]);
  }

  onClick(event, id: string) {
    event.stopPropagation();
    this.router.navigate(['/edit', id], );
  }
}
