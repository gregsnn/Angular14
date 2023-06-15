import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Item} from "../../interfaces/iItem";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item!: Item;
  @Output() itemParaEditar = new EventEmitter<Item>();
  @Output() emitindoIdParaDeletar = new EventEmitter<number>();

  faPen = faPen;
  faTrash = faTrash

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {
  }

  editarItem() {
    this.itemParaEditar.emit(this.item);
  }

  comprarItem() {
    this.item.comprado = !this.item.comprado;
  }

  deletarItem() {
    this.emitindoIdParaDeletar.emit(Number(this.item.id));
  }
}
