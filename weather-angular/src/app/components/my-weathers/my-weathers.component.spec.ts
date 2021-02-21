import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWeathersComponent } from './my-weathers.component';

describe('MyWeathersComponent', () => {
  let component: MyWeathersComponent;
  let fixture: ComponentFixture<MyWeathersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWeathersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWeathersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
