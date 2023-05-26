import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { minusculoValidator } from '../minusculoValidator';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css'],
})
export class CriarPensamentosComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private router: Router,
    private service: PensamentoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          minusculoValidator,
        ]),
      ],
      modelo: ['modelo2'],
      favorito: [false],
    });
  }

  navigateHome(): void {
    this.router.navigate(['/listarPensamento']);
  }

  criar(): void {
    console.log(this.formulario.errors);

    if (this.formulario.valid) {
      this.service.create(this.formulario.value).subscribe(() => {
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
