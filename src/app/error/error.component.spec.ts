import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message', () => {
    const errorMessage = 'An error occurred';

    component.errorMessage = errorMessage;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const errorMessageElement = element.querySelector('p');

    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement!.textContent).toBe(errorMessage);
  });

  it('should not display the error message if it is empty', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const errorMessageElement = element.querySelector('p');

    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement!.textContent).toBe('');
  });
});
