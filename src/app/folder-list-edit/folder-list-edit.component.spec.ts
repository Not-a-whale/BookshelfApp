import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListEditComponent } from './folder-list-edit.component';

describe('FolderListEditComponent', () => {
  let component: FolderListEditComponent;
  let fixture: ComponentFixture<FolderListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
