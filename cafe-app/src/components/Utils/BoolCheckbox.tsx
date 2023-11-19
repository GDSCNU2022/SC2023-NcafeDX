import React from 'react';

type Props = {
  checked?: boolean;
  className?: string;
  targetName:string;
  targetValue: any;
  i: number;
  onChangeInput: Function;
  register: any;
}

const BoolCheckbox = (props: Props) => {
  return (
  <input type="checkbox" checked={props.checked} className={props.className} 
  {...props.register(`${props.targetName}-${props.i}`, {
                          onChange: (e: any) => props.onChangeInput(e, props.i),
                          value: props.targetValue
                        }
                          )}/>
  )
};

export default BoolCheckbox;