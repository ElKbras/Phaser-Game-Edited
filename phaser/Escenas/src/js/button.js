// Clase Boton, para no repetir tanto codigo
class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ 
                backgroundColor: '#000', 
                fontSize: '50px', 
                fill: '#FF6800', 
                fontFamily: 'Arial'
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#FF0000' }))
            .on('pointerout', () => button.setStyle({ fill: '#FF6800' }));
    }
}

export default Button;