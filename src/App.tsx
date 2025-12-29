import './styles/App.sass'
import Canvas from "./Canvas.tsx";

function App() {
    return (<>
        <header>Canvas Fun!</header>
        <Canvas/>
        <footer id="footer"><a href={"https://github.com/psobolik/canvas-fun.git"}>source</a>
        </footer>
        <script type="module" src="/src/main.ts"></script>
    </>)
}
export default App
