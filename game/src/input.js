class Input {
  static SPACE = 32;
  static LEFT = 37;
  static UP = 38;
  static RIGHT = 39;
  static DOWN = 40;
  static ESCAPE = 27;

  constructor(canvas) {
    let keys = {};
    this.keys = keys;

    document.addEventListener("keydown", function (e) {
      keys[e.keyCode] = true;
    });
    document.addEventListener("keyup", function (e) {
      keys[e.keyCode] = false;
    });
  }

  key(keycode) {
    if (this.keys.hasOwnProperty(keycode)) return this.keys[keycode];
    return false;
  }

  anykey() {
    return Object.keys(this.keys).filter(k => this.keys[k]).length > 0;
  }
}
