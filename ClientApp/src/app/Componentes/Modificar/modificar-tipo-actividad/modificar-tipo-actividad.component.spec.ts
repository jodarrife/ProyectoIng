import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoActividadComponent } from './modificar-tipo-actividad.component';

describe('ModificarTipoActividadComponent', () => {
  let component: ModificarTipoActividadComponent;
  let fixture: ComponentFixture<ModificarTipoActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTipoActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTipoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
