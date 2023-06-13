import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'fullstack-app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
   <section class="flex h-full w-full justify-center items-center flex-col">
     <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">NX Workspace</h1>
     <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at you will find Angular, NestJS and Prisma.</p>
     <a href="https://nx.dev/" target="_blank" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-accent rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 ">
       Learn more
       <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
     </a>
   </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  title = inject(Title).setTitle('Home');
}
