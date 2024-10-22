export class LoginEmailResponse{
  usuario_email:string | null;
  usuario_token:string | null;

  constructor(email: string | null,token: string | null){
      this.usuario_email=email;
      this.usuario_token = token;
  }
}
