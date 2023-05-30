

function gameset() {


    const COUNT_START = 2000; // seconds * hours
    let count = COUNT_START;
    let playing = false;
    let freshStart = true;

    playpause = document.querySelector('.start');


    playpause.onclick = function () {
        if (freshStart) {
            itemSet();
            freshStart = false;
            console.log('freshstart')
            playing = true;
            console.log("Play!");
            playpause.innerHTML = `<i class="fa-solid fa-stop"></i>`;
            countdown();
        }
        else if (playing) {
            playing = false;
            console.log("Pause!");
            playpause.innerHTML = ` <i class="fa-solid fa-play"></i>`;

            const popup = document.createElement('div');
            popup.setAttribute('class', 'popup')
            mainPage.appendChild(popup);
            playing = false;
            popup.innerHTML = `
            <p class="pause">pause</p>
            `
            countdown();
        } else if (!playing) {

            playing = true;
            console.log("Play!");
            playpause.innerHTML = `<i class="fa-solid fa-stop"></i>`;
            mainPage.removeChild(document.querySelector('.popup'));
            countdown();
        }

    }


    let timeoutId = null;

    function countdown() {
        displayTime();
        if (count == 0) {
            playing = false;
            //게임오버
            gameover();
        } else if (playing) {
            timeoutId = setTimeout(countdown, 10);
            count--;
        } else {
            clearTimeout(timeoutId);
        }
        // countdown(); 무한호출되어 지우고 playpause onclick으로 넣음.
    }

    function displayTime() {

        var sec = count;
        var mins = Math.floor(sec / 100);
        sec -= mins * (100);

        document.querySelector('.timer').innerHTML = LeadingZero(mins) + '\'' + LeadingZero(sec) + '\"';

    }

    function LeadingZero(Time) {
        return (Time < 10) ? "0" + Time : + Time;
    }

    const mainPage = document.querySelector('.main');
    function gameover() {
        const cover = document.createElement('div');
        cover.setAttribute('class', 'buttoncover')
        mainPage.appendChild(cover);

        const popup = document.createElement('div');
        popup.setAttribute('class', 'popup')
        mainPage.appendChild(popup);
        playing = false;
        popup.innerHTML = `
        
        <i class="fa-solid fa-rotate-right reset"></i>
        <p class="gameover">GAME OVER</p>
        `

        reset = document.querySelector('.reset');
        reset.onclick = function () {

            console.log("Reset Timer!");
            count = COUNT_START;
            mainPage.innerHTML = `
            <button class="start">
              <i class="fa-solid fa-play"></i>
            </button>
            <div class="timer">READY</div>
            <div class="counter">9</div>
            <section class="playground">
           
            </section>
            `
            gameset();
        }

    }

    function win() {
        const cover = document.createElement('div');
        cover.setAttribute('class', 'buttoncover')
        mainPage.appendChild(cover);

        const popup = document.createElement('div');
        popup.setAttribute('class', 'popup')
        mainPage.appendChild(popup);
        playing = false;
        popup.innerHTML = `
        
        <i class="fa-solid fa-rotate-right reset"></i>
        <p class="win">WIN~</p>
        `

        reset = document.querySelector('.reset');
        reset.onclick = function () {

            console.log("Reset Timer!");
            count = COUNT_START;
            mainPage.innerHTML = `
            <button class="start">
              <i class="fa-solid fa-play"></i>
            </button>
            <div class="timer">READY</div>
            <div class="counter">9</div>
            <section class="playground">
              
            </section>
            `
            gameset();
        }

    }





    function itemSet() {
        const initCarrot = 6;
        const initBug = 6;
        let carrotCount = initCarrot;
        let carrotId = 0;//uuid
        let bugId = initCarrot + 1;//carrot + 1 uuid

        const counter = document.querySelector('.counter');
        counter.innerHTML = carrotCount;

        //random 함수 954 318
        function randomBottom() {
            return Math.floor(Math.random() * (250 - 10) + 10);
        }
        function randomLeft() {
            return Math.floor(Math.random() * (900 - 10) + 10);
        }
        const playground = document.querySelector('.playground');


        function addCarrot() {
            for (let i = 0; i < initCarrot; i++) {
                const item = createCarrot();
                playground.appendChild(item);
            }
        }


        function createCarrot() {
            const carrot = document.createElement('img');
            carrot.setAttribute('class', 'carrot');
            carrot.setAttribute('src', 'img/carrot.png');
            carrot.setAttribute('data-id', carrotId);
            const bottom = randomBottom();
            const left = randomLeft(); //백틱 안에 function의 값은 들어갈 수 없음.
            carrot.setAttribute('style', `bottom: ${bottom}px; 
            left: ${left}px;`);

            // carrot.style.bottom = `${randomBottom}px;`;
            // carrot.style.left = `${randomLeft}px;`;

            carrotId++;
            return carrot;
        }

        function addBug() {

            for (let i = 0; i < initBug; i++) {
                const item = createBug();
                playground.appendChild(item);
            }
        }



        function createBug() {
            const bug = document.createElement('img');
            bug.setAttribute('src', 'img/bug.png');
            bug.setAttribute('class', 'bug');
            bug.setAttribute('data-id', bugId);
            const bottom = randomBottom();
            const left = randomLeft();
            bug.setAttribute('style', `bottom: ${bottom}px; 
            left: ${left}px;`);
            bugId++;
            return bug;
        }


        playground.addEventListener('click', event => {
            const id = event.target.dataset.id;
            if (id <= initCarrot) {
                console.log(`carrot no.${id}is deleted`);
                const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
                toBeDeleted.remove();
                carrotCount--;
                counter.innerHTML = carrotCount;
                if (carrotCount === 0) {
                    win();
                }
            } else if (id >= initCarrot + 1) {
                console.log(`bug no.${id}is clicked`);
                gameover();
            }
        })

        addCarrot();
        addBug();

    };


}

gameset();

