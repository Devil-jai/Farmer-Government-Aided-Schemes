import React from 'react';
import styled from 'styled-components';

const AboutUs_btn = () => {
  return (
    <StyledWrapper>
      <button>AboutUs</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    --color: rgb(78, 194, 81);
    font-family: inherit;
    display: inline-block;
    width: 10em;
    height: 3.6em;
    line-height: 2.5em;
    margin: 20px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color 0.5s;
    z-index: 1;
    font-size: 17px;
    border-radius: 6px;
    font-weight: 500;
    color: var(--color);
  }

  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 20%;
  }

  button:hover {
    color: #fff;
  }

  button:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  button:hover:before {
    top: -30px;
    left: -30px;
  }

  button:active:before {
    background: rgb(78, 194, 81);
    transition: background 0s;
  }`;

export default AboutUs_btn;
