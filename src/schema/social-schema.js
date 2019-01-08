import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'requiredIfNotNull', function(message) {
  return this.test('defined', message, (value) => value || value === null);
});

const SocialSchema = Yup.object().shape({
  facebook: Yup.string()
    .nullable(true)
    .requiredIfNotNull('заполните поле')
    .url('здесь должна быть ссылка')
    .matches(/facebook.com/, 'укажите ссылку на страницу в Facebook'),
  vk: Yup.string()
    .nullable(true)
    .requiredIfNotNull('заполните поле')
    .url('здесь должна быть ссылка')
    .matches(/vk.com/, 'укажите ссылку на страницу Вконтакте'),
  twitter: Yup.string()
    .nullable(true)
    .requiredIfNotNull('заполните поле')
    .url('здесь должна быть ссылка')
    .matches(/twitter.com/, 'укажите ссылку на страницу в Twitter'),
  odnoklassniki: Yup.string()
    .nullable(true)
    .requiredIfNotNull('заполните поле')
    .url('здесь должна быть ссылка')
    .matches(
      /(ok.ru|odnoklassniki.ru)/,
      'укажите ссылку на страницу в Одноклассниках'
    )
});

export default SocialSchema;
