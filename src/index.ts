import { createParameter } from '../tests/utils/creators';
import { AppendFutureParameters } from './appendFutureParameters';
import { TaxParameter } from './interfaces';

const current: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];
const future: TaxParameter[] = [createParameter('foo', 'bar', ['baz', 'bax'])];

console.log(JSON.stringify(AppendFutureParameters(current, future), null, 2));
