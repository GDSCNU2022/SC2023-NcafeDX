
import { useState, useEffect } from 'react';

const GFormSubmitButton = (props: {formURL: string}) => {
    return (
    <div className="bg-sky-200 rounded-lg p-2">
      <a className="hover:cursor-pointer" href={props.formURL}>アンケート</a>
    
    </div>
  )

};

export default GFormSubmitButton;