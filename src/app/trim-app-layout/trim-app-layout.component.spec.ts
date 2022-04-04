import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimAppLayoutComponent } from './trim-app-layout.component';

describe('TrimAppLayoutComponent', () => {
  let component: TrimAppLayoutComponent;
  let fixture: ComponentFixture<TrimAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimAppLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
