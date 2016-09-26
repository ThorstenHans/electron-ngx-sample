import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './appModule';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
