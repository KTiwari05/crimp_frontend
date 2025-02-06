import styled, { keyframes } from "styled-components";
import React from "react";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button1 = ({ children, onClick }: ButtonProps) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* inspired form gumroad website */
  .button {
    --bg: #1a1a1a;
    --hover-bg: #bb69fc;
    --hover-text: #000;
    color: #fff;
    cursor: pointer;
    border: 1px solid var(--bg);
    border-radius: 4px;
    padding: 0.8em 2em;
    background: var(--bg);
    transition: 0.2s;
  }

  .button:hover {
    color: var(--hover-text);
    transform: translate(-0.25rem, -0.25rem);
    background: var(--hover-bg);
    box-shadow: 0.25rem 0.25rem var(--bg);
  }

  .button:active {
    animation: ${pulse} 0.5s ease-in-out;
    box-shadow: none;
  }
`;

export default Button1;
