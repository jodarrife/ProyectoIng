import { TestBed } from '@angular/core/testing';

import { ActividadAsignadaService } from './actividad-asignada.service';

describe('ActividadAsignadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActividadAsignadaService = TestBed.get(ActividadAsignadaService);
    expect(service).toBeTruthy();
  });
});
