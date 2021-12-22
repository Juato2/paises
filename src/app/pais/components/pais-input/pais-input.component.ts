import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {
  
  @Output() eventEnter = new EventEmitter<string>();
  @Output() eventDebounce = new EventEmitter<string>();
  @Input()  placeholder: string = '';
  
  debouncer: Subject<string> = new Subject();
  
  termino: string = '';
  
  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(700)
    )
    .subscribe( valor => {
      this.eventDebounce.emit( valor );
    })
  }
  
  buscar() {
    this.eventEnter.emit(this.termino);
  }
  
  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

}
