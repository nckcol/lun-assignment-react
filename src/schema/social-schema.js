import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'requiredIfNotNull', function(message) {
  return this.test('defined', message, (value) => value || value === null);
});

const SocialSchema = Yup.object().shape({
  facebook: Yup.string()
    .nullable(true)
    .requiredIfNotNull('Заполните поле')
    .matches(/facebook.com/, 'Укажите ссылку на страницу в Facebook'),
  vk: Yup.string()
    .nullable(true)
    .requiredIfNotNull('Заполните поле')
    .matches(/vk.com/, 'Укажите ссылку на страницу Вконтакте'),
  twitter: Yup.string()
    .nullable(true)
    .requiredIfNotNull('Заполните поле')
    .matches(/twitter.com/, 'Укажите ссылку на страницу в Twitter'),
  odnoklassniki: Yup.string()
    .nullable(true)
    .requiredIfNotNull('Заполните поле')
    .matches(
      /(ok.ru|odnoklassniki.ru)/,
      'Укажите ссылку на страницу в Одноклассниках'
    )
});

export default SocialSchema;
