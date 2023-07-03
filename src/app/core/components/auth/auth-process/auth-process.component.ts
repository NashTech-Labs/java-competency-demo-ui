import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth-process',
  templateUrl: './auth-process.component.html',
  styleUrls: ['./auth-process.component.scss']
})
export class AuthProcessComponent implements OnInit {

  UUID: string = "";
  userId: string = "";
  tenantId: string = "";

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.UUID = params['uuid'];
      this.userId = params['userid'];
      this.tenantId = params['tenantId'];

      // save tenant in cookie
      this.authService.saveTenantIdInCookie(this.tenantId);

      if (this.UUID) {
        this.authService.fetchTokenFromSSOServer(this.UUID)
          .subscribe((res) => {
            if (res.idToken) {
              const token = this.authService.saveTokenInCookie(res.idToken);
              this.authService.saveTenantInCookies();
              if (token) {
                this.router.navigateByUrl('/dashboard');
              } else {
                this.router.navigateByUrl('/');
              }
            }
          }, (err) => {
            // if error is happened
            this.router.navigateByUrl("/");
          });
      }
    })
  }
}
