import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListItemComponent } from './folder-list-item.component';

describe('FolderListItemComponent', () => {
  let component: FolderListItemComponent;
  let fixture: ComponentFixture<FolderListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
