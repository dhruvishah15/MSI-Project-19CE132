import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectMappingDataComponent } from './update-project-mapping-data.component';

describe('UpdateProjectMappingDataComponent', () => {
  let component: UpdateProjectMappingDataComponent;
  let fixture: ComponentFixture<UpdateProjectMappingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProjectMappingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectMappingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
