
;(function(global) {

/*
{
    "image": "hiyocos",
    "frame": {
        "width": 32,
        "height": 32,
        "count": 64
    },
    "animations": {
        "walk": {
            "frames": [0, 1, 2, 3, 4],
            "next": "walk",
            "frequency": 4
        },
        "appear": {
            "frames": [20, 21, 22, 23, 24],
            "next": "walk",
            "frequency": 4
        }
    }
}
*/

	var fs = require('fs');
	var openFileElm = tm.dom.Element("#openFile");
	var saveFileElm = tm.dom.Element("#saveFile");
	var currentFile = '';
	var tools = {
		edit: {
			"Add Animation": null,
		}
	};
	var spriteSheet = tmss.SpriteSheet();
	global.spriteSheet = spriteSheet;
	var animationList = [];

	openFileElm.event.add("change", function() {
		var path = this.value;
		var data = fs.readFile(path, function(err, data) {
			if (err) {
				console.log("Read failed: " + err);
			}
		});

		currentFile = path;
	});


	saveFileElm.event.add("change", function() {
		var path = currentFile = this.value;
		saveFile(path);
	});

	var saveFile = function(path) {
		fs.writeFileSync(path, "hogehogehoge");
		console.log("save");
	};

	spriteSheet.open = function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		openFileElm.element.dispatchEvent( evt );
	};

	spriteSheet.save = function() {
		if (currentFile) {
			saveFile(currentFile);
		}
		else {
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			saveFileElm.element.dispatchEvent( evt );
		}
	};

	tm.main(function() {
		initGUI();
		initMain();
	});

	var initGUI = function() {
		var gui = new dat.GUI();
		console.dir(dat.GUI);

		gui.add(spriteSheet, "open");
		gui.add(spriteSheet, "save");

		gui.add(spriteSheet, "visibleBoarder");
		
		// data
		var dataFolder = gui.addFolder("Data");
		dataFolder.open();
		
		var frameFolder = dataFolder.addFolder("frame");
		frameFolder.add(spriteSheet.frame, "width", 0, 128).step(1);
		frameFolder.add(spriteSheet.frame, "height", 0, 128).step(1);
		
		animationFolder = dataFolder.addFolder("animation");
		animationFolder.open();
		
		// edit
		var editFolder = gui.addFolder("Edit");
		
		editFolder.add(tools.edit, "Add Animation");
		editFolder.open();
		
		addAnimation("walk", {
			frames: "1 2 1 3",
			next: "walk",
			frequency: 6,
		});
		addAnimation("dash", {
			frames: "2 3",
			next: "dash",
			frequency: 3,
		});
	};
	
	var addAnimation = function(name, param) {
	    var folder      = animationFolder.addFolder(name);
	    var animParam = new tmss.AnimParam(param);
	    
	    animParam.play = function() {
	    	global.preview.play(name);
	    };
	    
	    folder.add(animParam, "frames");
	    folder.add(animParam, "next");
	    folder.add(animParam, "frequency", 1, 50, 1).step(1);
	    folder.add(animParam, "play");
	    folder.open();
	    
	    spriteSheet.addAnimation(name, animParam);
	};
	tools.edit["Add Animation"] = function() {
		var name = global.prompt("input name", "walk");
		addAnimation(name);
	};

	var initMain = function() {
		var app = tm.app.CanvasApp("#world");

		tm.asset.AssetManager.load("hiyocos", "http://phi-jp.github.io/tmlib.js/resource/img/hiyocos.png");
		tm.asset.AssetManager.onload = function() {
			app.replaceScene(Scene());
		};

		app.run();
	};

	tm.define("Scene", {
		superClass: "tm.app.Scene",

		init: function() {
			this.superInit();
		},

		onenter: function() {
			this.sprite = tm.app.Sprite("hiyocos").addChildTo(this);

			this.sprite.origin.set(0, 0);
			this.app.resize(this.sprite.width, this.sprite.height);

			this.grid = Grid().addChildTo(this);

		},
	});

	tm.define("Grid", {
		superClass: "tm.app.CanvasElement",

		init: function() {
			this.superInit();

			this.targetImage = tm.asset.AssetManager.get("hiyocos");
		},

		draw: function(canvas) {
			if (spriteSheet.visibleBoarder == false) return ;

			var xIndex = (this.targetImage.width/spriteSheet.frame.width)|0;
			var yIndex = (this.targetImage.height/spriteSheet.frame.height)|0;

			for (var i=0; i<yIndex; ++i) {
				for (var j=0; j<xIndex; ++j) {
					var index = i*xIndex + j;
					var x = j*spriteSheet.frame.width;
					var y = i*spriteSheet.frame.height;
					var width  = spriteSheet.frame.width;
					var height = spriteSheet.frame.height
					canvas.strokeRect(x, y, width, height);
					canvas.fillText(index, x, y+30);
				}
			}
		}
	});
	
	tm.define("tmss.AnimationData", {
		init: function() {
			this.frames = [0, 1, 2, 3];
			this.next = "walk";
			this.frequency = 4;
		}
	});

})(this);



;(function() {
	return ;

	var fs = require('fs');
	fs.readdir("/usr", function (err, files) {
		if (err) throw err;
		for (var i in files) {
			document.write(files[i] + "<br />");
		}
	});

	return ;

	// Load native UI library
	var gui = require('nw.gui');

	// Get the current window
	var win = gui.Window.get();

	// Create a new window and get it
	var new_win = gui.Window.get(
	  window.open('https://github.com')
	);
})();
