let irises = document.querySelectorAll(".iris");
let main = document.querySelector(".eyes");
let shades = document.querySelectorAll(".eyes.rin .eye .cornea");
let eye = document.querySelector(".cornea");
let screen = document.querySelector("body");
let posBtns = document.querySelectorAll("#pos-controls button");
let styleBtns = document.querySelectorAll("#feats .styles button");
let colorBtns = document.querySelectorAll("#feats .colors button");
let followMouse = document.querySelector("#follow-mouse");
let root = document.querySelector(":root");
screen.addEventListener("mousemove", eyeControl);
function eyeControl() {
  irises.forEach((iris) => {
    let irisPos = {
      x: iris.clientLeft + iris.clientWidth / 2,
      y: iris.clientTop + iris.clientHeight / 2,
      rotX: 0,
      rotY: 0,
    };
    let mousePos = {
      y: Math.floor(
        ((event.pageY - screen.clientTop + 100) / screen.clientHeight) * 100
      ),
      x: Math.floor(
        ((event.pageX - screen.clientLeft - 10) / screen.clientWidth) * 100
      ),
    };
    mousePos.y = mousePos.y > 85 ? 85 : mousePos.y;
    mousePos.y = mousePos.y < 10 ? 10 : mousePos.y;
    irisPos.rotY = (mousePos.x * 70) / 100 - 35;
    irisPos.rotX = (mousePos.y * 70) / 100 - 35;

    iris.style.setProperty("--mouse-pos-x", `${mousePos.x - 90}%`);
    iris.style.setProperty("--mouse-pos-y", `${mousePos.y - 90}%`);
    iris.style.setProperty("--iris-rot-y", `${irisPos.rotY}deg`);
    iris.style.setProperty("--iris-rot-x", `${-irisPos.rotX}deg`);
  });
}

//screen.removeEventListener("mousemove", eyeControl);

posBtns.forEach((posBtn) => {
  posBtn.addEventListener("click", () => {
    let pos = event.target.getAttribute("data-value");
    irises.forEach((iris) => {
      iris.classList.remove("tl", "t", "tr", "l", "c", "r", "bl", "b", "br");
      iris.classList.add(pos);
    });
  });
});

styleBtns.forEach((styleBtn) => {
  styleBtn.addEventListener("click", () => {
    let style = event.target.getAttribute("data-value");
    irises.forEach((iris) => {
      iris.classList.remove("custom-color");
    });
    main.classList.remove("sage", "rin", "beast");
    main.classList.add(style);
  });
});

colorBtns.forEach((colorBtn) => {
  colorBtn.addEventListener("click", () => {
    let color = event.target.getAttribute("data-value");
    irises.forEach((iris) => {
      iris.classList.add("custom-color");
      iris.style.setProperty("--iris-custom-color", `var(--iris-${color})`);
    });
  });
});

followMouse.addEventListener("click", () => {
  irises.forEach((iris) => {
    iris.classList.remove("tl", "t", "tr", "l", "c", "r", "bl", "b", "br");
    iris.classList.toggle("mouse");
  });
});
