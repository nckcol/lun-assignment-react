import React, {Component} from 'react';
import {Formik} from 'formik';
import Field from '../field/field';
import Form from '../form/form';
import Button from '../button/button';
import Autocomplete from '../autocomplete/autocomplete-manager';

const selectName = (item) => item.name;
const selectId = (item) => item.id;

function CountryAutocomplete({form, ...inputProps}) {
  return (
    <Autocomplete
      {...inputProps}
      onChange={(value) => {
        form.setFieldValue(inputProps.name, value);
      }}
      onBlur={() => {
        form.setFieldTouched(inputProps.name, true);
      }}
    />
  );
}

function CityAutocomplete({form, options, ...inputProps}) {
  const countryId = form.values.countryId;
  const citiesByCountry = countryId
    ? options.filter((city) => countryId === city.country)
    : options;

  return (
    <Autocomplete
      {...inputProps}
      options={citiesByCountry}
      onChange={(value) => {
        form.setFieldValue(inputProps.name, value);
      }}
      onBlur={() => {
        form.setFieldTouched(inputProps.name, true);
      }}
    />
  );
}

class LocationStep extends Component {
  render() {
    const {hasPrevious, location, countryList, cityList, onSubmit} = this.props;
    const initialValues = location || {countryId: null, cityId: null};

    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <h2>2. Выберите страну и город</h2>

          <Form.Row>
            <Field
              name="countryId"
              placeholder="Страна"
              options={countryList}
              selectTitle={selectName}
              selectValue={selectId}
              component={CountryAutocomplete}
            />
          </Form.Row>

          <Form.Row>
            <Field
              name="cityId"
              placeholder="Город"
              options={cityList}
              selectTitle={selectName}
              selectValue={selectId}
              component={CityAutocomplete}
            />
          </Form.Row>

          <Button variant="accent" disabled={!hasPrevious}>
            Назад
          </Button>

          <Button variant="accent" type="submit">
            Далее
          </Button>
        </Form>
      </Formik>
    );
  }
}

export default LocationStep;
