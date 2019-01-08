import * as Yup from 'yup';

const ConfirmationSchema = Yup.object().shape({
  animal: Yup.object({
    type: Yup.string().oneOf(['cat'], 'Вы выбрали собачку. Выберите котика!')
  }).typeError('Выберите один из вариантов')
});

export default ConfirmationSchema;
