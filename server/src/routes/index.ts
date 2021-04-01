import { error404Router } from './errors/error-404.router';
import { error500Router } from './errors/error-500.router';
import { adminRouter } from './admin';
import { juryRouter } from './jury';
import { homeRouter } from './home';

export const routers = {
  home: homeRouter,
  admin: adminRouter,
  jury: juryRouter,

  errors: {
    404: error404Router,
    500: error500Router
  }
}