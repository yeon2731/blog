import React from 'react'
import styled from 'styled-components';

function Button() {
  return (
    <Container>
      Button
    </Container>
  )
}

export default Button

const Container = styled.div`

  width: 100px;
  height: 50px;
  background-color: red;
  flex-shrink: 0;
`;