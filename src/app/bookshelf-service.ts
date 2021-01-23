import { Injectable } from '@angular/core';
import { ItemFile } from './models/ItemFile';
import { ItemFolder } from './models/ItemFolder';

@Injectable({ providedIn: 'root' })
export class AppBookshelfService {
  private bookshelf: any = [
    {
      name: 'Im Westen nichts Neues',
      description: 'The book by author Eirch Maria Remarque',
      imageLink:
        'https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/7/4/74431_60714327.jpg',
    },
    {
      name: 'Der Funke Leben',
      description: 'The book by author Eirch Maria Remarque',
      imageLink:
        'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
    },
    {
      name: 'Books',
      isDeletable: true,
      includedFiles: [
        {
          name: 'Der Funke Leben',
          description: 'The book by author Eirch Maria Remarque',
          imageLink:
            'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
        },
      ],
      includedFolders: [
        {
          name: 'Thrillers',
          isDeletable: true,
          includedFiles: [
            {
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
            {
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
            {
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
            {
              name: 'Der Funke Leben',
              description: 'The book by author Eirch Maria Remarque',
              imageLink:
                'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
            },
          ],
          includedFolders: [
            {
              name: '2007',
              isDeletable: true,
              includedFiles: [
                {
                  name: 'Der Funke Leben',
                  description: 'The book by author Eirch Maria Remarque',
                  imageLink:
                    'https://images-na.ssl-images-amazon.com/images/I/71-dnZuZ0pL.jpg',
                },
                {
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

  getFiles(): Array<ItemFile> {
    return this.bookshelf.slice().filter((item) => item.description);
  }

  getFolders(): Array<ItemFolder> {
    return this.bookshelf
      .slice()
      .filter((item) => item.description === undefined);
  }
}
