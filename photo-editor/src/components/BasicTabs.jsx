import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Slider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
      width: '100%',
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
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
              <RemoveIcon fontSize="large"/>
              <Slider
        aria-label="Zoom"
        defaultValue={30}
        getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={0.1}
            sx={{
              color: "rgb(1,117,79)",
              width:"70%"
            }}
        min={1}
        max={3}
      />
              <AddIcon fontSize='large'/>
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
      />
              <AddIcon fontSize='large'/>
            </Box>
          </Box>

    </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}