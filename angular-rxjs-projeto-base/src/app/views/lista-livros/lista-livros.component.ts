import {Component} from '@angular/core';
import {LivroService} from "../../service/livro.service";
import {catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, of, switchMap, tap, throwError} from "rxjs";
import {Item, LivroResultado} from "../../models/livro";
import {LivroVolumeInfo} from "../../models/livro-volume-info";
import {FormControl} from "@angular/forms";

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  searchField = new FormControl();
  errorMessage = '';
  livrosResultado: LivroResultado;

  constructor(private livroService: LivroService) {
  }

  foundBooks$ = this.searchField.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter(typedValue => typedValue.length >= 3),
      distinctUntilChanged(),
      switchMap(typedValue => this.livroService.search(typedValue)),
      map((res) => this.livrosResultado = res),
      map((res) => res.items ?? []),
      map(items => this.bookResults(items)),
      catchError(() => throwError(() => {
        this.errorMessage = 'Ops, ocorreu um erro. Reinicie a Aplicacao!';
        return EMPTY;
      })),
    );

  bookResults(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }
}
