import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder-list-edit',
  templateUrl: './folder-list-edit.component.html',
  styleUrls: ['./folder-list-edit.component.scss'],
})
export class FolderListEditComponent implements OnInit {
  folderEdited = [1, 2, 3];

  constructor() {}

  ngOnInit(): void {}
}
