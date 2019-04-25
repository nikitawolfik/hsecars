import React from 'react';
import PropTypes from 'prop-types';

const DocumentTitle = ({ children }) => {
  React.useEffect(() => {
    document.title = `${children} | Adjoy`;
  }, []);
  return null;
};

DocumentTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DocumentTitle;
