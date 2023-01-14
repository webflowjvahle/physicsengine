// Matter.js
function matterjs() {
  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector(".c-matter-js-canvas");

    let elementWidth;
    let elementHeight;

    // module aliases
    let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    // create an engine
    let engine = Engine.create();

    // create a renderer
    let render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        background: "transparent",
        wireframes: false,
        width: elementWidth,
        height: elementHeight,
      },
    });

    function updateElementSize() {
      const element = document.querySelector(".c-matterjs");
      elementWidth = element.offsetWidth;
      elementHeight = element.offsetHeight;

      (Engine = Matter.Engine),
        (Render = Matter.Render),
        (Runner = Matter.Runner),
        (Bodies = Matter.Bodies),
        (Composite = Matter.Composite),
        (Mouse = Matter.Mouse),
        (MouseConstraint = Matter.MouseConstraint);

      // create an engine
      engine = Engine.create();

      // create a renderer
      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          background: "transparent",
          wireframes: false,
          width: elementWidth,
          height: elementHeight,
        },
      });

      const createObject = () => {
        // Calculate the scale factor based on the element width and height
        const scale = Math.min(elementWidth / 20, elementHeight / 20);

        // Generate a random x position between 0 and 800, rounded down to the nearest whole number
        let x = Math.floor(Math.random() * elementWidth);
        let emoticon = Bodies.circle(x, 0, scale, {
          render: {
            sprite: {
              texture:
                "https://uploads-ssl.webflow.com/63a2d168efde7ef4089d65ad/63a5d788308826bc7d16c760_emoticon.svg",
            },
          },
        });

        if (elementWidth <= 767) {
          emoticon.render.sprite.xScale = 0.6; // Double the width of the texture
          emoticon.render.sprite.yScale = 0.6; // Double the height of the texture
        }
        Composite.add(engine.world, emoticon);
      };

      for (let i = 0; i < 18; i++) {
        createObject();
      }
      const createObjectred = () => {
        // Calculate the scale factor based on the element width and height
        const scale = Math.min(elementWidth / 20, elementHeight / 20);
        // Generate a random x position between 0 and 800, rounded down to the nearest whole number
        let x = Math.floor(Math.random() * elementWidth);
        let emoticonred = Bodies.circle(x, 0, scale, {
          render: {
            sprite: {
              texture:
                "https://uploads-ssl.webflow.com/63a2d168efde7ef4089d65ad/63a2d168efde7eefab9d65c4_emoticonred.svg",
            },
          },
        });

        if (elementWidth <= 767) {
          emoticonred.render.sprite.xScale = 0.6; // Double the width of the texture
          emoticonred.render.sprite.yScale = 0.6; // Double the height of the texture
        }

        Composite.add(engine.world, emoticonred);
      };
      createObjectred();

      // create walls
      let wallTop = Bodies.rectangle(elementWidth / 2, 0, elementWidth, 1, {
        isStatic: true,
        render: {
          fillStyle: "#f8f8f8",
          strokeStyle: "#333333",
        },
      });
      let wallRight = Bodies.rectangle(
        elementWidth / 2,
        elementHeight,
        elementWidth,
        1,
        {
          isStatic: true,
          render: {
            fillStyle: "#f8f8f8",
            strokeStyle: "#333333",
          },
        }
      );
      let wallBottom = Bodies.rectangle(
        elementWidth,
        elementHeight / 2,
        1,
        elementHeight,
        {
          isStatic: true,
          render: {
            fillStyle: "#f8f8f8",
            strokeStyle: "#333333",
          },
        }
      );
      let wallLeft = Bodies.rectangle(0, elementHeight / 2, 1, elementHeight, {
        isStatic: true,
        render: {
          fillStyle: "#f8f8f8",
          strokeStyle: "#333333",
        },
      });

      // add walls to the engine's world
      Composite.add(engine.world, [wallTop, wallRight, wallBottom, wallLeft]);

      // run the renderer
      Render.run(render);

      // create runner
      const runner = Runner.create();

      // run the engine
      Runner.run(runner, engine);

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      Composite.add(engine.world, mouseConstraint);
    }

    updateElementSize(); // Update the element size when the page loads

    window.addEventListener("resize", updateElementSize); // Update the element size when the window is resized
  });
}
