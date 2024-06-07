const gamePlay = document.querySelector('.menu .menuPipe .play');
const menu = document.querySelector('.menu');
const recordTags = document.querySelectorAll('.menu .menuPipe :is(h5, h6)');

const myRecord = localStorage.getItem('flappyRec') || 0; //kanchelu hamar
const myRecordTime = localStorage.getItem('flappyTime') || 0;
recordTags[0].innerText = 'My Record Point' + myRecord; //poxvum e menu-i tiv@
recordTags[1].innerText = 'My Record Time' + myRecordTime + 's'; //poxum e menu-i jamanak@

const flappyBird = () => {   //nra hamar e vor xax@ chsksi minchev play-@ sexmel@
    const game = document.querySelector('.game');
    game.style.animation = 'bg 7s linear infinite';

    const floor = document.querySelector('.game .floor');
    floor.style.animation = 'bg 5s linear infinite';

    const bird = document.querySelector('.game .bird');
    const gameover = document.querySelector('.game h3');
    const allPipe = document.querySelectorAll('.game .pipe');
    const pipeTop = document.querySelectorAll('.game .pipe.top');
    const pipeBottom = document.querySelectorAll('.game .pipe.bottom');
    const point = document.querySelector('.game .display .point'); // miavorneri hamar
    const time = document.querySelector('.game .display .time'); // jamanaki hamar
    const enemyBird = document.querySelector('.game .enemyBird'); //char tsity ekav js
    enemyBird.style.animation = 'pipe 4s linear infinite';
    allPipe.forEach(item => item.style.animationName = 'pipe');   //bolor xoxovaknerin ashxatacnum enq

    pipeTop[1].style.animation = 'pipe 6s linear 2s infinite, press 4s infinite';
    //animacian stanalu hamar neav nerqeviny
    pipeBottom[1].style.animation = 'pipe 6s linear 2s infinite, press 4s infinite';



    let curPipe = 0; //xoxovakneri qanaki hamar
    let pointDigit = 0; //miavornery hashvelu hamar  miavornery hashvvum e xoxovakneri qanakov
    let timeDigit = 0;
    let night = true; //gisher cereki hamar



    floor.style.backgroundSize = `100% ${window.screen.height * 1.5}px`;

    // hataky petq e enpisi lini vor chapi popocutyunic ekrani hamachaputyuny pahpanvi dra hamar ogtvum enq scrin height gorciqic vory ekrani bardzrutyunn e


    let birdY = bird.offsetTop;
    let birdRotate = 0;
    let toDown = setInterval(() => {
        birdY += 15;
        // birdRotate++
        // birdRotate += 15
        birdRotate < 50 ? birdRotate += 15 : '';
        bird.style.rotate = birdRotate + 'deg'
        bird.style.top = birdY + 'px';
    }, 50)


    document.onkeydown = e => {
        if (e.which == 38 || e.which == 32) {
            birdY -= 100;
            bird.style.top = birdY + 'px';
            birdRotate = -50
            bird.style.rotate = birdRotate + 'deg'
        }
    };

    const endGame = () => {
        gameover.style = 'opacity:1; top:50%';
        clearInterval(toDown);
        clearInterval(endTime); //jamanaky kangnelu hamar
        clearInterval(setGame);
        bird.style.rotate = '180deg';
        game.style.animationPlayState = 'paused';
        floor.style.animationPlayState = 'paused';
        enemyBird.style.animationPlayState = 'paused'; //vorpeszi chary xaxi avarti kangneluc het kangni
        bird.style.backgroundImage = 'url(deathBird.png)';
        document.onkeydown = null; // cit@ chhambardzvi erkinq
        allPipe.forEach(item => item.style.animationPlayState = 'paused');
        bird.style.top = floor.offsetTop - bird.offsetHeight / 1.2 + 'px';
        pointDigit > myRecord ? localStorage.setItem('flappyRec', pointDigit) : ' ';
        //nra hamar e vor misht brauzerum texadrvac lini aravelaguym miavory
        timeDigit > myRecordTime ? localStorage.setItem('flappyTime', timeDigit) : ' ';
        //verevini nman//

        setTimeout(() => window.location.reload(), 2e3)
    }


    let setGame = setInterval(() => {   // partutyan iradardzutyunnern en aystex
        if (bird.offsetTop + bird.offsetHeight >= floor.offsetTop) {
            endGame()
        }
        pipeTop.forEach(item => {
            if (item.offsetLeft <= bird.offsetLeft + bird.offsetWidth - 10 && bird.offsetTop <= item.offsetTop + item.offsetHeight && item.offsetLeft + item.offsetWidth >= bird.offsetLeft) {
                // alert('game over');
                endGame()
            }
        });
        pipeBottom.forEach(item => {
            if (item.offsetLeft <= bird.offsetLeft + bird.offsetWidth - 10 && bird.offsetTop + bird.offsetHeight >= item.offsetTop && item.offsetLeft + item.offsetWidth >= bird.offsetLeft) {
                // alert('game over');
                endGame()
            }
        });
        if (bird.offsetLeft > pipeTop[curPipe].offsetLeft + pipeTop[curPipe].offsetWidth) { // cuyc e talis vor xoxovaky ancel enq
            curPipe++; // amen xoxovak ancnelis + 1
            curPipe == pipeTop.length ? curPipe = 0 : ' ';
            pointDigit++; // avelanum e miavory
            point.innerText = ' Point ' + pointDigit;

        }
        if (enemyBird.offsetLeft < 0) { //nra hamar vor char tsity amen angam tarber uxxutyunic ga
            enemyBird.style.top = Math.random() * (game.offsetHeight - floor.offsetHeight - enemyBird.offsetHeight) + 'px';
        }

        if (enemyBird.offsetLeft <= bird.offsetLeft + bird.offsetWidth && enemyBird.offsetLeft + enemyBird.offsetWidth >= bird.offsetLeft && bird.offsetTop <= enemyBird.offsetTop + enemyBird.offsetHeight && bird.offsetTop + bird.offsetHeight >= enemyBird.offsetTop) { //nra hamar enq grel vor char citikin kpnelis satki
            endGame();
        }

        

    }, 1);

    let endTime = setInterval(() => {  // naxatesvac e jamanaky hashvelu hamar
        timeDigit++;
        time.innerText = 'Time' + timeDigit;
        if (timeDigit % 10 == 0) {
            if (night) {
                game.style.setProperty('--bg', .81)
            }
            else {
                game.style.setProperty('--bg', 0)
            }
            night = !night;
        }
    }, 1e3)
};

gamePlay.onclick = () => {
    menu.style.top = '100%';
    flappyBird();
}