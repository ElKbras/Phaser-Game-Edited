import Button from "../js/button.js";

var score;
var cursors;


// Clase Retry, donde se crean los botones, el logo y el fondo del menú derrota
export class Retry extends Phaser.Scene {
  constructor() {
    super("Retry");
  }

  init(data) {
    // recupera el valor SCORE enviado como dato al inicio de la escena
    score = data.score;
  }

  create() {
    // Fondo del menú derrota
    cursors = this.input.keyboard.createCursorKeys();

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "mainmenu_bg"
      )
      .setScale(1.1);
    // Vaca triste
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY / 1.5,
      "sad_cow"
    );
    // Texto que muestra el puntaje maximo alcanzado
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        `Puntaje alcanzado: ${score}`,
        {fontSize: '18px', fill: '#839192'}
      )
      .setOrigin(0.5);

      this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY +20,
        `Presiona ↑ para reiniciar`,
        {fontSize: '42px', fill: '#839192'}
      )
      .setOrigin(0.5);
    // Boton para volver a jugar
    // const boton = new Button(
    //   this.cameras.main.centerX,
    //   this.cameras.main.centerY + this.cameras.main.centerY / 3,
    //   "retry",
    //   this,
    //   () => {
    //     // Instrucción para pasar a la escena Play
    //     this.scene.start("Play");
    //   }
    // );
  }
  update()
  {
    if (cursors.up.isDown)
    {this.scene.start('Play');}



  }
}

