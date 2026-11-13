import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBookEdit } from './admin-book-edit';

describe('AdminBookEdit', () => {
  let component: AdminBookEdit;
  let fixture: ComponentFixture<AdminBookEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBookEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
