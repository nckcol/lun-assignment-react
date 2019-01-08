import * as Yup from 'yup';

const ConfirmationSchema = Yup.object().shape({
  animal: Yup.object({
    type: Yup.string().oneOf(['cat'], 'вы выбрали собачку. Выберите котика!')
  }).typeError('выберите один из вариантов')
});

export default ConfirmationSchema;
