import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    conteudo: 'Conteudo do pensamento',
    autoria: 'Autor do pensamento',
    modelo: 'modelo1',
    favorito: false,
  };
  @Input() listFavs: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  ngOnInit() {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  favImage(): string {
    if (!this.pensamento.favorito) {
      return 'inativo';
    }
    return 'ativo';
  }

  changeFavStatus() {
    this.service.changeFav(this.pensamento).subscribe(() => {
      this.listFavs.splice(this.listFavs.indexOf(this.pensamento), 1);
    });
  }
}
