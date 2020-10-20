import React from 'react';

const InputResourceFile: React.FC<{
  onLoad: (box: Box) => void;
}> = ({
  onLoad,
}) => {
  const handleFile = (files: FileList|null) => {

    const reader = new FileReader();
    const file = (files || [])[0];

    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      onLoad(JSON.parse((event?.target?.result
        ? event.target.result.toString()
        : ''
      )));
    }

    reader.readAsText(file);
  };

  return (
    <>
      <label>
        Game Resource File
        <input type="file" accept="json" onChange={(e) => handleFile(e.target.files)} />
      </label>
    </>
  );
};

export default InputResourceFile;
