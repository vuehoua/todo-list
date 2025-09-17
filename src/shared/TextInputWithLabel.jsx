import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  color: red;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  width: 100%;
`;

function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  inputRef,
  value,
}) {
  return (
    <>
      <StyledLabel htmlFor={elementId}> {labelText} </StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
