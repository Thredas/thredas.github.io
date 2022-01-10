import React from 'react';

const Container = ({ children, width }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
      <div style={{ flex: 1, maxWidth: width, minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  );
};

export default Container;