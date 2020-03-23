import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { IButtonProps } from './prop-types';

const StyledButton = styled.button`
  &.secondary {
    border: 1px solid #d9af5c;
    color: #d9af5c;
    &:active {
      background: #fbf7ee;
    }
  }
  &.primary {
    border: 0;
    background: #d9af5c;
    color: #ffffff;
    &:active {
      background: #cd962e;
    }
  }
  &.negative {
    border: 1px solid #d23f31;
    color: #d23f31;
    &:active {
      background: #fff3f2;
    }
  }
  &:disabled {
    background: #cccccc;
    color: #ffffff;
    border: 0;
  }
  &.standard {
    display: block;
    width: 100%;
  }
  &.small {
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    padding: 0 8.5px;
  }
  max-width: 100%;
  padding: 0 16px;
  border-radius: 4px;
  outline: none;
  font-size: 18px;
  height: 48px;
  line-height: 48px;
  font-weight: 500;
  appearance: none;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  background: #ffffff;
  user-select: none;
  touch-action: none;
  vertical-align: text-top;
`;

export function Button({
  children,
  scene = 'primary',
  spec = 'standard',
  className,
  ...buttonProps
}: IButtonProps): JSX.Element {
  return (
    <StyledButton className={clsx(scene, spec, className)} {...buttonProps}>
      {children}
    </StyledButton>
  );
}
