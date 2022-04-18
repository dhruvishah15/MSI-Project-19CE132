import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectMappingDataComponent } from './view-project-mapping-data.component';

describe('ViewProjectMappingDataComponent', () => {
  let component: ViewProjectMappingDataComponent;
  let fixture: ComponentFixture<ViewProjectMappingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectMappingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectMappingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
