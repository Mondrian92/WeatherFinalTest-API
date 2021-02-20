import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenNavComponent } from './hidden-nav.component';

describe('HiddenNavComponent', () => {
  let component: HiddenNavComponent;
  let fixture: ComponentFixture<HiddenNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiddenNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
