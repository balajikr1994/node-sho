/* globals describe, expect, it, before, after, beforeEach, afterEach */

//import User from '../../models/user/user.model';

import User from "../../models/user/user.model";
const request = require("supertest");
const express = require('express');

//import request from 'supertest';
const app = express();

describe('User API:', function() {
    var user;

    // Clear users before testing
    before(function() {
        return User.deleteMany().then(function() {
            user = new User({
                first_name: 'Fake User',
                last_name: 'Last Name',
                email: 'test@example.com',
                password: 'password'
            });

            return user.save();
        });
    });

    // Clear users after testing
    after(function() {
        return User.deleteMany();
    });

    describe('GET /api/users/me', function() {
        var token;

        before(function(done) {
            request(app)
                .post('/auth/local')
                .send({
                    email: 'test@example.com',
                    password: 'password'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    token = res.body.token;
                    done();
                });
        });

        it('should respond with a user profile when authenticated', function(done) {
            request(app)
                .get('/api/me')
                .set('authorization', `Bearer ${token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.body._id.toString().should.equal(user._id.toString());
                    done();
                });
        });

        it('should respond with a 401 when not authenticated', function(done) {
            request(app)
                .get('/api/me')
                .expect(401)
                .end(done);
        });
    });
});
