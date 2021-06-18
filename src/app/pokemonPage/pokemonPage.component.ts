import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: `pokemon-page`,
  template: `
    <ul class="list-group">
      <li class="list-item">
        <a class="user-link">
          <img [src]="" />
          <span>
            <p><span class="list-item-heading">Name</span>: Pokemon name</p>
            <p>
              <span class="list-item-heading">attribute</span>: pokemon
              attribute
            </p>
          </span>
        </a>
      </li>
    </ul>
  `,
  styles: [
    `
      .user-link {
        display: flex;
        padding: 10px;
      }
      .user-link > span {
        padding: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class pokemonPageComponent {
  constructor() {}
}
