import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexContainerComponent } from './pokedex-container.component';

describe('PokedexContainerComponent', () => {
  let component: PokedexContainerComponent;
  let fixture: ComponentFixture<PokedexContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokedexContainerComponent]
    });
    fixture = TestBed.createComponent(PokedexContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
