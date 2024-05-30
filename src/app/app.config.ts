import {ApplicationConfig, InjectionToken} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TodoService} from "./todo-page/todo.service";

export const TODD_SERVICE_TOKEN = new InjectionToken<TodoService>('TODD_SERVICE_TOKEN');

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {provide: TODD_SERVICE_TOKEN, useClass: TodoService}]
};
