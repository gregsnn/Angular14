import {Item} from 'src/app/interfaces/iItem';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaDeCompraService {

  private listaDeCompra: Item[] = []

  constructor() {
    this.listaDeCompra = JSON.parse(localStorage.getItem('listaDeCompra') || '[]');
  }

  getListaDeCompra() {
    return this.listaDeCompra;
  }

  criarItem(nomeItem: string) {
    if (!nomeItem) throw new Error('Nome do item não pode ser vazio.');

    const id = this.listaDeCompra.length + 1;
    const item: Item = {
      id,
      nome: nomeItem,
      data: new Date().toLocaleString('pt-BR'),
      comprado: false
    }

    return item;
  }

  adicionaItem(nomeItem: string) {
    const item = this.criarItem(nomeItem);
    this.listaDeCompra.push(item);
    this.atualizarLocalStorage();
  }

  editarItem(itemAntigo: Item, nomeEditado: string) {
    const itemEditado: Item = {
      id: itemAntigo.id,
      nome: nomeEditado,
      data: itemAntigo.data,
      comprado: itemAntigo.comprado
    }

    const id = itemAntigo.id;

    this.listaDeCompra.splice(Number(id) - 1, 1, itemEditado);
    this.atualizarLocalStorage();
  }

  atualizarLocalStorage() {
    localStorage.setItem('listaDeCompra', JSON.stringify(this.listaDeCompra));
  }

  limparLista() {
    localStorage.setItem('listaDeCompra', JSON.stringify([]));
    this.listaDeCompra = [];
  }
}
