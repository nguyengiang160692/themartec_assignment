import assert from "assert";
import app from '../index'
import request from 'supertest';
import { describe, it, before, Suite } from "mocha";
import { exit } from "process";

describe("Authentication", function (this: Suite) {
    this.timeout(10000);

    //wait for the database connection to be established
    before(function (this: Mocha.Context, done: Mocha.Done) {
        setTimeout(() => {
            done();
        }, 2000);
    });

    describe('POST /login', function (this: Suite) {
        it('should return 200 OK and a success message for valid credentials', function (done) {
            request(app)
                .post('/api/auth/login')
                .send({ identify: 'admin', password: 'Admin 123123' })
                .expect(200)
                .expect((res) => {
                    assert.strictEqual(res.body.message, 'Login success!');
                })
                .end(function (err, res) {
                    if (err) throw err;

                    done();
                });
        });

        it('should return 401 Unauthorized for invalid credentials', function (done) {
            request(app)
                .post('/api/auth/login')
                .send({ identify: 'invalidUsername', password: 'invalidPassword' })
                .expect(401)
                .end(function (err, res) {
                    if (err) throw err;
                    done()
                });
        });
    });
});