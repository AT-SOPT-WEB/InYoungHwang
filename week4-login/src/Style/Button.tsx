import styled from "@emotion/styled";

export const BasicButton = styled.button<{ active: boolean }>`
  padding: 10px 16px;
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? 'blue' : '#ccc')};
  }

  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
`

export const NavigateButton = styled.div`
    font-size: 13px;
    text-decoration: underline;
    color: blue;
    cursor: pointer;
`