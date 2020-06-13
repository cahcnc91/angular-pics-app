import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lowers-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.services';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.services';

@Component({
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupservice: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          lowerCaseValidator,
        ],
        this.userNotTakenValidatorService.checkUserNameTaken(),
      ],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });
  }

  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() && this.inputEmail.nativeElement.focus();
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupservice
      .signup(newUser)
      .subscribe(
        () => this.router.navigate(['']),
        err => console.log(err)
    );
  }
}
