import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 15px;
  backdrop-filter: blur(5px);
  background-color: rgba(168, 168, 168, 0.5);
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px;
  background-color: rgba(256, 256, 256, 0.5);
  border-radius: 10px;
  outline: none;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #4f46e5;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const LoginButton = styled.div`
  display: flex;
  justifyContent: 'center',
  alignItems: 'center',
`