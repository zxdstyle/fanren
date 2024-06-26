import {Application, Assets, Sprite} from "pixi.js"

function getBezierPoint(t, p0, p1, p2, p3) {
    let u = 1 - t;
    let tt = t * t;
    let uu = u * u;
    let uuu = uu * u;
    let ttt = tt * t;

    let p = {
        x: uuu * p0.x,
        y: uuu * p0.y
    };

    p.x += 3 * uu * t * p1.x;
    p.y += 3 * uu * t * p1.y;

    p.x += 3 * u * tt * p2.x;
    p.y += 3 * u * tt * p2.y;

    p.x += ttt * p3.x;
    p.y += ttt * p3.y;

    return p;
}

const app = new Application()

await app.init({
    resizeTo: window
})

const texture = await Assets.load('sword.png');
const bunny = new Sprite(texture);
app.stage.addChild(bunny);
bunny.anchor.set(0.5)

bunny.x = app.screen.width / 2
bunny.y = app.screen.height -100
bunny.scale = 0.3
bunny.rotation = 0

let startPoint = { x: app.screen.width / 2, y: app.screen.height -100 };
let controlPoint1 = { x: 1000, y: 100 };
let controlPoint2 = { x: 1400, y: 1300 };
let endPoint = { x: app.screen.width / 2, y: app.screen.height -100 };

document.body.append(app.canvas)

let duration = 1; // 动画持续时间，秒
let elapsed = 0; // 已经过时间
let previousPosition = getBezierPoint(0, startPoint, controlPoint1, controlPoint2, endPoint);

app.ticker.add((ticker) => {
    // if (elapsed >= duration * 60) {
    //     app.ticker.stop();
    //     return;
    // }

    elapsed += ticker.deltaMS / 60; // 假设每秒60帧
    let t = elapsed / (duration * 60);

    let currentPosition = getBezierPoint(t, startPoint, controlPoint1, controlPoint2, endPoint);
    bunny.position.set(currentPosition.x, currentPosition.y);

    let dx = currentPosition.x - previousPosition.x;
    let dy = currentPosition.y - previousPosition.y;
    bunny.rotation = Math.atan2(dy, dx) +1.5;

    previousPosition = currentPosition;
});