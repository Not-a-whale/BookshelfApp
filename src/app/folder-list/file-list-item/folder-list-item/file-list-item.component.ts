import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ItemFile } from '../../../models/Item';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-list-item',
  templateUrl: './file-list-item.component.html',
  styleUrls: ['./file-list-item.component.scss'],
})
export class FileListComponent implements OnInit {
  @Input() file: ItemFile;
  @ViewChild('MatExpansionPanel', { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  @Input() public form: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  notClosePanel() {
    this.matExpansionPanelElement.close();
  }

  redirectToPreview(id: number) {
    this.router.navigate([id]);
  }

  onClick(event, id: number) {
    event.stopPropagation();
    this.router.navigate(['/edit', id], );
  }
}
