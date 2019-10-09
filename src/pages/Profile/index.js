import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';

/**
 * Page to change profile data.
 * The user can change all their informations.
 * To change the password, the user must enter the new password and confirm the
 * new password for the change to take place.
 * @function
 * @default
 */
export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {}

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full Name" />
        <Input name="email" type="email" placeholder="Your email address" />
        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Current password"
        />
        <Input type="password" name="password" placeholder="New password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
        <button type="submit">Update profile</button>
      </Form>
      <button type="button">Logout</button>
    </Container>
  );
}
