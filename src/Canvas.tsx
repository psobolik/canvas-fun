import React from "react";
import Point from "./Point";
import {CanvasTheme} from "./canvas-theme.ts";
import Util from "./Util.ts";

interface CanvasProps {
  windowSize: { width: number, height: number }
}

const Canvas: React.FunctionComponent<CanvasProps> = (props: CanvasProps) => {
  const BORDER_SIZE = 1;

  const [point, setPoint] = React.useState<Point>(new Point(0, 0));
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);

  const context = canvas?.getContext('2d');
  const cellWidth = Math.min(props.windowSize.width, props.windowSize.height) / 25;

  React.useEffect(() => {
    setCanvas(document.getElementById("canvas") as HTMLCanvasElement);
  }, [])

  React.useEffect(() => {
    const draw = () => {
      const drawBackground = (context: CanvasRenderingContext2D | null) => {
        if (!context) return;

        context.fillStyle = CanvasTheme.background;
        context.fillRect(0.0, 0.0, context.canvas.width, context.canvas.height);
      }
      const drawGrid = (context: CanvasRenderingContext2D | null) => {
        if (!context) return;

        const rowCount = props.windowSize.height / cellWidth;
        const colCount = props.windowSize.width / cellWidth;

        const drawCell = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
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
            const w = d / Math.min(props.windowSize.width, props.windowSize.height);
            const s = (cellWidth * w * 8) / 7;
            drawCell(context, x, y, s);
          }
        }
        context.stroke();
        context.fill();
      }
      const ctx = context;
      if (!ctx) return;
      drawBackground(ctx);
      drawGrid(ctx);
    }
    draw();
  }, [context, point, props.windowSize, cellWidth]);

  const changePoint = (x: number, y: number) => {
    if (!canvas) return;

    const halfCellWidth = cellWidth / 2;
    const p = new Point(x - canvas.offsetLeft - halfCellWidth, y - canvas.offsetTop - halfCellWidth);
    if (p.x != point.x && p.x != point.y)
      setPoint(p);
  }
  const touchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    changePoint(event.touches[0].clientX, event.touches[0].clientY);
  }

  const mouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    changePoint(event.clientX, event.clientY);
  }

  return <canvas id="canvas" width={props.windowSize.width} height={props.windowSize.height} onMouseMove={mouseMove}
                 onTouchMove={touchMove}></canvas>
}

export default Canvas;