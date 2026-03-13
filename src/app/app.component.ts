import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { FeePaymentComponent } from './components/fee-payment/fee-payment.component';
import { StudentAccountComponent } from './components/account/student-account/student-account.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FeePaymentComponent,
    StudentAccountComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fee-payment-app';
}
