import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'fullstack-app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      Learning NxWorkspace<br />
      & Much More
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
