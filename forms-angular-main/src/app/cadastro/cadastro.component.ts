import {Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ConsultaCepService} from "../service/consulta-cep.service";

@Component({
    selector: "app-cadastro",
    templateUrl: "./cadastro.component.html",
    styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
    constructor(private router: Router, private cepService: ConsultaCepService) {
    }

    ngOnInit(): void {
    }

    cadastrar(form: NgForm) {
        if (form.valid) this.router.navigate(["/sucesso"]);
        else console.log("Formulário inválido");
    }

    popularEndereco(res: any, f: NgForm) {
        f.form.patchValue({
            endereco: res.logradouro,
            complemento: res.complemento,
            bairro: res.bairro,
            numero: res.numero,
            cidade: res.localidade,
            estado: res.uf,
        });
    }

    consultaCEP(event: any, form: NgForm) {
        const cep = event.target.value;

        if (cep !== '') {
            this.cepService.getConsultaCep(cep).subscribe((res) => {
                this.popularEndereco(res, form);
            })
        }

    }
}
