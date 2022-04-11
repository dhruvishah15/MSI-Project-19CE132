import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMappingDataComponent } from './project-mapping-data.component';

describe('ProjectMappingDataComponent', () => {
  let component: ProjectMappingDataComponent;
  let fixture: ComponentFixture<ProjectMappingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMappingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMappingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
