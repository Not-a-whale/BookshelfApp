import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppBookshelfService } from '../bookshelf-service';
import { ItemFile } from '../models/Item';

@Component({
  selector: 'app-folder-list-edit',
  templateUrl: './folder-list-edit.component.html',
  styleUrls: ['./folder-list-edit.component.scss'],
})
export class FolderListEditComponent implements OnInit {
  form: FormGroup;
  mode: string;
  postId: number;
  post: ItemFile;
  parentId: number;

  constructor(
    private route: ActivatedRoute,
    private bookshelfService: AppBookshelfService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      imageLink: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('fileId')) {
        this.mode = 'edit';
        this.postId = +paramMap.get('fileId');
        this.bookshelfService.getFile(+this.postId).subscribe((data: ItemFile) => {
          this.post = data;

          this.form.setValue({
            name: this.post.name,
            imageLink: this.post.imageLink,
            description: this.post.description
          })
        })

      } else {
        this.mode = 'create';
        this.postId = null;
      } 
    });

  }

  onSaveFile() {
    event.preventDefault()
    if(this.form.valid) {
      const newValue: ItemFile = {
        id: +this.postId,
        name: this.form.get('name').value,
        description: this.form.get('description').value,
        imageLink: this.form.get('imageLink').value,
        parentId: this.bookshelfService.getCurentParent(),
        isFolder: 0,
        isDeleted: 0
      };
      if(this.mode === "create") {
        this.bookshelfService.filesAndFolders.push(newValue)
        this.bookshelfService.postFile(newValue);
      } else {
        let updatedPost = this.bookshelfService.filesAndFolders.find(elem => elem.id === newValue.id);
        updatedPost.name = newValue.name;
        updatedPost.description = newValue.description;
        updatedPost.imageLink = newValue.imageLink;
        this.bookshelfService.updateItem(newValue);
        this.bookshelfService.getFiles();
      }
      this.router.navigate(['']);
    }
    }
}
