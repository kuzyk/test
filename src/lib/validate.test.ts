import { composeRules, email, makeValidator, required } from './validate';

test('Should validate email address', () => {
    expect(email('')).toBe(false);
    expect(email('test')).toBe(false);
    expect(email('test@email.com')).toBe(true);
});

test('Should validate required field', () => {
    expect(required('')).toBe(false);
    expect(required('test')).toBe(true);
});

test('Should validate data', () => {
    const validateFn = makeValidator({
        email: composeRules({
            'Email cannot be empty.': required,
            'Not a valid email address.': email,
        }),
        password: composeRules({
            'Password cannot be empty.': required,
        }),
    });

    expect(validateFn({ email: '', password: '' })).toStrictEqual({
        "email": "Email cannot be empty.",
        "password": "Password cannot be empty."
    });

    expect(validateFn({ email: 'test', password: 'test' })).toStrictEqual({
        "email": 'Not a valid email address.'
    });

    expect(validateFn({ email: 'test@email.com', password: 'test' })).toBe(undefined);
});
