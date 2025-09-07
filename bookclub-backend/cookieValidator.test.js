const { cookieValidator } = require('./cookieValidator');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'oghfiosdfghh90';
const dummyToken = jwt.sign({userId: 1}, process.env.JWT_SECRET, {expiresIn: 604800000});
const invalidToken = jwt.sign({userId: 1}, 'wrong secret', {expiresIn: 604800000});

it('should successfully pass cookie validation', function () {
  expect(cookieValidator({token: dummyToken})).toBe(true);
});

it('should fail cookie validation', function () {
  expect(cookieValidator({token: invalidToken})).toBe(false);
});
