import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { Arquivo } from '../../../../core/models/arquivo';
import { ProjetoS3 } from '../../interfaces/projetos3';

@Component({
  selector: 'app-botao-enviar-arquivo',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './botao-enviar-arquivo.component.html',
  styleUrl: './botao-enviar-arquivo.component.css'
})
export class BotaoEnviarArquivoComponent {
  selectedFileName: string | null = null;
  formulario: FormGroup
  arquivo: Arquivo = new Arquivo();
  selectedFile!: File | null;
  selectedFileType!:string;
  link!:string

  constructor(private arquivoService: ArquivoService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      file_name :['', Validators.required],

    })
  }

  ngOnInit(): void {

  }

  verValidade(){
    console.log(this.formulario.valid)
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.selectedFileType = this.selectedFile.type;
      this.formulario.controls['file_name'].setValue(this.selectedFileName)
      console.log(this.selectedFileType)
      console.log(this.selectedFile)


    } else {
      this.selectedFileName = null;
      this.selectedFile = null;
    }
  }

  async onSubmit(){
    if(this.formulario.get('file_name')?.value){
      this.arquivo.arquivo_descricao = this.formulario.get('file_name')?.value
      // this.arquivo.arquivo_link = 'http://www.google.com'
      this.arquivo.arquivo_extensao = this.selectedFileName?.split('.').pop()
      this.arquivo.arquivo_status = 0
      this.arquivo.usuario_id = 5
      this.arquivo.etapa_id = 1
      this.arquivo.projeto_id = 4
      console.log(this.selectedFile)
      console.log(this.arquivo)

      let projeto = new ProjetoS3()
      projeto.projeto_id = this.arquivo.projeto_id
      this.arquivoService.postPutArquivoS3(projeto).subscribe(response =>{
        this.arquivo.arquivo_link = response.arquivo_link
        this.link = response.s3_pre_signed_link
        console.log(response)
        console.log(this.link)
        this.arquivoService.putArquivoInS3(this.selectedFile, this.link, this.selectedFileType).subscribe(response=>{
          console.log(response)
          if(response.status === 200){

            this.arquivoService.postArquivo(this.arquivo).subscribe(response => {
              console.log('Upload successful', response);

              // Faça o que for necessário com a resposta do servidor
            })
          }
        })
      })
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

}
