import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotValidPageComponent } from './not-valid-page.component';

describe('NotValidPageComponent', () => {
  let component: NotValidPageComponent;
  let fixture: ComponentFixture<NotValidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotValidPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotValidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
