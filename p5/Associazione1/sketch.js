let col, picker, width, height;
let h, s, b;
let h_, s_, b_;
let cambio,durata;
let title, ac, piano, fine=false;
let sliderTonalita, sliderModo, sliderAltezza;
let sliderTonalitab, sliderModob, sliderAltezzab;

let valt, valm, vala;
let valt_, valm_, vala_;
let valtb, valmb, valab;
let valtb_, valmb_, valab_;
let tempo=0;
let s1,s2,s3,s4,s5;

async function preload(){
  ac = new AudioContext();
  piano = await Soundfont.instrument(ac, 'acoustic_grand_piano');
  fine=true;
}

function setup() {
  picker = createColorPicker('white');
  createCanvas(windowWidth,windowHeight);
  title = createElement('h1','You are listening to a note played by an instrument');
  s1 = createElement('h1', 'Accordo');

}

function draw() {
  if(fine){
    colorMode(HSB);
    resizeCanvas(windowWidth,windowHeight);
    title.position(windowWidth/2,windowHeight*0);
    title.center('horizontal');
    title.style('font-size','40px');
    picker.position(windowWidth*0.3,windowHeight*0.2);
    background(picker.color());
    line(windowWidth*0.2,windowHeight*0.22,windowWidth*0.28,windowHeight*0.22);
    line(windowWidth*0.28,windowHeight*0.22,windowWidth*0.27,windowHeight*0.21);
    line(windowWidth*0.28,windowHeight*0.22,windowWidth*0.27,windowHeight*0.23);
    h=hue(picker.color());
    s=saturation(picker.color());
    b=brightness(picker.color());
    vala = 1;
    valt = 0;
    valm = 2;
    if(b>80 ){
      title.style('color','black');
    } else {
      title.style('color','white');
    }
    if ((h!=h_ || s!=s_ || b!=b_ || vala!=vala_ || valm!=valm_ || valt!=valt_ )&& (millis()-tempo)>300){
      tempo=millis();
      h_=h;
      s_=s;
      b_=b;
      vala_=vala;
      valm_=valm;
      valt_=valt;
      cambio=true;
    }

    if(cambio==true ){
      suona(h,s,b);
      cambio=false;
    }
  }

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

  durata = 0.5;
  playMinore(nota, altezza){
    piano.play(nota.tonica + altezza, ac.currentTime, { duration: durata})
    piano.play(nota.terzam + altezza, ac.currentTime, { duration: durata})
    piano.play(nota.quinta + altezza, ac.currentTime, { duration: durata})
  }

  playMaggiore(nota, altezza){
    piano.play(nota.tonica + altezza, ac.currentTime, { duration: durata})
    piano.play(nota.terzaM + altezza, ac.currentTime, { duration: durata})
    piano.play(nota.quinta + altezza, ac.currentTime, { duration: durata})
  }

  playSettima(nota, altezza){
    piano.play(nota.tonica + altezza, ac.currentTime, { duration: durata})
    piano.play(nota.terzaM + altezza, ac.currentTime, { duration: durata})
    piano.play(nota.quinta + altezza, ac.currentTime, { duration: durata})
    piano.play(nota.settima + altezza, ac.currentTime, { duration: durata})
  }

}

function suona(h,s,b){

  if (vala==0){
    a=h;
  } else if (vala==1){
    a=s;
  } else if (vala ==2){
    a=b;
  }
  // corrispondenza valore - altezza dell'accordo
  let altezza;
  if(a>85.7){
    altezza = 7;
  } else if (a>71.4){
    altezza = 6;
  } else if (a>57.1){
    altezza = 5;
  } else if (a>42.8){
    altezza = 4;
  } else if (a>28.5){
    altezza = 3;
  } else if (a>14.3){
    altezza = 2;
  } else {
    altezza = 1;
  }


  // corrispondenza valore - tonalità

  if (valt==0){
    a=h;
  } else if (valt==1){
    a=s;
  } else if (valt ==2){
    a=b;
  }

  let n;
  if (a>330){
    n = 1;
  } else if (a>300){
    n =2;
  } else if (a>270){
    n =3;
  } else if (a>240){
    n =4;
  } else if (a>210){
    n =5;
  } else if (a>180){
    n =6;
  } else if (a>150){
    n =7;
  } else if (a>120){
    n =8;
  } else if (a>90){
    n =9;
  } else if (a>60){
    n =10;
  } else if (a>30){
    n =11;
  } else {
    n =12;
}

  n = new Nota(n);

  // corrispondenza valore - Accordo

  let acc = new Accordo();
  if (valm==0){
    a=h;
  } else if (valm==1){
    a=s;
  } else if (valm ==2){
    a=b;
  }

  if(a>60){
    acc.playSettima(n,altezza);
    title.html('You are listening to a ' + n.tonica + altezza +' seventh');
  } else if (a>30){
    acc.playMaggiore(n,altezza);
    title.html('You are listening to a ' + n.tonica + altezza +' major');
  } else {
    acc.playMinore(n,altezza);
    title.html('You are listening to a ' + n.tonica + altezza +' minor ');
  }

}
