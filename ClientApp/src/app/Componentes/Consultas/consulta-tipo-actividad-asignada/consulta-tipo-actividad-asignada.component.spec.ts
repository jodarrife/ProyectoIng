import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTipoActividadAsignadaComponent } from './consulta-tipo-actividad-asignada.component';

describe('ConsultaTipoActividadAsignadaComponent', () => {
  let component: ConsultaTipoActividadAsignadaComponent;
  let fixture: ComponentFixture<ConsultaTipoActividadAsignadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTipoActividadAsignadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTipoActividadAsignadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
