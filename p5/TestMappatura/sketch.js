let col, width, height;
let h, s, b;
let h_, s_, b_;
let cambio,durata;
let title, ac, piano, fine=false;
let vala, valm, valt;
let valtb=0, valmb=0, valab=0;
let tempo=0;
let s1,s2,s3,s4,s5;
let sliderA, sliderM, sliderT,immagine;


async function preload(){
  ac = new AudioContext();
  piano = await Soundfont.instrument(ac, 'acoustic_grand_piano');
  fine=true;
  immagine = loadImage('ladybug.jpg');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  title = createElement('h1','Stai ascoltando una nota di uno strumento');
  sliderA = createSlider(0,2,0);
  sliderM = createSlider(0,2,1);
  sliderT = createSlider(0,2,2);
}

function draw() {
  colorMode(HSB);
  if(fine){
    vala=sliderA.value();
    valm=sliderM.value();
    valt=sliderT.value();
    posiziona_elementi();
    h=hue(col);
    s=saturation(col);
    b=brightness(col);
    if ((millis()-tempo)>1000 && mouseX<immagine.width*0.7 && mouseY<immagine.height*0.7){
      tempo=millis();
      h_=h;
      s_=s;
      b_=b;
      cambio=true;
    }

    if(cambio==true ){
      suona(h,s,b);
      cambio=false;
    }
  }

}

function posiziona_elementi() {
  colorMode(RGB);
  resizeCanvas(windowWidth,windowHeight);
  title.position(windowWidth*0.2,windowHeight*0.88);
  title.style('font-size','20px');
  title.style('color','black');
  image(immagine, 0,0,immagine.width*0.7, immagine.height*0.7)
  col = color(get(mouseX,mouseY));
  fill(col);
  ellipse(mouseX,mouseY,40,40);
  sliderA.position(windowWidth*0.8,windowHeight*0.2);
  sliderM.position(windowWidth*0.8,windowHeight*0.4);
  sliderT.position(windowWidth*0.8,windowHeight*0.6);

}


const elenco_note= ['D', 'D#', 'E','F', 'F#','G', 'G#','A','A#','B','C','C#','D', 'D#', 'E','F', 'F#','G', 'G#','A','A#','B','C','C#'];

class Nota{
  constructor(tonicaInt){
    this.tonica = elenco_note[tonicaInt];
    this.terzaM = elenco_note[tonicaInt + 4];
    this.terzam = elenco_note[tonicaInt + 3];
    this.quinta = elenco_note[tonicaInt+ 7];
    this.settima = elenco_note[tonicaInt + 10];
  }
}

class Accordo{

  playMinore(nota, altezza){
    piano.play(nota.tonica + altezza, ac.currentTime, { duration: 1})
    piano.play(nota.terzam + altezza, ac.currentTime, { duration: 1})
    piano.play(nota.quinta + altezza, ac.currentTime, { duration: 1})
  }

  playMaggiore(nota, altezza){
    piano.play(nota.tonica + altezza, ac.currentTime, { duration: 1})
    piano.play(nota.terzaM + altezza, ac.currentTime, { duration: 1})
    piano.play(nota.quinta + altezza, ac.currentTime, { duration: 1})
  }

  playSettima(nota, altezza){
    piano.play(nota.tonica + altezza, ac.currentTime, { duration: 1})
    piano.play(nota.terzaM + altezza, ac.currentTime, { duration: 1})
    piano.play(nota.quinta + altezza, ac.currentTime, { duration: 1})
    piano.play(nota.settima + altezza, ac.currentTime, { duration: 1})
  }

}

function suona(h,s,b){
  let max;
  if (vala==0){
    a=h;
    max=360;
  } else if (vala==1){
    a=s;
    max=100;
  } else if (vala ==2){
    a=b;
    max=100;
  }
  // corrispondenza valore - altezza dell'accordo
  let altezza, altezza1, altezza2;
  if(a>max*0.857){
    altezza1 = 7;
    altezza2 = 1;
  } else if (a>max*0.714){
    altezza1 = 6;
    altezza2 = 2;
  } else if (a>max*0.571){
    altezza1 = 5;
    altezza2 = 3;
  } else if (a>0.428){
    altezza1 = 4;
    altezza2 = 4;
  } else if (a>0.285){
    altezza1 = 3;
    altezza2 = 5;
  } else if (a>0.143){
    altezza1 = 2;
    altezza2 = 6;
  } else {
    altezza1 = 1;
    altezza2 = 7;
  }
  if(valab==0){
    altezza=altezza1;
  } else{
    altezza=altezza2;
  }

  // corrispondenza valore - tonalità

  if (valt==0){
    a=h;
    max = 360;
  } else if (valt==1){
    a=s;
    max=100;
  } else if (valt ==2){
    a=b;
    max=100;
  }

  let n,n1,n2;
  if (a>max*0.916){
    n1 = 1;
    n2 = 11;
  } else if (a>max*0.833){
    n1 =2;
    n2 = 11;
  } else if (a>max*0.749){
    n1 =3;
    n2 = 10;
  } else if (a>max*0.667){
    n1 =4;
    n2 = 9;
  } else if (a>max*0.583){
    n1 =5;
    n2 = 8;
  } else if (a>max*0.5){
    n1 =6;
    n2 = 7;
  } else if (a>max*0.417){
    n1 =7;
    n2 = 6;
  } else if (a>max*0.333){
    n1 =8;
    n2 = 5;
  } else if (a>max*0.25){
    n1 =9;
    n2 = 4;
  } else if (a>max*0.167){
    n1 =10;
    n2 = 3;
  } else if (a>max*0.083){
    n1 =11;
    n2 = 2;
  } else {
    n1 =12;
    n2 = 1;
  }

  if (valtb==0){
    n = new Nota(n1);
  } else {
    n = new Nota(n2);
  }

  // corrispondenza valore - Accordo

  let acc = new Accordo();
  if (valm==0){
    a=h;
    max=360;
  } else if (valm==1){
    a=s;
    max=100;
  } else if (valm ==2){
    a=b;
    max=100;
  }


  if(a>max*2/3){
    if(valtb==0){
      acc.playSettima(n,altezza);
      title.html('Stai ascoltando un ' + n.tonica + altezza +' settima');
    } else {
      acc.playMinore(n,altezza);
      title.html('Stai ascoltando un ' + n.tonica + altezza +' minore');
    }

  } else if (a>max/3){
    acc.playMaggiore(n,altezza);
    title.html('Stai ascoltando un ' + n.tonica + altezza +' maggiore');

  } else {
    if(valtb==0){
      acc.playMinore(n,altezza);
      title.html('Stai ascoltando un ' + n.tonica + altezza +' minore');
    } else {
      acc.playSettima(n,altezza);
      title.html('Stai ascoltando un ' + n.tonica + altezza +' settima');
    }

  }

}
