import { Component, OnInit, HostBinding } from '@angular/core';
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
  postId: string;
  post: ItemFile;

  @HostBinding('style.width') public width: string = '45%';
  constructor(
    private route: ActivatedRoute,
    private bookshelfService: AppBookshelfService,
    private router: Router
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
        this.postId = paramMap.get('fileId');
        // this.post = this.bookshelfService.getFile(this.postId);
        this.form.setValue({
          name: this.post.name,
          description: this.post.description,
          imageLink: this.post.imageLink,
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSaveFile() {
    const newValue = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      imageLink: this.form.get('imageLink').value,
    };
    this.post.name = newValue.name;
    this.post.imageLink = newValue.imageLink;
    this.post.description = newValue.description;
    this.router.navigate(['']);
  }
}
