'use strict'
import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
const imgView = document.getElementById('img-view')
const viewType = document.querySelector('.view-type')
const imageName = document.querySelector('.imageName')
console.log(imageName.innerHTML)

const imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1583261742/ca-valdahon/valdahon-axo-01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583261711/ca-valdahon/valdahon-axo-02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583261712/ca-valdahon/valdahon-axo-03.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583256612/ca-valdahon/cafc-Valdhon-02_View01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583257239/ca-valdahon/cafc-Valdhon-02_View02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583257643/ca-valdahon/cafc-Valdhon-02_View04.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583256617/ca-valdahon/cafc-Valdhon-02_View05.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583257068/ca-valdahon/cafc-Valdhon-02_View06.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1583263143/ca-valdahon/cafc-Valdhon-02_View07.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1589552174/ca-valdahon/salon-reception.jpg'
]
const imgName= [
  'Axo R.D.C 1',
  'Axo R.D.C 2',
  'Axo étage',
  'Espace libre service bancaire',
  'Espace attente / carré',
  'Espace collaborateurs R.D.C',
  'Attente étage',
  'Circulation étage',
  'Espace collaborateurs étage',
  'Salon de réception',
]

let num = 0

const btnPrev = document.getElementById('btnPrev').addEventListener('click', () => prev())
const btnNext = document.getElementById('btnNext').addEventListener('click', () => next())

var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(   
    'Camera',
   9,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  )

  camera.attachControl(canvas, true)
  camera.inputs.attached.mousewheel.detachControl(canvas)
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    imgs[num],
    {
      resolution: 32,
      size: 15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

const check = () => {
  num <= 2 ?( () => {
    canvas.classList.add('hide');
    imgBox.classList.remove('hide');
    viewType.classList.add('hide')
  })()
    :( () => {
      canvas.classList.remove('hide')
      viewType.classList.remove('hide')
      imgBox.classList.add('hide')
    })()
  // scene.render()
  num <= 2 ? imgView.src = imgs[num] : null
  //num === 8 ? imgView.src = imgs[8] : null
  //num === 9 ? imgView.src = imgs[9] : null
}

check()

const next = () => {
  num < imgs.length - 1 ?
    num++
    : num = 0
  scene = createScene()
  check()
}

const prev = () => {
  //event.preventDefault()
  num === 0 ?
    num = imgs.length - 1
    : num--
  scene = createScene()
  check()
}

engine.runRenderLoop(function () {
    imageName.innerHTML = imgName[num]
  scene.render()
})

if(num!==0){
window.addEventListener('resize', function () {
  engine.resize()  
})
}
