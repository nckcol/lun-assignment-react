import * as Yup from 'yup';

const ConfirmationSchema = Yup.object().shape({
  animal: Yup.object({
    type: Yup.string().oneOf(['cat'], 'Выберите котика')
  })
});

export default ConfirmationSchema;
