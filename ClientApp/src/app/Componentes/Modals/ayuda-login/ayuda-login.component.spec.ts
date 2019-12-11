import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaLoginComponent } from './ayuda-login.component';

describe('AyudaLoginComponent', () => {
  let component: AyudaLoginComponent;
  let fixture: ComponentFixture<AyudaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
