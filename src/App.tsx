import './styles/App.sass'
import Canvas from "./Canvas.tsx";
import React from "react";

function App() {
    const [windowSize, setWindowSize] = React.useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    React.useEffect(() => {
      const handleResize = () => {
        const MARGIN = 50;
        const footerHeight = document.getElementsByTagName("footer")[0].clientHeight;
        const headerHeight = document.getElementsByTagName("header")[0].clientHeight;

        setWindowSize({
          width: window.innerWidth - MARGIN,
          height: window.innerHeight - MARGIN - footerHeight - headerHeight,
        });
      };

      handleResize()
      window.addEventListener('resize', handleResize);
      return () => { window.removeEventListener('resize', handleResize); };
    }, []);
  return (<>
    <header>Canvas Fun!</header>
    <Canvas windowSize={windowSize}/>
    <footer id="footer"><a href={"https://github.com/psobolik/canvas-fun.git"}>source</a>
    </footer>
  </>)
}

export default App
