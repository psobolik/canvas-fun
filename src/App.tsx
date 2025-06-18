import './styles/App.sass'
import * as React from "react";
import Canvas from "./Canvas.tsx";

function App() {
    const [width] = React.useState(1000);
    const [height] = React.useState(800);

    return (<>
        <header>Canvas Fun!</header>
        <Canvas width={width} height={height}></Canvas>
        <footer id="footer"><a href={"https://github.com/psobolik/canvas-fun.git"}>source</a>
        </footer>
        <script type="module" src="/src/main.ts"></script>
    </>)
}

export default App
