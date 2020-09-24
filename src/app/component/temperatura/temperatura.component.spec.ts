import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TemperaturaComponent } from './temperatura.component';

describe('TemperaturaComponent', () => {
  let component: TemperaturaComponent;
  let fixture: ComponentFixture<TemperaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
