// Declaracion de variables para esta escena
var player;
var stars;
var stars2;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;


// Clase Play, donde se crean todos los sprites, el escenario del juego y se inicializa y actualiza toda la logica del juego.
export class Play extends Phaser.Scene {
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Play");
  }

  create() {
    // Reiniciamos el GameOver para que el jugador pueda moverse libremente
    gameOver = false;
    // Reseteamos el score a 0
    score = 0;
    //  A simple background for our game
    this.add.image(400, 300, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(700, 370, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(780, 220, "ground");
    platforms.create(130, 370, "ground");
    platforms.create(850, 70, "ground");
    platforms.create(70, 100, "ground");

    // The player and its settings
    player = this.physics.add.sprite(500, 450, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.0);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
      
    });
    
    stars2 = this.physics.add.group({
      key: "star2",
      repeat: 4,
      setXY: { x: 12, y: 0, stepX: 190 },
    });

    
    stars.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      // child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.9));
      child.setBounce(1);
      child.setCollideWorldBounds(true);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);

    });


    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(240, 540, "score: 0", {
      fontSize: "60px",
      fill: "#000",
      
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(stars2, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    this.physics.add.overlap(player, stars2, this.collectStar2, null, this)

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    this.sound.play('song');
    
  }

  update() {
    
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-300);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(300);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-500);
    }
  }
  

  collectStar(player, star) {
    star.disableBody(true, true);


    //  Add and update the score
    score += 10;
    scoreText.setText("Score: " + score);

    if (stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      stars.children.iterate(function (child) {
        console.log('Hasta aca')
        child.enableBody(true, child.x, 0, true, true);
        child.setBounce(1);
        child.setCollideWorldBounds(true);
        child.setVelocity(Phaser.Math.Between(-100, 100), 10);

      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  collectStar2(player, star2) {
    star2.disableBody(true, true);

    //  Add and update the score
    score += 15;
    scoreText.setText("Score: " + score);

    if (stars2.countActive(true) === 0) {
      //  A new batch of stars to collect
      stars2.children.iterate(function (child) {
        console.log('Hasta aca2')
        child.enableBody(true, child.x, 0, true, true);
      });

    }
  }

  
  hitBomb(player, bomb) {
    
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.sound.stopAll('song');
    
    gameOver = true;

    
    
    this.sound.play('death');
    

    // Función timeout usada para llamar la instrucción que tiene adentro despues de X milisegundos
    setTimeout(() => {
      // Instrucción que sera llamada despues del segundo
      this.scene.start(
        "Retry",
        { score: score } // se pasa el puntaje como dato a la escena RETRY
      );
    }, 1000); // Ese número es la cantidad de milisegundos
  }
}
