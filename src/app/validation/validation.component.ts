import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
  form: FormGroup;  
  registrationSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      start_date: ['', Validators.required],
      end_date: ['', [Validators.required, this.endDateAfterStartDateValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordConfirmationValidator });
  }

  passwordConfirmationValidator(group: FormGroup | null) {
    if (group) {
      const password = group.get('password')?.value;
      const confirm_password = group.get('confirm_password')?.value;

      return password === confirm_password ? null : { passwordMismatch: true };
    }
    return null;
  }

  endDateAfterStartDateValidator(control: FormControl) {
    const startDate = new Date(control.parent?.get('start_date')?.value);
    const endDate = new Date(control.value);

    if (startDate && endDate && endDate < startDate) {
      return { endDateBeforeStartDate: true }
    }
    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.registrationSuccess = true;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
