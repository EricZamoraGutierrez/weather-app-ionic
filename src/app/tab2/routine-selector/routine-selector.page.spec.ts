import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutineSelectorPage } from './routine-selector.page';

describe('RoutineSelectorPage', () => {
  let component: RoutineSelectorPage;
  let fixture: ComponentFixture<RoutineSelectorPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(RoutineSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
