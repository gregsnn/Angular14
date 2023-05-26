import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

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

  constructor(private service: PensamentoService) {}

  ngOnInit() {
    this.service
      .list(this.paginaAtual, this.filtro)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .list(++this.paginaAtual, this.filtro)
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
      .list((this.paginaAtual = 1), this.filtro)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
      });
  }
}
