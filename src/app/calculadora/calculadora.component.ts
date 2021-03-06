import { CalculadoraService } from './../calculadora.service'; // Importando o serviço onde, de fato, as operações existem
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  // Declarando as variáveis que vou usar nesse componente
  public calculadoraForm: FormGroup;

  // Criei um array com as operações para deixar a função dinâmica
  operacoes = [
    {value: 'adicao', viewValue: 'Adição'},
    {value: 'subtracao', viewValue: 'Subtração'},
    {value: 'divisao', viewValue: 'Divisão'},
    {value: 'multiplica', viewValue: 'Multiplicação'}
  ];

  constructor(public calculadora: CalculadoraService, private formBuilder: FormBuilder) { } // Chamando o serviço no construtor padrão

  // fazendo as validações no oninit pra garantir que o componente todo só opere com valoresvalidos.
  ngOnInit(): void {
    this.calculadoraForm = this.formBuilder.group({
      num1: [null, Validators.required],
      num2: [null, Validators.required],
      operacao: [this.operacoes[0].value, Validators.required],
      resultado: []
    });
  }

  // Por fim, nosubmit, seta o valor do resultado direto no input que fica dentro do calculadoraForm
  // seguido de mais conversões pra, como eu falo bastante aqui, garantir a integridade dos valores rs
  onSubmit(): void{
    this.calculadoraForm.controls.resultado.setValue(
      this.calculadora.calc(
        parseFloat(this.calculadoraForm.controls.num1.value),
        parseFloat(this.calculadoraForm.controls.num2.value),
        this.calculadoraForm.controls.operacao.value
      )
    );
  }

}
