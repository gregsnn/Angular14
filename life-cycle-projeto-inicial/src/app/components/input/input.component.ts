import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListaDeCompraService} from "../../service/lista-de-compra.service";
import {Item} from "../../interfaces/iItem";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {
  @Input() itemQueVaiSerEditado!: Item;
  editando = false;
  textoBtn = 'Salvar Item';
  valorItem!: string;

  constructor(private listaService: ListaDeCompraService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['itemQueVaiSerEditado'].firstChange) {
      this.editando = true;
      this.textoBtn = 'Editar Item';
      this.valorItem = this.itemQueVaiSerEditado?.nome;
    }
  }

  limparCampo() {
    this.valorItem = '';
  }

  editarItem() {
    this.listaService.editarItem(this.itemQueVaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = 'Salvar Item';
  }

  adicionarItem() {
    this.listaService.adicionaItem(this.valorItem);
    this.limparCampo();
  }
}
