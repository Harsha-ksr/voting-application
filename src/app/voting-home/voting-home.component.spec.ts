import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingHomeComponent } from './voting-home.component';

describe('VotingHomeComponent', () => {
  let component: VotingHomeComponent;
  let fixture: ComponentFixture<VotingHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotingHomeComponent]
    });
    fixture = TestBed.createComponent(VotingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
