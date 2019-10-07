import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <section>
      <img src={logo} alt="GoBarber" />
      <form action="submit">
        <input type="email" placeholder="Your mail address" />
        <input type="password" placeholder="Your password" />
        <button type="submit">Login</button>
        <Link to="/register">Create free account</Link>
      </form>
    </section>
  );
}
