import * as Yup from 'yup';

const LocationSchema = Yup.object().shape({
  countryId: Yup.mixed()
    .nullable(false)
    .required('укажите страну'),

  cityId: Yup.mixed()
    .nullable(false)
    .required('укажите город')
});

export default LocationSchema;
