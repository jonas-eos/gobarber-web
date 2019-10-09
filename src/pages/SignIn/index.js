import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

/** Validations */
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address!')
    .required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  /** Action to submit button on form, call a saga request */
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  /** Login loading effect */
  function loadingEffect() {
    return loading ? 'Loading...' : 'Login';
  }

  return (
    <section>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your mail address" />
        <Input name="password" type="password" placeholder="Your password" />
        <button type="submit">{loadingEffect()}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </section>
  );
}
