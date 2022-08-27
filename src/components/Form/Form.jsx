import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import {
  ContactForm,
  ContactLabel,
  ContactField,
  ErrorText,
  Button,
  ButtonIcon,
} from './Form.styled';
import * as yup from 'yup';

const onValidate = yup.object().shape({
  name: yup.string().min(2).required(),
  number: yup.string().length(7).required(),
});

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  normalNumber = str => {
    const normalizedNumber =
      str[0] + str[1] + str[2] + '-' + str[3] + str[4] + '-' + str[5] + str[6];
    return normalizedNumber;
  };

  normalName = str => {
    const normalizedName = str
      .split(' ')
      .map(item => item[0].toUpperCase() + item.slice(1))
      .join(' ');
    return normalizedName;
  };

  hadleSubmit = (values, { resetForm }) => {
    const newName = {
      id: nanoid(),
      name: this.normalName(values.name),
      number: this.normalNumber(values.number),
    };
    this.props.onSubmit(newName);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={onValidate}
        onSubmit={this.hadleSubmit}
      >
        {props => (
          <ContactForm>
            <ContactLabel>
              Name:
              <ContactField
                type="text"
                name="name"
                onChange={props.handleChange}
                value={props.values.name}
              />
              <ErrorMessage
                name="name"
                render={msg => <ErrorText>{msg}</ErrorText>}
              />
            </ContactLabel>
            <ContactLabel>
              Number:
              <ContactField
                type="tel"
                name="number"
                onChange={props.handleChange}
                value={props.values.number}
              />
              <ErrorMessage
                name="number"
                render={msg => <ErrorText>{msg}</ErrorText>}
              />
            </ContactLabel>
            <Button type="submit">
              <ButtonIcon />
              Add contact
            </Button>
          </ContactForm>
        )}
      </Formik>
    );
  }
}
