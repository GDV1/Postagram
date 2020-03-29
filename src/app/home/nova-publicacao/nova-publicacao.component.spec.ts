import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPublicacaoComponent } from './nova-publicacao.component';

describe('NovaPublicacaoComponent', () => {
  let component: NovaPublicacaoComponent;
  let fixture: ComponentFixture<NovaPublicacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaPublicacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
