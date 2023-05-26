import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../minusculoValidator';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PensamentoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.getById(Number(id)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        conteudo: [
          pensamento.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        autoria: [
          pensamento.autoria,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            minusculoValidator,
          ]),
        ],
        modelo: [pensamento.modelo],
        id: [pensamento.id],
        favorito: [pensamento.favorito],
      });
    });
  }

  navigateHome(): void {
    this.router.navigate(['/listarPensamento']);
  }

  editar(): void {
    if (this.formulario.valid) {
      this.service.edit(this.formulario.value).subscribe(() => {
        this.navigateHome();
      });
    }
  }

  cancelar(): void {
    this.navigateHome();
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    }

    return 'botao__desabilitado';
  }
}
