import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center loader">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loader;
