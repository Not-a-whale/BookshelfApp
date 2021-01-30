import { Injectable } from '@angular/core';
import { ItemFile } from './models/Item';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppBookshelfService {
  filesAndFolders: ItemFile[];
  filteredArrOfFolders = [];
  filesSubj = new Subject();
  curentParent = +localStorage.getItem("idOfLastParent");
 
  getFiles() {
     this.http.get<any>('./api/items').subscribe(
       (data: any) => {
         console.log(data);
        this.filesAndFolders = data.items;         
        console.log(this.filesAndFolders);
         data.items.forEach(item => {
           if(item.parentId !== 0 && item.isFolder === 1) {
            this.filteredArrOfFolders.push(item);
           }
         });
         this.filesSubj.next(this.filesAndFolders.slice());
       }
     )
  }

  getFile(id: number): Observable<ItemFile> {
    return this.http.get<ItemFile>("./api/items/" + id);
  }

  emitIdForFile(parentId: number) {
    let idOfLastParent;
    localStorage.setItem("idOfLastParent", parentId.toString()) 
  }

  getCurentParent() {
    return this.curentParent;
  }

  postFile(item: ItemFile) {
    return this.http.post<ItemFile>("./api/items/create", item).subscribe(response => {

    })
  }

  getRelevantItems(id: number): any {
    let filteredArray = this.filteredArrOfFolders.filter(item => item.parentId === id);
    this.filteredArrOfFolders = this.filteredArrOfFolders.filter(item => item.parentId !== id);
    return filteredArray;
  }

  updateItem(item: ItemFile) {
    return this.http.post<ItemFile>("./api/items/edit", item).subscribe(data => {
    })
  }

  deleteItems(idsArr: number[]) {
    let filteredElems: number[] = [];
    idsArr.forEach(item => {
      let file = this.filesAndFolders.find(elem => item === elem.id);
      if(file.isFolder === 0) {
        file.isDeleted = 1;
        this.updateItem(file);
      } else {
        file.isDeleted = 1;
        this.updateItem(file);
        this.filesAndFolders.filter(folder => folder.parentId === file.id).forEach(filteredItem => filteredElems.push(filteredItem.id));
        if(filteredElems.length > 0) {
          this.deleteItems(filteredElems);
        }
      }
    })
  }

  constructor(private http: HttpClient) {}
}
