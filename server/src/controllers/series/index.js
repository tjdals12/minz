import Router from 'koa-router';
import * as seriesCtrl from './series.ctrl';

const series = new Router();

series.post('/', seriesCtrl.create);
series.patch('/:seq', seriesCtrl.update);
series.post('/:seq', seriesCtrl.write);
series.get('/', seriesCtrl.list);
series.get('/count', seriesCtrl.count);
series.get('/:seq', seriesCtrl.read);
series.patch('/toggle/:seq', seriesCtrl.hide);

export default series;
