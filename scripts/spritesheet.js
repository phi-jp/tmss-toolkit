/*
 *
 */



;(function(global) {
    
    tm.define("tmss.SpriteSheet", {
        init: function() {
            
            this.$extend({
                "visibleBoarder": true,
                
                "image": "hiyocos",
                "frame": {
                    "width": 32,
                    "height": 32,
                    "count": 64,
                },
                "animations": {
                }
            });
        },
        
        addAnimation: function(name, anim) {
            this.animations[name] = anim;
        },
        
        fromData: function() {
            
        },
        
        toData: function() {
            var param = {};
            param.image = this.image;
            param.frame = {
                width: this.frame.width,
                height: this.frame.height,
                count: this.frame.count,
            };
            param.animations = [];
            
            for (var key in this.animations) {
                var anim = this.animations[key];
                param.animations[key] = anim.toData();
            }
            return param;
        },
    });
    
    tm.define("tmss.AnimParam", {
        init: function(params) {
            if (params) {
                this.frames = params.frames;
                this.next = params.next;
                this.frequency = params.frequency;
            }
            else {
                this.frames = "1 2 1 3";
                this.next = "walk";
                this.frequency = 6;
            }
        },
        
        toData: function() {
            return {
                frames: this.frames.trim().split(/[\s,]/).eraseAll(""),
                next: this.next,
                frequency: this.frequency,
            };
        },
    });

})(this);
