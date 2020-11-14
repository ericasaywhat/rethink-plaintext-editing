import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import ReactMarkdown from 'react-markdown'
import path from 'path';

class MdPreviewer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPreviewing: false
    }
  }

  onClick = () => {
    this.setState({
      isPreviewing: !this.state.isPreviewing
    })
  }


  render(){
    const MdEditor = (
      <div className={css.editor}>
        <div className={css.title}>{path.basename(this.props.fileName)}</div>
        <textarea value={this.props.value} onChange={this.props.onChange} />
      </div>
    );

    return(
      this.state.isPreviewing ? (
        <div>
            <ReactMarkdown children={this.props.value}></ReactMarkdown>
            <button onClick={this.onClick}>Edit</button>
        </div>
      ) : (
        <div>
          {MdEditor}
          <button onClick={this.onClick}>Preview</button>
        </div>
      )
    )
  }
}

function MarkdownEditor({ file, write }) {
  console.log(file, write);
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

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div>
        <MdPreviewer fileName={file.name} value={value} onChange={onChange}/>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
