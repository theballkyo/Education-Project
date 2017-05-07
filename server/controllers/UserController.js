/**
 * Created by Jiravat on 16/2/2560.
 */

'use strict';

const UserService = require('../services/UserService');

// Exports
module.exports = {
    login,
    register,
    registerSocialUser,
    forgotPassword,
    resetPassword,
};

/**
 * Login a user in the system
 *
 * @param req the request
 * @param res the response
 */
function* login(req, res) {
    res.json(yield UserService.login(req.body));
}

/**
 * Register a user in the system
 *
 * @param req the request
 * @param res the response
 */
function* register(req, res) {
    res.json(yield UserService.register(req.body));
}


/**
 * Register a user via social login in the system
 *
 * @param req the request
 * @param res the response
 */
function* registerSocialUser(req, res) {
    res.json(yield UserService.registerSocialUser(req.auth, req.body));
}

/**
 * Send an resetPasswordCode to user's email if s/he's forgot password
 * @param req the request
 * @param res the response
 */
function* forgotPassword(req, res) {
    yield UserService.forgotPassword(req.body);
    res.status(204).end();
}

/**
 * Reset user's password
 * @param req the request
 * @param res the response
 */
function* resetPassword(req, res) {
    yield UserService.resetPassword(req.body);
    res.status(204).end();
}