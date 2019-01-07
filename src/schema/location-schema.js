import * as Yup from 'yup';

const LocationSchema = Yup.object().shape({
  countryId: Yup.mixed()
    .nullable(false)
    .required('Required'),

  cityId: Yup.mixed()
    .nullable(false)
    .required('Required')
});

export default LocationSchema;
