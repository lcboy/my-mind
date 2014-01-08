MM.Keyboard = function() {
	window.addEventListener("keydown", this);
	window.addEventListener("keypress", this);
}

MM.Keyboard.prototype.handleEvent = function(e) {
	var node = document.activeElement;
	while (node != document) {
		if (node.classList.contains("ui")) { return; }
		node = node.parentNode;
	}
	
	var commands = MM.Command.getAll();
	for (var i=0;i<commands.length;i++) {
		var command = commands[i];
		if (!command.isValid()) { continue; }
		var keys = command.keys;
		for (var j=0;j<keys.length;j++) {
			if (this._keyOK(keys[j], e)) {
				e.preventDefault();
				command.execute(e);
				return;
			}
		}
	}
}

MM.Keyboard.prototype._keyOK = function(key, e) {
	if ("keyCode" in key && e.type != "keydown") { return false; }
	if ("charCode" in key && e.type != "keypress") { return false; }
	for (var p in key) {
		if (key[p] != e[p]) { return false; }
	}
	return true;
}
