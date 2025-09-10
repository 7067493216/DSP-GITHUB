import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './postlogin/message-pages/page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
import { UnlockUserComponent } from './postlogin/user-modules/unlock-user/unlock-user.component';
import { RegistrationRecieptComponent } from './registration-reciept/registration-reciept.component';
import { DemaandRecieptComponent } from './demaand-reciept/demaand-reciept.component';
import { ReviseDemandRecieptComponent } from './revise-demand-reciept/revise-demand-reciept.component';
import { PaymentRecieptComponent } from './payment-reciept/payment-reciept.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ConsumerLoginComponent } from './postlogin/consumer-modules/consumer-login/consumer-login.component';




const routes: Routes = [

//  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
//  { path: 'consumer/login', component: ConsumerLoginComponent },
 { path: '', redirectTo: '/consumer/login', pathMatch: 'full' },
  { path: 'user-unlock', component: UnlockUserComponent },
  // { path: 'track-application', component: TrackApplicationComponent },
  // { path: 'application-list', component: ApplicationListComponent },
  // { path: 'application-view', component: ApplicationViewComponent },
   { path: 'landing-page', component: LandingPageComponent },

  {
    path: 'consumer',
    loadChildren: () => import('./postlogin/consumer-modules/consumer-modules.module').then(m => m.ConsumerModulesModule)
  },

  
  {
    path: 'track',
    loadChildren: () => import('./track-application/track/track.module').then(m => m.TrackModule)
  },


  {
    path: 'user',
    loadChildren: () => import('./postlogin/user-modules/user.module').then(m => m.UserModule)
  },
 // { path: '**', component: PageNotFoundComponent, data: { error: 404 } }

 { path: 'registration-reciept', component: RegistrationRecieptComponent },
  { path: 'demaand-reciept', component: DemaandRecieptComponent },
  { path: 'revise-demaand-reciept', component: ReviseDemandRecieptComponent },
  { path: 'Payment-reciept', component: PaymentRecieptComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, preloadingStrategy: PreloadAllModules })], // PreloadAllModules
  exports: [RouterModule]
})
export class AppRoutingModule { }
