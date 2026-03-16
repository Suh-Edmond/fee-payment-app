import { Routes } from '@angular/router';
import { FeePaymentComponent } from './components/fee-payment/fee-payment.component';
import { StudentAccountComponent } from './components/account/student-account/student-account.component';

export const routes: Routes = [
   { path: '', redirectTo: 'create-student-account', pathMatch: 'full' },
   { path: 'make-fee-payment', component: FeePaymentComponent, title: 'Institutional Fee Payment' , data:{name:"fee_payment"}},
   { path: 'create-student-account', component: StudentAccountComponent, title: 'Student Account' },
];
