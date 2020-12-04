class Button {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    if (buttonactivated == true) {
      push();
      imageMode(CENTER);
      image(gamebuttonactivatedimage, this.x, this.y, this.width, this.height);
      pop();

      // 60 second timer.
      if (timer == 120) {
        // This only happens every second.
        timer = 60;
        timeleft--;
      }
      timer++;
    } else if (buttonactivated == false) {
      push();
      imageMode(CENTER);
      image(gamebuttonimage, this.x, this.y, this.width, this.height);
      pop();
    }

    if (timeleft == 0) {
      buttonactivated = false;
      timeleft = 5;
    }
  }
}
