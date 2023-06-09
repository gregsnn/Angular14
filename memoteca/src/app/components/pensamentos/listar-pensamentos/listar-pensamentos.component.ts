import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css'],
})
export class ListarPensamentosComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  hasMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listFav: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService, private router: Router) {}

  listAll() {
    this.favoritos = false;
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  ngOnInit() {
    this.service
      .list((this.paginaAtual = 1), this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .list(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos.push(...pensamentos);

        if (!pensamentos.length) {
          this.hasMaisPensamentos = false;
        }
      });
  }

  filtrarPensamentos() {
    this.hasMaisPensamentos = true;
    this.service
      .list((this.paginaAtual = 1), this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
      });
  }

  listFavs() {
    this.titulo = 'Meus Favoritos';
    this.favoritos = true;
    this.hasMaisPensamentos = true;

    this.service
      .list((this.paginaAtual = 1), this.filtro, this.favoritos)
      .subscribe((pensamentosFavoritos) => {
        this.listaPensamentos = pensamentosFavoritos;
        this.listFav = pensamentosFavoritos;
      });
  }
}
