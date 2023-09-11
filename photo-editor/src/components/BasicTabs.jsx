import "./BasicTabs.css"

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Slider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import ContrastIcon from '@mui/icons-material/Contrast';
import CropIcon from '@mui/icons-material/Crop';

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
  const [topic, setTopic] = React.useState("Brightness");
  const [imageStyle, setImageStyle] = React.useState({
    filter: "brightness(100%)",
    boxShadow: "0 0 0px rgba(0, 0, 0, 0.5)",
  });

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
  
  return (
    <div className="home">
    <div className="editor">
        <div className="photo-full" style={{boxShadow:imageStyle.boxShadow}} >
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBIVGBEYGBkYEhgYERgYGBgZGRgYGBgcIS4lHB4rIRgYJjgnKy8xNTU1GiQ7QDs0Py40NzQBDAwMEA8QHhISHzQrJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NjQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAK8BIQMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAECBQYABwj/xAA8EAACAQMDAQYEAwYFBAMAAAABAhEAAyEEEjFBBRMiUWFxMoGRoQbR8BRCUrHB4QcjcoKSFWKi8TNTk//EABoBAAMBAQEBAAAAAAAAAAAAAAECAwQABQb/xAAlEQADAAICAgMAAgMBAAAAAAAAAQIDERIhBDETQVFhwSKBoXH/2gAMAwEAAhEDEQA/AOg217bRStRFfLI0aAutKFJNOuKHaXJp9hQJdOOtQ+mHSm9tWCUjrQ6Zl93Rkt0y9vNXS3SVlGRFgU/aWhJbpm3bqXMYMiCoZaNbtUYWhXOmzhDZR0s00LQq5QDNdxO2LdyKju6YqkjqR9aaUdsGFq4WltR2nZQhWcbj0ALdCeRjgGnEggEcGqra9g5J+ioSvbKOq1JShXZ2xfZXilGIqNtQpB2KulDK093dUa2PKjxZ2xdDXnAojJQ2SiqaAAcChOk0ZkqkUHRwu1qhtYp2vBJplQDP2RVGHpWk9mgPap09gZmi1mavtpru6t3dUTEaE9tTtphrdV20rYugO2oo2yvUuztBIqpoe81Vp60JoYhzVUwamrolOnsAVRVoivJbogtipZK0FAAsmjIlECURBWSr2yiJS3TCJUIKYRaMvYxdBVpr0VRq0zPQAlYfbPabgqloK245cv4BB+FgMnoIHM04/aKqSD0xJIVSYmAT19q5C92uN7MlkKWb4m8agcSBxOBxHHNaMcfbIZsiS1seS46nvWJ7siAHOxWJ6g7pE5ORPn1pTU3XQq1xvAd7IilmBEnkhsCT5nkVOv1SBFe243hVUqynDERldsdTgR+cXdTbNraFXvCIb40cAQUKhTPxGSP7VZLT2RdL1su+oZEUray4ARFDGAfEGBjmBJ/mOtdDrLxMOUYBfhd/D7nMeX3rHth581GZDlnMdCFPPSPYU7Z1aswVywMBg25g3JiJAiDOPehSRNX2dX2P20XcI5UzuAZFJtkg48U4MdDXRRXHdn30RhsuBnckSAFyRglQZYe/8XWussXNwzhoBI6+/wBjUa1vo046bXbJIrwWrkVIFLx2W2DaqMKIwoZFBywoE1DajkUJxSVOkEHFDdKsGq5NZ3Rwowq1pqu61XbXKtCthC2KGRUxU1eHsGwJSvbKMpqXp96AKlaoUohobGlqjtFdter0V6p8jgFmrXOKVD1bfPNGTkWQUzbt0BDTKvVZYGXC1YGq768WqOTs5BAauKAGq4esmux0xu3Rg1J23ogeqyMNq9VvXFVSzEBVEkkwBS/eRya5T8S9qsxNqMKwIIEhhGB5k/FxxWrCnXRPLkUTsjt68hZjat294kF3C8nBChhER+ua54vsIlC0iBkhMclWgx8iI9KT1V92YbgfLDQhjzIxM/SgWrqIyuXYwG6LAI6bmMnJjHv6V6cYnxPLqqp8mbQCTm0yBoIYXAzsYiCW/oB9zQ2tlSfEFQYAZ8MeQxI4BiAAB1mKz31JOVYw0jDHIB52pz79fnRL/aKFdrEMVIgOpC+U5k/KT09x3CgqmXfSFWRldepASdrIAN8YjknnyNELRCMG8+JwxBjbPQeRzmaHpu0UWQF2sxXAkgAjBAJOefpTS3TIDs5x4GFuCpjCkCcEwYGcUXv0xlSfsrpgFEy7Pyu1ZUCcjPLTjHn0mus7A7adHFu+xgwPEI5ypBjI56xXHWxfAwGPjJPC2yWjceh6cZ4NbV+7vVWdCl0v6w0DjqM/T61LJKY81p9H0jcCJBkVUPXP/h/WJlGDLeYjcCvxc7SIkekz0rZcxWV7lm6GqWxktUE0sL1Q18V2ymgxNUZaEL1E3TUrZwu6UMPTDik3NZqQNhg9QTS4uVYPSfYrCV4VTdUb60x0KyzVQtUNcoTPTUMgpNDJqneVUvU2cwk16g7qigAzu8q4es43Ioi3q0cGJLNBblGS7WV31WTUV3Fh2a4uVJuVnLqRXm1IpagGzR72oN+sw6ivC/SLB9lEayX6ZW8KxEu0cX6549DoN21qQLLwRJWBJxJ86+eW2OwuWLPvK7djb9pJkswjEfzNdvqALilDwwI9vI/I1lDspgXIbaATsldylYEkxkAmZiOPnW3xqmZaZnz4XTTONd3cbei9QCSWnjJ9aN3JCblKHJAJIJY9CceWOfLFP3lS0S0ossQSWUE8llySwExGCaV13aTPs2bUQtAhVCh+XBU88gzjmOufTTb1pdGNwl7F9JaYh1ZtpYDZ4o3DndxB4+x9KYO6Tu2wACVVSBIGRgc4PTmlwtxm2qWLGSSElY8PwruHpAX+LiijTqVYkOAoUEFYc9DlsEYx6ChTFf4i73NwkL8MlsAsMdZycRwcVbQqwZz3nhJ4AJaDMgjd4ePX+Ux+0qAF2ncIgbYJ4z1HyMnFetztIZkZGUgDfJHh5KxngCOlT+gaSD73BY7yZ3GAGZ9mPEACT1JiBT+hMAglZLLsYknMhp5kHnBrKuRAUvlQJ5zHqGzgk5HsaLp7yIu9W2k/Cqu25skHjaQcdT5+VLUbXQ619H0HSdgDwMzgtAYsrw4aQRtJEhfTmTW45IEEyfPgn3r532Lrv2m4LS77bpticEifFIJx08Qzmvo12AI8qx5IpPVGzDSa6QE0vceis9KXWqTRoTLpcpu1crKDxTFu7UqQR93pO81XFyaDeNTU7FANcqVvUpfaq2rsCg8X2IzQFyoNylX1AihtqKopF2MPdofe0o92hG7TcGds1ZHnQTdpJ9Zj1oKX5NDgwVRp97UUnvr1D42LyMl7lQLtLO9DL1vmBFQ6tyaKSRmkdNeAam3vQKDhpj7LC9UG/Wf3te72j8YEzQF6iJdrMW5R0uV3AdUaa3asbhpBLuRTouVKoKKhixcp1pKkCJgxPHzrGtvmtXTPQc6GdGP2l+GwzblA27DiPEX9WMwP6+UZy+2Oz0tWkt92EcwWciUTORMQ+ADPuMCu7R6R7Q7Ot3mDOCxUeFS5CT5lRyavGdrW/RC8ae9HALrE7qTaBYH494Cg/CAp2kHgY9Mjivah37h2IAG0mBuY7jtIUqVAXJz6fdrtPSAXdgUFwZRUKk7QIVcniTxBI9BNYvati6LlwNCtsV1BJ8R3opUY53MD04xzJ2wpprX/AKZuLIs3QEC/5a7gIDLmeplc8j0j6UzYQB1GA7FsKSQAAQQQJxH2M4pP8P6W1cR33BLlpQzd48lySAO7UDiBwcyRkjjrdF2GrqourKiWR1hCVbhGA58O2SfI0c1Rj2mcsbo5nXae452qpKrBAQ4IHBG3ieOsdadt2Lb6dRsZbiEkZLISwBUuh452/wBOldP2Z+GUtXFdHaFMwcgzMqV428fX0FddaVRwqjkYUcEyfvmseTzJnSnv/g8YH99GJ+DLAa2C9oBlLEP4hPSJkhkMk4PlgYrpdS9DRwBAgAewFD1D4rJWR3XI0zPFaAd5VLjUq9yDXu8mn1tDKjzvFVt36DfU0kXINLw2NyN1LtWZ5rKtaimVvUjnQNnr9Z1y4RxT1xppC+KaULQFtSTzXhfpW7iljcqijZNs0++qDcrO76iW3kxTfGDYwWJqyMRRFIHFWU0rQtE7q9RO7WvUuhTnXHrQmNVvXxuMVTfXoTDIqy2+p3nzoDNUb6fiOqD76kPS++vB6DgPIbR6Kr0mr1YPSuRlQ4HphL54ms9Xpm01JUBVj9o1paa5WVbNPWngY5/uf7fWo1Oyio1hdqGvVj6jtFEIDOATEf8AIDH1pP8A67blhukqdpgGOJ58uBPvU/hqu0jnkle2br3BMwN3nAn61xP4w3FxKylxWUMJwVhgCTgEx8/lWxc7ZSchtpIAPQ8mB8h96yO2O2EuIUAJMoQTgT+8Iny3CIxV/HxXNp6J1klr2W0fYyPqkUj/AC101l3VfCC/hQBiOQdpb5V1bXYOOOnlXFfh7tbug5cM7N3aggy21AygEYwB+p52x2zZMnvBA53GG+LaJB/WKbycWSqX2kjpufo6LT3q0rd3Fc5pb+Pf+UE/lWlZv4/Xp/evOcfpVUaffevn59Y8vb71W5ekfr5/r1pA3v186G1/H0/r+VMpfo7ZTU3ajTXwTWfrLxmP15UHRX888j19fL9fWtE43xF5dmvfuzSbPUvcmlnaumQugq3YNNJdrEN+Wpq3eo1AJs1e8oV1qWW7Um5ScQugF8UjdFO3GpO7V4QlMWZqJpbkNQLlUVozVuPRN1o3Vair71j29fHxVd+0R05qNY6A7Rsz616sD9ubzr1L8LF+VGKt2jJcrOR6Oj16dSYpscd6FvoT3KF3ldMdFlQ4HqQ1KB6ILlCpHVDavXt9KG5V7Cs58Kk+3HzPAqbWu2c6H7b00lwDmp0fZ3hLFp2zKrzPTPUecDpRmdLZLKWDYgTmDnjyjz96z1llvS7CmwbawIY2sWAmBAMf7oqB2izcEIMZPiH1yOPTqKa02kXUBrxdxc2lR8W1vExMQJkRxPyrH1Nm4vhJK/CV3yjMfIkg5Jn86EuKbn7RRK/9Hh2fb3d67szH1bd5jP6/lVG0lrwBA5JDADcTuJODtnI9I6Gh27gckOyYbxLuIbGNoPqR9hWo2vYQiyRtIGeBHn15P2pqdy12/wCheKENT2XaVShOxgJbw7ZAySM9Rge3nWbb7Idi7223qomWXxYBMEg+I7f503rdShXaxyf3sFiJ4nAMAmip2oqKihcLGZ2njIPmKqryTPXbCoMS/obgEbuYbnBMkHMDr0PqaUv27qglsySpOCPPiPnOK3e2iCu5GLHlxM9ORPOAfM9ajQWlZVZy+3wk9LUgzDEjAwJyKvOb/HbCorehHR9t3kUQ+AMKyjbAA2iefvXV9hfiMXZVlIYAkgDcIHyrOuWrDIxKqbq52wrJsxjcCPMn51mdlMoZ1QAL8UlsCZx59PvULmMst8dNHf5SzvU1isfCcjp19K8zmuS0Wrh2ycBQCApHzDHmug02qDqGHWftisN4nLKcn9lNWxpFHI/9A07qGmkCc0810Tqh9NQ0c0rqL7GjIsigX0poa2LV9C6vmmbd6kXUihLeq7nkic5OzcS9VxdrJS/RBfqfA0KzQe5Sty5Qu/ob3KeZBVEO9UZqEz1U3KrxI1RV3oLXqrdalXaqTBmqhr9pr1JV6n4ITmyoard6BUafQXXjajQRIJELHnJ6Vp6b8M3n3ZRWVWYBiRuAIU5jGTAnE+9Nd459tDrGzK72asr10ug7E0xCnxOSNxLttTHOF4j1JrYN6zaUwiKIBhFCZwQJ85icms9eVKepTZecb3o5PS9l3nO1UhtpYBmCsQI6Hg5HMVrD8NMsm44gD9wiTnzPsfpVBaEi4zhXIJKA7yQQOWBMn8vnVH7Rd3WzufxFU8Z2wD+8R7HipVkyVXWtfZRSkOdk6OyHBZViQYcK5ZegBmATI6fStXU3rKMrd2UyRtI8BEQBDciY9OvnXP2LndXDDS6naAA0KBPEkkZEnz6Uvr+0Gf8AdJYdclic8CJA6VGsVXe2+h1GkdNpdTakt3KlwQB4OME+JcheueTJpbtvtjcrFlR9hVlgzAJ8oz0wfvXN2dYRbEPDkyT8RzIAIM8yOM1m67Ukrlz8MwbfhBiBmZHwjOcmjHibvb/solpHT6bt1VtALAgmRAHJyce2fek73bhuCGA2eUCPLMnJzz6VhaS5tWT8RJ5Hnk/zP9qXa945iQ3r065H84q8+NKpvRTb0bZW2WLBBiPhPHqB6mc0Kzq5eEy04wd0nGOvyx0oemZRG8ERmCTBx/FiKva1IW610qFVvhiARgTEdfeOTTa1te+iTSbB9oWAXKsWEgnIgSRgQTPSs7Uaa9bUtygPxZE+x6/KutuoupVNrAHeuSCHg4YBwDOPpHOaf1+ntixtYl1VJJ/iCgYI6mQDnmPKlnyOOpa7+0dKpb0fPv8AqZIgg7vMQT16fOtWx2oSAFtSogeIiMepIA605or1sLtCIzMRO7ABEiSenI9qZtncr90UCzEHqAB4hAMmR1iKe7lvXHQ01TFtFo3vHeQtlcwWBZiQIlZxSPaWlawCFIZG8RIWGkcg/wBOlNavVbFgOGAERvM8wPsKvpFF64rAf5akY6FhEsdx4/KhLpPk/Q6jl7M7QXGtL4oUsNxBGYPEg9K1uxrtxm3AbbQ9ILEjpnjrNU7Ve3dvKuRBG4qR4wojHkMDzrYdbaqotghAAImR7g/nn60uW1+dslkTlMI70sqSaJuxRNMjMwRVZnPCqpZj8hWTT9IzN7JRoqL5rpuzvwZqG8V0rZHkx3v/AMVMfU1uW/wfpVH+Y73D/qCr9Fz960R49/mhlF0ukfLL9ys+5cFfWO0PwRorgIQvabowcuvzV5kexFcf2l/hzq0k2mt3l6BX2XD/ALXx/wCRrVOPiRrBll+jllv0UX6U1uku2H2Xrb23zAdCsx1UnDD1E0Nblc4Ky/00RfqTdrO7yri5Q4nbGHuUBr0VR3oDvVJkSg7XAaCzUBmqu6qKSDnYxvr1LTXqbgdxR234cukogd5XhVHIBXbkfIYOeeKF+1ILbJtCM8sSxuEsVJIACxtPi56Ur+HFS3KksXZXwwAPQyRPhyCOY+1X1F0JeQw6eBl2zKyWIDKw6fesFxLppb/T0uKcovbcIgkmCdxkGcxCz16/P2pftG4SdoDEAAleQRjG3BmD04NBvKS7BVZgu0+KVEx5z4sMDH9qENSSu4jOSMEcGB7flFBTrs5ToHfbMGVWEXgg5yYUckDdj0itrQsjqTtRiWKF/AltQoDDbJLNIUHGc9CK5tr+4kkAFVmB57Cf5ED50hp9WVXaW8B3eHxbTuADGAcHBzVqw8p99jKUjf7V1ah0IUL8JBHwqPEJgiTzxjge9I6nWE5kkNkZBAgwY/P1pTtXUG5sYgZHI+LAAGOABxS28sOfOYHzppxpStj8utDB1Z6sY8MY+Rz05+9Dtnd8YBAEj24E+ZqdOnmfsK09NZTnaJ84zVGuK6Mt55n+RFVYrG0xnhZH6wKBckHIIHUQQeOorfe7ApG/cDciaSW/wkvK79Cqa1vDOFWcxBiOB9BTG9jllXaPSTzIAUZB+c0ncsEGVyBkAjIPvQVJI8Qlc4mJz7Z4ouF9F5uaW0dTprhCjYu1QD4i67zujLfwtgz/AO6bGodCbbgEEAAHlgQSI6kxjpkVzJ1B6sCSQAYAMAAn2PkI6elFfVowdRuHO0gjceZzA6RPnHpUHh2y0v8ARS/cLMwkCGaDmOc9JPPNeOqkBVJhZAgfXr+ppS/bmNpJBiZOft0oqX1XAXxYBjr6k1p4rQE9DK6aRLtAPCjrnr51e1rCqhEOZEATJgGB96RuB2HkOuePWtLsx0TOdwjGIPnuBNJXS2+/4KTtvoY7L0JLZBe60AKu6faBk/8Auu27J/BeruAbwLSed1/GZySEEmfeKD+Aye8LKk3SMMzDai8M3oTgeeK7PtbX9yB49xM5ngjpFBY1S5UPeHlpMrofwbpbUG87XWHSdif8VM/U1p/tdmwu2yiIv/aoE+5HNcTqvxCTncRHMnFK6ZtTqTFtSE6u8i2B6dW+WPWuWl1KHnxontnXP2yC3ibHvTC65CJn71gJ2RYsjddLXLn/AHEhJ9EGCPeaz9b2sCx24HpgUXTXsfin6OrPaKz/AHo9vtQedfOrnap86qe2SBzSuxlCPqT3rd5ClxFe23KuoZD8jXJ9r/4b6a5LaZ2sOc7TL2T8idy/IkDyrM7M/EHma6XRduA9aZWiV4FXtHzftX8Fa6xJNnvEH79k7x/xw/8A41zbMQSpkEYIOCD6jpX6Esdpqa9rtFptSIvWrdzyLopYezcj5VRaMl+I/pn577yhs1fY9f8A4a6J82zcsnOFfen/ABeT9CK5nXf4Walf/hv2rg8nDW29IjcD9RTJIzVgtfRwBNVroNd+DNfandpnZR1QrcB9ghJ+1Yt/Tshh0ZD5OjIfowpiThz7QGvVaB51FHYDorV4W9xV23GRLEnGYEdelA/a1a6Rtdm5BcBoO9iSPTFZ4ugtPKk+s+E+IE+5HXgiqXtbiCOTyAA8jHMzGJrH8bPR10anaN7aWO5ohj4YKHIjH9PbymsvU3yCygE7JVQWDEgSB9ulDvaxmkT/AKvQzwPpSV299Zp8ePS0wvQbvIYyDkN9kj+tTpryAZUM3iMmMRMBfL3/ALUCSxz0npVigmf1zVdb6J1aRdlDKuIy2JlonHyya8ggVUGrA06nRmq2wqGjpcilgandQaIudjT3JoRNCD1bdSqReOgqtXmQHMCft86pUiu0dPT2gV2zPI+/hkzkGZFWsLB4x7yP186IzVCtXNdGhZqKfswyNxC9IAn2OaJZsgnYsktG3dAhseXIx96hnqm6hoHzVs2rH4fyDcbHPhHP+7Ndd+HtDpkBA+FsMDBn3nmuT0GqV1hrkXBHJ2k/Pg/zp4I6SQdwPng/IilptPo9XFUVPR197SWNMGvaYP3jDbsVgLZzMkEY+VZ7W9RqMvstj/WXI+QAz86579tfjxfzFEXWOOr/AEpHTLpnQ6bsmwjbnbvHHG6No9l4H861h2qAvhiB5Vwj6pz+6/zIH9aKNQ4EbjS82gaTfZp9qdqM5isd3rzTUJZJPFL7GbSF2JNUdD5Uxf1Fu3h3BYfur4m+fQVn6jtluERVHmw3N9OB96ZRTM9+RE9Nh7KMKesap161jaftx1PjVXX/AEhW+RUf0rb0uqs3h4CQ3VTG8fLqPUUXjaOx+TNejX0XbJHJre0vbU9a4u5pTypn25+lCS86nmlW0W5Jn0/T9qg9aftdojzr5hpu1COTWtp+2PWmVAcr6PoSa0GrNcVhDAEeRAI+9cVa7X9aat9q+tUViPGdF+waf/6bX/5J+VerE/6r6ivUeYvxo+G2tbHhC+HB6cgc8e9VfVSfeZnjJmJjj86izbHJx+j5VYIMR6cjyp9Iy01K7ZXdMgAY9D/Oo7sHJGfc0QLU0UtGasrfoqaial6rTEz1SKivVwS017dVJqQaGgaCCpmq16aAoZTRAaApooauFaIc1XdUuaExo6GRZmqm6qsarNHQ3EJup/s7XsjAFjs6j4l/4/lWYDVlaucjS3L2jrTr7JyrifVWA+pFMLfU/vf+S/nXIq1WqTxJmhebS9pHXsB1+7gVNtEOdw+TA1xhNUJpfhX6OvOf4dfqddYtzLbm/hU7m/IfOsTW9t3HBVP8tPJfiPu3NZU1BpphIjk8i7/g8Gq+6gzVg1U0QaJavI5BkEgjggwR7Gqk1FEKNzRdvMIFwbh/EMOPfoftW3avpdEqwb2ww9x+dcTRbVwqQykhhwRzUqxp+jTj8lz0+0ddc0h5XI+/0oHiWk9H250uD/cv9V/L6VtKyuAeQRIMQfvUHLn2bseWb9MWTUkUwmtPnQrmnxPIpcrQK7NH9tPnXqzIr1dsGz//2Q==" alt=""
            style={{
              width: "100%",
              height: "100%",
              ...imageStyle,
            }} />
      </div>
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{color:"green"}} >
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
      </CustomTabPanel>
    </Box>
    </div>

  </div>
   
  );
}