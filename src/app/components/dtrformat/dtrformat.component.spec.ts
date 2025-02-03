import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtrformatComponent } from './dtrformat.component';

describe('DtrformatComponent', () => {
  let component: DtrformatComponent;
  let fixture: ComponentFixture<DtrformatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DtrformatComponent]
    });
    fixture = TestBed.createComponent(DtrformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
