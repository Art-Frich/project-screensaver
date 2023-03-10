// Идея: прописать класс типа "звезда", где описать ее создание по координатам, описать ее поведение, описать ее отрисовку

// Сколько будет звезд на экране единовременно?
var starsCount = 700;
// Массив со звездами
var stars = [];

class Star {
  constructor() {
    // координата по ширине
    //здесь и далее, width - это не совсем width. Это width/2.
    this.x = random(-width/2, width/2);
    // координата по высоте
    this.y = random(-height/2, height/2);
    // координата удаленности звезды от экрана
    this.z = random(width);
  }
  // Примечание: width & height - системные переменные, получающие свои значения в момент создания холста

  // метод пересоздания звезд
  updateStars() {
    var speedStar = 12;
    // анимация приближения звезды будет обеспечивается соотнесением системы координат и ее скорости
    this.z -= speedStar;
    // как только звезда "покидает" пределы нашей системы координат - создаём новую. На том же месте?
    if (this.z < 1) {
      // координата по ширине
      this.x = random(-width, width);
      // координата по высоте
      this.y = random(-height, height);
      // координата удаленности звезды от экрана
      // z = 0 == вплотную к экрану
      this.z = random(width*1.25);
    }
  }

  // метод отрисовки звезды на экране
  drawStar() {
    // выбираем цвет
    fill(233);
    // отключаем контур
    noStroke();

    // func "map" from p5 js
    // z изменилась -> пропорционально меняем x,y
    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    //z уменьшается == звезда ближе к пользователю -> она крупнее == растёт ёё радиус
    var r = map(this.z, 0, width*1.25, 9, 0);
    // отрисовка по новым размерам и координатам
    ellipse(sx, sy, r, r);
    
  }
}

// при подключенной библиотеке p5 есть зарезервированное название функции "setup" в ней код, который будет выполнен при загрузке страницы
function setup() {
  createCanvas(innerWidth, innerHeight);
  // создаем звезды =)
  for (let i=0; i < starsCount; i++) {
    // инициируем создание объекта класса "Star" как star[i]-ый элемент массива
    stars[i] = new Star();
  }
}

//аналогично "setup" есть функция "draw" - она выполняется пока не закроется страничка, если не сказано иное
function draw() {
  //фон и время его обновления?
  // я хз как работает второй параметр. Не нашел на него документации https://p5js.org/reference/#/p5/background
  // по идее, это число непрозрачности фона в диапазоне 0-255, где 0 - полностью прозрачный фон (это заметно)
  // но как работае непрозрачность = 150? Картинка ведь не становится серой... Чем выше - тем меньше отрисованных шаров видно на экране и тем они более...сжатые....
  background(0, 180);
  //"формируем центр экрана, куда полетим сквозь звезды"
  translate(width/2, height/2);

  //отрисовка звезд
  for (let i = 0; i < starsCount; i++) {
    stars[i].drawStar();
    stars[i].updateStars();
  }

  addEventListener('resize', () => {
    resizeCanvas(innerWidth, innerHeight);
  })
}
