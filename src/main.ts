import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `

    <form [formGroup]="passwordGroup">


    <div>Instructions: must have 1 lowercase, 1 uppercase, 1 number, 1 symbol, 8 - 20 characters</div>

    <input type="password" formControlName="password">

    <div *ngIf="name?.invalid">
      <div *ngIf="name?.errors?.['alphanum']">
      must have 1 lowercase, 1 uppercase, 1 number, 1 symbol, 8 - 20 characters
      </div>

      <div *ngIf="name?.errors?.['lower']">
      must have 1 lowercase
      </div>

      <div *ngIf="name?.errors?.['upper']">
      must have 1 uppercase
      </div>

      <div *ngIf="name?.errors?.['num']">
      must have 1 number
      </div>

      <div *ngIf="name?.errors?.['symbol']">
      must have 1 symbol
      </div>

      
      <div *ngIf="name?.errors?.['length']">
      must have 8 - 20 characters
      </div>
      
      
    </div>

    </form>
    
  `,
})
export class App {
  constructor(private fb: FormBuilder) {}

  passwordGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      // this.validation,
      this.lowerValidation,
      this.upperValidation,
      this.numberValidation,
      this.symbolValidation,
      this.lengthValidation,
    ]),
  });

  validation(password: AbstractControl): ValidationErrors | null {
    let pass = password.value;
    console.log(pass);
    let errors: ValidationErrors = {};

    const reg = /[A-z0-9@$!%*?&]{8,20}/;
    if (!reg.test(pass)) {
      console.log('Not alphanums');
      return { alphanum: { value: pass } };
    }

    return null;
  }

  lowerValidation(password: AbstractControl): ValidationErrors | null {
    let pass = password.value;
    let errors: ValidationErrors = {};
    const reg = /[a-z]/;
    if (!reg.test(pass)) {
      return { lower: { value: pass } };
    }
    return null;
  }

  upperValidation(password: AbstractControl): ValidationErrors | null {
    let pass = password.value;
    let errors: ValidationErrors = {};
    const reg = /[A-Z]/;
    if (!reg.test(pass)) {
      return { upper: { value: pass } };
    }
    return null;
  }

  numberValidation(password: AbstractControl): ValidationErrors | null {
    let pass = password.value;
    let errors: ValidationErrors = {};
    const reg = /[0-9]/;
    if (!reg.test(pass)) {
      return { num: { value: pass } };
    }
    return null;
  }

  symbolValidation(password: AbstractControl): ValidationErrors | null {
    let pass = password.value;
    let errors: ValidationErrors = {};
    const reg = /[@$!%*?&]/;
    if (!reg.test(pass)) {
      return { symbol: { value: pass } };
    }
    return null;
  }

  lengthValidation(password: AbstractControl): ValidationErrors | null {
    let pass = password.value;
    let errors: ValidationErrors = {};
    const reg = /(?=.*\d){8,20}/;
    if (!reg.test(pass)) {
      return { length: { value: pass } };
    }
    return null;
  }

  get name() {
    return this.passwordGroup.get('password');
  }

  ////
}

bootstrapApplication(App);
