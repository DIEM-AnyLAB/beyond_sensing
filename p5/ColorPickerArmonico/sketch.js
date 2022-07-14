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
  title = createElement('h1','Stai ascoltando una nota di uno strumento');
  sliderModo = createSlider(0,2,1,1);
  sliderTonalita = createSlider(0,2,0,1);
  sliderAltezza = createSlider(0,2,2,1);
  sliderModob = createSlider(0,1,0);
  sliderTonalitab = createSlider(0,1,0);
  sliderAltezzab = createSlider(0,1,0);
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
    sliderModo.position(windowWidth*0.6,windowHeight*0.3);
    sliderTonalita.position(windowWidth*0.6,windowHeight*0.5);
    sliderAltezza.position(windowWidth*0.6,windowHeight*0.7);
    sliderModob.position(windowWidth*0.8,windowHeight*0.3);
    sliderTonalitab.position(windowWidth*0.8,windowHeight*0.5);
    sliderAltezzab.position(windowWidth*0.8,windowHeight*0.7);
    background(picker.color());
    line(windowWidth*0.2,windowHeight*0.22,windowWidth*0.28,windowHeight*0.22);
    line(windowWidth*0.28,windowHeight*0.22,windowWidth*0.27,windowHeight*0.21);
    line(windowWidth*0.28,windowHeight*0.22,windowWidth*0.27,windowHeight*0.23);
    h=hue(picker.color());
    s=saturation(picker.color());
    b=brightness(picker.color());
    vala = sliderAltezza.value();
    valt = sliderTonalita.value();
    valm = sliderModo.value();
    valab = sliderAltezzab.value();
    valtb = sliderTonalitab.value();
    valmb = sliderModob.value();
    if(b>80 ){
      title.style('color','black');
    } else {
      title.style('color','white');
    }
    if ((h!=h_ || s!=s_ || b!=b_ || vala!=vala_ || valm!=valm_ || valt!=valt_ || valab!=valab_ || valmb!=valmb_ || valtb!=valtb_)&& (millis()-tempo)>300){
      tempo=millis();
      h_=h;
      s_=s;
      b_=b;
      vala_=vala;
      valm_=valm;
      valt_=valt;
      valab_=valab;
      valmb_=valmb;
      valtb_=valtb;
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
  let altezza, altezza1, altezza2;
  if(a>85.7){
    altezza1 = 7;
    altezza2 = 1;
  } else if (a>71.4){
    altezza1 = 6;
    altezza2 = 2;
  } else if (a>57.1){
    altezza1 = 5;
    altezza2 = 3;
  } else if (a>42.8){
    altezza1 = 4;
    altezza2 = 4;
  } else if (a>28.5){
    altezza1 = 3;
    altezza2 = 5;
  } else if (a>14.3){
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
  } else if (valt==1){
    a=s;
  } else if (valt ==2){
    a=b;
  }

  let n,n1,n2;
  if (a>330){
    n1 = 1;
    n2 = 11;
  } else if (a>300){
    n1 =2;
    n2 = 11;
  } else if (a>270){
    n1 =3;
    n2 = 10;
  } else if (a>240){
    n1 =4;
    n2 = 9;
  } else if (a>210){
    n1 =5;
    n2 = 8;
  } else if (a>180){
    n1 =6;
    n2 = 7;
  } else if (a>150){
    n1 =7;
    n2 = 6;
  } else if (a>120){
    n1 =8;
    n2 = 5;
  } else if (a>90){
    n1 =9;
    n2 = 4;
  } else if (a>60){
    n1 =10;
    n2 = 3;
  } else if (a>30){
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
  } else if (valm==1){
    a=s;
  } else if (valm ==2){
    a=b;
  }

  if(a>60){
    if(valtb==0){
      acc.playSettima(n,altezza);
      title.html('Stai ascoltando un ' + n.tonica + altezza +' settima');
    } else {
      acc.playMinore(n,altezza);
      title.html('Stai ascoltando un ' + n.tonica + altezza +' minore');
    }

  } else if (a>30){
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
