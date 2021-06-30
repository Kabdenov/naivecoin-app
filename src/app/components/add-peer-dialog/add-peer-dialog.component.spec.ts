import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeerDialogComponent } from './add-peer-dialog.component';

describe('AddPeerDialogComponent', () => {
  let component: AddPeerDialogComponent;
  let fixture: ComponentFixture<AddPeerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPeerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
