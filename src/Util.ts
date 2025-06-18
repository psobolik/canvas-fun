export default {
    calcDistance: (x1: number, y1: number, x2: number, y2: number) => {
        const run = Math.abs(x1 - x2);
        const rise = Math.abs(y1 - y2);
        return Math.sqrt((run * run) + (rise * rise));
    }

}