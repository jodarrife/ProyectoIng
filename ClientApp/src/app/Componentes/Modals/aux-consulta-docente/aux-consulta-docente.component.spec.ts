import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxConsultaDocenteComponent } from './aux-consulta-docente.component';

describe('AuxConsultaDocenteComponent', () => {
  let component: AuxConsultaDocenteComponent;
  let fixture: ComponentFixture<AuxConsultaDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxConsultaDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxConsultaDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
