import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import css from './style.css'

function PlaintextEditor({ file, write }) {
    const [value, setValue] = useState('');
    const onChange = (evt) => {
      setValue(evt.target.value);
      write(new File([value], file.name, {type: file.type, lastModified: Date.now()}));
    }

    useEffect(() => {
      (async () => {
        setValue(await file.text());
      })();
    }, [file]);

    return (
      <div className={css.editor}>
        <div className={css.title}>{path.basename(file.name)}</div>
        <textarea value={value} onChange={onChange} />
      </div>
    );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
