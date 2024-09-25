import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 15px;
  backdrop-filter: blur(5px);
  background-color: rgba(168, 168, 168, 0.5);
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px;
  background-color: rgba(256, 256, 256, 0.5);
  border-radius: 10px;
  outline: none;
`;

export const ConfirmationMessage = styled.p`
  color: #222222;
  font-weight: italic;
  font-size: 16px;
`;