import LocalizedStrings from 'localized-strings';

export const AVAILABLE_LANGS = [ 'en', 'ua' ];

export const DEFAULT_LANG = 'en'

export const trans = new LocalizedStrings({
        en: {
            validate: {
                required: 'Field cannot be empty.',
                email: 'Not a valid email address.'
            },
            header: {
                title: "Test login"
            },
            account: {
                title: 'Account',
                button: 'Logout',
                firstName: "First name",
                lastName: "Last name",
            },
            notFound: {
                title: "Not Found"
            },
            signIn: {
                title: 'Sign In',
                email: 'Email',
                emailPlaceholder: 'Type email',
                password: "Password",
                passwordPlaceholder: "Type password",
                button: 'Log In',
            }
        },
        ua: {
            validate: {
                required: 'Обов`язкове поле',
                email: 'Введіть валідний мейл'
            },
            header: {
                title: "Test login"
            },
            account: {
                title: 'Профіль',
                button: 'Вихід',
                firstName: "Ім`я",
                lastName: "Фамілія",
            },
            notFound: {
                title: "Не знайдено"
            },
            signIn: {
                title: 'Вхід',
                email: 'Мейл',
                emailPlaceholder: 'Введіть мейл',
                password: "Пароль",
                passwordPlaceholder: "Введіть пароль",
                button: 'Ввійти',
            }
        }
    },
    {
        customLanguageInterface: () => DEFAULT_LANG
    }
);