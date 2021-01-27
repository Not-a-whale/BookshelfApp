import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderListPreviewComponent } from './folder-list-preview/folder-list-preview.component';
import { FolderListEditComponent } from './folder-list-edit/folder-list-edit.component';

const routes: Routes = [
  { path: '', component: FolderListPreviewComponent },
  { path: ':fileId', component: FolderListPreviewComponent },
  { path: 'edit/:fileId', component: FolderListEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
