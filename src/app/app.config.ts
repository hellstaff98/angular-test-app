import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import { ru_RU, provideNzI18n } from 'ng-zorro-antd/i18n';
import ru from '@angular/common/locales/ru';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  PlusOutline,
  RightOutline,
  EnvironmentOutline,
  PhoneOutline,
  GlobalOutline,
  ArrowLeftOutline,
  MailOutline,
  HomeOutline,
  EditOutline,
} from '@ant-design/icons-angular/icons';

registerLocaleData(ru);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(ru_RU),
    importProvidersFrom(
      NzIconModule.forRoot([
        PlusOutline,
        RightOutline,
        EnvironmentOutline,
        PhoneOutline,
        GlobalOutline,
        ArrowLeftOutline,
        MailOutline,
        HomeOutline,
        EditOutline,
      ]),
    ),
  ],
};
