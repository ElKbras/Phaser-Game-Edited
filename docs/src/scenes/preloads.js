// Clase Preloads, para separar los preloads y tener mejor orden
export class Preloads extends Phaser.Scene { // Se extiende de Phaser.Scene porque es una escena
    constructor() {
        // Se asigna una key para despues poder llamar a la escena
        super("Preloads")
    }

    preload() {
        this.load.image('sad_cow', 'public/assets/images/sad_cow.png')
        this.load.image('phaser_logo', 'public/assets/images/phaser_logo.png')
        this.load.image('mainmenu_bg', 'public/assets/images/main_menu_background.png')
        this.load.image('sky', 'public/assets/images/sky.jpg');
        this.load.image('ground', 'public/assets/images/platform.png');
        this.load.image('star', 'public/assets/images/star.png');
        this.load.image('star2','public/assets/images/star2.png')
        this.load.image('bomb', 'public/assets/images/bomb.png');
        this.load.spritesheet('dude', 'public/assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('death', 'public/assets/sounds/QUN.mp3');
        this.load.audio('song', 'public/assets/sounds/y2mate.com - The Binding of Isaac Afterbirth OST Burning Basement Theme.mp3');

    }

    create() {
        // Pasa directamente a la escena del menú principal
        this.scene.start('MainMenu');
    }
}