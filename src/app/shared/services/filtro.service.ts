import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class FiltroService {
  private termoPesquisa = new BehaviorSubject<string>('');
  private criterioOrdenacao = new BehaviorSubject<string>('');
  private statusSelecionado = new BehaviorSubject<number[]>([]);
  private ultimaModificacao = new BehaviorSubject<string>('');
  private tiposArquivo = new BehaviorSubject<string[]>([]);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(component: any) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    return componentRef;
  }

  close(componentRef: any) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }


  atualizarTermoPesquisa(novoValor: string) {
    this.termoPesquisa.next(novoValor);
  }

  obterTermoPesquisa(): Observable<string> {
    return this.termoPesquisa.asObservable();
  }

  atualizarCriterioOrdenacao(novoValor: string) {
    this.criterioOrdenacao.next(novoValor);
  }

  obterCriterioOrdenacao(): Observable<string> {
    return this.criterioOrdenacao.asObservable();
  }
  atualizarStatusSelecionado(novoStatus: number[]) {
    this.statusSelecionado.next(novoStatus);
  }

  obterStatusSelecionado(): Observable<number[]> {
    return this.statusSelecionado.asObservable();
  }

  atualizarUltimaModificacao(novaData: string) {
    this.ultimaModificacao.next(novaData);
  }

  obterUltimaModificacao(): Observable<string> {
    return this.ultimaModificacao.asObservable();
  }

  atualizarTiposArquivoSelecionados(novosTipos: string[]) {
    this.tiposArquivo.next(novosTipos);
  }

  obterTiposArquivoSelecionados(): Observable<string[]> {
    return this.tiposArquivo.asObservable();
  }
}
