import { NgModule } from '@angular/core';
import { DisableControlDirective } from './disableControl.directive';
import { ToUpperCaseDirective } from './toUpperCase.directive';
import { HasRoleDirective } from './has-role.directive';
import { ToLowerCaseDirective } from './toLowerCase.directive';
import { MinNumberDirective } from './min-number-validator.directive';
import { MaxNumberDirective } from './max-number-validator.directive';
import { DateFormate } from './date-formate.directive';

@NgModule({
  declarations: [
    DisableControlDirective,
    ToUpperCaseDirective,
    HasRoleDirective,
    ToLowerCaseDirective,
    MinNumberDirective,
    MaxNumberDirective,
    DateFormate
  ],
  exports: [
    DisableControlDirective,
    ToUpperCaseDirective,
    HasRoleDirective,
    ToLowerCaseDirective,
    MinNumberDirective,
    MaxNumberDirective,
    DateFormate
    ]
})
export class SharedDirectives {}
