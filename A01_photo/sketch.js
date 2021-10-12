const Y_AXIS = 1;
const X_AXIS = 2;
const WIDTH = 700;
const HEIGHT = 700;

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // from up to down
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // from left to right
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function draw() {
  // color palette
  let fillSky = color(166, 183, 201);
  let fillMiddleFront = color(246, 186, 146);
  let fillMiddleWindow1 = color(81, 86, 80);
  let fillMiddleWindow2 = color(59, 40, 26);
  let fillMiddleWindow3 = color(115, 34, 5);
  let fillMiddleSide = color(179, 115, 83);
  let fillMiddleSideDark = color(155, 63, 26);
  let fillLeftRightFront = color(239, 204, 186);
  let fillLeftRightWindow = color(184, 155, 141);
  let fillRightFirst = color(200, 115, 61);
  let fillRightSecond = color(230, 184, 160);
  let fillRightThird = color(212, 73, 18);

  let strokeMiddleFront = color(194, 76, 0);
  let strokeRoof = color(12, 14, 7);
  let strokeFrontStripe = color(222, 155, 110);
  let strokeSideStripe = color(120, 56, 20);

  let gradientColor1 = color(255, 174, 201, 85);
  let gradientColor2 = color(0,0,0,0);
  
  // sky
  background(fillSky);
  setGradient(0, 0, WIDTH, HEIGHT*1.5, gradientColor1, gradientColor2, Y_AXIS);

  // building - left - front
  fill(fillLeftRightFront);
  noStroke();
  quad(363, 596, 370, 700, 250, 700, 248, 689);
  fill(fillRightSecond);
  quad(322, 663, 341, 657, 343, 700, 323, 700);
  fill(fillLeftRightWindow);
  quad(262, 697, 262, 700, 278, 700, 278, 683);
  quad(278, 683, 278, 700, 292, 700, 292, 672);
  quad(292, 672, 292, 700, 307, 692, 307, 660);
  quad(307, 660, 307, 692, 319, 682, 319, 650);
  quad(319, 650, 319, 682, 334, 671, 334, 637);
  quad(334, 671, 334, 637, 347, 626, 347, 659);
  quad(347, 626, 347, 659, 360, 651, 360, 616);
  strokeWeight(1);
  line(334, 673, 334, 700);

  // building - middle - side (bottom)
  fill(fillMiddleSide);
  noStroke();
  quad(391, 451, 526, 476, 700, 700, 398, 700);
  
  // building - middle - side (middle)
  fill(fillMiddleSideDark);
  noStroke();
  quad(391, 451, 399, 435, 524, 465, 509, 477);
  
  // building - middle - side (top)
  fill(fillMiddleSide);
  noStroke();
  beginShape();
  vertex(399, 435);
  vertex(396, 277);
  vertex(527, 282);
  vertex(662, 351);
  vertex(675, 500);
  vertex(399, 435);
  endShape();
  
  // building - middle - front
  fill(fillMiddleFront);
  stroke(strokeMiddleFront);
  strokeWeight(1);
  beginShape();
  vertex(396, 277);
  vertex(342, 331);
  vertex(342, 486);
  vertex(351, 485);
  vertex(354, 700);
  vertex(398, 700);
  vertex(391, 451);
  vertex(399, 435);
  vertex(396, 277);
  endShape();
  // stripes
  stroke(strokeFrontStripe);
  line(357, 539, 358, 599);
  line(360, 537, 361, 597);
  line(363, 535, 364, 595);
  line(366, 533, 367, 593);
  line(369, 531, 370, 591);
  line(372, 529, 373, 589);
  line(375, 527, 376, 587);
  line(378, 525, 379, 585);
  line(381, 523, 382, 583);
  line(384, 521, 385, 581);
  line(387, 519, 388, 579);
  line(359, 608, 359, 677);
  line(362, 606, 362, 675);
  line(365, 604, 365, 673);
  line(368, 602, 368, 671);
  line(371, 600, 371, 669);
  line(374, 598, 374, 667);
  line(377, 596, 377, 665);
  line(380, 594, 380, 663);
  line(383, 592, 383, 661);
  line(386, 590, 386, 659);
  line(389, 588, 389, 657);
  line(359, 681, 359, 700);
  line(362, 679, 362, 700);
  line(365, 677, 365, 700);
  line(368, 675, 368, 700);
  line(371, 673, 371, 700);
  line(374, 671, 374, 700);
  line(377, 669, 377, 700);
  line(380, 667, 380, 700);
  line(383, 665, 383, 700);
  line(386, 663, 386, 700);
  line(389, 661, 389, 700);
  stroke(strokeSideStripe);
  line(405, 513, 406, 575);
  line(408, 514, 409, 576);
  line(411, 515, 412, 577);
  line(414, 516, 415, 578);
  line(417, 517, 418, 579);
  line(420, 518, 421, 580);
  line(423, 519, 424, 581);
  line(426, 520, 427, 582);
  line(429, 521, 430, 583);
  line(432, 522, 433, 584);
  line(435, 523, 436, 585);
  line(438, 524, 439, 586);
  line(441, 525, 442, 587);
  line(444, 526, 445, 588);
  line(447, 527, 448, 589);
  line(450, 528, 451, 590);
  line(453, 529, 454, 591);
  line(456, 530, 457, 592);
  line(406, 582, 407, 650);
  line(409, 583, 410, 651);
  line(412, 584, 413, 652);
  line(415, 585, 416, 653);
  line(418, 586, 419, 654);
  line(421, 587, 422, 655);
  line(424, 588, 425, 656);
  line(427, 589, 428, 657);
  line(430, 590, 431, 658);
  line(433, 591, 434, 659);
  line(436, 592, 437, 660);
  line(439, 593, 440, 661);
  line(442, 594, 443, 662);
  line(445, 595, 446, 663);
  line(448, 596, 449, 664);
  line(451, 597, 452, 665);
  line(454, 598, 455, 666);
  line(457, 599, 458, 667);
  line(408, 658, 409, 700);
  line(411, 659, 412, 700);
  line(414, 660, 415, 700);
  line(417, 661, 418, 700);
  line(420, 662, 421, 700);
  line(423, 663, 424, 700);
  line(426, 664, 427, 700);
  line(429, 665, 430, 700);
  line(432, 666, 433, 700);
  line(435, 667, 436, 700);
  line(438, 668, 439, 700);
  line(441, 669, 442, 700);
  line(444, 670, 445, 700);
  line(447, 671, 448, 700);
  line(450, 672, 451, 700);
  line(453, 673, 454, 700);
  line(456, 674, 457, 700);
  line(459, 675, 460, 700);


  // roof
  stroke(strokeRoof);
  strokeWeight(3);
  line(396, 277, 342, 331);
  strokeWeight(5);
  line(396, 277, 527, 282);
  line(527, 282, 662, 351);
  strokeWeight(1);
  line(518, 282, 514, 212);
  line(471, 279, 468, 237);
  line(458, 253, 479, 241);
  // windows
  noStroke();
  fill(fillMiddleWindow1);
  quad(450, 307, 484, 315, 484, 340, 450, 331);
  fill(fillMiddleWindow2);
  quad(455, 383, 491, 393, 491, 420, 455, 410);
  fill(fillMiddleWindow3);
  quad(545, 408, 579, 415, 588, 447, 545, 439);

  // building - right - front
  fill(fillLeftRightFront);
  noStroke();
  quad(467, 503, 475, 700, 700, 700, 700, 312);
  // paint
  fill(fillRightFirst);
  quad(476, 549, 537, 491, 549, 700, 482, 700);
  fill(fillRightSecond);
  quad(572, 470, 595, 450, 613, 687, 584, 692);
  fill(fillRightThird);
  triangle(664, 400, 700, 370, 700, 700);
  // windows
  fill(fillLeftRightWindow);
  quad(475, 516, 476, 549, 700, 376, 700, 335);
  quad(477, 590, 479, 623, 700, 461, 700, 421);
  quad(480, 667, 482, 700, 700, 551, 700, 510);
  quad(549, 700, 609, 700, 700, 637, 700, 599);
}