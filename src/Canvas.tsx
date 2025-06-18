import * as React from "react";
import Point from "./Point";
import {CanvasTheme} from "./canvas-theme.ts";
import Util from "./Util.ts";

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas: React.FunctionComponent<CanvasProps> = (props) => {
    const BORDER_SIZE = 1;

    const [point, setPoint] = React.useState<Point>(new Point(0, 0));
    const [cellWidth] = React.useState(() => {
        return props.width / 50;
    })
    const [rowCount, setRowCount] = React.useState(0);
    const [colCount, setColCount] = React.useState(0);

    React.useEffect(() => {
        setColCount(props.width / cellWidth);
    }, [props.width, cellWidth]);
    React.useEffect(() => {
        setRowCount(props.height / cellWidth);
    }, [props.height, cellWidth]);
    React.useEffect(() => {
        const draw = () => {
            const drawBackground = (context: CanvasRenderingContext2D) => {
                context.fillStyle = CanvasTheme.background;
                context.beginPath();
                context.fillRect(0.0, 0.0, context.canvas.width, context.canvas.height);
            }
            const drawGrid = (context: CanvasRenderingContext2D) => {
                const drawCell = (context: CanvasRenderingContext2D, x: number, y: number, size: number)=> {
                    const sz = Math.max(Math.min(cellWidth - 1, size), 2);
                    const wh = Math.ceil(cellWidth - sz);
                    const margin = Math.ceil((cellWidth - wh) / 2);
                    context.rect(x + margin, y + margin, wh, wh);
                }
                if (cellWidth === 0 || rowCount === 0 || colCount === 0) return;

                context.beginPath();
                context.lineWidth = BORDER_SIZE;
                context.strokeStyle = CanvasTheme.line;
                context.fillStyle = CanvasTheme.fill;
                for (let r = 0; r < rowCount; ++r) {
                    for (let c = 0; c < colCount; ++c) {
                        const x = c * cellWidth;
                        const y = r * cellWidth;
                        const d = Util.calcDistance(x, y, point.x, point.y);
                        const w = d / Math.min(props.width, props.height);
                        const s = (cellWidth * w * 8) / 7;
                        drawCell(context, x, y, s);
                    }
                }
                context.stroke();
                context.fill();
            }
            const canvas = document.getElementById("canvas") as HTMLCanvasElement;
            const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
            if (context == null) return;

            context.save();
            drawBackground(context);
            drawGrid(context);
            context.restore();
        }
        draw();
    }, [point, props.width, props.height, cellWidth, colCount, rowCount]);

    const mouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const halfCellWidth = cellWidth / 2;
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const p = new Point(event.clientX - canvas.offsetLeft - halfCellWidth, event.clientY - canvas.offsetTop - halfCellWidth);
        if (p.x != point.x && p.x != point.y)
            setPoint(p);
    }
    return <canvas id="canvas" width={props.width} height={props.height} onMouseMove={mouseMove}></canvas>
}

export default Canvas;