const request = require('supertest');
const app = require('../test_server');

describe('Application Routes Test', function(){

    it('should fetch organization repository and issues', async () => {
        const res = await request(app)
            .get('/api/v1/org-repository/Qorple-Technologies-Limited?per_page=2')
            .send({
            issues: `2`
        });
        expect(res.statusCode).toEqual(200);
    });
});