import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { UserOutline , PlusOutline } from "@ant-design/icons-angular/icons"

import { routes } from './app.routes';
import { ru_RU, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { NzIconModule } from 'ng-zorro-antd/icon';

registerLocaleData(ru);

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), provideNzI18n(ru_RU), importProvidersFrom(NzIconModule.forRoot([UserOutline, PlusOutline]))],
};
