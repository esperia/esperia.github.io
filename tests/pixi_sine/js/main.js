
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

    var debugStatus = new PIXI.Text(
        "", {
            fontSize: 12,
            fill: "white",
        }
    );
    var debugItemStatus = new PIXI.Text(
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

    debugStatus.position.set(8, 8);
    debugItemStatus.position.set(SIZE*0.6, 8);
    messages.forEach(_ => {
      _.position.set(54, 196);
      stage.addChild(_);
    });
    stage.addChild(debugStatus);
    stage.addChild(debugItemStatus);

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

        var mousePoint = renderer.plugins.interaction.mouse.global;
        var centerX = mousePoint.x - SIZE * 0.5;
        var centerY = mousePoint.y - SIZE * 0.5;

        // 移動量を加算
        currentStack.x -= centerX;
        currentStack.y -= centerY;

        // http://mathtrain.jp/rthetaphi
        var phiFraction = currentStack.x * 0.0001 + 0;
        var thetaFraction = currentStack.y * 0.0001 + 0;
        //var thetaFraction = 0.5 * Math.PI;
        var r = RADIUS_SIZE;
        //var r = SIZE * 0.5;

        var firstMessage;
        messages.forEach(message => {
          // http://mathtrain.jp/rthetaphi
          var x = Math.sin(thetaFraction) * Math.cos(phiFraction);
          var y = Math.sin(thetaFraction) * Math.sin(phiFraction);
          var z = Math.cos(thetaFraction);

          var alphaFraction = z;
          var alpha = Math.abs((alphaFraction + 1) * 0.5); // -1-1 -> 0-1に変換
          alpha = alpha * 0.7 + 0.3; // 1-0.3 に変換


          message.x = (SIZE * 0.5) + x * r;
          message.y = (SIZE * 0.5) + y * r;
          message.alpha = alpha;
          message.style.fontSize = alphaFraction * (fontSize.max - fontSize.min) + fontSize.min;

          //// sine wave only
          //var alphaXFraction = Math.sin(currentStack.x * 0.0001 + sinMax);
          ////var alphaFraction = alphaXFraction;
          //var alphaYFraction = Math.sin(currentStack.y * 0.0001 + sinMax);
          ////var alphaFraction = alphaYFraction;
          //var alphaFraction = alphaXFraction * 0.5 + alphaYFraction * 0.5;
          //var xFraction = Math.sin(currentStack.x * 0.0001 + 0);
          //var yFraction = Math.sin(currentStack.y * 0.0001 + 0);

          //var alpha = Math.abs((alphaFraction + 1) * 0.5); // -1-1 -> 0-1に変換
          //alpha = alpha * 0.7 + 0.3; // 1-0.2 に変換
          //message.alpha = alpha;
          //message.style.fontSize = alphaFraction * fontSize.max + fontSize.min;
          //message.x = (SIZE * 0.5) + RADIUS_SIZE * xFraction - message.width * 0.5;
          //message.y = (SIZE * 0.5) + RADIUS_SIZE * yFraction - message.height * 0.5;

          // デバッグメッセージ
          if (!firstMessage) {
            debugItemStatus.text =
              `3D:x=${x}\n`
              + `3D:y=${y}\n`
              + `3D:z=${z}\n`
              + `alpha=${alpha}\n`
              ;
            firstMessage = message;
          }
        });

        // デバッグメッセージ
        debugStatus.text =
        `mouse:centerX=${centerX}\n`
        + `mouse:centerY=${centerY}\n`
        //+ `xFraction=${xFraction}\n`
        + `stackX=${currentStack.x}\n`
        + `phiFraction=${phiFraction}\n`
        ;

        //Render the stage to see the animation
        renderer.render(stage);
    }

    //Start the game loop
    gameLoop();
}
