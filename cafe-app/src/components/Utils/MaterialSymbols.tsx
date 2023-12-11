import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode
  type?: 'outline' | 'rounded' | 'sharp'
  fill?: boolean
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  grade?: -25 | 0 | 200
  opticalSize?: 20 | 24 | 40 | 48
}

export const MaterialSymbol = ({
  children,
  type = 'outline',
  fill = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
}: Props) => {
  return (
    <span
      css={symbolStyle(fill, weight, grade, opticalSize)}
      className={`material-symbols-${type}`}
    >
      {children}
    </span>
  )
}

const symbolStyle = (fill: boolean, weight: number, grade: number, opticalSize: number) =>
  css({
    display: 'inline-block',
    flexShrink: 0,
    fontVariationSettings:
      `'FILL' ${fill ? 1 : 0},
      'wght' ${weight},
      'GRAD' ${grade},
      'opsz' ${opticalSize}`,
    height: opticalSize,
    overflow: 'hidden',
    width: opticalSize,
  })