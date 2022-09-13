import React from 'react';
import { HashLink } from 'react-router-hash-link';

function NotFound() {
  return <div className="my-24 text-center">
        <img src="" alt="" className="mx-auto"/>
        <HashLink to="/" className="text-4xl transition duration-300 text-sky-400 hover:text-sky-300">Retour au site</HashLink>
    </div>;
}

export default NotFound;
