import React from "react";
import Point from "./Point";
import {CanvasTheme} from "./canvas-theme.ts";
import Util from "./Util.ts";

const Canvas: React.FunctionComponent = () => {
    const width = 1000;
    const height = 800;
    const BORDER_SIZE = 1;

    const cellWidthRef = React.useRef(width / 50);
    const rowCountRef = React.useRef(height / cellWidthRef.current);
    const colCountRef = React.useRef(width / cellWidthRef.current);

    const [point, setPoint] = React.useState<Point>(new Point(0, 0));

    React.useEffect(() => {
        const draw = () => {
            const drawBackground = (context: CanvasRenderingContext2D) => {
                context.fillStyle = CanvasTheme.background;
                context.beginPath();
                context.fillRect(0.0, 0.0, context.canvas.width, context.canvas.height);
            }
            const drawGrid = (context: CanvasRenderingContext2D) => {
                const drawCell = (context: CanvasRenderingContext2D, x: number, y: number, size: number)=> {
                    const sz = Math.max(Math.min(cellWidthRef.current - 1, size), 2);
                    const wh = Math.ceil(cellWidthRef.current - sz);
                    const margin = Math.ceil((cellWidthRef.current - wh) / 2);
                    context.rect(x + margin, y + margin, wh, wh);
                }
                if (cellWidthRef.current === 0 || rowCountRef.current === 0 || colCountRef.current === 0) return;

                context.beginPath();
                context.lineWidth = BORDER_SIZE;
                context.strokeStyle = CanvasTheme.line;
                context.fillStyle = CanvasTheme.fill;
                for (let r = 0; r < rowCountRef.current; ++r) {
                    for (let c = 0; c < colCountRef.current; ++c) {
                        const x = c * cellWidthRef.current;
                        const y = r * cellWidthRef.current;
                        const d = Util.calcDistance(x, y, point.x, point.y);
                        const w = d / Math.min(width, height);
                        const s = (cellWidthRef.current * w * 8) / 7;
                        drawCell(context, x, y, s);
                    }
                }
                context.stroke();
                context.fill();
            }
            const canvas = document.getElementById("canvas") as HTMLCanvasElement;
            const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
            if (context == null) return;

            drawBackground(context);
            drawGrid(context);
        }
        draw();
    }, [point]);

    const mouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const halfCellWidth = cellWidthRef.current / 2;
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const p = new Point(event.clientX - canvas.offsetLeft - halfCellWidth, event.clientY - canvas.offsetTop - halfCellWidth);
        if (p.x != point.x && p.x != point.y)
            setPoint(p);
    }
    return <canvas id="canvas" width={width} height={height} onMouseMove={mouseMove}></canvas>
}

export default Canvas;