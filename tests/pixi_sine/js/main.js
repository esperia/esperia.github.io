
var type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

PIXI.utils.sayHello(type);

//Use Pixi's built-in `loader` object to load an image
document.addEventListener('DOMContentLoaded', e => {
    setup();
    // PIXI.loader
    //     .load(setup);
});

//This `setup` function will run when the image has DOMContentLoaded
function setup() {
    console.log('setup');
    const SIZE = 512;
    const RADIUS_SIZE = 200;
    //Create the renderer
    var renderer = PIXI.autoDetectRenderer(SIZE, SIZE);

    renderer.view.style.border = "1px dashed black";

    // renderer.backgroundColor = 0x061639;

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new PIXI.Container();
    stage.interactive = true;

    var coordsMessage = new PIXI.Text(
        "", {
            fontSize: 12,
            fill: "white",
        }
    );
    var messages = [
      new PIXI.Text(
        "Java", {
          fontFamily: "Arial",
          fontSize: 32,
          fill: "white",
        }
      )
    ];

    coordsMessage.position.set(8, 8);
    messages.forEach(_ => {
      _.position.set(54, 196);
      stage.addChild(_);
    });
    stage.addChild(coordsMessage);

    // 移動量
    var currentStack = {
        x: 0,
        y: 0,
    };
    const fontSize = {
      max: 32,
      min: 20,
    };

    const sinMax = Math.PI / 2;

    function gameLoop() {
        //Loop this function at 60 frames per second
        requestAnimationFrame(gameLoop);

        //Move the cat 1 pixel to the right each frame
        // cat.x += 1;
        // message.x += 1;

        var mousePoint = renderer.plugins.interaction.mouse.global;
        var centerX = mousePoint.x - SIZE * 0.5;
        var centerY = mousePoint.y - SIZE * 0.5;

        // 移動量を加算
        currentStack.x -= centerX;
        currentStack.y -= centerY;

        messages.forEach(message => {
          var alphaXFraction = Math.sin(currentStack.x * 0.0001 + sinMax);
          //var alphaFraction = alphaXFraction;
          var alphaYFraction = Math.sin(currentStack.y * 0.0001 + sinMax);
          //var alphaFraction = alphaYFraction;
          var alphaFraction = alphaXFraction * 0.5 + alphaYFraction * 0.5;
          var xFraction = Math.sin(currentStack.x * 0.0001 + 0);
          var yFraction = Math.sin(currentStack.y * 0.0001 + 0);

          var alpha = Math.abs((alphaFraction + 1) * 0.5); // -1-1 -> 0-1に変換
          alpha = alpha * 0.7 + 0.3; // 1-0.2 に変換
          message.alpha = alpha;
          message.style.fontSize = alphaFraction * fontSize.max + fontSize.min;
          message.x = (SIZE * 0.5) + RADIUS_SIZE * xFraction - message.width * 0.5;
          message.y = (SIZE * 0.5) + RADIUS_SIZE * yFraction - message.height * 0.5;
        });

        coordsMessage.text = `x=${mousePoint.x}\n`
        + `y=${mousePoint.y}\n`
        + `centerX=${centerX}\n`
        + `centerY=${centerY}\n`
        //+ `xFraction=${xFraction}\n`
        + `stackX=${currentStack.x}\n`
        + `stackCalcedX=${currentStack.x}\n`
        //+ `alpha=${alpha}\n`
        ;
        // message.text = "" + point.x;

        //Render the stage to see the animation
        renderer.render(stage);
    }

    //Start the game loop
    gameLoop();
}
