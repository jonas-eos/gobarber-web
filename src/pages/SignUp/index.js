import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  email: Yup.string()
    .email('Enter a valid email address!')
    .required('Email is required!'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters!')
    .required('Password is required!'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth.loading);

  /** Action to submit button on form, call a saga request */
  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  /** Loading effect */
  function loadingEffect() {
    return loading ? 'Loading...' : 'Create an account';
  }

  return (
    <section>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="Your mail address" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">{loadingEffect()}</button>
        <Link to="/">Already registered</Link>
      </Form>
    </section>
  );
}
