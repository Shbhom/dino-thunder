import { increamentCustomProperty, setCustomProperty, getCustomProperty } from "./updateprop.js";

const speed = 0.05
const cactusIntervalMin = 500
const cactusIntervalMax = 2000
const world = document.querySelector('.world')

let nextCactusTime
export function setupCactus() {
  nextCactusTime = cactusIntervalMin
  document.querySelectorAll(".cactus").forEach(cactus => {
    cactus.remove()
  })

}

export function updateCactus(delta, speedScale) {
  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime = randomNumberBetween(cactusIntervalMin, cactusIntervalMax) / speedScale
  }
  nextCactusTime -= delta
  document.querySelectorAll(".cactus").forEach(cactus => {
    increamentCustomProperty(cactus, '--left', delta * speedScale * speed * -1)
    if (getCustomProperty(cactus, '--left') <= -100) {
      cactus.remove()
    }
  })
}

export function getCactusReact() {
  return [...document.querySelectorAll(".cactus")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

function createCactus() {
  const cactus = document.createElement('img')
  cactus.src = 'imgs/cactus.png'
  cactus.classList.add('cactus')
  setCustomProperty(cactus, '--left', 100)
  world.append(cactus)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

