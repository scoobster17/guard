import * as path from 'path';
import * as http from 'http';
import * as Koa from 'koa';
import * as serve from 'koa-static';
const render = require('koa-ejs');


const app = new Koa();

render(app, {
  root: path.join(process.cwd(), 'dist/shared/views'),
  layout: false,
  viewExt: 'ejs',
  cache: true,
  debug: false,
});

app.use(serve('public'));
app.use(
  async (ctx: Koa.Context) => {
    if (ctx.method !== 'GET') {
      ctx.status = 404;

      return;
    }

    await ctx.render('index', {});
  }
);


http.createServer(app.callback()).listen(6422, () => {
  console.log('info', 'HTTP Server is listening on 0.0.0.0:6422');
});
