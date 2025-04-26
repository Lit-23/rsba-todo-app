import { useEffect, useState } from "react";

// provide the desired max device width as params
// this hook will return true if the device width is <= to the provided params(max-width)
const useDeviceWidth = (width: string = '767px') => {
    
    const [deviceWidth, setDeviceWidth] = useState(window.matchMedia(`(max-width: ${width})`).matches);

    useEffect(() =>{
        // handle screen size
        const mediaQuery = window.matchMedia(`(max-width: ${width})`);
    
        // Update state based on the current media query match
        const handleWidthChange = (e: MediaQueryListEvent) => {
            setDeviceWidth(e.matches);
        };
  
        // Add event listener
        mediaQuery.addEventListener('change', handleWidthChange);
    
        // Set initial state based on current match
        setDeviceWidth(mediaQuery.matches);

        // Cleanup listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleWidthChange);
        };

    },[])

    return {deviceWidth}
}
 
export default useDeviceWidth;