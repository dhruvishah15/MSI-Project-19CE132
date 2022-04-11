import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectMappingDataComponent } from './add-project-mapping-data.component';

describe('AddProjectMappingDataComponent', () => {
  let component: AddProjectMappingDataComponent;
  let fixture: ComponentFixture<AddProjectMappingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectMappingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectMappingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
