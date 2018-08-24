import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeuiComponent } from './exchangeui.component';

describe('ExchangeuiComponent', () => {
  let component: ExchangeuiComponent;
  let fixture: ComponentFixture<ExchangeuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
