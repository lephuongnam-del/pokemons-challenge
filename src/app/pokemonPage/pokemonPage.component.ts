import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: `pokemon-page`,
  template: `
    <h1>it's work</h1>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class pokemonPageComponent {}
