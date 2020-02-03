import 'jest';
import * as request from 'supertest';

const address : string = (<any>global).address;

test('get /awards', () => {
    return request(address).get('/awards').then(response => {
        expect(response.status                  ).toBe(200);
        expect(response.body.min                ).toBeInstanceOf(Array);
        expect(response.body.max                ).toBeInstanceOf(Array);
        expect(response.body.min[0].interval    ).toBeLessThanOrEqual(response.body.max[0].interval);
        expect(response.body.min[0].producer    ).toBeDefined();
        expect(response.body.min[0].interval    ).toBeDefined();
        expect(response.body.min[0].previousWin ).toBeDefined();
        expect(response.body.min[0].followingWin).toBeDefined();
        expect(response.body.max[0].producer    ).toBeDefined();
        expect(response.body.max[0].interval    ).toBeDefined();
        expect(response.body.max[0].previousWin ).toBeDefined();
        expect(response.body.max[0].followingWin).toBeDefined();
    }).catch(fail);
});