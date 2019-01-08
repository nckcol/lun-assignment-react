import * as Yup from 'yup';

const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'подозрительно коротко')
    .max(50, 'это уже чересчур!')
    .required('укажите имя'),

  email: Yup.string()
    .matches(/@/, 'в адресе должен быть символ «@»')
    .email('некорректный e-mail')
    .required('укажите e-mail')
});

export default PersonalInfoSchema;
