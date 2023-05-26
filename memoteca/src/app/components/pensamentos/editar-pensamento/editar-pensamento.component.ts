import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PensamentoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.getById(Number(id)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }

  navigateHome(): void {
    this.router.navigate(['/listarPensamento']);
  }

  editarPensamento(): void {
    this.service.edit(this.pensamento).subscribe(() => {
      this.navigateHome();
    });
  }

  cancelar(): void {
    this.navigateHome();
  }
}
