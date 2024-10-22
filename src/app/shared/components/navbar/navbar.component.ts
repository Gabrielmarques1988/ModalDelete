import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NotificationComponent,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit  {

  dropdown_open = false;
  helper = new JwtHelperService();
  token: string | null | undefined;
  decodedToken: any;

  constructor(private router: Router, private loginService : LoginService) {}

  ngOnInit(): void {
    if(sessionStorage.getItem("jwt")){
      this.token = sessionStorage.getItem("jwt")
      if (this.token)
        this.decodeToken(this.token)
    }
  }
  decodeToken(tkn: string): void {
    if(tkn) {
    this.token = tkn;
    this.decodedToken = this.helper.decodeToken(tkn);
    }

  }
  toggleDropdown(): void {
    this.dropdown_open = !this.dropdown_open;
  }

  relatorio(): void {
    this.router.navigate(['/relatorio']);
  }

  logoOut(){
    sessionStorage.removeItem('empresaNomeselecionada');
    sessionStorage.removeItem('idEmpresa');
    sessionStorage.removeItem('idEmpresaSelecionada');
    this.loginService.logout();
    this.router.navigate(['']);
  }

}

