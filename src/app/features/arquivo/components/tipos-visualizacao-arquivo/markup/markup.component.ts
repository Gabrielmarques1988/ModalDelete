import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestPutMarkupS3 } from '../../../interfaces/request-put-s3-markup.dto';
import { CreateMarkUpDto } from '../../../interfaces/create-mark-up.dto';
import { Usuario } from '../../../../../core/models/usuario';
import { initFlowbite } from 'flowbite';
import { Arquivo } from '../../../../../core/models/arquivo';
import { Subscription } from 'rxjs';
import { MarkupService } from '../../../../../shared/services/markup.service';
import { ArquivoService } from '../../../../../shared/services/arquivo.service';
import { ComentarioMarkup } from '../../../interfaces/comentario_markup';

@Component({
  selector: 'app-markup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './markup.component.html',
  styleUrl: './markup.component.css'
})
export class MarkupComponent implements OnInit{
  markups: ComentarioMarkup[] = [];
  // @ViewChild('novoMarkup') novoMarkupInput!: ElementRef;

  // markup: Markup = {
  //   arquivo_comentario_markup_id: 0,
  //   arquivo_comentario_markup_link_s3: "",
  //   arquivo_comentario_markup_descricao: "",
  //   arquivo_comentario_id: 0,
  //   arquivo_comentario_markup_data: null
  // };
  arquivoSelecionado: Arquivo | null = null;
  arquivoSubscription: Subscription;
  formulario: FormGroup;
  arquivoUpload!: File;
  arquivoNome:string | null =null;
  arquivoTipo:string| null =null;

  constructor(private markupService: MarkupService, private arquivoService:ArquivoService, private fb :FormBuilder) {
    this.arquivoSubscription = this.arquivoService.arquivoSelecionado$.subscribe(
      arquivo=>{
        if(arquivo?.arquivo_id){
          this.arquivoSelecionado = arquivo
          this.carregarMarkups(arquivo?.arquivo_id);
        }

    })
    this.formulario = this.fb.group({
      file_name :['', Validators.required],
      comentario :['', Validators.required]
    })
  }
  ngOnInit(): void {
    initFlowbite()
  }




  limpaForm(){

    this.formulario.reset()
  }
  carregarMarkups(arquivo:string): void {
    this.markupService.findAll(arquivo).subscribe((markups) => {
      this.markups = markups.reverse();

    });
  }
  submitMarkup(){
    var request = new RequestPutMarkupS3()
    request.projeto_id = this.arquivoSelecionado?.projeto_id
    request.arquivo_tipo = this.arquivoUpload.type
    this.markupService.getPutS3Link(request).subscribe(response=>{
      console.log(response)
      this.markupService.putImg(this.arquivoUpload,response.s3_pre_signed_link).subscribe((res)=>{
        console.log(res)
        if(res.status==200){
          var markup = new CreateMarkUpDto()
          let usuarioAutenticado = sessionStorage.getItem('usuarioAutenticado')
          if(usuarioAutenticado){
            let usuario:Usuario = JSON.parse(usuarioAutenticado)
            markup.usuario_id = usuario.usuario_id

          }


          markup.arquivo_id = this.arquivoSelecionado?.arquivo_id
          markup.arquivo_comentario_markup_link_s3 = response.markup_link
          markup.arquivo_comentario_markup_descricao = this.formulario.get("comentario")?.value
          this.markupService.salvaNoBanco(markup).subscribe(resM=>{
            console.log(res)
            this.limpaForm()
          })
        }
      })
    })

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoUpload = input.files[0];
      this.arquivoNome = this.arquivoUpload.name;
      this.arquivoTipo = this.arquivoUpload.type;
      // this.formulario.controls['file_name'].setValue(this.arquivoUpload)
      console.log(this.formulario.get('file_name')?.value+" formulario")
      console.log(this.arquivoNome)
      console.log(this.arquivoTipo)
      console.log(this.arquivoUpload)

    } else {
      this.arquivoNome = null;
      this.arquivoTipo = null;
    }
  }

  // postarMarkup() {
  //   this.markupService.post(this.markup).subscribe((markup) => {
  //     this.markups.push(markup);
  //   });
  // }

  // adicionarMarkup(): void {
  //   const novoMarkup = this.novoMarkupInput.nativeElement.value.trim();
  //   if (novoMarkup) {
  //     const markup: Markup = {
  //       arquivo_comentario_markup_id: 0,
  //       arquivo_comentario_markup_link_s3: "",
  //       arquivo_comentario_markup_descricao: novoMarkup,
  //       arquivo_comentario_id: 0,
  //       arquivo_comentario_markup_data: null
  //     };
  //     this.markupService.post(markup).subscribe((novoMarkup) => {
  //       this.markups.push(novoMarkup);
  //       this.novoMarkupInput.nativeElement.value = '';
  //     });
  //   }
  // }

  // deletarMarkup(markupId: number): void {
  //   this.markupService.remove(markupId).subscribe(() => {
  //     this.markups = this.markups.filter(
  //       (markup) => markup.arquivo_comentario_markup_id !== markupId
  //     );
  //   });
  // }
}
