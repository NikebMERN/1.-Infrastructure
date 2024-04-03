//? Importing packages and files
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

//? Styling
const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || '#007bff'};
  color: ${(props) => props.textColor || '#ffffff'};
  font-size: ${(props) => props.fontSize || '16px'};
  padding: ${(props) => props.padding || '10px 20px'};
  border: none;
  border-radius: ${(props) => props.borderRadius || '5px'};
  cursor: pointer;
`;

function Button({ onclick, children }) {
  return (
    <StyledButton onClick={onclick}>
      {children}
    </StyledButton>
  );
}

// Button.propTypes = {
//   onClick: PropTypes.func,
//   children: PropTypes.node.isRequired,
//   bgColor: PropTypes.string,
//   textColor: PropTypes.string,
//   fontSize: PropTypes.string,
//   padding: PropTypes.string,
//   borderRadius: PropTypes.string,
// };

export default Button;
