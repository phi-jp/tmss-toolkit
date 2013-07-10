
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
	var guiObject = {
		"visibleBoarder": true,
		"frame": {
			"width": 32,
			"height": 32,
			"count": 64,
		},
	};

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

	guiObject.open = function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		openFileElm.element.dispatchEvent( evt );
	};

	guiObject.save = function() {
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

		gui.add(guiObject, "open");
		gui.add(guiObject, "save");

		gui.add(guiObject, "visibleBoarder");

		var frameFolder = gui.addFolder("frame");

		frameFolder.add(guiObject.frame, "width", 0, 128, 1);
		frameFolder.add(guiObject.frame, "height", 0, 128, 1);
		frameFolder.open();
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
			if (guiObject.visibleBoarder == false) return ;

			var xIndex = (this.targetImage.width/guiObject.frame.width)|0;
			var yIndex = (this.targetImage.height/guiObject.frame.height)|0;

			for (var i=0; i<yIndex; ++i) {
				for (var j=0; j<xIndex; ++j) {
					var x = j*guiObject.frame.width;
					var y = i*guiObject.frame.height;
					var width  = guiObject.frame.width;
					var height = guiObject.frame.height
					canvas.strokeRect(x, y, width, height);
				}
			}
		}
	})

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
