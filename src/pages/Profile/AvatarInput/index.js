import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

/**
 * Component to load and changing avatar.
 * The component receives the initial data from the form, the profile data.
 * With the profile information, the avatar will already be loaded according to
 * the avatar saved in the database, if no avatar yet exists for the user,
 * a default value is shown.
 * When the user changes their avatar by clicking on the image, sends a request
 * to the API to save this image on the server.
 * When the user saves their data in the form that calls this component, the
 * data is saved in the user profile.
 * @default
 * @function
 */
export default function AvatarInput() {
  /** Default value come from form field that call that component */
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  /** Used for getElement */
  const ref = useRef();

  /**
   * Makes the data accessible to the page/component that called this component,
   * the name here, must be the same as the name this component is given on the
   * page/component that called it.
   */
  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, []); // eslint-disable-line

  /**
   * The image is sent to the server via the API request.
   * In the same request, the image information is saved in the database to be
   * assigned to the user when he saves the profile.
   * @function @async
   * @param {htmlElement} e
   */
  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  function renderAvatar() {
    return preview || 'https://api.adorable.io/avatars/40/abott@adorable.png';
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <picture>
          <img src={renderAvatar()} alt="Preview" />
        </picture>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
