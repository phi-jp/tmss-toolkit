
;(function(global) {
    
    global.preview = {};
    
    tm.main(function() {
        var app = tm.app.CanvasApp("#preview");
        
        app.resize(256, 256);
        
        app.replaceScene(tmss.PreviewScene());

        app.run();
    });
    
    tm.define("tmss.PreviewScene", {
        superClass: "tm.app.Scene",
        
        init: function() {
            this.superInit();
            
            global.preview.play = function(name) {
                this.play(name);
            }.bind(this);
            // setTimeout(function() {
            //     this.run();
            // }.bind(this), 1000);
        },
        
        play: function(name) {
            if (this.sprite) {
                this.sprite.remove();
            }
            
            var ss = tm.app.SpriteSheet(global.spriteSheet.toData());
            var sprite = tm.app.AnimationSprite(ss).addChildTo(this);
            sprite.x = this.app.width/2;
            sprite.y = this.app.height/2;
            sprite.scaleX = sprite.scaleY = 4;
            
            sprite.gotoAndPlay(name);
            
            this.sprite = sprite;
        },
    });
    
})(this);

