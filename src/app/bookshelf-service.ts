import { Injectable } from '@angular/core';
import { ItemFile } from './models/Item';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppBookshelfService {
  filesAndFolders: ItemFile[] = [];
  filteredArrOfFolders = [];
  filesSubj = new Subject();
  curentParent = 0;
 
  getFiles() {
     this.http.get<{items: ItemFile[], message: string}>('./api/items').subscribe(
       (data: {items: ItemFile[], message: string}) => {
         console.log(data);
         console.log(this.filesAndFolders);
         this.filesAndFolders = data.items;
        this.filesAndFolders = data.items.filter(item => item.isDeleted === 0);         
        console.log(this.filesAndFolders);
         data.items.forEach(item => {
           if(item.parentId !== 0 && item.isFolder === 1) {
            this.filteredArrOfFolders.push(item);
           }
         });
     console.log(this.filesAndFolders)
     this.filesSubj.next(data.items.filter(item => item.isDeleted === 0));      }
     )
  }

  getFile(id: number): Observable<ItemFile> {
    return this.http.get<ItemFile>("./api/items/" + id);
  }

  emitIdForFile(parentId: number) {
    this.curentParent = parentId;
  }

  getCurentParent() {
    return this.curentParent;
  }

  postFile(item: ItemFile) {
    console.log(item)
    return this.http.post<ItemFile>("./api/items/", item).subscribe(result => {
    })
  }

  getRelevantItems(id: number): any {
    let filteredArray = this.filteredArrOfFolders.filter(item => item.parentId === id);
    this.filteredArrOfFolders = this.filteredArrOfFolders.filter(item => item.parentId !== id);
    return filteredArray;
  }

  updateItem(item: ItemFile) {
    return this.http.post<ItemFile>("./api/items/edit", item).subscribe((data: any) => {
      console.log(data)
      if(data.result) {
        console.log(data)
      } 
    })
  }

  deleteItems(idsArr: number[]) {
    // an array for all the included items
    let filteredElems: number[] = [];
    // 1) looping through all the top layer elements
    idsArr.forEach(item => {
      // 2) Finding the actual elements that need to be changed
      let file = this.filesAndFolders.find(elem => item === elem.id);
      if(file.isFolder === 0) {
        // 3) If it's a file - deleting it right away
        file.isDeleted = 1;
        // the function merely updates the .isDeleted field, so that we would be able to avoid actual deleting from the database in case we would want to save items for reference
        this.updateItem(file);
        return;
      } else {
        // 4) filtering through all the folders, looking for the ones that contain parentId of our current one (matching fields)
        this.filesAndFolders.filter(folder => folder.parentId === file.id).forEach(filteredItem => filteredElems.push(filteredItem.id));
        // recursion flag
        if(filteredElems.length > 0) {
          // "deleting"
          file.isDeleted = 1;
          // 5) Should we encounter multiple such "layers" calling the function in on itself
          this.deleteItems(filteredElems);
          // 6) updating each folder
          this.updateItem(file);
        } else {
          // --""--
          file.isDeleted = 1;
          // call
          this.updateItem(file);
          return
        }
      } 
    })
  }

  constructor(private http: HttpClient) {}
}
