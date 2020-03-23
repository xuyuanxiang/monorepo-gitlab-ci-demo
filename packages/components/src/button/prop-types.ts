import { ButtonHTMLAttributes } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮场景：primary-主要按钮、secondary-次要按钮、negative-删除/注销按钮
   */
  scene?: 'primary' | 'secondary';
  /**
   * 按钮规格：standard-标准（block）、small-小按钮（inline）、short-短按钮（inline）
   */
  spec?: 'standard' | 'small' | 'short';
}
