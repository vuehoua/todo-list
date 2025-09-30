import styled from "styled-components";

const Title = styled.h1`
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  text-align: center;
  margin-top: 2rem;
`;

export default function Header({ text }) {
  return <Title>{text}</Title>;
}
