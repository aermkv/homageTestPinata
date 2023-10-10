const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charLength = chars.length;

function makeHashSeed(length) {
  let hashSeed = '';
  let counter = 0;
  while (counter < length) {
    hashSeed += chars.charAt(Math.floor(Math.random() * charLength));
    counter += 1;
  }
  return hashSeed;
}

function sha256(ascii) {
  function rightRotate(value, amount) {
      return (value>>>amount) | (value<<(32 - amount));
  };
  
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length'
  var i, j; // Used as a counter across the whole file
  var result = ''

  var words = [];
  var asciiBitLength = ascii[lengthProperty]*8;
  
  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = sha256.h = sha256.h || [];
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty];
  /*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
          for (i = 0; i < 313; i += candidate) {
              isComposite[i] = candidate;
          }
          hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
          k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
      }
  }
  
  ascii += '\x80' // Append Ƈ' bit (plus zero padding)
  while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j>>8) return; // ASCII check: only accept characters in range 0-255
      words[i>>2] |= j << ((3 - i)%4)*8;
  }
  words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
  words[words[lengthProperty]] = (asciiBitLength)
  
  // process each chunk
  for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
      var oldHash = hash;
      // This is now the undefinedworking hash", often labelled as variables a...g
      // (we have to truncate as well, otherwise extra entries at the end accumulate
      hash = hash.slice(0, 8);
      
      for (i = 0; i < 64; i++) {
          var i2 = i + j;
          // Expand the message into 64 words
          // Used below if 
          var w15 = w[i - 15], w2 = w[i - 2];

          // Iterate
          var a = hash[0], e = hash[4];
          var temp1 = hash[7]
              + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
              + ((e&hash[5])^((~e)&hash[6])) // ch
              + k[i]
              // Expand the message schedule if needed
              + (w[i] = (i < 16) ? w[i] : (
                      w[i - 16]
                      + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                      + w[i - 7]
                      + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                  )|0
              );
          // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
          var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
              + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
          
          hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
          hash[4] = (hash[4] + temp1)|0;
      }
      
      for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i])|0;
      }
  }
  
  for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
          var b = (hash[i]>>(j*8))&255;
          result += ((b < 16) ? 0 : '') + b.toString(16);
      }
  }
  console.log(result)
  return result;
};

const hashSeed = makeHashSeed(64)

console.log(hashSeed)
var hash = sha256(hashSeed)
//var hash = '2484da0c5b08a412867521e32ebe870b9fab887c292c4a66a69e5349433d4091'
console.log(hash)

const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(hash.slice(2 + (j * 2), 4 + (j * 2)));
}
const decPairs = hashPairs.map(x => {
  return parseInt(x, 16);
});

S=Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);

const seed = parseInt(hash.slice(2,16), 16);

let rnd_callCount = 0;

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

function w(val) {if (val == null) return width;return width * val;}
function h(val) {if (val == null) return height;return height * val;}

/// fake tD object to test ipfs connection
const depData = {
	externalAssetDependencies: [
	  {
    cid: "QmXZAMSbkVg2mBLaFBSz7JU8KVbdP61kiBJuBczFuhWjES",
		dependency_type: "ipfs"
	  },
	],
  preferredIPFSGateway:"https://black-indirect-dragon-602.mypinata.cloud"
}

///// mimicking tD object for ipfs test
const gateway = depData.preferredIPFSGateway;
const content = depData.externalAssetDependencies[0].cid;
const hostType  = depData.externalAssetDependencies[0].dependency_type;

const directory = gateway + '/' + hostType + '/' + content;

let newThemes = {
  rococo: 'rococo',
  allWhite: 'allWhite',
  digital: 'digital',
  countryGarden: 'countryGarden',
  neon: 'neon',
  graphic: 'graphic'
}

const themes = {
  // rococo: {
  //   name: 'rococo',
  //   bgColors: {
  //     bgCol1: [200,222,252],
  //     bgCol2: [252,195,203],
  //     bgCol2: [255,255,212],
  //     bgCol4: [245,227,130]
  //   },
  //   flowers_B: {
  //     fileLocation: directory + '/_rococo/flowers_B',
  //     num: 9,
  //     maxNum: 32
  //   },
  //   flowers_F: {
  //     fileLocation: directory + '/_rococo/flowers_F',
  //     num: 20,
  //     maxNum: 60
  //   },
  //   flowers: {
  //     fileLocation: directory + '/_rococo/flowers',
  //     num: 10,
  //     maxNum: 12
  //   },
  //   bigFlowers: {
  //     fileLocation: directory + '/_rococo/bigFlowers',
  //     num: 1,
  //     maxNum: 9
  //   },
  //   paint: {
  //     fileLocation: directory + '/_rococo/paint',
  //     num: 6,
  //     maxNum: 14
  //   },
  //   paintLG: {
  //     fileLocation: directory + '/_rococo/paintLG',
  //     num: 4,
  //     maxNum: 9
  //   },
  //   texture: {
  //     fileLocation: directory + '/_rococo/textures',
  //     num: 4,
  //     maxNum: 14
  //   },
  //   fullTexture: {
  //     fileLocation: directory + '/_rococo/fullTextures',
  //     maxNum: 36
  //   },
  //   floor: {
  //     fileLocation: directory + '/_rococo/floors',
  //     num: 1,
  //     maxNum: 12
  //   },
  //   vase: {
  //     fileLocation: directory + '/_rococo/vases',
  //     num: 1,
  //     maxNum: 13
  //   },
  //   vaseFlowersB: {
  //     fileLocation: directory + '/_rococo/vaseFlowers/_B',
  //     num: 1,
  //     maxNum: 10
  //   },
  //   vaseFlowersF: {
  //     fileLocation: directory + '/_rococo/vaseFlowers/_F',
  //     num: 2,
  //     maxNum: 14
  //   },
  //   colors: {
  //     a: [200,222,252],
  //     b: [251,234,236],
  //     c: [254,255,235],
  //     d: [245,227,130]
  //   }
  // },

  // countryGarden: {
  //   name: 'countryGarden',
  //   bgColors: {
  //     bgCol1: [242,231,227],
  //     bgCol2: [224,203,166],
  //     bgCol2: [138,133,105],
  //     bgCol4: [187,180,193]
  //   },
  //   flowers_B: {
  //     fileLocation: directory + '/_countryGarden/flowers_B',
  //     num: 9,
  //     maxNum: 50
  //   },
  //   flowers_F: {
  //     fileLocation: directory + '/_countryGarden/flowers_F',
  //     num: 20,
  //     maxNum: 48
  //   },
  //   bigFlowers: {
  //     fileLocation: directory + '/_countryGarden/bigFlowers',
  //     num: 1,
  //     maxNum: 4
  //   },
  //   paint: {
  //     fileLocation: directory + '/_countryGarden/paint',
  //     num: 10,
  //     maxNum: 34
  //   },
  //   paintLG: {
  //     fileLocation: directory + '/_countryGarden/paintLG',
  //     num: 5,
  //     maxNum: 12
  //   },
  //   texture: {
  //     fileLocation: directory + '/_countryGarden/textures',
  //     num: 6,
  //     maxNum: 15
  //   },
  //   fullTexture: {
  //     fileLocation: directory + '/_countryGarden/fullTextures',
  //     maxNum: 12
  //   },
  //   floor: {
  //     fileLocation: directory + '/_countryGarden/floors',
  //     num: 1,
  //     maxNum: 5
  //   },
  //   vase: {
  //     fileLocation: directory + '/_countryGarden/vases',
  //     num: 1,
  //     maxNum: 13
  //   },
  //   vaseFlowersB: {
  //     fileLocation: directory + '/_countryGarden/vaseFlowers/_B',
  //     num: 1,
  //     maxNum: 7
  //   },
  //   vaseFlowersF: {
  //     fileLocation: directory + '/_countryGarden/vaseFlowers/_F',
  //     num: 2,
  //     maxNum: 7
  //   },
  //   colors: {
  //     a: [85,113,131],
  //     b: [164,205,163],
  //     c: [216,180,227],
  //     d: [225,227,180]
  //   }
  // },

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
      fileLocation: directory + '/_digital/flowers',
      num: 8,
      maxNum: 42
    },
    bigFlowers: {
      fileLocation: directory + '/_digital/bigFlowers',
      num: 1,
      maxNum: 7
    },
    paint: {
      fileLocation: directory + '/_digital/paint',
      num: 12,
      maxNum: 18
    },
    paintLG: {
      fileLocation: directory + '/_digital/paintLG',
      num: 6,
      maxNum: 17
    },
    texture: {
      fileLocation: directory + '/_digital/textures',
      num: 4,
      maxNum: 17
    },
    fullTexture: {
      fileLocation: directory + '/_digital/fullTextures',
      maxNum: 21
    },
    ovTexture: {
      fileLocation: directory + '/_digital/overlayTextures',
      maxNum: 3
    },
    floor: {
      fileLocation: directory + '/_digital/floors',
      num: 1,
      maxNum: 6
    },
    vase: {
      fileLocation: directory + '/_digital/vases',
      num: 1,
      maxNum: 6
    },
    vaseFlowersB: {
      fileLocation: directory + '/_digital/vaseFlowers/_B',
      num: 1,
      maxNum: 5
    },
    vaseFlowersF: {
      fileLocation: directory + '/_digital/vaseFlowers/_F',
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
      fileLocation: directory + '/_cmyk/flowers',
      num: 10,
      maxNum: 36
    },
    bigFlowers: {
      fileLocation: directory + '/_cmyk/bigFlowers',
      num: 1,
      maxNum: 7
    },
    paint: {
      fileLocation: directory + '/_cmyk/paint',
      num: 12,
      maxNum: 51
    },
    paint2: {
      fileLocation: directory + '/_cmyk/paint',
      num: 12,
      maxNum: 44
    },
    paintLG: {
      fileLocation: directory + '/_cmyk/paintLG',
      num: 6,
      maxNum: 32
    },
    texture: {
      fileLocation: directory + '/_cmyk/textures',
      num: 4,
      maxNum: 17
    },
    fullTexture: {
      fileLocation: directory + '/_cmyk/fullTextures',
      maxNum: 22
    },
    floor: {
      fileLocation: directory + '/_cmyk/floors',
      num: 1,
      maxNum: 3
    },
    vase: {
      fileLocation: directory + '/_cmyk/vases',
      num: 1,
      maxNum: 5
    },
    vaseFlowersB: {
      fileLocation: directory + '/_cmyk/vaseFlowers/_B',
      num: 1,
      maxNum: 7
    },
    vaseFlowersF: {
      fileLocation: directory + '/_cmyk/vaseFlowers/_F',
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
      fileLocation: directory + '/_allWhite/flowers',
      num: 20,
      maxNum: 38
    },
    bigFlowers: {
      fileLocation: directory + '/_allWhite/bigFlowers',
      num: 1,
      maxNum: 10
    },
    paint: {
      fileLocation: directory + '/_allWhite/paint',
      num: 11,
      maxNum: 14
    },
    paintLG: {
      fileLocation: directory + '/_allWhite/paintLG',
      num: 6,
      maxNum: 19
    },
    texture: {
      fileLocation: directory + '/_allWhite/textures',
      num: 4,
      maxNum: 10
    },
    fullTexture: {
      fileLocation: directory + '/_allWhite/fullTextures',
      maxNum: 13
    },
    floor: {
      fileLocation: directory + '/_allWhite/floors',
      num: 1,
      maxNum: 5
    },
    vase: {
      fileLocation: directory + '/_allWhite/vases',
      num: 1,
      maxNum: 8
    },
    vaseFlowersB: {
      fileLocation: directory + '/_allWhite/vaseFlowers/_B',
      num: 1,
      maxNum: 4
    },
    vaseFlowersF: {
      fileLocation: directory + '/_allWhite/vaseFlowers/_F',
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
      fileLocation: directory + '/_graphic/flowers',
      num: 10,
      maxNum: 31
    },
    bigFlowers: {
      fileLocation: directory + '/_graphic/bigFlowers',
      num: 1,
      maxNum: 6
    },
    paint: {
      fileLocation: directory + '/_graphic/paint',
      num: 9,
      maxNum: 60
    },
    paintLG: {
      fileLocation: directory + '/_graphic/paintLG',
      num: 3,
      maxNum: 33
    },
    texture: {
      fileLocation: directory + '/_graphic/textures',
      num: 2,
      maxNum: 14
    },
    fullTexture: {
      fileLocation: directory + '/_graphic/fullTextures',
      maxNum: 19
    },
    floor: {
      fileLocation: directory + '/_graphic/floors',
      num: 1,
      maxNum: 5
    },
    vase: {
      fileLocation: directory + '/_graphic/vases',
      num: 1,
      maxNum: 12
    },
    vaseFlowersB: {
      fileLocation: directory + '/_graphic/vaseFlowers/_B',
      num: 1,
      maxNum: 9
    },
    vaseFlowersF: {
      fileLocation: directory + '/_graphic/vaseFlowers/_F',
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
  horizontal: {
    name: 'horizontal',
    minD: 7,
    maxD: 11,
    texture: {
      minY: .4,
      maxY: .6
    },
    paintLG: {
      minY: 0,
      maxY: 1
    },
    paint: {
      minY: 0,
      maxY: 1
    },
    flowers: {
      minY: 0,
      maxY: 1
    },
    flowers_B: {
      minY: 0,
      maxY: 1
    },
    flowers_F: {
      minY: 0,
      maxY: 1
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
let ovTex;

let graphics;

let orderedDraw = [];
let drawNum = 0;



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

let ovTextureAssets = [];
let ovTextureAssets2 = [];
let ovTextureAssetIds = [];

let bigFlowerAssets = [];
let bigFlowerAssets2 = [];
let bigFlowerAssetIds = [];

let blackRoseAssets = [];
let blackRoseAssets2 = [];
let blackRoseAssetIds = [];

let petalAssets = [];
let petalAssets2 = [];
let petalAssetIds = [];

let frameAssets = [];
let frameAssets2 = [];
let frameAssetIds = [];





function preload() {
  console.log(hash)

  //comp = chooseComp()
  comp = comps.horizontal;
  theme = chooseTheme()
  //theme = themes.countryGarden;

  if (comp.name ==! 'horizontal') {
    aspRatio = 16/9;
  }else{
    aspRatio = 9/16;
  }

  overlay = rnd()

  if (comp.name === 'stillLife') {
    stillLifeLoad(theme,ovTex)
  }else{
    if (theme.name === 'digital') {
      ovTex = rnd()
    }else{
      ovTex = 1
    }
    standardLoad(comp,theme,ovTex,overlay)
  }

  socials = map(decPairs[3],0,255,0,1);
  if (socials < .5) {
    numSocials = 0
  }else if (socials < .85) {
    numSocials = 5
  }else{
    numSocials = 12
  }
  socialsLoad(numSocials)
  console.log('num socials' + numSocials)

  butterflies = map(decPairs[4],0,255,0,1);
  if (butterflies < .7) {
    numButts = 0
  }else if (socials < .94) {
    numButts = 5
  }else{
    numButts = 12
  }
  butterfliesLoad(numButts)
  console.log('num butterflies' + numButts)

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
    blackRoseLoad()
  }

  console.log(comp.name + '  ////  ' + theme.name + '  ////  ' + numSocials + '  ////  ' + numOverTop + '  ////  ' + numButts)
}

function setup() {
  noiseSeed(seed)
  pixelDensity(4)

	smD = (windowWidth * aspRatio) < windowHeight ? windowWidth : windowHeight / aspRatio ; 

	createCanvas(smD, smD*aspRatio);

  console.log('width: ' + width)
  console.log('height: ' + height)

  // translate(width/2,height/2)
  let bgCol = chooseObjKey(theme.bgColors)
  background(bgCol)

  imageMode(CENTER);

  if (comp.name === 'stillLife') {
    // stillLife(comp,theme,hasBlackRose)
  }else{
    //standard(comp,theme,ovTex,hasBlackRose)
    hStandard(theme)
  }

  if (comp.name !== 'stillLife'){
    // standardLayer1()
    // standardLayer2()
    // standardDraw1()
    // standardDraw2()
  }else{
    // stillLifeLayer1()
    // stillLifeLayer2()
  }

  console.log(orderedDraw)

}

function draw() {
  drawItIn()
  ellipse(0,0,50)
  ellipse(w(.5),h(.5),50)
  ellipse(width,height,50)
  ellipse(width,0,50)
  ellipse(0,height,50)
  line(0,height/2,width,height/2)
  line(width/2,0,width/2,height)
}



function chooseValue(obj) {
  let keys = Object.keys(obj);
  return obj[keys[ keys.length * rnd() << 0]]
};




function loadRandomAssets(num,maxNum,baseArray,fileLoc,fileNameConvention,type,idArray) {
  let array = Array.from(new Array(maxNum-1), (x,i) => i)
  for (let i = 0; i < num; i++) {
    let index = floor(rnd(array.length))
    let assetId = array[index]
    array.splice(index,1)
    baseArray.push(new LoadAsset(fileLoc,fileNameConvention,assetId+1,type,idArray))
    baseArray[i].load()
  }
}

function standardLoad(comp,theme,ovTex) {
  if (comp.name === 'lowDensity') {
    fullTextureAssets.push(new LoadAsset(directory + '/_' + theme.name + '/' + 'lowD_fT','lowD_fT_',1,'none',fullTextureAssetIds))
    fullTextureAssets[0].load()
  }else{
    let maxFullTextureId = theme.fullTexture.maxNum;
    let fullTextureId = floor(map(decPairs[21],0,255,1,maxFullTextureId-.1));
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
}




function socialsLoad(numSocials) {
  maxNumSocials = 24
  loadRandomAssets(numSocials, maxNumSocials, socialAssets, directory + '/socials', 'social_', 'none', socialAssetIds)
}

function butterfliesLoad(numButts) {
  maxNumButts = 21
  loadRandomAssets(numButts, maxNumButts, butterflyAssets, directory + '/butterflies', 'butterfly_', 'none', butterflyAssetIds)
}

function overTopLoad(numOverTop) {
  maxNumOverTop = 18
  loadRandomAssets(numOverTop, maxNumOverTop, overTopAssets, directory + '/_overTop', 'overTop_', 'none', overTopAssetIds)
}

function blackRoseLoad() {
  maxId = 2
  loadRandomAssets(1, maxId, blackRoseAssets, directory + '/_blackRose', 'blackRose_', 'none', blackRoseAssetIds)
}




function hStandard(theme) {
  minD = comp.minD, maxD = comp.maxD;

  push()
  let fT = fullTextureAssetIds[0]
  translate(width/2,height/2)
  rotate(radians(90))
  image(fT,0,0,height,width)
  pop()

  for (let i = 0; i < textureAssets.length; i++) {
    let pElPos = createVector(rnd(w(.05),w(.95)),rnd(h(.05),h(.95)));
    let imgId = textureAssetIds[i]
    let imgDiv = rnd(minD,maxD)/3
    stSizeAdjust = 1;
    textureAssets2.push(new PlaceAsset(imgId, pElPos, (width/imgDiv)*stSizeAdjust, (height/imgDiv/aspRatio)*stSizeAdjust))
    textureAssets2[i].addToArray()
  }

  for (let i = 0; i < paintLGAssets.length; i++) {
    let pElPos = createVector(rnd(0,width),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
    let imgId = paintLGAssetIds[i]
    let imgDiv = rnd(minD,maxD)/4
    stSizeAdjust = 1;
    paintLGAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    paintLGAssets2[i].addToArray()
  }

  for (let i = 0; i < paintAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.paint.minY),h(comp.paint.maxY)))
    let imgId = paintAssetIds[i]
    let imgDiv = rnd(minD,maxD)/2
    stSizeAdjust = map(pElPos.y,h(comp.paint.minY),h(comp.paint.maxY),1,1.7);
    paintAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    paintAssets2[i].addToArray()
  }

  if (theme.name === 'rococo') {
    for (let i = 0; i < flower_B_assets.length;i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers_B.minY),h(comp.flowers_B.maxY)))
      let imgId = flower_B_AssetIds[i]
      let imgDiv = rnd(minD,maxD)
      stSizeAdjust = map(pElPos.y,h(comp.flowers_B.minY),h(comp.flowers_B.maxY),1.3,1.8);
      flower_B_Assets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      flower_B_Assets2[i].addToArray()
    }
    for (let i = 0; i < flower_F_Assets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers_F.minY),h(comp.flowers_F.maxY)))
      let imgId = flower_F_AssetIds[i]
      let imgDiv = rnd(minD,maxD)*1.2
      stSizeAdjust = map(pElPos.y,h(comp.flowers_F.minY),h(comp.flowers_F.maxY),1,1.7);
      flower_F_Assets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      flower_F_Assets2[i].addToArray()
    }
  }else{
    console.log('num flowers: ' + flowerAssets.length)
    for (let i = 0; i < flowerAssets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
      let imgId = flowerAssetIds[i]
      let imgDiv = rnd(minD,maxD)
      stSizeAdjust = map(pElPos.y,h(comp.flowers.minY),h(comp.flowers.maxY),1,1.7);
      flowerAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      flowerAssets2[i].addToArray()
    }
  }
}

function standard(comp,theme) {
  minD = comp.minD, maxD = comp.maxD;

  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  push()
  rotate(radians(90))
  //image(fT,0,0,width,height)
  pop()

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
    // let pElPos = createVector(rnd(-w(.35),w(.35)),rnd(h(comp.texture.minY),h(comp.texture.maxY)))
    let pElPos = createVector(rnd(w(.4),w(.6)),rnd(h(comp.texture.minY),h(comp.texture.maxY)))
    let imgId = textureAssetIds[i]
    let imgDiv = rnd(minD,maxD)/3

    if (comp.name === 'standard') {
      stSizeAdjust = map(pElPos.y,h(comp.texture.minY),h(comp.texture.maxY),1,1.7);
    }else if(comp.name === 'dominant'){
      stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.8,.6);
    }else if(comp.name === 'lowDensity'){
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
    blendMode(bMode)
    push()
    rotate(90*floor(rnd(4)))
    textureAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    // textureAssets2[i].setItem()
    pop()
  }

  for (let i = 0; i < paintLGAssets.length; i++) {
    // let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
    let pElPos = createVector(rnd(0,width),rnd(h(comp.paintLG.minY),h(comp.paintLG.maxY)))
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

    let bMode = BLEND
    blendMode(bMode)
    paintLGAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    // paintLGAssets2[i].setItem()
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

    if (comp.name === 'standard' || comp.name === 'horizontal') {
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
    blendMode(bMode)
    paintAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
    // paintAssets2[i].setItem()
  }

  placeSocials(comp)

  let flower_F_Arraysplit = flower_F_Assets.length > 6 ? flower_F_Assets.length-4 : flower_F_Assets.length;
  let flowerArraysplit = flowerAssets.length > 6 ? flowerAssets.length-4 : flowerAssets.length;

  if (theme.name === 'countryGarden' || theme.name === 'rococo') {
    for (let i = 0; i < flower_B_Assets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers_B.minY),h(comp.flowers_B.maxY)))
      let imgId = flower_B_AssetIds[i]
      let imgDiv = rnd(minD,maxD)

      if (comp.name === 'standard' || comp.name === 'horizontal') {
        stSizeAdjust = map(pElPos.y,h(comp.flowers_B.minY),h(comp.flowers_B.maxY),1.3,1.8);
      }else if(comp.name === 'dominant'){
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.8,.75);
      }else if(comp.name === 'lowDensity'){
        stSizeAdjust = map(dist(pElPos.x,pElPos.y,domPos.x,domPos.y),0,w(1.2),1.15,.75);
      }else{
        stSizeAdjust = 1;
      }

      let bMode = BLEND
      blendMode(bMode)
      flower_B_Assets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      flower_B_Assets2[i].setItem()
    }
    for (let i = 0; i < flower_F_Assets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers_F.minY),h(comp.flowers_F.maxY)))
      let imgId = flower_F_AssetIds[i]
      let imgDiv = rnd(minD,maxD)*1.2

      if (comp.name === 'standard' || comp.name === 'horizontal') {
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
      blendMode(bMode)
      flower_F_Assets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      // flower_F_Assets2[i].setItem()
    }
  }else{
    for (let i = 0; i < flowerAssets.length; i++) {
      let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.flowers.minY),h(comp.flowers.maxY)))
      let imgId = flowerAssetIds[i]
      let imgDiv = rnd(minD,maxD)

      if (comp.name === 'standard' || comp.name === 'horizontal') {
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
      blendMode(bMode)
      flowerAssets2.push(new PlaceAsset(imgId,pElPos,(width/imgDiv)*stSizeAdjust,(height/imgDiv/aspRatio)*stSizeAdjust))
      // flowerAssets2[i].setItem()
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
    // bigFlowerAssets2[0].setItem()
    pop()
  }
}

function standardLayer1() {
  blendMode(BLEND)
  let fT = fullTextureAssetIds[0]
  image(fT,0,0,width,height)

  for (let i = 0; i < textureAssets2.length; i++) {
    textureAssets2[i].setItem()
    textureAssets2[i].addToArray()
  }

  for (let i = 0; i < paintLGAssets2.length; i++) {
    paintLGAssets2[i].setItem()
    paintLGAssets2[i].addToArray()
  }
}

function standardLayer2() {

  let paintArraysplit = paintAssets2.length - 6

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = 0; i < paintArraysplit; i++) {
      paintAssets2[i].setItem()
      paintAssets2[i].addToArray()
    }
  }else{
    for (let i = 0; i < paintAssets2.length; i++) {
      paintAssets2[i].setItem()
      paintAssets2[i].addToArray()
    }
  }

  for (let i = 0; i < socialAssets2.length; i++) {
    socialAssets2[i].setItem()
    socialAssets2[i].addToArray()
  }

  for (let i = 0; i < flower_B_Assets2.length; i++) {
    flower_B_Assets2[i].setItem()
    flower_B_Assets2[i].addToArray()
  }

  let flower_F_Arraysplit = flower_F_Assets2.length > 6 ? flower_F_Assets2.length-4 : flower_F_Assets2.length;
  let flowerArraysplit = flowerAssets2.length > 6 ? flowerAssets2.length-4 : flowerAssets2.length;

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = 0; i < flower_F_Arraysplit; i++) {
      flower_F_Assets2[i].setItem()
      flower_F_Assets2[i].addToArray()
    }
    for (let i = 0; i < flowerArraysplit; i++) {
      flowerAssets2[i].setItem()
      flowerAssets2[i].addToArray()
    }
  }else{
    for (let i = 0; i < flower_F_Assets2.length; i++) {
      flower_F_Assets2[i].setItem()
      flower_F_Assets2[i].addToArray()
    }
    for (let i = 0; i < flowerAssets2.length; i++) {
      flowerAssets2[i].setItem()
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
      bigFlowerAssets2[i].setItem()
      bigFlowerAssets2[i].addToArray()
    }
    pop()
  }

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = flower_F_Arraysplit; i < flower_F_Assets2.length; i++) {
      flower_F_Assets2[i].setItem()
      flower_F_Assets2[i].addToArray()
    }
    for (let i = flowerArraysplit; i < flowerAssets2.length; i++) {
      flowerAssets2[i].setItem()
      flowerAssets2[i].addToArray()
    }
    for (let i = paintArraysplit; i < paintAssets2.length; i++) {
      paintAssets2[i].setItem()
      paintAssets2[i].addToArray()
    }
  }

  for (let i = 0; i < blackRoseAssets2.length; i++) {
    blackRoseAssets2[i].setItem()
    blackRoseAssets2[i].addToArray()
  }

  for (let i = 0; i < butterflyAssets2.length; i++) {
    butterflyAssets2[i].setItem()
    butterflyAssets2[i].addToArray()
  }

  if (ovTex < .3) {
    blendMode(BLEND)
    let overlay = ovTextureAssetIds[0]
    image(overlay,0,0,width,height)
  }

  for (let i = 0; i < overTopAssets2.length; i++) {
    overTopAssets2[i].setItem()
    overTopAssets2[i].addToArray()
  }
}



function placeSocials(comp) {
  minD = comp.minD, maxD = comp.maxD;

  for (let i = 0; i < socialAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(h(comp.paint.minY),h(comp.paint.maxY)))
    let imgId = socialAssetIds[i]
    let imgDiv = rnd(minD,maxD)*2
    let bMode  = BLEND // OVERLAY;
    blendMode(bMode)
    socialAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    socialAssets2[i].setItem()
  }
}

function placeButterflies(comp) {
  minD = comp.minD, maxD = comp.maxD;

  for (let i = 0; i < butterflyAssets.length; i++) {
    let pElPos = createVector(rnd(-w(.48),w(.48)),rnd(-h(.48),h(.48)))
    let imgId = butterflyAssetIds[i]
    let imgDiv = rnd(minD,maxD) / 1.35 //*2
    let bMode  = BLEND // OVERLAY;
    blendMode(bMode)
    butterflyAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    butterflyAssets2[i].setItem()
  }
}

function placeOverTop(comp) {
  minD = comp.minD, maxD = comp.maxD;

  for (let i = 0; i < overTopAssets.length; i++) {
    if (overTopAssets.length > 4) {
      posY = map(i,0,overTopAssets.length,-h(.35),h(.35)) + rnd(-h(.1),h(.1))
    }else{
      posY = map(i,0,overTopAssets.length,-h(.35),h(.35)) + rnd(-h(.2),h(.2))
    }
    let pElPos = createVector(rnd(-w(.32),w(.32)),posY)
    let imgId = overTopAssetIds[i]
    let imgDiv = rnd(minD,maxD)/3//*2
    let bMode  = BLEND // OVERLAY;
    blendMode(bMode)
    overTopAssets2.push(new PlaceAsset(imgId,pElPos,width/imgDiv,height/imgDiv/aspRatio))
    overTopAssets2[i].setItem()
  }
}



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
  let theme = chooseObjKey(themes)
  return theme;
  // let tV = map(decPairs[1],0,255,0,1);
  // console.log(tV)
  // if (tV < .32) {
  //   theme = themes.rococo
  // }else if (tV < .54) {
  //   theme = themes.countryGarden
  // }else if (tV < .72) {
  //   theme = themes.digital
  // }else if (tV < .85){
  //   theme = themes.cmyk
  // }else if (tV < .95){
  //   theme = themes.graphic
  // }else{
  //   theme = themes.allWhite
  // }
  // return theme;
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



function drawItIn() {
  let frames = frameCount;
  let framesModulo = frames % 10;

  //orderedDraw[drawNum].setItem
  let a = orderedDraw[drawNum]
  let startFrame;
  let startFrames = [];

  if (framesModulo == 0 && frames < orderedDraw.length*5) {
    startFrame = frameCount;
    startFrames.push(startFrame)
  }

  // if (framesModulo == 0 && frames < orderedDraw.length*5) {
  //   startFrame = frameCount;
  //   console.log(startFrame,frameCount);
  //   image(a[0],a[1],a[2],a[3],a[4]);
  //   // fill(255,0,0)
  //   // ellipse(a[1],a[2],25)
  //   console.log(a[1],a[2]);
  //   console.log(drawNum);
  //   drawNum++
  // }

  for (let i = 0; i < orderedDraw.length; i++) {
    if (frameCount >= startFrames[i]) {
      let imgAlpha = map(frameCount,startFrames[i],startFrames[i]+24,0,255);
      tint(255,imgAlpha);
      image(a[0],a[1],a[2],a[3],a[4]);
    }
    drawNum++
  }
}

function standardDraw1() {
  blendMode(BLEND)
  push()
  let fT = fullTextureAssetIds[0]
  //rotate(radians(90))
  translate(width/2,height/2)
  rotate(radians(90))
  image(fT,0,0,height,width)
  pop()

  for (let i = 0; i < textureAssets2.length; i++) {
    // textureAssets2[i].addToArray()
  }
  console.log(textureAssets2.length)

  // for (let i = 0; i < paintLGAssets2.length; i++) {
  //   paintLGAssets2[i].addToArray()
  // }
}

function standardDraw2() {

  let paintArraysplit = paintAssets2.length - 6

  // if (comp.name === 'dominant' || comp.name === 'lowDensity') {
  //   for (let i = 0; i < paintArraysplit; i++) {
  //     paintAssets2[i].addToArray()
  //   }
  // }else{
  //   for (let i = 0; i < paintAssets2.length; i++) {
  //     paintAssets2[i].addToArray()
  //   }
  // }

  // for (let i = 0; i < socialAssets2.length; i++) {
  //   socialAssets2[i].addToArray()
  // }

  // for (let i = 0; i < flower_B_Assets2.length; i++) {
  //   flower_B_Assets2[i].addToArray()
  // }

  let flower_F_Arraysplit = flower_F_Assets2.length > 6 ? flower_F_Assets2.length-4 : flower_F_Assets2.length;
  let flowerArraysplit = flowerAssets2.length > 6 ? flowerAssets2.length-4 : flowerAssets2.length;

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = 0; i < flower_F_Arraysplit; i++) {
      flower_F_Assets2[i].addToArray()
    }
    for (let i = 0; i < flowerArraysplit; i++) {
      flowerAssets2[i].addToArray()
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

  if (comp.name === 'dominant' || comp.name === 'lowDensity') {
    for (let i = flower_F_Arraysplit; i < flower_F_Assets2.length; i++) {
      flower_F_Assets2[i].addToArray()
      console.log(i)
    }
    for (let i = flowerArraysplit; i < flowerAssets2.length; i++) {
      flowerAssets2[i].addToArray()
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