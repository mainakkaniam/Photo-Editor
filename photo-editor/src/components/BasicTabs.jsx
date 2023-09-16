import "./BasicTabs.css"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ImageUploading from 'react-images-uploading';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Slider, useMediaQuery } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import ContrastIcon from '@mui/icons-material/Contrast';
import CropIcon from '@mui/icons-material/Crop';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { ScreenCapture } from 'react-screen-capture';

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

function valuetext(value) {
  return `${value}`;
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{
        width: '100%',
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [imageSrc, setImageSrc] = React.useState('');

  let zoomin, zoomout, resettransform;//helps globalisation

  const [needcolor,setNeedColor] = React.useState(false); 
  const [color, setColor] = useColor("rgb(0 0 0)");
  const [opacity, setOpacity] = React.useState(0);
  const [bg,setBg] = React.useState("transparent");
  

  const [value, setValue] = React.useState(0);
  const [topic, setTopic] = React.useState("Brightness");
  const [imageStyle, setImageStyle] = React.useState({
    filter: "brightness(100%)",
    boxShadow: "0 0 0px rgba(0, 0, 0, 0.5)",
  });

  React.useEffect(() => {
    console.log(color.rgb)
    const { r, g, b } = color.rgb;

    // Update the background color with opacity and extracted RGB values
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    
    if (r != undefined)
    {
      setBg(rgbaColor);
      }
    
  }, [color, opacity]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

{  /**const handleZoomChange = (event, newValue) => {
    // Calculate the difference between the new value and the previous value.
    const diff = newValue - prevZoomValue;
  
    // Determine whether to zoom in or out based on the sign of the difference.
    if (diff > 0) {
      // Zoom in using the zoomIn function with the absolute difference as the step.
      zoomin(0.5,300,"easeOut");
    } else if (diff < 0) {
      // Zoom out using the zoomOut function with the absolute difference as the step.
      zoomout(0.5, 300, "easeOut");
    }
  
    // Update the state variable with the new value.
    setPrevZoomValue(newValue);
  };*/}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSliderChange = (event, newValue) => {
    let updatedStyle = { ...imageStyle };
    let valueRange = [-30, 30]; // Slider value range
    let filterRange = [0, 200]; // Desired filter value range
  
    if (topic === "Brightness" || topic === "Contrast" || topic === "Saturation") {
      // Map the slider value to the desired filter value
      const normalizedValue = (newValue - valueRange[0]) / (valueRange[1] - valueRange[0]);
      const filterValue = filterRange[0] + normalizedValue * (filterRange[1] - filterRange[0]);
  
      if (topic === "Brightness") {
        updatedStyle.filter = `brightness(${filterValue}%)`;
      } else if (topic === "Contrast") {
        updatedStyle.filter = `contrast(${filterValue}%)`;
      } else if (topic === "Saturation") {
        updatedStyle.filter = `saturate(${filterValue}%)`;
      }
    } else if (topic === "Vignette") {
      // Map the slider value to the desired vignette value
      valueRange = [0, 30];
      const  vignetteRange = [0, 200];
       const normalizedValue = (newValue - valueRange[0]) / (valueRange[1] - valueRange[0]);
       const vignetteValue = vignetteRange[0] + normalizedValue * (vignetteRange[1] - vignetteRange[0]);
    
      
      updatedStyle.boxShadow = `0 0 ${vignetteValue}px rgba(0,0,0,0.7) inset`;
    }  
    setImageStyle(updatedStyle);
  };

  const handleStraightenChange = (event, newValue) => { 
    let updatedStyle = { ...imageStyle };
    updatedStyle.transform = `rotate(${newValue}deg)`;
    setImageStyle(updatedStyle);
  }

  const [screenCapture, setScreenCapture] = React.useState('');

  const handleScreenCapture = (capture) => {
    setScreenCapture(capture);
  };

  const handleSave = () => {
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.png';

    downloadLink.href = screenCapture;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  
  return (
    <ScreenCapture onEndCapture={handleScreenCapture}>
    {({ onStartCapture }) => (
    <div className="home">
      <div className="editor">


            <div className="photo-full" style={{ boxShadow: imageStyle.boxShadow, backgroundColor: bg }} >
            {!imageSrc&&<>
                          <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}
                            sx={{
                              height: "fit-content",
                              width: "fit-content",
                              margin:"auto"
                          }}>
                            Upload image
                            <input type="file" accept="image/*" hidden onChange={handleImageChange}/>
                          </Button></>
                        }
             {imageSrc&& <TransformWrapper>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
                  zoomin = zoomIn;
                  zoomout = zoomOut;//make the zoomIn and zoomOut global
                  resettransform = resetTransform;
                  return (
                    <React.Fragment>
                      <TransformComponent>
                        <img src={imageSrc} alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            ...imageStyle,
                          }} />
            
                      </TransformComponent>
                    </React.Fragment>
                  )
                }}
              </TransformWrapper>}

            </div>

      <Box sx={{
          width: '100%',
        height:"38%",
      border: '1px solid black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider',
        width: '90%',
        position: 'relative',
      }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="basic tabs example" sx={{ color: "green" }} >
          <Tab icon={ <CropIcon/>} iconPosition="start" label="Crop" {...a11yProps(0)} />
          <Tab icon={ <ContrastIcon/>} iconPosition="start" label="Filters" {...a11yProps(1)} />
          <Tab icon={ <TuneIcon/>} iconPosition="start" label="Adjust" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} width>
        <Box sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width:"50%"
          }}>
            Zoom
            <Box sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap:"10px"
            }}>
                      <RemoveIcon fontSize="large" sx={{cursor:"pointer"}} onClick={() => { zoomout() } } />
                      <Button variant="outlined" color="secondary" onClick={()=>{resettransform()}}>Reset</Button>
                      <AddIcon fontSize='large' sx={{cursor:"pointer"}} onClick={() => { zoomin()} } />
            </Box>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width:"50%"
          }}>
            Straighten
            <Box sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap:"10px"
            }}>
              <RemoveIcon fontSize='large'/>
              <Slider
        aria-label="Straighten"
        defaultValue={0}
        getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            sx={{
              color: "rgb(1,117,79)",
              width:"70%"
            }}
        min={-45}
                    max={45}
                    onChange={handleStraightenChange}
      />
              <AddIcon fontSize='large'/>
            </Box>
          </Box>

    </Box>
      </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  position: "relative"
                }}>
                  <Button variant="contained" color="secondary"
                    disabled={needcolor?true:false}
                    sx={{ marginTop: "24px" }}
                    onClick={() => { setOpacity(0.5); setNeedColor(true) }}>Select Color</Button>
                                    
{      /**           <Button variant="contained" color="secondary"
                    onClick={() => { setBg("transparent")  }}>Cancel</Button>
                  */  }
                { needcolor&& <Box sx={{
                    position: "absolute",
                    zIndex: "2",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1px",
                    backgroundColor: "black",
                    padding: "10px",
                    borderRadius: "10px",
                    left: "50px",
                  }}>
                    <ColorPicker color={color} onChange={setColor} />
                    <Button variant="contained" onClick={()=>{setNeedColor(false)}}>Done</Button>
                  </Box>}
                  <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width:"50%"
          }}>
            Opacity
            <Box sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap:"10px"
            }}>
              <RemoveIcon fontSize='large'/>
              <Slider
        aria-label="Straighten"
        defaultValue={0.5}
        getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={.1}
            sx={{
              color: "rgb(1,117,79)",
              width:"70%"
            }}
        min={0}
                    max={1}
                    onChange={(e,newValue) =>{setOpacity(newValue)}}
      />
              <AddIcon fontSize='large'/>
            </Box>
          </Box>
                </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}>
          {topic}
          <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap:"10px"
          }}>
            <RemoveIcon fontSize="large"/>
            <Slider
  aria-label="Brightness"
  defaultValue={0}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={1}
  sx={{
    color: "rgb(1,117,79)",
    width: "90%",
    display: topic === "Brightness" ? "block" : "none", // Display based on topic
  }}
  min={-30}
  max={30}
  onChange={(event, newValue) => handleSliderChange(event, newValue, "Brightness")}
/>

<Slider
  aria-label="Contrast"
  defaultValue={0}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={1}
  sx={{
    color: "rgb(1,117,79)",
    width: "90%",
    display: topic === "Contrast" ? "block" : "none", // Display based on topic
  }}
  min={-30}
  max={30}
  onChange={(event, newValue) => handleSliderChange(event, newValue, "Contrast")}
/>

<Slider
  aria-label="Saturation"
  defaultValue={0}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={1}
  sx={{
    color: "rgb(1,117,79)",
    width: "90%",
    display: topic === "Saturation" ? "block" : "none", // Display based on topic
  }}
  min={-30}
  max={30}
  onChange={(event, newValue) => handleSliderChange(event, newValue, "Saturation")}
/>

<Slider
  aria-label="Vignette"
  defaultValue={0}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={1}
  sx={{
    color: "rgb(1,117,79)",
    width: "90%",
    display: topic === "Vignette" ? "block" : "none", // Display based on topic
  }}
  min={0}
  max={30}
  onChange={(event, newValue) => handleSliderChange(event, newValue, "Vignette")}
/>


            <AddIcon fontSize="large"/>
              </Box>
              <Box sx={{
                width: "100%",
                overflowX:"auto"
              }}>
              <Box sx={{
            width: isNonMobile ? "100%" : "160%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap:"10px"
          }}>
            <Button variant="outlined" sx={{color:"#0a66c2"}} onClick={()=>{setTopic("Brightness")}}>Brightness</Button>
            <Button variant="outlined" sx={{color:"#0a66c2"}} onClick={()=>{setTopic("Contrast")}}>Contrast</Button>
            <Button variant="outlined" sx={{color:"#0a66c2"}} onClick={()=>{setTopic("Saturation")}}>Saturation</Button>
            <Button variant="outlined" sx={{color:"#0a66c2"}} onClick={()=>{setTopic("Vignette")}}>Vignette</Button>
          </Box>
              </Box>
       </Box>
      </CustomTabPanel>
    </Box>
    </div>
      <Button variant="contained"  color="secondary" onClick={onStartCapture}>Capture</Button>
{     screenCapture &&  <> <img src={screenCapture} alt='react-screen-capture' />
              <p>
               <button onClick={handleSave}>Download</button>
              </p>
              </>  }
        </div>
                  )}
                  </ScreenCapture>
   
  );
}