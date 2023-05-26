import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';
  private ITENS_POR_PAGINA = 6;

  constructor(private http: HttpClient) {}

  private getUrlId(id: number | string): string {
    return `${this.API}/${id}`;
  }

  list(pagina: number, filtro: string): Observable<Pensamento[]> {
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', this.ITENS_POR_PAGINA);

    if (filtro && filtro?.trim().length > 2) {
      params = params.set('q', filtro);
    }

    return this.http.get<Pensamento[]>(this.API, { params });
  }

  create(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  edit(pensamento: Pensamento): Observable<Pensamento> {
    let URL = this.API;
    if (pensamento.id) URL = this.getUrlId(pensamento.id);

    return this.http.put<Pensamento>(URL, pensamento);
  }

  del(id: number): Observable<Pensamento> {
    const URL = this.getUrlId(id);

    return this.http.delete<Pensamento>(URL);
  }

  getById(id: number): Observable<Pensamento> {
    const URL = this.getUrlId(id);

    return this.http.get<Pensamento>(URL);
  }
}
