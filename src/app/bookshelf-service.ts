import { Injectable } from '@angular/core';
import { ItemFile } from './models/Item';
//import { ItemFolder } from './models/ItemFolder';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppBookshelfService {
  filesAndFolders = [];
  filteredArrOfFolders = [];
  filesSubj = new Subject();
  curentParent = 10;
  /*   private bookshelf: any = [
    {
      id: '1',
      name: 'Im Westen nichts Neues',
      description: 'The book by author Eirch Maria Remarque',
      imageLink:
        'https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/7/4/74431_60714327.jpg',
    },
    {
      id: '2',
      name: 'Der Funke Leben',
      description: 'The book by author Eirch Maria Remarque',
      imageLink:
        'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
    },
    {
      id: '3',
      name: 'Books',
      isDeletable: true,
      includedFiles: [
        {
          id: '4',
          name: 'Der Funke Leben',
          description: 'The book by author Eirch Maria Remarque',
          imageLink:
            'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
        },
      ],
      includedFolders: [
        {
          id: '5',
          name: 'Thrillers',
          isDeletable: true,
          includedFiles: [
            {
              id: '6',
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
            {
              id: '7',
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
            {
              id: '8',
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
            {
              id: '9',
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
          ],
          includedFolders: [
            {
              id: '10',
              name: '2007',
              isDeletable: true,
              includedFiles: [
                {
                  id: '11',
                  name: 'Der Funke Leben',
                  description: 'The book by author Eirch Maria Remarque',
                  imageLink:
                    'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
                },
                {
                  id: '12',
                  name: 'Der Funke Leben',
                  description: 'The book by author Eirch Maria Remarque',
                  imageLink:
                    'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
                },
              ],
              includedFolders: [],
            },
          ],
        },
      ],
    },
  ];
 */

  getFiles() {
     this.http.get<any>('http://localhost:3000/api/items').subscribe(
       data => {
         data.items.forEach(item => {
           this.filesAndFolders.push(item);
           if(item.parentId !== 0 && item.isFolder === 1) {
            this.filteredArrOfFolders.push(item);
           }
         });
         this.filesSubj.next(this.filesAndFolders.slice());
       }
     )
  }

  getFile(id: number): Observable<ItemFile> {
    console.log(id)
    return this.http.get<ItemFile>("http://localhost:3000/api/items/" + id);
  }

  emitIdForFile(parentId: number) {
    this.curentParent = parentId;
    console.log(this.curentParent)
  }

  getCurentParent() {
    return this.curentParent;
  }

  postFile(item: ItemFile) {
    return this.http.post<ItemFile>("http://localhost:3000/api/items/", item).subscribe(response => {
      console.log("response")
    })
  }

  getRelevantItems(id: number): any {
    let filteredArray = this.filteredArrOfFolders.filter(item => item.parentId === id);
    this.filteredArrOfFolders = this.filteredArrOfFolders.filter(item => item.parentId !== id);
    return filteredArray;
  }



  /*  getFiles(): Array<ItemFile> {
    //return this.bookshelf.slice().filter((item) => item.description);
  } */

  /*   getFolders(): Array<ItemFolder> {
    return this.bookshelf
      .slice()
      .filter((item) => item.description === undefined);
  } */

  /* getFile(id: string) {
    let item: ItemFile;

    // recursive function to look for the file in included folders
    const findInFolders = (folder: ItemFolder) => {
      let itemInFolder = folder.includedFiles.find((file) => file.id === id);
      if (!item) {
        for (let i = 0; i < folder.includedFolders.length; i++) {
          findInFolders(folder.includedFolders[i]);
        }
      }
      if (itemInFolder) {
        item = itemInFolder;
        return itemInFolder;
      }
    };

    // Looping through the array in search of a file
    this.bookshelf.forEach((bookshelfItem) => {
      if (bookshelfItem.id === id) {
        item = bookshelfItem;
      } else if (bookshelfItem.includedFolders) {
        findInFolders(bookshelfItem);
      }
    });
    return item;
  } */

  constructor(private http: HttpClient) {}
}
