import { Controller, Get } from '@nestjs/common';

@Controller('/app')
// creation de la route /api
export class AppController {
  @Get('/hi')
  getRootRoute() {
    // creation de la route /api/hi
    const hello = 'Hello there!';
    return hello;
  }

  @Get('/bye')
  getByeThere() {
    // creation de la route /api/bye
    const bye = 'Bye there!';
    return bye;
  }
}
