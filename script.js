import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./Dino.js";
import { updateCactus, setupCactus, getCactusReact } from "./cactus.js";
let world = document.querySelector('.world')
let scoreElm = document.querySelector('.score')
let startScreen = document.querySelector('.gm-start')
const worldWidth = 100
const worldHeight = 30
const speedScaleInc = 0.00005

setPixelToWorld()

window.addEventListener('resize', setPixelToWorld)
window.addEventListener('keyup', handleStart, { once: true })


let lastTime
let speedScale
let score
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime;
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) {
    return handleLose();
  }
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  lastTime = time
  window.requestAnimationFrame(update);
}

function handleLose() {
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreen.classList.remove("hide")
  }, 100)
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusReact().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  return rect1.left < rect2.right && rect1.top < rect2.bottom &&
    rect1.right > rect2.left && rect1.bottom > rect2.top
}

function updateSpeedScale(delta) {
  speedScale += delta * speedScaleInc
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElm.textContent = Math.floor(score)
}
//makes the loop stop before starting the game
function handleStart() {
  lastTime = null;
  speedScale = 1
  score = 0
  startScreen.classList.add('hide')
  setupGround()
  setupDino()
  setupCactus()
  window.requestAnimationFrame(update)
}


function setPixelToWorld() {
  let worldtoPixelScale
  if ((window.innerWidth / window.innerHeight) < (worldWidth / worldHeight)) {
    worldtoPixelScale = window.innerWidth / worldWidth;
  }
  else {
    worldtoPixelScale = window.innerHeight / worldHeight;
  }

  world.style.width = `${worldWidth * worldtoPixelScale}px`
  world.style.height = `${worldHeight * worldtoPixelScale}px`
}

