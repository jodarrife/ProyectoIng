import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDocenteModalComponent } from './consulta-docente-modal.component';

describe('ConsultaDocenteModalComponent', () => {
  let component: ConsultaDocenteModalComponent;
  let fixture: ComponentFixture<ConsultaDocenteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDocenteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDocenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
