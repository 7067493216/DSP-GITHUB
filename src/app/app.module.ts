import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { MessagePagesModule } from './postlogin/message-pages/message-pages.module';
import { ConsumerApplicationDetailComponent } from './postlogin/user-modules/consumer-application/consumer-application-detail/consumer-application-detail.component';
import { ConsumerApplicationViewComponent } from './postlogin/user-modules/consumer-application/consumer-application-view/consumer-application-view.component';
import { UserLayoutModule } from './postlogin/user-modules/user-layout/user-layout.module';
import { httpInterceptorProviders } from './root-interceptors';
import { HasRoleDirective } from './shared-directives/has-role.directive';
// import { FormModules } from './shared-modules/form.modules';
import { MaterialModule } from './shared-modules/material.module';
import { CryptoService } from './shared-services/crypto.service';
import { MomentUtcDateAdapter } from './shared-services/moment-utc-date-adapter.service';
import { SpinnerService } from './shared-services/spinner.service';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { FilterPipe } from './postlogin/consumer-modules/models/filter.pipe';
import { ChartsModule } from 'ng2-charts';
import { TrialCompComponent } from './trial-comp/trial-comp.component';
import { RegistrationRecieptComponent } from './registration-reciept/registration-reciept.component';
import { DemaandRecieptComponent } from './demaand-reciept/demaand-reciept.component';
import { ReviseDemandRecieptComponent } from './revise-demand-reciept/revise-demand-reciept.component';
import { PaymentRecieptComponent } from './payment-reciept/payment-reciept.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaymentRecieptHeaderComponent } from './payment-reciept-header/payment-reciept-header.component';
import { PopupComponent } from './postlogin/popup/popup.component';

// import { TrackApplicationComponent } from './prelogin/track-application/track-application.component';
// import { ApplicationListComponent } from './prelogin/application-list/application-list.component';
// import { ApplicationViewComponent } from './prelogin/application-view/application-view.component';
// import { ChartsModule } from 'ng2-charts';

import(`@angular/common/locales/en-IN.js`).then(locale => {
  registerLocaleData(locale.default);
});

export function getToken() {
  return (sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : null);
}
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    TrialCompComponent,
    RegistrationRecieptComponent,
    DemaandRecieptComponent,
    ReviseDemandRecieptComponent,
    PaymentRecieptComponent,
    LandingPageComponent,
    PaymentRecieptHeaderComponent,
    PopupComponent,
    
    // TrackApplicationComponent,
    // ApplicationListComponent,
    // ApplicationViewComponent

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    ChartsModule,
    MessagePagesModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization',
        tokenGetter: getToken
      }
    })
  ],
  exports: [
  ],
  providers: [
    httpInterceptorProviders,
    Title,
    SpinnerService,
    CryptoService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: LOCALE_ID, useValue: "en-IN" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },

  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ],
})
export class AppModule { }
