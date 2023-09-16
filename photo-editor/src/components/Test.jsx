import { Button } from '@mui/material';
import React from 'react';
import ImageUploading from 'react-images-uploading';

export default function Test() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
<Button variant="contained" component="label">Upload image<input type="file" accept="image/*" hidden/></Button>
    </div>
  );
}