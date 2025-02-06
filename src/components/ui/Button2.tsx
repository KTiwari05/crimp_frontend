import styled from "styled-components";

interface ButtonProps {
  isComparing?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button2 = ({ isComparing = false, onClick, disabled }: ButtonProps) => {
  return (
    <StyledWrapper compare={isComparing}>
      <button className="button" onClick={onClick} disabled={disabled}>
        {isComparing ? "Detecting..." : "Detect"}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ compare: boolean }>`
  /* inspired form gumroad website */
  .button {
    --bg: ${(props) => (props.compare ? "#ff90e8" : "#000")};
    --hover-bg: ${(props) => (props.compare ? "#000" : "#ff90e8")};
    --hover-text: ${(props) => (props.compare ? "#fff" : "#000")};
    color: #fff;
    cursor: pointer;
    border: 1px solid var(--bg);
    border-radius: 6px;
    padding: 1em 3em; // updated padding for larger button
    font-size: 1.5rem; // increased font size
    background: var(--bg);
    transition: 0.2s;
  }

  .button:hover {
    color: var(--hover-text);
    transform: translate(-0.25rem, -0.25rem);
    background: var(--hover-bg);
    box-shadow: 0.25rem 0.25rem var(--bg);
    font-size: 1.5rem;
  }

  .button:active {
    transform: translate(0);
    box-shadow: none;
  }
`;

export default Button2;
