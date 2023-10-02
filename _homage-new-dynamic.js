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

class Asset {
  constructor() {
    this.a1 = a1;
    // this.a2 = a2;
    // this.a3 = a3;
    this.pos = pos;
    this.aW = aW;
    this.aH = aH;
    this.angleOffset = angleOffset;
  }

  move() {
    let loc = createVector(this.pos.x,this.pos.y);
    let dir = createVector(cos(0),sin(0));
    let angle = this.angleOffset;
    angle += radians(.01)
    dir.x = cos(angle)*w(.001);
    dir.y = sin(angle)*w(.003);
    loc.add(dir);
    let brrAngle = frameCount / 30
    let brr = map(sin(brrAngle + this.anOf),-1,1,1,1.1)
    return {loc,brr}
  }

  updateAlpha() {
    let cycleRenew = frameCount % 900;
    let a1Alpha = 0;
    if (cycleRenew == 0) {
      console.log('renew cycle')
      a1Alpha = 0
    }
    a1Alpha += .3;
  }

  update(loc,brr) {
    tint(255,this.a1Alpha)
    image.a1(this.a1,loc.x,loc.y,this.aW*brr,this.aH*brr)
    // tint(255,this.a2Alpha)
    // image.a2(this.a2,loc.x,loc.y,this.aW,this.aH)
    // tint(255,this.a3Alpha)
    // image.a3(this.a3,loc.x,loc.y,this.aW,this.aH)
  }
}


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
      fileLocation: directory + '/_rococo/flowers_B',
      num: 9,
      maxNum: 32
    },
    flowers_F: {
      fileLocation: directory + '/_rococo/flowers_F',
      num: 20,
      maxNum: 60
    },
    flowers: {
      fileLocation: directory + '/_rococo/flowers',
      num: 10,
      maxNum: 12
    },
    bigFlowers: {
      fileLocation: directory + '/_rococo/bigFlowers',
      num: 1,
      maxNum: 9
    },
    paint: {
      fileLocation: directory + '/_rococo/paint',
      num: 6,
      maxNum: 14
    },
    paintLG: {
      fileLocation: directory + '/_rococo/paintLG',
      num: 4,
      maxNum: 9
    },
    texture: {
      fileLocation: directory + '/_rococo/textures',
      num: 4,
      maxNum: 14
    },
    fullTexture: {
      fileLocation: directory + '/_rococo/fullTextures',
      maxNum: 36
    },
    floor: {
      fileLocation: directory + '/_rococo/floors',
      num: 1,
      maxNum: 12
    },
    vase: {
      fileLocation: directory + '/_rococo/vases',
      num: 1,
      maxNum: 13
    },
    // vaseFlowers: {
    //   fileLocation: '/_rococo/vaseFlowers',
    //   num: 4,
    //   maxNum: 5
    // },
    vaseFlowersB: {
      fileLocation: directory + '/_rococo/vaseFlowers/_B',
      num: 1,
      maxNum: 10
    },
    vaseFlowersF: {
      fileLocation: directory + '/_rococo/vaseFlowers/_F',
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
      fileLocation: directory + '/_countryGarden/flowers_B',
      num: 9,
      maxNum: 50
    },
    flowers_F: {
      fileLocation: directory + '/_countryGarden/flowers_F',
      num: 20,
      maxNum: 48
    },
    bigFlowers: {
      fileLocation: directory + '/_countryGarden/bigFlowers',
      num: 1,
      maxNum: 4
    },
    paint: {
      fileLocation: directory + '/_countryGarden/paint',
      num: 10,
      maxNum: 34
    },
    paintLG: {
      fileLocation: directory + '/_countryGarden/paintLG',
      num: 5,
      maxNum: 12
    },
    texture: {
      fileLocation: directory + '/_countryGarden/textures',
      num: 6,
      maxNum: 15
    },
    fullTexture: {
      fileLocation: directory + '/_countryGarden/fullTextures',
      maxNum: 12
    },
    floor: {
      fileLocation: directory + '/_countryGarden/floors',
      num: 1,
      maxNum: 5
    },
    vase: {
      fileLocation: directory + '/_countryGarden/vases',
      num: 1,
      maxNum: 13
    },
    // vaseFlowers: {
    //   fileLocation: '/_countryGarden/vaseFlowers',
    //   num: 4,
    //   maxNum: 6
    // },
    vaseFlowersB: {
      fileLocation: directory + '/_countryGarden/vaseFlowers/_B',
      num: 1,
      maxNum: 7
    },
    vaseFlowersF: {
      fileLocation: directory + '/_countryGarden/vaseFlowers/_F',
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
    // vaseFlowers: {
    //   fileLocation: '/_digital/vaseFlowers',
    //   num: 1,
    //   maxNum: 2
    // },
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
    // vaseFlowers: {
    //   fileLocation: '/_cmyk/vaseFlowers',
    //   num: 1,
    //   maxNum: 2
    // },
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
    // vaseFlowers: {
    //   fileLocation: '/_allWhite/vaseFlowers',
    //   num: 1,
    //   maxNum: 2
    // },
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
    // vaseFlowers: {
    //   fileLocation: '/_graphic/vaseFlowers',
    //   num: 1,
    //   maxNum: 4
    // },
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

function preload() {

  //comp = chooseComp()
  comp = comps.standard;
  theme = chooseTheme()
  //theme = themes.countryGarden;

  console.log(hash)

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
	smD = (windowWidth * aspRatio) < windowHeight ? windowWidth : windowHeight / aspRatio ; ``

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
  drawItIn()
  // console.log(rnd_callCount)
}

function loadRandomAssets(num,maxNum,baseArray,fileLoc,fileNameConvention,type,idArray) {
  let array = Array.from(new Array(maxNum-1), (x,i) => i)
  for (let i = 0; i < num; i++) {
    let index = floor(rnd(array.length))
    let assetId = array[index]
    array.splice(index,1)
    //console.log(fileLoc,index,assetId)
    baseArray.push(new LoadAsset(fileLoc,fileNameConvention,assetId+1,type,idArray))
    baseArray[i].load()
  }
}

function standardLoad(comp,theme,ovTex) {

  if (comp.name === 'lowDensity') {
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

  // if (overlay < .5) {
  //   let maxOverlayId = 2
  //   let overlayId = floor(rnd(1,maxOverlayId))
  //   //fullTextureAssets.push(new LoadAsset(theme.fullTexture.fileLocation,'fT_',fullTextureId,'none',fullTextureAssetIds)) 
  //   overlayAssets.push(new LoadAsset(directory + '/_overlays'+'/','overlay_',overlayId,'none',overlayAssetIds))
  //   overlayAssets[0].load()
  // }
}