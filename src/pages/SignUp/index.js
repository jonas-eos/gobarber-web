import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  return (
    <section>
      <img src={logo} alt="GoBarber" />
      <form action="submit">
        <input placeholder="Full name" />
        <input type="email" placeholder="Your mail address" />
        <input type="password" placeholder="Password" />
        <button type="submit">Create account</button>
        <Link to="/">Already registered</Link>
      </form>
    </section>
  );
}
