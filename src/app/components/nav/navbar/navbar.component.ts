import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppRoutes } from '../../../constants/app-routes';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  currentRoute:string = AppRoutes.ACCOUNT_ROUTE
  constructor(private router:Router){

  }
  ngOnInit(): void {
    this.currentRoute = this.router.url
  }
}
