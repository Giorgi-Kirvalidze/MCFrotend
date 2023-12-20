import { Component, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'onbrane';

  constructor(private vcref: ViewContainerRef) { }

  async ngOnInit() {
    const { HeaderComponent } = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Header',
    });
    const compRef = this.vcref.createComponent(HeaderComponent) as any;
    compRef.instance['title'] = 'title from main app';
  }
}
