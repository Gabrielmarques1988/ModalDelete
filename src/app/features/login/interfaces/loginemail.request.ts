export class LoginEmailRequest {
  usuario_email: string | null;

  constructor(email: string | null){
    this.usuario_email = email
  }
}
