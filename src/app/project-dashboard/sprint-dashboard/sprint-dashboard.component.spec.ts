import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintComponentComponent } from './sprint-dashboard.component';

describe('SprintComponentComponent', () => {
  let component: SprintComponentComponent;
  let fixture: ComponentFixture<SprintComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
