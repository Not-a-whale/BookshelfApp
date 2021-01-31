import { Component, OnInit, HostBinding } from '@angular/core';
import { ItemFile } from '../models/Item';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppBookshelfService } from '../bookshelf-service';

@Component({
  selector: 'app-folder-list-preview',
  templateUrl: './folder-list-preview.component.html',
  styleUrls: ['./folder-list-preview.component.scss'],
})
export class FolderListPreviewComponent implements OnInit {
  item: ItemFile;
  private fileId: string;
  itemSub: Subscription;
  files: any;

  constructor(
    public route: ActivatedRoute,
    public bookshelfService: AppBookshelfService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('fileId')) {
        this.fileId = paramMap.get('fileId');
        this.bookshelfService.getFile(+this.fileId).subscribe(
          (data: ItemFile) => {
            this.item = data;
          }
        )
      }
    });
  }
}
