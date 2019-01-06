import * as Yup from 'yup';

const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

export default PersonalInfoSchema;
