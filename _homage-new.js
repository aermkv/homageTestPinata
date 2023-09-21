const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charLength = chars.length;

function makeHash(length) {
  let hash = '0x';
  let counter = 0;
  while (counter < length) {
    hash += chars.charAt(Math.floor(Math.random() * charLength));
    counter += 1;
  }
  return hash;
}

const hash = makeHash(64)

const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(hash.slice(2 + (j * 2), 4 + (j * 2)));
}
const decPairs = hashPairs.map(x => {
  return parseInt(x, 16);
});

S=Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);

const seed = parseInt(hash.slice(2,16), 16);

let rnd_callCount = 0

function rnd(min, max) {
  const rand = R();
  if (typeof min === 'undefined') {
    return rand;
  } else if (typeof max === 'undefined') {
    if (min instanceof Array) {
      return min[floor(rand * min.length)];
    } else {
      return rand * min;
    }
  } else {
    if (min > max) {
      const tmp = min;
      min = max;
      max = tmp;
    }
    rnd_callCount += 1;
    return rand * (max - min) + min;
  }
}

let newThemes = {
  rococo: 'rococo',
  allWhite: 'allWhite',
  digital: 'digital',
  countryGarden: 'countryGarden',
  neon: 'neon',
  graphic: 'graphic'
}

function w(val) {if (val == null) return width;return width * val;}
function h(val) {if (val == null) return height;return height * val;}


const themes = {
  rococo: {
    name: 'rococo',
    bgColors: {
      bgCol1: [200,222,252],
      bgCol2: [252,195,203],
      bgCol2: [255,255,212],
      bgCol4: [245,227,130]
    },
    flowers_B: {
      fileLocation: '/_rococo/flowers_B',
      num: 9,
      maxNum: 32
    },
    flowers_F: {
      fileLocation: '/_rococo/flowers_F',
      num: 20,
      maxNum: 60
    },
    flowers: {
      fileLocation: '/_rococo/flowers',
      num: 10,
      maxNum: 12
    },
    bigFlowers: {
      fileLocation: '/_rococo/bigFlowers',
      num: 1,
      maxNum: 9
    },
    paint: {
      fileLocation: '/_rococo/paint',
      num: 6,
      maxNum: 14
    },
    paintLG: {
      fileLocation: '/_rococo/paintLG',
      num: 4,
      maxNum: 9
    },
    texture: {
      fileLocation: '/_rococo/textures',
      num: 4,
      maxNum: 14
    },
    fullTexture: {
      fileLocation: '/_rococo/fullTextures',
      maxNum: 36
    },
    floor: {
      fileLocation: '/_rococo/floors',
      num: 1,
      maxNum: 12
    },
    angTexL: {
      fileLocation: '/_rococo/angTextures/_L',
      maxNum: 3
    },
    angTexR: {
      fileLocation: '/_rococo/angTextures/_R',
      maxNum: 3
    },
    vase: {
      fileLocation: '/_rococo/vases',
      num: 1,
      maxNum: 13
    },
    vaseFlowersB: {
      fileLocation: '/_rococo/vaseFlowers/_B',
      num: 1,
      maxNum: 10
    },
    vaseFlowersF: {
      fileLocation: '/_rococo/vaseFlowers/_F',
      num: 2,
      maxNum: 14
    },
    colors: {
      a: [200,222,252],
      b: [251,234,236],
      c: [254,255,235],
      d: [245,227,130]
    }
  },

  countryGarden: {
    name: 'countryGarden',
    bgColors: {
      bgCol1: [242,231,227],
      bgCol2: [224,203,166],
      bgCol2: [138,133,105],
      bgCol4: [187,180,193]
    },
    flowers_B: {
      fileLocation: '/_countryGarden/flowers_B',
      num: 9,
      maxNum: 50
    },
    flowers_F: {
      fileLocation: '/_countryGarden/flowers_F',
      num: 20,
      maxNum: 48
    },
    bigFlowers: {
      fileLocation: '/_countryGarden/bigFlowers',
      num: 1,
      maxNum: 4
    },
    paint: {
      fileLocation: '/_countryGarden/paint',
      num: 10,
      maxNum: 34
    },
    paintLG: {
      fileLocation: '/_countryGarden/paintLG',
      num: 5,
      maxNum: 12
    },
    texture: {
      fileLocation: '/_countryGarden/textures',
      num: 6,
      maxNum: 15
    },
    fullTexture: {
      fileLocation: '/_countryGarden/fullTextures',
      maxNum: 12
    },
    floor: {
      fileLocation: '/_countryGarden/floors',
      num: 1,
      maxNum: 5
    },
    vase: {
      fileLocation: '/_countryGarden/vases',
      num: 1,
      maxNum: 13
    },
    vaseFlowersB: {
      fileLocation: '/_countryGarden/vaseFlowers/_B',
      num: 1,
      maxNum: 7
    },
    vaseFlowersF: {
      fileLocation: '/_countryGarden/vaseFlowers/_F',
      num: 2,
      maxNum: 7
    },
    colors: {
      a: [85,113,131],
      b: [164,205,163],
      c: [216,180,227],
      d: [225,227,180]
    }
  },

  digital: {
    name: 'digital',
    bgColors: {
      bgCol1: [227,48,35],
      bgCol2: [0,32,237],
      bgCol2: [113,241,74],
      bgCol4: [0,0,0],
      bgCol5: [255,255,0]
    },
    flowers: {
      fileLocation: '/_digital/flowers',
      num: 8,
      maxNum: 42
    },
    bigFlowers: {
      fileLocation: '/_digital/bigFlowers',
      num: 1,
      maxNum: 7
    },
    paint: {
      fileLocation: '/_digital/paint',
      num: 12,
      maxNum: 18
    },
    paintLG: {
      fileLocation: '/_digital/paintLG',
      num: 6,
      maxNum: 17
    },
    texture: {
      fileLocation: '/_digital/textures',
      num: 4,
      maxNum: 17
    },
    fullTexture: {
      fileLocation: '/_digital/fullTextures',
      maxNum: 21
    },
    ovTexture: {
      fileLocation: '/_digital/overlayTextures',
      maxNum: 3
    },
    floor: {
      fileLocation: '/_digital/floors',
      num: 1,
      maxNum: 6
    },
    vase: {
      fileLocation: '/_digital/vases',
      num: 1,
      maxNum: 6
    },
    vaseFlowersB: {
      fileLocation: '/_digital/vaseFlowers/_B',
      num: 1,
      maxNum: 5
    },
    vaseFlowersF: {
      fileLocation: '/_digital/vaseFlowers/_F',
      num: 2,
      maxNum: 7
    },
    colors: {
      a: [80,59,128],
      b: [149,63,110],
      c: [219,80,119],
      d: [242,167,107]
    }
  },

  cmyk: {
    name: 'cmyk',
    bgColors: {
      bgCol1: [153,153,152],
      bgCol2: [237,237,237],
      bgCol2: [203,244,241],
      bgCol4: [12,68,62]
    },
    flowers: {
      fileLocation: '/_cmyk/flowers',
      num: 10,
      maxNum: 36
    },
    bigFlowers: {
      fileLocation: '/_cmyk/bigFlowers',
      num: 1,
      maxNum: 7
    },
    paint: {
      fileLocation: '/_cmyk/paint',
      num: 12,
      maxNum: 51
    },
    paint2: {
      fileLocation: '/_cmyk/paint',
      num: 12,
      maxNum: 44
    },
    paintLG: {
      fileLocation: '/_cmyk/paintLG',
      num: 6,
      maxNum: 32
    },
    texture: {
      fileLocation: '/_cmyk/textures',
      num: 4,
      maxNum: 17
    },
    fullTexture: {
      fileLocation: '/_cmyk/fullTextures',
      maxNum: 22
    },
    floor: {
      fileLocation: '/_cmyk/floors',
      num: 1,
      maxNum: 3
    },
    vase: {
      fileLocation: '/_cmyk/vases',
      num: 1,
      maxNum: 5
    },
    // vaseFlowers: {
    //   fileLocation: '/_cmyk/vaseFlowers',
    //   num: 1,
    //   maxNum: 2
    // },
    vaseFlowersB: {
      fileLocation: '/_cmyk/vaseFlowers/_B',
      num: 1,
      maxNum: 7
    },
    vaseFlowersF: {
      fileLocation: '/_cmyk/vaseFlowers/_F',
      num: 2,
      maxNum: 9
    },
    colors: {
      a: [62,146,205],
      b: [187,41,106],
      c: [254,239,82],
      d: [0,0,0]
    }
  },

  allWhite: {
    name: 'allWhite',
    bgColors: {
      bgCol1: [255,255,255]
    },
    flowers: {
      fileLocation: '/_allWhite/flowers',
      num: 20,
      maxNum: 38
    },
    bigFlowers: {
      fileLocation: '/_allWhite/bigFlowers',
      num: 1,
      maxNum: 10
    },
    paint: {
      fileLocation: '/_allWhite/paint',
      num: 11,
      maxNum: 14
    },
    paintLG: {
      fileLocation: '/_allWhite/paintLG',
      num: 6,
      maxNum: 19
    },
    texture: {
      fileLocation: '/_allWhite/textures',
      num: 4,
      maxNum: 10
    },
    fullTexture: {
      fileLocation: '/_allWhite/fullTextures',
      maxNum: 13
    },
    floor: {
      fileLocation: '/_allWhite/floors',
      num: 1,
      maxNum: 5
    },
    vase: {
      fileLocation: '/_allWhite/vases',
      num: 1,
      maxNum: 8
    },
    // vaseFlowers: {
    //   fileLocation: '/_allWhite/vaseFlowers',
    //   num: 1,
    //   maxNum: 2
    // },
    vaseFlowersB: {
      fileLocation: '/_allWhite/vaseFlowers/_B',
      num: 1,
      maxNum: 4
    },
    vaseFlowersF: {
      fileLocation: '/_allWhite/vaseFlowers/_F',
      num: 2,
      maxNum: 10
    },
    colors: {
      a: [255,255,255],
      b: [235,215,215],
      c: [215,215,235]
    }
  },

  graphic: {
    name: 'graphic',
    bgColors: {
      bgCol1: [255,255,255]
    },
    flowers: {
      fileLocation: '/_graphic/flowers',
      num: 10,
      maxNum: 31
    },
    bigFlowers: {
      fileLocation: '/_graphic/bigFlowers',
      num: 1,
      maxNum: 6
    },
    paint: {
      fileLocation: '/_graphic/paint',
      num: 9,
      maxNum: 60
    },
    paintLG: {
      fileLocation: '/_graphic/paintLG',
      num: 3,
      maxNum: 33
    },
    texture: {
      fileLocation: '/_graphic/textures',
      num: 2,
      maxNum: 14
    },
    fullTexture: {
      fileLocation: '/_graphic/fullTextures',
      maxNum: 19
    },
    floor: {
      fileLocation: '/_graphic/floors',
      num: 1,
      maxNum: 5
    },
    vase: {
      fileLocation: '/_graphic/vases',
      num: 1,
      maxNum: 12
    },
    // vaseFlowers: {
    //   fileLocation: '/_graphic/vaseFlowers',
    //   num: 1,
    //   maxNum: 4
    // },
    vaseFlowersB: {
      fileLocation: '/_graphic/vaseFlowers/_B',
      num: 1,
      maxNum: 9
    },
    vaseFlowersF: {
      fileLocation: '/_graphic/vaseFlowers/_F',
      num: 2,
      maxNum: 8
    },
    colors: {
      a: [114,168,177],
      b: [233,214,192],
      c: [236,151,122],
      d: [86,84,81]
    }
  }
}

const comps = {
  standard: {
    name: 'standard',
    minD: 4.4,
    maxD: 6.2,
    texture: {
      minY: -.35,
      maxY: .45
    },
    paintLG: {
      minY: -.45,
      maxY: .45
    },
    paint: {
      minY: -.4,
      maxY: .48
    },
    flowers: {
      minY: -.1,
      maxY: .53
    },
    flowers_B: {
      minY: -.1,
      maxY: .53
    },
    flowers_F: {
      minY: .1,
      maxY: .53
    }
  },
  stillLife: {
    name: 'stillLife',
    minD: 4,
    maxD: 6,
    texture: {
      minY: -.2,
      maxY: .32
    },
    paintLG: {
      minY: -.4,
      maxY: .3
    },
    paint: {
      minY: -.45,
      maxY: .3
    },
    flowers: {
      minY: .2,
      maxY: .48
    },
    flowers_B: {
      minY: .1,
      maxY: .48
    },
    flowers_F: {
      minY: .2,
      maxY: .48
    },
    vase: {

    }
  },
  highVolume: {
    name: 'highVolume',
    minD: 2.7,
    maxD: 4.7,
    texture: {
      minY: -.45,
      maxY: .45
    },
    paintLG: {
      minY: -.45,
      maxY: .45
    },
    paint: {
      minY: -.48,
      maxY: .48
    },
    flowers: {
      minY: -.48,
      maxY: .48
    },
    flowers_B: {
      minY: -.48,
      maxY: .48
    },
    flowers_F: {
      minY: -.48,
      maxY: .48
    },
  },
  dominant: {
    name: 'dominant',
    minD: 3,
    maxD: 5,
    texture: {
      minY: -.5,
      maxY: .5
    },
    paintLG: {
      minY: -.5,
      maxY: .5
    },
    paint: {
      minY: -.5,
      maxY: .5
    },
    flowers: {
      minY: -.5,
      maxY: .5
    },
    flowers_B: {
      minY: -.5,
      maxY: .5
    },
    flowers_F: {
      minY: -.5,
      maxY: .5
    },
    bigFlowerPosOptions: {
      // pos1: [-.4,-.2],
      // pos2: [.4,-.2],
      pos3: [.35,.3],
      pos4: [-.35,.3]
    }
  },
  lowDensity: {
    name: 'lowDensity',
    minD: 5,
    maxD: 7,
    texture: {
      minY: -.5,
      maxY: .45
    },
    paintLG: {
      minY: -.5,
      maxY: .45
    },
    paint: {
      minY: -.5,
      maxY: .47
    },
    flowers: {
      minY: -.5,
      maxY: .5
    },
    flowers_B: {
      minY: -.5,
      maxY: .5
    },
    flowers_F: {
      minY: -.5,
      maxY: .5
    },
    bigFlowerPosOptions: {
      pos1: [-.35,-.3],
      pos2: [.35,-.3],
      // pos3: [.4,.2],
      // pos4: [-.4,.2]
    }
  }
}


let smD;
let aspRatio;
let comp;
let theme;
let socials;
let butterflies;
let overTops;
let hasBlackRose;
let overlay;
let angTex;
let ovTex;

let graphics;

let orderedDraw = [];
let drawNum = 0;


// let bgElements = [];
// let bgElementIds = [];
// let paintElements = [];
// let paintElementIds = [];
// let flowerElements = [];
// let flowerElementIds = [];
// let butterflyElements = [];
// let butterflyElementIds = [];
// let largeElements = [];
// let largeElementIds = [];
// let symbolElements = [];
// let symbolElementIds = [];
// let textureElements = [];
// let textureElementIds = [];
// let elementScale;

let fullTextureAssets = [];
let fullTextureAssetIds = [];

let flowerAssets = [];
let flowerAssets2 = [];
let flowerAssetIds = [];

let flower_B_Assets = [];
let flower_B_Assets2 = [];
let flower_B_AssetIds = [];

let flower_F_Assets = [];
let flower_F_Assets2 = [];
let flower_F_AssetIds = [];

let paintAssets = [];
let paintAssets2 = [];
let paintAssetIds = [];

let paintLGAssets = [];
let paintLGAssets2 = [];
let paintLGAssetIds = [];

let textureAssets = [];
let textureAssets2 = [];
let textureAssetIds = [];

let vaseAssets = [];
let vaseAssets2 = [];
let vaseAssetIds = [];

let vaseFlowerAssets = [];
let vaseFlowerAssetIds = [];

let vaseFlowerAssetsB = [];
let vaseFlowerAssetsB2 = [];
let vaseFlowerAssetBIds = [];

let vaseFlowerAssetsF = [];
let vaseFlowerAssetsF2 = [];
let vaseFlowerAssetFIds = [];

let socialAssets = [];
let socialAssets2 = [];
let socialAssetIds = [];

let butterflyAssets = [];
let butterflyAssets2 = [];
let butterflyAssetIds = [];

let overTopAssets = [];
let overTopAssets2 = [];
let overTopAssetIds = [];

let floorAssets = [];
let floorAssets2 = [];
let floorAssetIds = [];

let angTextureLAssets = [];
let angTextureLAssets2 = [];
let angTextureLAssetIds = [];

let angTextureRAssets = [];
let angTextureRAssets2 = [];
let angTextureRAssetIds = [];

let ovTextureAssets = [];
let ovTextureAssets2 = [];
let ovTextureAssetIds = [];

let bigFlowerAssets = [];
let bigFlowerAssets2 = [];
let bigFlowerAssetIds = [];

let overlayAssets = [];
let overlayAssetIds = [];

let blackRoseAssets = [];
let blackRoseAssets2 = [];
let blackRoseAssetIds = [];

let petalAssets = [];
let petalAssets2 = [];
let petalAssetIds = [];

let frameAssets = [];
let frameAssets2 = [];
let frameAssetIds = [];

let domX, domY;

let dynamic;

let particlesWater = [];
let bgNumRows;

let dotsAngle = 0;

let irregCircs = [];
let zoff = 0;

const slices = 75;
let blobSize;
let randomWeights = [];

let blobCol1, blobCol2;
let blobCols = [];

function preload() {

  comp = chooseComp()
  //comp = comps.stillLife;
  theme = chooseTheme()
  //theme = themes.countryGarden;

  overlay = rnd()

  if (comp.name === 'stillLife') {
    if (theme.name === 'rococo') {
      angTex = rnd()
    }else{
      angTex = 1
    }
    stillLifeLoad(comp,theme,angTex,ovTex)
  }else{
    if (theme.name === 'digital') {
      ovTex = rnd()
    }else{
      ovTex = 1
    }
    console.log(ovTex)
    standardLoad(comp,theme,ovTex,overlay)
  }
  // socials = rnd()
  socials = map(decPairs[3],0,255,0,1);
  if (socials < .5) {
    numSocials = 0
  }else if (socials < .85) {
    numSocials = 5
  }else{
    numSocials = 12
  }
  socialsLoad(numSocials)

  //butterflies = rnd()
  butterflies = map(decPairs[4],0,255,0,1);
  if (butterflies < .7) {
    numButts = 0
  }else if (socials < .94) {
    numButts = 5
  }else{
    numButts = 12
  }
  butterfliesLoad(numButts)

  //overTops = rnd()
  overTops = map(decPairs[5],0,255,0,1);
  if (overTops < .5) {
    numOverTop = 0
  }else if (overTops < .85) {
    numOverTop = 3
  }else{
    numOverTop = 6
  }
  overTopLoad(numOverTop)

  hasBlackRose = map(decPairs[6],0,255,0,1);
  if (hasBlackRose < .03) {
    console.log('has black rose')
    blackRoseLoad()
  }

  console.log(comp.name + '  ////  ' + theme.name + '  ////  ' + numSocials + '  ////  ' + numOverTop + '  ////  ' + numButts)
}

function setup() {
  noiseSeed(seed)
  pixelDensity(4)
  // smD = windowWidth < windowHeight ? windowWidth : windowHeight;
  // console.log('window width: ' + windowWidth,'window height: ' + windowHeight,'smD: ' + smD)
  // aspRatio = 16/9;
  // createCanvas(smD/2, smD*aspRatio/2);
  // console.log(smD, width)

  aspRatio = 16/9;
	smD = (windowWidth * aspRatio) < windowHeight ? windowWidth : windowHeight / aspRatio ; 

	createCanvas(smD, smD*aspRatio);

  //graphics = createGraphics(smD/2, smD*aspRatio/2);
  translate(width/2,height/2)
  //graphics.translate(width/2,height/2);

  //let bgCol = [rnd(255), rnd(255), rnd(255)]
  let bgCol = chooseObjKey(theme.bgColors)
  background(bgCol)
  //background(255)

  imageMode(CENTER);

  if (comp.name === 'stillLife') {
    stillLife(comp,theme,angTex,hasBlackRose)
  }else{
    standard(comp,theme,ovTex,hasBlackRose)
  }

  //let dynamics = [drawCircles,dots_texture,water,expansion]
  //dynamic = dynamics[floor(rnd()*dynamics.length)]
  //dynamic = chooseDynamic()
  //let waterTypes = ['outward','mistral','rain']
  //let waterType = waterTypes[floor(rnd()*waterTypes.length)]
  //let waterType = 'mistral'

  // let waterType = chooseWaterType()
  // dynamic = water

  if (dynamic == drawCircles) {
    setCircles(theme)
  }
  if (dynamic == water) {
    setWater(waterType,theme)
  }
  if (dynamic == expansion) {
    setIrregCircles()
  }
  if (dynamic == shards) {
    setFractals(theme)
  }

  //image(graphics,0,0)

  //standard(comp,theme)
  //stillLife(comp,theme)
  push()
  // noStroke()
  // if (theme.name === 'rococo') {
  //   rectAl = 77;
  //   rectBMode = MULTIPLY
  // }else if (theme.name === 'digital') {
  //   rectAl = 77;
  //   rectBMode = OVERLAY
  // }else if (theme.name === 'countryGarden') {
  //   rectAl = 55;
  //   rectBMode = SOFT_LIGHT
  // }else if (theme.name === 'cmyk') {
  //   rectAl = 33;
  //   rectBMode = HARD_LIGHT
  // }
  // if (theme.name !== 'allWhite' && theme.name !== 'graphic') {
  //   let rectCol = color(bgCol[0],bgCol[1],bgCol[2],rectAl)
  //   fill(rectCol)
  //   blendMode(rectBMode)
  //   rectMode(CENTER)
  //   rect(0,0,width,height)
  // }
  pop()

  //translate(width/2,height/2)
  if (comp.name !== 'stillLife'){
    //standardLayer1()
    standardDraw1()

    //drawCircles()
    //dots_texture()
    //dynamic(theme)

    //standardLayer2()
    standardDraw2()
  }else{
    //stillLifeLayer1()
    stillLifeDraw1()


    //drawCircles()
    //dots_texture()
    //dynamic()
    //stillLifeLayer2()
    stillLifeDraw2()

  }

  console.log(orderedDraw)
}

function draw() {
  //image(graphics,width/2,height/2)
  // //standardUpdate()
        // translate(width/2,height/2)
        // if (comp.name !== 'stillLife'){
        //   standardLayer1()
        //   //drawCircles()
        //   //dots_texture()
        //   //dynamic(theme)
        //   standardLayer2()
        // }else{
        //   stillLifeLayer1()
        //   //drawCircles()
        //   //dots_texture()
        //   //dynamic()
        //   stillLifeLayer2()
        // }
//console.log(frameRate())
//console.log(particlesWater.length)

drawItIn()
// console.log(rnd_callCount)
}

function loadRandomAssets(num,maxNum,baseArray,fileLoc,fileNameConvention,type,idArray) {
  let array = Array.from(new Array(maxNum-1), (x,i) => i)
  //console.log(fileNameConvention, array)
  for (let i = 0; i < num; i++) {
    let index = floor(rnd(array.length))
    let assetId = array[index]
    array.splice(index,1)
    //console.log(fileLoc,index,assetId)
    baseArray.push(new LoadAsset(fileLoc,fileNameConvention,assetId+1,type,idArray))
    baseArray[i].load()
  }
  // console.log(baseArray)
}

function standardLoad(comp,theme,ovTex) {
  //BG TEXTURE OVERLAY
  // let maxFullTextureId = theme.fullTexture.maxNum;
  // //let fullTextureId = floor(rnd(1,maxFullTextureId))
  // let fullTextureId = floor(map(decPairs[21],0,255,1,maxFullTextureId-.1));
  // console.log(maxFullTextureId,fullTextureId)
  // //fullTextureAssets.push(new LoadAsset(theme.fullTexture.fileLocation,'fT_',fullTextureId,'none',fullTextureAssetIds)) 
  // fullTextureAssets.push(new LoadAsset(comp.bgFileLocation+'/'+theme.name,'fT_',fullTextureId,'none',fullTextureAssetIds))
  // fullTextureAssets[0].load()

  // let maxFullTextureId = 3;
  // let fullTextureId = floor(map(decPairs[21],0,255,1,maxFullTextureId-.1));
  // fullTextureAssets.push(new LoadAsset('_' + theme.name + '/' + 'lowD_fT','lowD_fT_',fullTextureId,'none',fullTextureAssetIds))
  // fullTextureAssets[0].load()

  if (comp.name === 'lowDensity') {
    // let maxFullTextureId = 3;
    // let fullTextureId = floor(map(decPairs[21],0,255,1,maxFullTextureId-.1));
    fullTextureAssets.push(new LoadAsset('_' + theme.name + '/' + 'lowD_fT','lowD_fT_',1,'none',fullTextureAssetIds))
    fullTextureAssets[0].load()
  }else{
    let maxFullTextureId = theme.fullTexture.maxNum;
    let fullTextureId = floor(map(decPairs[21],0,255,1,maxFullTextureId-.1));
    console.log(maxFullTextureId,fullTextureId)
    //fullTextureAssets.push(new LoadAsset(comp.bgFileLocation+'/'+theme.name,'fT_',fullTextureId,'none',fullTextureAssetIds))
    fullTextureAssets.push(new LoadAsset(theme.fullTexture.fileLocation,'fT_',fullTextureId,'none',fullTextureAssetIds))
    fullTextureAssets[0].load()
  }


  // textures
  let numTextures = theme.texture.num
  if (theme.name === 'graphic' && (comp.name === 'standard' || comp.name === 'highVolume')) {
    numTextures = theme.texture.num + 1
  }
  loadRandomAssets(numTextures, theme.texture.maxNum, textureAssets, theme.texture.fileLocation, 'texture_', 'none', textureAssetIds)

  // paint LG
  let numPaintLG = theme.paintLG.num
  if (theme.name === 'graphic' && (comp.name === 'standard' || comp.name === 'highVolume')) {
    numPaintLG = theme.paintLG.num + 1
  }
  loadRandomAssets(numPaintLG, theme.paintLG.maxNum, paintLGAssets, theme.paintLG.fileLocation, 'paintLG_', 'none', paintLGAssetIds)

  // paint
  let numPaint = theme.paint.num
  if (theme.name === 'graphic' && (comp.name === 'standard' || comp.name === 'highVolume')) {
    numPaint = theme.paint.num + 2
  }
  console.log(numPaint)
  loadRandomAssets(numPaint, theme.paint.maxNum, paintAssets, theme.paint.fileLocation, 'paint_', 'none', paintAssetIds)

  if (comp.name === 'lowDensity') {
    let maxFloorId = theme.floor.maxNum;
    let floorId = floor(rnd(1,maxFloorId))
    floorAssets.push(new LoadAsset(theme.floor.fileLocation+'/','floor_',floorId,'none',floorAssetIds))
    floorAssets[0].load()
  }

  if (theme.name === 'countryGarden' || theme.name === 'rococo') {
    // COUNTRY GARDEN / ROCOCO FLOWERS
    loadRandomAssets(theme.flowers_B.num, theme.flowers_B.maxNum, flower_B_Assets, theme.flowers_B.fileLocation, 'flower_', 'none', flower_B_AssetIds)
    loadRandomAssets(theme.flowers_F.num, theme.flowers_F.maxNum, flower_F_Assets, theme.flowers_F.fileLocation, 'flower_', 'none', flower_F_AssetIds)
  }else{
    let numFlowers = theme.flowers.num
    if (theme.name === 'graphic' && comp.name === 'standard') {
      numFlowers = theme.flowers.num + 3
    }
    loadRandomAssets(numFlowers, theme.flowers.maxNum, flowerAssets, theme.flowers.fileLocation, 'flower_', 'none', flowerAssetIds)
  }

  if (ovTex < .3) {
    let maxOvTextureId = theme.ovTexture.maxNum;
    let ovTextureId = floor(rnd(1,maxOvTextureId));
    ovTextureAssets.push(new LoadAsset(theme.ovTexture.fileLocation,'ovTex_',ovTextureId,'none',ovTextureAssetIds))
    ovTextureAssets[0].load();
  }

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    let maxBigFlowerId = theme.bigFlowers.maxNum
    let bigFlowerId = floor(rnd(1,maxBigFlowerId))
    bigFlowerAssets.push(new LoadAsset(theme.bigFlowers.fileLocation,'bF_',bigFlowerId,'none',bigFlowerAssetIds))
    bigFlowerAssets[0].load()
  }

  if (overlay < .5) {
    let maxOverlayId = 2
    let overlayId = floor(rnd(1,maxOverlayId))
    //fullTextureAssets.push(new LoadAsset(theme.fullTexture.fileLocation,'fT_',fullTextureId,'none',fullTextureAssetIds)) 
    overlayAssets.push(new LoadAsset('/_overlays'+'/','overlay_',overlayId,'none',overlayAssetIds))
    overlayAssets[0].load()
  }
}

function stillLifeLoad(comp,theme,angTex,ovTex) {
  let maxFullTextureId = theme.fullTexture.maxNum;
  //let fullTextureId = floor(rnd(1,maxFullTextureId))
  let fullTextureId = floor(map(decPairs[21],0,255,1,maxFullTextureId-.1));
  //fullTextureAssets.push(new LoadAsset(comp.bgFileLocation+'/'+theme.name,'fT_',fullTextureId,'none',fullTextureAssetIds))
  fullTextureAssets.push(new LoadAsset(theme.fullTexture.fileLocation,'fT_',fullTextureId,'none',fullTextureAssetIds))
  fullTextureAssets[0].load()

  if (theme.name === 'rococo') {
    //let bgType = rnd()
    if (angTex < .3) {
      let maxAngTextureId = theme.angTexL.maxNum;
      angTextureId = floor(rnd(1,maxAngTextureId))
      angTextureLAssets.push(new LoadAsset(theme.angTexL.fileLocation,'angT_L_',angTextureId,'none',angTextureLAssetIds))
      angTextureRAssets.push(new LoadAsset(theme.angTexR.fileLocation,'angT_R_',angTextureId,'none',angTextureRAssetIds))
      angTextureLAssets[0].load()
      angTextureRAssets[0].load()
    }
  }

  if (ovTex < .3) {
    let maxOvTextureId = theme.ovTexture.maxNum;
    let ovTextureId = floor(rnd(1,maxOvTextureId));
    ovTextureAssets.push(new LoadAsset(theme.ovTexture.fileLocation,'ovTex_',ovTextureId,'none',ovTextureAssetIds))
    ovTextureAssets[0].load();
  }

  // textures
  loadRandomAssets(theme.texture.num, theme.texture.maxNum, textureAssets, theme.texture.fileLocation, 'texture_', 'none', textureAssetIds)

  // paint LG
  loadRandomAssets(theme.paintLG.num, theme.paintLG.maxNum, paintLGAssets, theme.paintLG.fileLocation, 'paintLG_', 'none', paintLGAssetIds)
  console.log(paintLGAssetIds)

  // paint
  loadRandomAssets(theme.paint.num, theme.paint.maxNum, paintAssets, theme.paint.fileLocation, 'paint_', 'none', paintAssetIds)

  // frames
  // if (comp.name === 'stillLife' && theme.name === 'rococo') {
  //   let hasFrame = rnd()
  //   if (hasFrame < 1) {
  //     loadRandomAssets(1,4,frameAssets,'/frames','frame_','none',frameAssetIds)
  //   }
  // }

  // vase flowers back
  loadRandomAssets(2, theme.vaseFlowersB.maxNum, vaseFlowerAssetsB, theme.vaseFlowersB.fileLocation, 'vF_B_', 'none', vaseFlowerAssetBIds)

  let maxFloorId = theme.floor.maxNum;
  let floorId = floor(rnd(1,maxFloorId))
  floorAssets.push(new LoadAsset(theme.floor.fileLocation+'/','floor_',floorId,'none',floorAssetIds))
  floorAssets[0].load()

  let maxVaseId = theme.vase.maxNum;
  let vaseId = floor(rnd(1,maxVaseId))
  vaseAssets.push(new LoadAsset(theme.vase.fileLocation+'/','vase_',vaseId,'none',vaseAssetIds))
  vaseAssets[0].load()

  // vase flowers front
  loadRandomAssets(2, theme.vaseFlowersF.maxNum, vaseFlowerAssetsF, theme.vaseFlowersF.fileLocation, 'vF_F_', 'none', vaseFlowerAssetFIds)

  let numFlowersOverVase = 3;

  if (theme.name === 'countryGarden' || theme.name === 'rococo') {
    // COUNTRY GARDEN / ROCOCO FLOWERS
    loadRandomAssets(numFlowersOverVase, theme.flowers_F.maxNum, flower_F_Assets, theme.flowers_F.fileLocation, 'flower_', 'none', flower_F_AssetIds)
  }else{
    // REGULAR FLOWERS
    loadRandomAssets(numFlowersOverVase, theme.flowers.maxNum, flowerAssets, theme.flowers.fileLocation, 'flower_', 'none', flowerAssetIds)
  } 
}

function petalsLoad() {
  maxNumPetals = 4
  loadRandomAssets(numPetals, maxNumPetals, socialAssets, '/socials', 'social_', 'none', socialPetalIds)
}

function socialsLoad(numSocials) {
  maxNumSocials = 24
  loadRandomAssets(numSocials, maxNumSocials, socialAssets, '/socials', 'social_', 'none', socialAssetIds)
}

function butterfliesLoad(numButts) {
  maxNumButts = 21
  loadRandomAssets(numButts, maxNumButts, butterflyAssets, '/butterflies', 'butterfly_', 'none', butterflyAssetIds)
}

function overTopLoad(numOverTop) {
  maxNumOverTop = 18
  loadRandomAssets(numOverTop, maxNumOverTop, overTopAssets, '/_overTop', 'overTop_', 'none', overTopAssetIds)
}

function blackRoseLoad() {
  maxId = 2
  loadRandomAssets(1, maxId, blackRoseAssets, '/_blackRose', 'blackRose_', 'none', blackRoseAssetIds)
}


/////////////////   COMPOSITIONS   ////////////////////////
///////////////////////////////////////////////////////////

function standard(comp,theme,ovTex,hasBlackRose) {
  //let bgCol = [rnd(255), rnd(255), rnd(255)]
  //let bgCol = chooseObjKey(theme.bgColors)
  //background(bgCol)
  //background(255)
  minD = comp.minD, maxD = comp.maxD;

  // bMode = HARD_LIGHT;
  // if (theme.name === 'rococo') {
  //   bMode = MULTIPLY
  // }else if (theme.name === 'countryGarden') {
  //   bMode = BLEND
  // }else if (theme.name === 'cmyk') {
  //   bMode = BLEND
  // }else if (theme.name === 'allWhite') {
  //   bMode = BLEND
  // }else if (theme.name === 'graphic') {
  //   bMode = BLEND
  // }

  //blendMode(bMode)
  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  //fT.resize(width,height)
  image(fT,0,0,width,height)
  // let fT2 = fullTextureAssetIds[1]
  // fT2.resize(width,height)
  // image(fT2,0,0)

  if (comp.name === 'standard' || comp.name === 'lowDensity') {
    verticalGradient()
  }

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    let pos = chooseObjKey(comp.bigFlowerPosOptions);
    domX = w(pos[0]);
    domY = h(pos[1]);
    domPos = createVector(domX,domY)
    console.log(domX,domY)
  }

  for (let i = 0; i < textureAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.35),w(.35)),rnd(h(comp.texture.minY),h(comp.texture.maxY)))
    let imgId = textureAssetIds[i]
    let imgDiv = rnd(minD,maxD)/3

    if (comp.name === 'standard') {
      stSizeAdjust = map(pElPos.y,h(comp.texture.minY),h(comp.texture.maxY),1,1.7);
    }else if(comp.name === 'dominant'){
      stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.8,.6);
    }else if(comp.name === 'lowDensity'){
      //stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.15,.6);
      stSizeAdjust = map(pElPos.y,h(comp.texture.minY),h(comp.texture.maxY),1,1.5);
    }else{
      stSizeAdjust = 1;
    }

    if (theme.name === 'allWhite') {
      bMode = BLEND
    }else if (theme.name === 'rococo') {
      bMode = BLEND
    }else{
      bMode = HARD_LIGHT
    }
    //if (i % 2) {imgDiv /= 3}
    //if (i % 3) {bMode = HARD_LIGHT}
    //imgId.resize((width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
    blendMode(bMode)
    push()
    rotate(90*floor(rnd(4)))
    //image(imgId,pElPos.x,pElPos.y,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
    //image(imgId,pElPos.x,pElPos.y)
    textureAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    textureAssets2[i].setItem()
    pop()
  }

  for (let i = 0; i < paintLGAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
    let imgId = paintLGAssetIds[i]
    let imgDiv = rnd(minD,maxD)/4

    if (comp.name === 'standard') {
      stSizeAdjust = map(pElPos.y,h(comp.paintLG.minY),h(comp.paintLG.maxY),1,1.7);
    }else if(comp.name === 'dominant'){
      stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.2,.8);
    }else if(comp.name === 'lowDensity'){
      stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.15,.85);
    }else{
      stSizeAdjust = 1;
    }

    //let bMode = HARD_LIGHT
    let bMode = BLEND
    //if (i % 2) {imgDiv /= 3}
    //if (i % 3) {bMode = HARD_LIGHT}
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
    paintLGAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    paintLGAssets2[i].setItem()
  }

  if (comp.name === 'lowDensity') {
    blendMode(BLEND)
    let thisFloor = floorAssetIds[0]
    image(thisFloor,0,0,width,height)
  }

  let paintArraysplit = paintAssets.length - 6
  console.log(paintAssets.length, paintArraysplit)

  for (let i = 0; i < paintAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.paint.minY),h(comp.paint.maxY)))
    let imgId = paintAssetIds[i]
    let imgDiv = rnd(minD,maxD)/2//*2

    if (comp.name === 'standard') {
      stSizeAdjust = map(pElPos.y,h(comp.paint.minY),h(comp.paint.maxY),1,1.7);
    }else if(comp.name === 'dominant'){
      if (i >= paintArraysplit) {
        let chooseSide = rnd() ////////////////// SETUP FOR PLACING TOP-LAYER ASSETS WITHOUT GOING OVER MIDDLE OF DOM FLOWER
        if (chooseSide < .5) {
          if (domPos.x < 0) {
            pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.paintLG.minY),h(.125)))
          }else{
            pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
          }
        }else{
          if (domPos.x > 0) {
            pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.paintLG.minY),h(.125)))
          }else{
            pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
          }
        } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),.65,1);
        console.log(chooseSide, h(.125), pElPos)
      }else{
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.4,.7);
      }
    }else if(comp.name === 'lowDensity'){
      if (i >= paintArraysplit) {
        let chooseSide = rnd() ////////////////// SETUP FOR PLACING TOP-LAYER ASSETS WITHOUT GOING OVER MIDDLE OF DOM FLOWER
        if (chooseSide < .5) {
          if (domPos.x < 0) {
            pElPos = createVector(rnd(-w(.48),0),rnd(-h(.125),h(comp.paintLG.maxY)))
          }else{
            pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
          }
        }else{
          if (domPos.x > 0) {
            pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
          }else{
            pElPos = createVector(rnd(0,w(.48)),rnd(-h(.125),h(comp.paintLG.maxY)))
          }
        } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),.55,1);
      }else{
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.15,.65);
      }
    }else{
      stSizeAdjust = 1;
    }

    let bMode  = BLEND // OVERLAY;
    if (theme.name === 'digital') {
      bMode = BLEND
    }else if (theme.name === 'cmyk') {
      // if (i % 3) {
      //   bMode = OVERLAY
      // }else{
        bMode = BLEND
      //}
    }else{
      bMode = BLEND
    }
    //let bMode = theme.paint.blendStyle;
    //bMode = bMode.replace(/^'(.+(?='$))'$/, '$1')
    //if (i % 2) {imgDiv /= 3}
    //if (i % 3) {bMode = HARD_LIGHT}
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
    paintAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    paintAssets2[i].setItem()
  }

  placeSocials(comp)

  //digitalOverlay(theme)

  // let flower_F_Arraysplit = floor(flower_F_Assets2.length/2)
  // let flowerArraysplit = floor(flowerAssets2.length/2)
  let flower_F_Arraysplit = flower_F_Assets.length > 6 ? flower_F_Assets.length-4 : flower_F_Assets.length;
  let flowerArraysplit = flowerAssets.length > 6 ? flowerAssets.length-4 : flowerAssets.length;
  //console.log(flowerAssets.length,flowerArraysplit)

  if (theme.name === 'countryGarden' || theme.name === 'rococo') {
    for (let i = 0; i < flower_B_Assets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers_B.minY),h(comp.flowers_B.maxY)))
      let imgId = flower_B_AssetIds[i]
      let imgDiv = rnd(minD,maxD)

      if (comp.name === 'standard') {
        stSizeAdjust = map(pElPos.y,h(comp.flowers_B.minY),h(comp.flowers_B.maxY),1.3,1.8);
      }else if(comp.name === 'dominant'){
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.8,.75);
      }else if(comp.name === 'lowDensity'){
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.15,.75);
      }else{
        stSizeAdjust = 1;
      }

      let bMode = BLEND
      //if (i % 2) {imgDiv /= 3}
      if (i % 2) {imgDiv = imgDiv*.8}
      if (i % 3) {imgDiv = imgDiv*.6}
      //if (i % 3) {bMode = HARD_LIGHT}
      //imgId.resize((width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
      blendMode(bMode)
      //image(imgId,pElPos.x,pElPos.y,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
      flower_B_Assets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      flower_B_Assets2[i].setItem()
    }
    for (let i = 0; i < flower_F_Assets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers_F.minY),h(comp.flowers_F.maxY)))
      let imgId = flower_F_AssetIds[i]
      let imgDiv = rnd(minD,maxD)*1.2

      if (comp.name === 'standard') {
        stSizeAdjust = map(pElPos.y,h(comp.flowers_F.minY),h(comp.flowers_F.maxY),1,1.7);
      }else if(comp.name === 'dominant'){
        if (i >= flower_F_Arraysplit) {
          let chooseSide = rnd() ////////////////// SETUP FOR PLACING TOP-LAYER ASSETS WITHOUT GOING OVER MIDDLE OF DOM FLOWER
          if (chooseSide < .5) {
            if (domPos.x < 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers_F.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers_F.minY),h(comp.flowers_F.maxY)))
            }
          }else{
            if (domPos.x > 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers_F.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers_F.minY),h(comp.flowers_F.maxY)))
            }
          } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),.75,1);
        }else{
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.8,.75);
        }
      }else if(comp.name === 'lowDensity'){
        if (i >= flower_F_Arraysplit) {
          let chooseSide = rnd() ////////////////// SETUP FOR PLACING TOP-LAYER ASSETS WITHOUT GOING OVER MIDDLE OF DOM FLOWER
          if (chooseSide < .5) {
            if (domPos.x < 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers_F.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers_F.minY),h(comp.flowers_F.maxY)))
            }
          }else{
            if (domPos.x > 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers_F.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers_F.minY),h(comp.flowers_F.maxY)))
            }
          } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),.75,1);
        }else{
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.15,.75);
        }
      }else{
        stSizeAdjust = 1;
      }

      let bMode = BLEND
      //if (i % 2) {imgDiv /= 3}
      if (i % 2) {imgDiv = imgDiv*.8}
      if (i % 3) {imgDiv = imgDiv*.6}
      //if (i % 3) {bMode = HARD_LIGHT}
      //imgId.resize((width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
      blendMode(bMode)
      //image(imgId,pElPos.x,pElPos.y,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
      flower_F_Assets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      flower_F_Assets2[i].setItem()
    }
  }else{
    for (let i = 0; i < flowerAssets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
      let imgId = flowerAssetIds[i]
      let imgDiv = rnd(minD,maxD)

      if (comp.name === 'standard') {
        stSizeAdjust = map(pElPos.y,h(comp.flowers.minY),h(comp.flowers.maxY),1,1.7);
      }else if(comp.name === 'dominant'){
        if (i >= flowerArraysplit) {
          let chooseSide = rnd() ////////////////// SETUP FOR PLACING TOP-LAYER ASSETS WITHOUT GOING OVER MIDDLE OF DOM FLOWER
          if (chooseSide < .5) {
            if (domPos.x < 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
            }
          }else{
            if (domPos.x > 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
            }
          } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          console.log(chooseSide, h(.125),pElPos)
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),.75,1);
        }else{
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.5,.75);
        }
      }else if(comp.name === 'lowDensity'){
        if (i >= flowerArraysplit) {
          let chooseSide = rnd() ////////////////// SETUP FOR PLACING TOP-LAYER ASSETS WITHOUT GOING OVER MIDDLE OF DOM FLOWER
          if (chooseSide < .5) {
            if (domPos.x < 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
            }
          }else{
            if (domPos.x > 0) {
              pElPos = createVector(rnd(-w(.48),0),rnd(h(comp.flowers.minY),h(.125)))
            }else{
              pElPos = createVector(rnd(0,w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
            }
          } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),.75,1);
        }else{
          stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.15,.75);
        }
      }else{
        stSizeAdjust = 1;
      }

      let bMode = BLEND
      if (i % 2) {imgDiv = imgDiv*.8}
      if (i % 3) {imgDiv = imgDiv*.6}
      //if (i % 3) {bMode = HARD_LIGHT}
      //imgId.resize((width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
      blendMode(bMode)
      //image(imgId,pElPos.x,pElPos.y,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust)
      flowerAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      flowerAssets2[i].setItem()
      //text(imgDiv.toFixed(2),pElPos.x,pElPos.y)
    }
  }

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    push()
    translate(domPos.x,domPos.y)
    if (domPos.x > 0 && domPos.y < 0) {
      rotate(radians(90))
    }else if (domPos.x > 0 && domPos.y > 0) {
      rotate(radians(180))
    }else if (domPos.x < 0 && domPos.y > 0) {
      rotate(radians(270))
    }
    for (let i = 0; i < bigFlowerAssets2.length; i++) {
      bigFlowerAssets2[i].setItem()
    }
    pop()
  }

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    let bigFlower = bigFlowerAssetIds[0]
    console.log(domX,domY)
    //image(bigFlower,domX,domY,width*1.35,height*1.35/aspRatio)
    if (comp.name === 'dominant') {
      mult = 1.3
    }else if (comp.name === 'lowDensity') {
      mult = .9
    }
    push()
    let defaultPos = createVector(0,0)
    translate(domPos.x,domPos.y)
    if (domPos.x > 0 && domPos.y < 0) {
      rotate(radians(90))
    }else if (domPos.x > 0 && domPos.y > 0) {
      rotate(radians(180))
    }else if (domPos.x < 0 && domPos.y > 0) {
      rotate(radians(270))
    }
    bigFlowerAssets2.push(new PlaceAsset(bigFlower,defaultPos,width*mult,height*mult/aspRatio))
    bigFlowerAssets2[0].setItem()
    pop()
  }

  if (hasBlackRose < .03) {  /// NEEDS TO BE UPDATED SO hasBlackRose is loaded/defined globally
    blendMode(BLEND)
    console.log("has black rose")
    let blackRose = blackRoseAssetIds[0]
    if (comp.name === 'dominant') {
      let brPos = createVector((domPos.x*-1)*.7,(domPos.y*-1)*1.5)
      //image(blackRose,brPos.x,brPos.y,w(.4),h(.4)/aspRatio)
      blackRoseAssets2.push(new PlaceAsset(blackRose,brPos,w(.4),h(.4)/aspRatio))
      blackRoseAssets2[0].setItem()
    }else{
      let brPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
      //image(blackRose,brPos.x,brPos.y,w(.35),h(.35)/aspRatio)
      blackRoseAssets2.push(new PlaceAsset(blackRose,brPos,w(.35),h(.35)/aspRatio))
      blackRoseAssets2[0].setItem()
    }
  }

  if (ovTex < .3) {
    blendMode(BLEND)
    let overlay = ovTextureAssetIds[0]
    //overlay.resize(width,height)
    image(overlay,0,0,width,height)
  }

  placeButterflies(comp)

  placeOverTop(comp)

  // blendMode(OVERLAY)
  // let overlayImage = overlayAssetIds[0]
  // //fT.resize(width,height)
  // image(overlayImage,0,0,width,height)


  // for (let i = 0; i < numFlowerEls*numMult; i++) {
  //   let flowerElementId = floor(rnd(1,10))
  //   flowerElements.push(new LoadFlowerElement(flowerElementId))
  //   flowerElements[i].load();
  // }

  // let numPaintEls;
  // let numFlowerEls;
  // let numTextureEls;
  // let numSymbolEls;
  // let numButterflyEls;
  // let numLargeEls; 
}

function standardLayer1() {
  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  image(fT,0,0,width,height)

  for (let i = 0; i < textureAssets2.length; i++) {
    //push()
    // let bMode = BLEND
    // if (theme.name === 'digital') {
    //   bMode = HARD_LIGHT
    // }
    // blendMode(bMode)
    textureAssets2[i].setItem()
    // pop()
  }

  for (let i = 0; i < paintLGAssets2.length; i++) {
    // push()
    // let bMode = BLEND
    // if (theme.name === 'digital') {
    //   bMode = HARD_LIGHT
    // }
    // blendMode(OVERLAY)
    paintLGAssets2[i].setItem()
    // pop()
  }

  blendMode(BLEND)

  if (comp.name === 'standard' || comp.name === 'lowDensity') {
    //verticalGradient()
  }
  if (comp.name === 'lowDensity') {
    let thisFloor = floorAssetIds[0]
    //image(thisFloor,0,0,width,height)
  }
}

function standardLayer2() {

  let paintArraysplit = paintAssets2.length - 6

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = 0; i < paintArraysplit; i++) {
      paintAssets2[i].setItem()
    }
  }else{
    for (let i = 0; i < paintAssets2.length; i++) {
      paintAssets2[i].setItem()
    }
  }

  for (let i = 0; i < socialAssets2.length; i++) {
    socialAssets2[i].setItem()
  }

  for (let i = 0; i < flower_B_Assets2.length; i++) {
    flower_B_Assets2[i].setItem()
  }

  // let flower_F_Arraysplit, flowerArraysplit;
  // let flower_F_Arraysplit = floor(flower_F_Assets2.length/2)
  // let flowerArraysplit = floor(flowerAssets2.length/2)
  let flower_F_Arraysplit = flower_F_Assets2.length > 6 ? flower_F_Assets2.length-4 : flower_F_Assets2.length;
  let flowerArraysplit = flowerAssets2.length > 6 ? flowerAssets2.length-4 : flowerAssets2.length;
  //console.log(flower_F_Arraysplit,flowerArraysplit)

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    // flower_F_Arraysplit = floor(flower_F_Assets2.length/2)
    // flowerArraysplit = floor(flowerAssets2.length/2)
    for (let i = 0; i < flower_F_Arraysplit; i++) {
      flower_F_Assets2[i].setItem()
      //console.log(i)
    }
    for (let i = 0; i < flowerArraysplit; i++) {
      flowerAssets2[i].setItem()
      //console.log(i)
    }
  }else{
    for (let i = 0; i < flower_F_Assets2.length; i++) {
      flower_F_Assets2[i].setItem()
    }
    for (let i = 0; i < flowerAssets2.length; i++) {
      flowerAssets2[i].setItem()
    }
  }

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    push()
    translate(domPos.x,domPos.y)
    if (domPos.x > 0 && domPos.y < 0) {
      rotate(radians(90))
    }else if (domPos.x > 0 && domPos.y > 0) {
      rotate(radians(180))
    }else if (domPos.x < 0 && domPos.y > 0) {
      rotate(radians(270))
    }
    for (let i = 0; i < bigFlowerAssets2.length; i++) {
      bigFlowerAssets2[i].setItem()
    }
    pop()
  }

  //console.log(flowerAssets2)

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = flower_F_Arraysplit; i < flower_F_Assets2.length; i++) {
      flower_F_Assets2[i].setItem()
      console.log(i)
    }
    for (let i = flowerArraysplit; i < flowerAssets2.length; i++) {
      flowerAssets2[i].setItem()
      //text(flowerAssets2.pElPos.y,flowerAssets2.pElPos.x,flowerAssets2.pElPos.y)
      //console.log(i)
    }
    for (let i = paintArraysplit; i < paintAssets2.length; i++) {
      paintAssets2[i].setItem()
    }
  }

  for (let i = 0; i < blackRoseAssets2.length; i++) {
    blackRoseAssets2[i].setItem()
  }

  for (let i = 0; i < butterflyAssets2.length; i++) {
    butterflyAssets2[i].setItem()
  }

  if (ovTex < .3) {
    blendMode(BLEND)
    let overlay = ovTextureAssetIds[0]
    image(overlay,0,0,width,height)
  }

  for (let i = 0; i < overTopAssets2.length; i++) {
    overTopAssets2[i].setItem()
  }
}

function stillLife(comp,theme,angTex,hasBlackRose,ovTex) {
  //let bgCol = chooseObjKey(theme.bgColors)
  //background(bgCol)
  //background(255)
  minD = comp.minD, maxD = comp.maxD;

  // bMode = HARD_LIGHT;
  // if (theme.name === 'rococo') {
  //   bMode = MULTIPLY
  // }else if (theme.name === 'countryGarden') {
  //   //bMode = OVERLAY
  //   bMode = BLEND
  // }else if (theme.name === 'cmyk') {
  //   bMode = BLEND
  // }else if (theme.name === 'allWhite') {
  //   bMode = BLEND
  // }else if (theme.name === 'graphic') {
  //   bMode = BLEND
  // }

  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  //fT.resize(width,height)
  image(fT,0,0,width,height)
  // if (theme.name === 'allWhite') {
  //   blendMode(BURN)
  //   image(fT,0,0,width,height)
  // }

  verticalGradient()

  blendMode(BLEND)
  let thisFloor = floorAssetIds[0]
  //thisFloor.resize(width,height)
  image(thisFloor,0,0,width,height)

  if (theme.name === 'rococo') {
    if (angTex < .3) {
      blendMode(BLEND)
      let angT_L = angTextureLAssetIds[0]
      let angT_R = angTextureRAssetIds[0]
      //angT_L.resize(width,height)
      //angT_R.resize(width,height)
      image(angT_L,0,0,width,height)
      image(angT_R,0,0,width,height)
    }
  }

  for (let i = 0; i < textureAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.35),w(.35)),rnd(h(comp.texture.minY),h(comp.texture.maxY)))
    let imgId = textureAssetIds[i]
    let imgDiv = rnd(minD,maxD)/3
    if (theme.name === 'allWhite') {
      bMode = BLEND
    }else{
      bMode = OVERLAY
    }
    blendMode(bMode)
    push()
    rotate(90*floor(rnd(4)))
    //image(imgId,pElPos.x,pElPos.y,width/imgDiv,height/imgDiv/aspRatio)
    textureAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    textureAssets2[i].setItem()
    pop()
  }

  for (let i = 0; i < paintLGAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.35),w(.35)),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
    let imgId = paintLGAssetIds[i]
    let imgDiv = rnd(minD,maxD)/4
    let bMode = HARD_LIGHT
    //let bMode = BLEND
    //imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,width/imgDiv,height/imgDiv/aspRatio)
    paintLGAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    paintLGAssets2[i].setItem()
  }

  for (let i = 0; i < paintAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.paint.minY),h(comp.paint.maxY)))
    let imgId = paintAssetIds[i]
    let imgDiv = rnd(minD,maxD)/2//*2
    let bMode  = BLEND // OVERLAY;
    if (theme.name === 'digital') {
      bMode = BLEND
    }
    //imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,width/imgDiv,height/imgDiv/aspRatio)
    paintAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    paintAssets2[i].setItem()
  }

  // frames
  if (theme.name === 'rococo') {
    for (let i = 0; i < frameAssets.length; i++) {
      let framePos = createVector(rnd(-w(.37),w(.37)),rnd(-h(.35),-h(.15)))
      let frameId = frameAssetIds[i]
      let frameDiv = 1
      // frameAssets2.push(new PlaceAsset(frameId,framePos,width/frameDiv,height/frameDiv/aspRatio))
      // frameAssets2[i].setItem()
    }
  }

  for (let i = 0; i < vaseFlowerAssetsB.length; i++) {
    //let pElPos = createVector(0,h(.07))
    let pElPos = createVector(0,0)
    let imgId = vaseFlowerAssetBIds[i]
    //let imgDiv = rnd(minD,maxD)/5//*2
    let bMode  = BLEND // OVERLAY;
    //imgId.resize(width,height)
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,width,height)
    //image(imgId,0,0,width,height)
    vaseFlowerAssetsB2.push(new PlaceAsset(imgId,pElPos,width,height))
    vaseFlowerAssetsB2[i].setItem()
  }

  let thisVase = vaseAssetIds[0]
  let vasePos = createVector(0,0)
  //thisVase.resize(width,height)
  //image(thisVase,0,0,width,height)
  vaseAssets2.push(new PlaceAsset(thisVase,vasePos,width,height))
  vaseAssets2[0].setItem()

  for (let i = 0; i < vaseFlowerAssetsF.length; i++) {
    //let pElPos = createVector(0,h(.07))
    let pElPos = createVector(0,0)
    let imgId = vaseFlowerAssetFIds[i]
    //let imgDiv = rnd(minD,maxD)/5//*2
    let bMode  = BLEND // OVERLAY;
    //imgId.resize(width,height)
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,width,height)
    image(imgId,0,0,width,height)
    vaseFlowerAssetsF2.push(new PlaceAsset(imgId,pElPos,width,height))
    vaseFlowerAssetsF2[i].setItem()
  }

  placeSocials(comp)
  //digitalOverlay(theme)

  if (theme.name === 'countryGarden' || theme.name === 'rococo') {
    // for (let i = 0; i < flower_B_Assets.length; i++) {
    //   let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers_B.minY),h(comp.flowers_B.maxY)))
    //   let imgId = flower_B_AssetIds[i]
    //   let imgDiv = rnd(minD,maxD)
    //   let bMode = BLEND
    //   if (i % 2) {imgDiv /= 3}
    //   //if (i % 3) {bMode = HARD_LIGHT}
    //   imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
    //   blendMode(bMode)
    //   image(imgId,pElPos.x,pElPos.y)
    // }
    for (let i = 0; i < flower_F_Assets.length; i++) {
      let pElPos = createVector(rnd(-w(.25),w(.25)),rnd(-h(.15),h(.15)))
      let imgId = flower_F_AssetIds[i]
      let imgDiv = floor(rnd(minD/3,maxD/3))
      let bMode = BLEND
      //if (i % 2) {imgDiv /= 3}

      //if (i % 3) {bMode = HARD_LIGHT}
      //imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
      blendMode(bMode)
      //image(imgId,pElPos.x,pElPos.y,width/(imgDiv*3),height/(imgDiv*3)/aspRatio)
      flower_F_Assets2.push(new PlaceAsset(imgId,pElPos,width/(imgDiv*3),height/(imgDiv*3)/aspRatio))
      flower_F_Assets2[i].setItem()
    }
  }else{
    for (let i = 0; i < flowerAssets.length; i++) {
      let pElPos = createVector(rnd(-w(.25),w(.25)),rnd(-h(.15),h(.15)))
      let imgId = flowerAssetIds[i]
      let imgDiv = floor(rnd(minD/3,maxD/3))
      let bMode = BLEND
      //if (i % 2) {imgDiv /= 3}
      //if (i % 3) {bMode = HARD_LIGHT}
      //imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
      blendMode(bMode)
      //image(imgId,pElPos.x,pElPos.y,width/(imgDiv),height/(imgDiv)/aspRatio)
      flowerAssets2.push(new PlaceAsset(imgId,pElPos,width/(imgDiv*3),height/(imgDiv*3)/aspRatio))
      flowerAssets2[i].setItem()
    }
  }

  if (hasBlackRose < .03) {
    blendMode(BLEND)
    console.log("has black rose")
    let blackRose = blackRoseAssetIds[0]
    let brPos = createVector(0,0)
    push()
    translate(w(.39),h(.435))
    rotate(radians(-55))
    //image(blackRose,0,0,w(.35),h(.35)/aspRatio)
    blackRoseAssets2.push(new PlaceAsset(blackRose,brPos,w(.4),h(.4)/aspRatio))
    blackRoseAssets2[0].setItem()
    pop()
  }

  if (ovTex < .3) {
    blendMode(BLEND)
    let overlay = ovTextureAssetIds[0]
    image(overlay,0,0,width,height)
  }

  placeButterflies(comp)

  placeOverTop(comp)
}

function stillLifeLayer1() {
  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  image(fT,0,0,width,height)

  verticalGradient()

  let thisFloor = floorAssetIds[0]
  image(thisFloor,0,0,width,height)

  for (let i = 0; i < textureAssets2.length; i++) {
    textureAssets2[i].setItem()
    console.log(i)
  }

  for (let i = 0; i < frameAssets2.length; i++) {
    frameAssets2[i].setItem()
  }

  console.log(paintLGAssets2)
  for (let i = 0; i < paintLGAssets2.length; i++) {
    paintLGAssets2[i].setItem()
  }
}

function stillLifeLayer2() {
  for (let i = 0; i < paintAssets2.length; i++) {
    paintAssets2[i].setItem()
  }
  for (let i = 0; i < vaseFlowerAssetsB2.length; i++) {
    vaseFlowerAssetsB2[i].setItem()
  }
  for (let i = 0; i < flower_B_Assets2.length; i++) {
    flower_B_Assets2[i].setItem()
  }
  for (let i = 0; i < vaseAssets2.length; i++) {
    vaseAssets2[i].setItem()
  }
  console.log(vaseAssets2.length)
  for (let i = 0; i < vaseFlowerAssetsF2.length; i++) {
    vaseFlowerAssetsF2[i].setItem()
  }
  for (let i = 0; i < socialAssets2.length; i++) {
    socialAssets2[i].setItem()
  }
  for (let i = 0; i < flower_F_Assets2.length; i++) {
    flower_F_Assets2[i].setItem()
  }
  for (let i = 0; i < flowerAssets2.length; i++) {
    flowerAssets2[i].setItem()
  }
  for (let i = 0; i < blackRoseAssets2.length; i++) {
    push()
    translate(w(.39),h(.435))
    rotate(radians(-55))
    blackRoseAssets2[0].setItem()
    pop()
  }
  for (let i = 0; i < butterflyAssets2.length; i++) {
    butterflyAssets2[i].setItem()
  }
  if (ovTex < .3) {
    blendMode(BLEND)
    let overlay = ovTextureAssetIds[0]
    image(overlay,0,0,width,height)
  }
  for (let i = 0; i < overTopAssets2.length; i++) {
    overTopAssets2[i].setItem()
  }
}

// let layerCounter = 0;

function drawItIn() {
  // for (let i = 0; i < orderedDraw.length; i++) {

  // }
  let frames = frameCount;
  let framesModulo = frames % 10;
  //console.log(framesModulo)

  orderedDraw[drawNum].setItem
  let a = orderedDraw[drawNum]

  if (framesModulo == 0 && frames < orderedDraw.length*5) {
    image(a[0],a[1]+width/2,a[2]+height/2,a[3],a[4])
    console.log(a)
    drawNum++
    //console.log(drawNum)
  }
}

function standardDraw1() {
  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  image(fT,0,0,width,height)

  for (let i = 0; i < textureAssets2.length; i++) {
    //push()
    // let bMode = BLEND
    // if (theme.name === 'digital') {
    //   bMode = HARD_LIGHT
    // }
    // blendMode(bMode)
    textureAssets2[i].addToArray()
    // pop()
    //layerCounter++
  }

  for (let i = 0; i < paintLGAssets2.length; i++) {
    // push()
    // let bMode = BLEND
    // if (theme.name === 'digital') {
    //   bMode = HARD_LIGHT
    // }
    // blendMode(OVERLAY)
    paintLGAssets2[i].addToArray()
    // pop()
    //layerCounter++
  }

  blendMode(BLEND)

  if (comp.name === 'standard' || comp.name === 'lowDensity') {
    //verticalGradient()
  }
  if (comp.name === 'lowDensity') {
    let thisFloor = floorAssetIds[0]
    //image(thisFloor,0,0,width,height)
  }
  console.log(orderedDraw)
}

function standardDraw2() {

  let paintArraysplit = paintAssets2.length - 6

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = 0; i < paintArraysplit; i++) {
      paintAssets2[i].addToArray()
    }
  }else{
    for (let i = 0; i < paintAssets2.length; i++) {
      paintAssets2[i].addToArray()
    }
  }

  for (let i = 0; i < socialAssets2.length; i++) {
    socialAssets2[i].addToArray()
  }

  for (let i = 0; i < flower_B_Assets2.length; i++) {
    flower_B_Assets2[i].addToArray()
  }

  // let flower_F_Arraysplit, flowerArraysplit;
  // let flower_F_Arraysplit = floor(flower_F_Assets2.length/2)
  // let flowerArraysplit = floor(flowerAssets2.length/2)
  let flower_F_Arraysplit = flower_F_Assets2.length > 6 ? flower_F_Assets2.length-4 : flower_F_Assets2.length;
  let flowerArraysplit = flowerAssets2.length > 6 ? flowerAssets2.length-4 : flowerAssets2.length;
  //console.log(flower_F_Arraysplit,flowerArraysplit)

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    // flower_F_Arraysplit = floor(flower_F_Assets2.length/2)
    // flowerArraysplit = floor(flowerAssets2.length/2)
    for (let i = 0; i < flower_F_Arraysplit; i++) {
      flower_F_Assets2[i].addToArray()
      //console.log(i)
    }
    for (let i = 0; i < flowerArraysplit; i++) {
      flowerAssets2[i].addToArray()
      //console.log(i)
    }
  }else{
    for (let i = 0; i < flower_F_Assets2.length; i++) {
      flower_F_Assets2[i].addToArray()
    }
    for (let i = 0; i < flowerAssets2.length; i++) {
      flowerAssets2[i].addToArray()
    }
  }

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    push()
    translate(domPos.x,domPos.y)
    if (domPos.x > 0 && domPos.y < 0) {
      rotate(radians(90))
    }else if (domPos.x > 0 && domPos.y > 0) {
      rotate(radians(180))
    }else if (domPos.x < 0 && domPos.y > 0) {
      rotate(radians(270))
    }
    for (let i = 0; i < bigFlowerAssets2.length; i++) {
      bigFlowerAssets2[i].addToArray()
    }
    pop()
  }

  //console.log(flowerAssets2)

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = flower_F_Arraysplit; i < flower_F_Assets2.length; i++) {
      flower_F_Assets2[i].addToArray()
      console.log(i)
    }
    for (let i = flowerArraysplit; i < flowerAssets2.length; i++) {
      flowerAssets2[i].addToArray()
      //text(flowerAssets2.pElPos.y,flowerAssets2.pElPos.x,flowerAssets2.pElPos.y)
      //console.log(i)
    }
    for (let i = paintArraysplit; i < paintAssets2.length; i++) {
      paintAssets2[i].addToArray()
    }
  }

  for (let i = 0; i < blackRoseAssets2.length; i++) {
    blackRoseAssets2[i].addToArray()
  }

  for (let i = 0; i < butterflyAssets2.length; i++) {
    butterflyAssets2[i].addToArray()
  }

  if (ovTex < .3) {
    blendMode(BLEND)
    let overlay = ovTextureAssetIds[0]
    image(overlay,0,0,width,height)
  }

  for (let i = 0; i < overTopAssets2.length; i++) {
    overTopAssets2[i].addToArray()
  }
}

function stillLifeDraw1() {
  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  image(fT,0,0,width,height)

  verticalGradient()

  let thisFloor = floorAssetIds[0]
  image(thisFloor,0,0,width,height)

  for (let i = 0; i < textureAssets2.length; i++) {
    textureAssets2[i].addToArray()
    console.log(i)
  }

  for (let i = 0; i < frameAssets2.length; i++) {
    frameAssets2[i].addToArray()
  }

  console.log(paintLGAssets2)
  for (let i = 0; i < paintLGAssets2.length; i++) {
    paintLGAssets2[i].addToArray()
  }
}

function stillLifeDraw2() {
  for (let i = 0; i < paintAssets2.length; i++) {
    paintAssets2[i].addToArray()
  }
  for (let i = 0; i < vaseFlowerAssetsB2.length; i++) {
    vaseFlowerAssetsB2[i].addToArray()
  }
  for (let i = 0; i < flower_B_Assets2.length; i++) {
    flower_B_Assets2[i].addToArray()
  }
  for (let i = 0; i < vaseAssets2.length; i++) {
    vaseAssets2[i].addToArray()
  }
  console.log(vaseAssets2.length)
  for (let i = 0; i < vaseFlowerAssetsF2.length; i++) {
    vaseFlowerAssetsF2[i].addToArray()
  }
  for (let i = 0; i < socialAssets2.length; i++) {
    socialAssets2[i].addToArray()
  }
  for (let i = 0; i < flower_F_Assets2.length; i++) {
    flower_F_Assets2[i].addToArray()
  }
  for (let i = 0; i < flowerAssets2.length; i++) {
    flowerAssets2[i].addToArray()
  }
  for (let i = 0; i < blackRoseAssets2.length; i++) {
    push()
    translate(w(.39),h(.435))
    rotate(radians(-55))
    blackRoseAssets2[0].addToArray()
    pop()
  }
  for (let i = 0; i < butterflyAssets2.length; i++) {
    butterflyAssets2[i].addToArray()
  }
  if (ovTex < .3) {
    blendMode(BLEND)
    let overlay = ovTextureAssetIds[0]
    image(overlay,0,0,width,height)
  }
  for (let i = 0; i < overTopAssets2.length; i++) {
    overTopAssets2[i].addToArray()
  }
}

function placeSocials(comp) {
  minD = comp.minD, maxD = comp.maxD;

  for (let i = 0; i < socialAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.paint.minY),h(comp.paint.maxY)))
    let imgId = socialAssetIds[i]
    let imgDiv = rnd(minD,maxD)/2//*2
    let bMode  = BLEND // OVERLAY;
    //imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,width/imgDiv,height/imgDiv/aspRatio)
    socialAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    console.log(socialAssets2[i])
    socialAssets2[i].addToArray()
  }
}

function placeButterflies(comp) {
  minD = comp.minD, maxD = comp.maxD;

  for (let i = 0; i < butterflyAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(-h(.48),h(.48)))
    let imgId = butterflyAssetIds[i]
    let imgDiv = rnd(minD,maxD) / 1.35 //*2
    let bMode  = BLEND // OVERLAY;
    //imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
    blendMode(bMode)
    //image(imgId,pElPos.x,pElPos.y,width/imgDiv,height/imgDiv/aspRatio)
    butterflyAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    butterflyAssets2[i].addToArray()
  }
}

function placeOverTop(comp) {
  minD = comp.minD, maxD = comp.maxD;

  for (let i = 0; i < overTopAssets.length; i++) {
    //let posY = rnd(-h(.32),h(.32))
    if (overTopAssets.length > 4) {
      posY = map(i,0,overTopAssets.length,-h(.35),h(.35)) + rnd(-h(.1),h(.1))
    }else{
      posY = map(i,0,overTopAssets.length,-h(.35),h(.35)) + rnd(-h(.2),h(.2))
    }
    let pElPos = createVector(rnd(-w(.32),w(.32)),posY)
    let imgId = overTopAssetIds[i]
    let imgDiv = rnd(minD,maxD)/3//*2
    //let imgDiv = 1
    let bMode  = BLEND // OVERLAY;
    //imgId.resize(width/imgDiv,height/imgDiv/aspRatio)
    blendMode(bMode)
    //noStroke()
    //fill(255,125,55)
    //ellipse(pElPos.x,pElPos.y,width/imgDiv,height/imgDiv/aspRatio)
    //image(imgId,pElPos.x,pElPos.y,width/imgDiv,height/imgDiv/aspRatio)
    overTopAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    overTopAssets2[i].addToArray()
  }
}

function chooseValue(obj) {
  let keys = Object.keys(obj);
  return obj[keys[ keys.length * rnd() << 0]]
};

function digitalOverlay(theme) {
  if (theme.name === 'digital') {
    //let bModes = [OVERLAY,BURN,SCREEN,HARD_LIGHT,SOFT_LIGHT]
    for (let i = 0; i < 900; i++) {
      let x = map(i,0,900,-w(.5),w(.5))
      for (let j = 0; j < 1600; j++) {
        let y = map(j,0,1600,-h(.5),h(.5))
        //let bMode = bModes[floor(rnd()*bModes.length)]
        let col = chooseValue(theme.bgColors)
        blendMode(bMode)
        fill(col)
        noStroke()
        rect(x,y,width/900,height/1600)
      }
    }
  }
}

////////////////////   THEMES   ///////////////////////////
///////////////////////////////////////////////////////////


class LoadAsset {
  constructor(_fileLoc,_fileName,_id,_type,_arrayToPush) {
    this.fileLoc = _fileLoc;
    this.fileName = _fileName;
    this.id = _id;
    this.type = _type;
    this.arrayToPush = _arrayToPush;
  }
  load() {
    let img = this.fileLoc+'/'+this.fileName+this.id+".png"
    let loadedImg = loadImage(img)
    this.arrayToPush.push(loadedImg)
  }
}

function chooseObjKey(obj) {
  let keys = Object.keys(obj);
  let col = keys[floor(rnd()*keys.length)]
  return obj[col];
}

function chooseTheme() {
  // let theme = chooseObjKey(themes)
  // return theme;
  let tV = map(decPairs[1],0,255,0,1);
  if (tV < .32) {
    theme = themes.rococo
  }else if (tV < .54) {
    theme = themes.countryGarden
  }else if (tV < .72) {
    theme = themes.digital
  }else if (tV < .85){
    theme = themes.cmyk
  }else if (tV < .95){
    theme = themes.graphic
  }else{
    theme = themes.allWhite
  }
  return theme;
}

function chooseComp() {
  // let comp = chooseObjKey(comps)
  // return comp;
  let cV = map(decPairs[0],0,255,0,1);
  if (cV < .33) {
    comp = comps.standard
  }else if (cV < .6) {
    comp = comps.stillLife
  }else if (cV < .78) {
    comp = comps.highVolume
  }else if (cV < .93) {
    comp = comps.dominant
  }else{
    comp = comps.lowDensity
  }
  return comp;
}

function chooseDynamic() {
  // let comp = chooseObjKey(comps)
  // return comp;
  let dD = map(decPairs[2],0,255,0,1);
  if (dD < .35) {
    dynamic = water
  }else if (dD < .6) {
    dynamic = drawCircles
  }else if (dD < .8) {
    dynamic = dots_texture
  }else if (dD < .92) {
    dynamic = expansion
  }else{
    dynamic = shards
  }
  return dynamic;
}

function chooseWaterType() {
  let dT = map(decPairs[8],0,255,0,1);
  if (dT < .5) {
    dynType = 'outward'
  }else if (dT < .85) {
    dynType = 'rain'
  }else{
    dynType = 'mistral'
  }
  return dynType;
}

class PlaceAsset {
  constructor(_imgId,_pos,_w,_h) {
    this.imgId = _imgId;
    this.pos = _pos;
    this.w = _w;
    this.h = _h;
    this.anOf = rnd(TWO_PI);
    // this.order = _positionInOrder;
  }
  run() {
    let loc = this.moveItem().loc
    let brr = this.moveItem().brr
    this.update(loc,brr)
  }
  setItem() {
    //graphics.image(this.imgId,this.pos.x,this.pos.y,this.w,this.h)
    image(this.imgId,this.pos.x,this.pos.y,this.w,this.h)
  }
  moveItem() {
    //let angle = frameCount / 5;
    let loc = createVector(this.pos.x,this.pos.y)
    let dir = createVector(cos(0), sin(0));
    let speed = -rnd(.1,.5);
    let start = rnd(10,60)
    let rot = rnd(-TWO_PI,TWO_PI)
    //let angle = frameCount/180 + this.anOf //* speed
    let angle = this.anOf
    angle += radians(.01)
    dir.x = cos(angle*2)*w(.001);
    //dir.y = -noise(angle)*w(.0025);
    dir.y = sin(angle)*w(.003)
    //var vel = dir.copy();
    //console.log(dir,vel)
    loc.add(dir);
    //console.log(loc) 
    let brrAngle = frameCount / 30
    let brr = map(sin(brrAngle + this.anOf),-1,1,1,1.1)
    return {loc,brr}
  }
  update(loc,brr) {
    graphics.image(this.imgId,loc.x,loc.y,this.w*brr,this.h*brr)
  }
  addToArray() {
    orderedDraw.push([this.imgId,this.pos.x,this.pos.y,this.w,this.h])
  }
}

function verticalGradient() {
  let num = 1200
  let strW = height/1200
  for (let i = 0; i < num; i++) {
    let x1 = -w(.5)
    let x2 = w(.5)
    let y = -h(.5)+strW*i
    let opacity = 0
    if (i > 800) {
      opacity = map(i,800,1200,0,120)
    }
    strokeWeight(strW)
    stroke(0, opacity)
    line(x1,y,x2,y)
  }
}

let numCircles = 50
let spring = .1;
let gravity = 0;
let friction = -1;
let circles = [];

class Circle {
  constructor(xin, yin, din, _id, _others,_color) {
    this.x = xin;
    this.y = yin;
    this.vx = rnd(-w(.001),w(.001));
    this.vy = rnd(-w(.001),w(.001));
    this.diam = din;
    this.id = _id;
    this.others = _others;
    this.color = _color
  }

  collide() {
    for (let i = this.id + 1; i < numCircles; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx*dx + dy*dy);
      let minDist = this.others[i].diam/2 + this.diam/2;
      if (distance < minDist) {
        let angle = atan2(dy,dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diam / 2 > w(.5)) {
      this.x = w(.5) - this.diam / 2;
      this.vx *= friction;
    }else if (this.x - this.diam / 2 < -w(.5)) {
      this.x = -w(.5) + this.diam / 2;
      this.vx *= friction;
    }
    if (this.y + this.diam / 2 > h(.5)) {
      this.y = h(.5) - this.diam / 2;
      this.vy *= friction;
    }else if (this.y - this.diam / 2 < -h(.5)) {
      this.y = -h(.5) + this.diam / 2;
      this.vy *= friction
    }
  }

  show() {
    noStroke()
    fill(this.color)
    ellipse(this.x,this.y,this.diam)
  }
}

let dynamicColors = {

}

function setCircles(theme) {

  for(let i = 0; i < numCircles; i++) {
    circles.push(new Circle(
      rnd(-w(.5),w(.5)), 
      rnd(-h(.5),h(.5)), 
      rnd(w(.01),w(.03)), 
      i, 
      circles,
      chooseObjKey(theme.colors)
    ))
  }
}

function drawCircles() {
  circles.forEach(circle => {
    circle.collide();
    circle.move();
    circle.show();
  })
}

function dots_texture() {
  let p = [15,15,15]
  let xoff = frameCount*.005
  let inc = .1
  let yoff = xoff + 10000
  let y_inc = .05
  let num_dot_cols = 40
  //let angle = radians(frameCount)/10
  dotsAngle += radians(.5)
  numCircs = 2
  for (let i = 0; i <= num_dot_cols; i++){
    let x = map(i, 0, num_dot_cols, -w(.5), w(.5))
    for (let j = 0; j <= num_dot_cols; j++){
      let y = map(j, 0, num_dot_cols, -h(.5), h(.5))
        noStroke()
        for (let i = 0; i < numCircs; i++) {
          let xPos = x + w(.048)*noise(xoff);
          let yPos = y + h(.048)*noise(xoff)
          let size = w(0.01)*map(sin(dotsAngle+i+j),-1,1,1,3) * map(i,0,numCircs,1,.3)
          //fill(p[0], p[1],  p[2], 255*noise(dotsAngle*xoff+i+j) * map(i,0,numCircs,.05,.75))
          fill(p[0], p[1],  p[2], map(sin(dotsAngle+xoff+i+j*.1),-1,1,0,255) * map(i,0,numCircs,.05,.75))
          ellipse(xPos,yPos,size)
        }
        //ellipse(x + w(.048)*noise(xoff), y + h(.048)*noise(xoff), w(0.01)*map(sin(dotsAngle+i+j),-1,1,1,3))
        yoff += y_inc
      }
    xoff += inc
  }
  //console.log(xoff)
  xoff += .1
  yoff += 1
}

function setWater(waterType,theme) {
  bgNumRows = 36;
  scl = width/bgNumRows;
  for (let y = 0; y < bgNumRows * 2; y++) {
    for (let x = 0; x < bgNumRows * 2; x++) {
      let xPos = x * scl - width/2 + scl/2;
      let yPos = y * scl - height/2 + scl/2;
      let opa = rnd(5,65)
      let mod = x%15
      if (mod==0) {opa = 100}
      //let col = color(25, 91, 214); // 25, 91, 214 // inverse alpha
      let col = color(chooseObjKey(theme.colors))
      p = new ParticleWater(waterType,xPos,yPos,w(.007),col,opa);
      particlesWater.push(p);
      //console.log(x,mod,opa,col)
    }
  }
}

function water() {
  for (let i = 0; i < particlesWater.length; i++) {
    particlesWater[i].run()
  }
}

class ParticleWater{
  constructor(_type,_x,_y,_size,_col,_alpha) {
    this.type = _type;
    this.size = _size;
    this.col = _col;
    this.alpha = _alpha; // inverse values when using blrEll
    this.angle = rnd(TWO_PI)
    this.x = _x  * cos(this.angle);
    this.y = _y  * sin(this.angle);
    this.vxO = rnd(-w(.001),w(.001)) * cos(this.angle)
    this.vyO = rnd(-h(.001),h(.001)) * sin(this.angle)
    this.vxM = rnd(w(.005),w(.025)) * noise(this.angle) * map(sin(this.angle+radians(180)),-1,1,-.2,1)
    this.vyM = rnd(-h(.002),h(.002)) * sin(this.angle)
    this.vxR = rnd(-w(.001),w(.001)) * sin(this.angle)/3
    this.vyR = rnd(h(.003),h(.007)) * noise(this.angle)
  }

  run() {
    this.update();
    this.checkEdges();
    this.show();
  }

  update() {
    if (this.type === 'outward') {
      this.x += this.vxO * map(dist(this.x,this.y,0,0),0,w(.65),.6,1)
      this.y += this.vyO * map(dist(this.x,this.y,0,0),0,w(.65),.6,1)
      this.angle += radians(.5)
      this.alpha = map(sin(this.angle),-1,1,0,60)
    }else if (this.type === 'mistral') {
      this.x += this.vxM;
      this.y += this.vyM;
      this.angle += radians(1)
    }else if (this.type === 'rain') {
      this.x += this.vxR;
      this.y += this.vyR;
      this.angle += radians(1)
    }
  }

  checkEdges() {
    // if (dist(this.x,this.y,0,0) > w(.65)) {    
    //   this.x = 0
    //   this.y = 0
    // }
    if (this.type === 'outward') {
      if (this.x > w(.6) || this.x < -w(.6) || this.y > h(.6) || this.y < -h(.6)) {    
        this.x = 0
        this.y = 0
      }
    }else if (this.type === 'mistral') {
      if (this.x > w(.53) || this.y < -h(.53) || this.y > h(.53)) {
        this.x = -w(.53)
        this.y = rnd(-h(.5),h(.5))
      }
    }else if (this.type === 'rain') {
      if (this.y > h(.53)) {
        this.y = -h(.53)
      }
    }
  }

  show() {
    let adjSize = this.size*2
    if (this.type === 'outward') {
      adjSize = map(dist(this.x,this.y,0,0),0,w(.65),.5,2.5) * this.size
    }
    //blrEll(this.x,this.y,adjSize,this.col[0]*c+mouseC,this.col[1]*c+mouseC,this.col[2]*c+mouseC,this.alpha) 
    this.col.setAlpha(this.alpha)
    //console.log(this.alpha)
    fill(this.col)
    noStroke()
    rect(this.x,this.y,adjSize)
  }
}

function setIrregCircles() {
  numCircs = 4;
  for (let i = 0; i < numCircs; i++) {
    radius = map(i,0,numCircs,w(.03),w(.65))
    noiseVal = rnd(1,3)
    circ = new IrregCircle(radius,noiseVal,numCircs);
    irregCircs.push(circ);
  }
}

function expansion() {
  for (let i = 0; i < irregCircs.length; i++){
    irregCircs[i].run();
  }
}

function irEx(radius,noiseVal) {
  beginShape();
  for (let a = 0; a <= TWO_PI; a += radians(6)) {
    let xoff = map(cos(a), -1, 1, noiseVal/3, noiseVal);
    let yoff = map(sin(a), -1, 1, noiseVal/3, noiseVal);
    let diff = map(noise(xoff, yoff, zoff), 0, 1, .65, 1.35);
    let x = radius * diff * cos(a);
    let y = radius * diff * sin(a) * aspRatio;
    vertex(x,y)
  }
  endShape(CLOSE);
  
  zoff += 0.0001;
}

class IrregCircle{
  constructor(_radius,_noiseVal,_numC) {
    this.radius = _radius;
    this.noiseVal = _noiseVal;
    this.numC = _numC;
  }

  run() {
    this.update()
    this.checkEdges()
    this.show()
  }

  update() {
    this.radius += w(.0005)
  }

  checkEdges() {
    if (this.radius > w(.55)) {
      this.radius = w(.01)
    }
  }

  show() {
    noFill()
    push()
    let alphaVal = 1
    if (this.radius > w(.35)) {
      alphaVal = map(this.radius, w(.35), w(.5), 1, 0)
    }
    stroke(255,255,255,65 * alphaVal)
    strokeWeight(w(.007)) 
    irEx(this.radius,this.noiseVal,this.grid)
    //irEx(this.radius*1.25,this.noiseVal*1.35,this.grid)
    irEx(this.radius*1.35,this.noiseVal*1.7,this.grid)
    pop()
  }
}

function setFractals(theme) {
  for(var i = 0; i < slices*2 ; i++){
    randomWeights[i] = rnd(500, 1500);
  }
  for (let blob = 0; blob < 5; blob++) {
    blobCol1 = chooseObjKey(theme.colors);
    blobCol2 = [blobCol1[0]/2,blobCol1[1]/2,blobCol1[2]/2];
    blobCols.push({blobCol1,blobCol2});
  }
  console.log(blobCols)
}

function shards(theme) {
  push()
  noStroke()
  for (let blobNum = 0; blobNum < 5; blobNum++){
    size_inc = w(.003)
    blobSize = map(blobNum,0,5,w(1),w(.035))
    if (blobSize > w(1)){
      blobSize = w(.025)
    }
    let fadeIn = 1
    if (frameCount < 200) {
      fadeIn = map(frameCount,0,200,0,1)
    }
    let col1 = blobCols[blobNum].blobCol1
    let col2 = blobCols[blobNum].blobCol2
    fill(map(blobNum,0,5,col2[0],col1[0]*1.1),map(blobNum,0,5,col2[1],col1[1]*1.1),map(blobNum,0,5,col2[2],col1[2]*1.1),map(blobNum,0,5,2,90)*fadeIn)
    //fill(255,255,255,70*fadeIn)
    beginShape();
    for(var i = 0, j = 0; i < TWO_PI; i += TWO_PI/slices, j++){
      let x = sin(i) * blobSize + map(cos((frameCount*20)/2/randomWeights[j]), -1, 1, -w(.1), w(.1))
      let y = cos(i) * blobSize + map(sin((frameCount*20)/2/randomWeights[j+ slices]), -1, 1, -h(.5), h(.5)) * .5
      curveVertex(x,y)
    }
    endShape(CLOSE);
    blobSize += size_inc
  }
  pop()
}