// all elements
let won = document.querySelector(".alert-success").classList;
let lost = document.querySelector(".alert-danger").classList;
let input = document.getElementById("input");
let form = document.getElementById("form");
let subm = document.getElementById("subm");
let hint = document.getElementById("hint");
let chance = document.getElementById("chance");
let startBtn = document.getElementById("start");
let restartBtn = document.getElementById("restart");

startBtn.addEventListener("click", () => {
	startBtn.classList.add("d-none");
	game();
});

restartBtn.addEventListener("click", () => {
	restartBtn.classList.add("d-none");
	if (!won.contains("d-none")) {
		won.add("d-none");
	}
	if (!lost.contains("d-none")) {
		lost.add("d-none");
	}
	game();
});
function getRandom() {
	return Math.floor(Math.random() * 10 + 1);
}
function game() {
	input.disabled = false;
    subm.disabled = false;
    input.value = '';
	let answer = getRandom();
	hint.innerText = "Guess a Number!";
	chance.innerText = 3;
	let prom = new Promise((resolve, reject) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			let guessed = parseInt(input.value);
			resolve(guessed);
		});
	});
	prom.then((msg) => {
		chance.innerHTML = 2;
		if (msg != answer) {
			showMessage(msg, answer);
			let prom2 = new Promise((resolve, reject) => {
				form.addEventListener("submit", (e) => {
					e.preventDefault();
					let guessed = parseInt(input.value);
					resolve(guessed);
				});
			});
            prom2.then((msg) => {
                chance.innerHTML = 1;
                if(msg != answer){
                    showMessage(msg, answer);
                    let prom3 = new Promise((resolve, reject) => {
                        form.addEventListener("submit", (e) => {
                            e.preventDefault();
                            let guessed = parseInt(input.value);
                            resolve(guessed);
                        });    
                    });
                    prom3.then((msg) => {
                        chance.innerHTML = 0;
                        if(msg != answer) {
                            showMessage(msg, answer);
                            result(0);
                        }
                        else {
                            result(1);
                        }
                    })
                }
                else {
                    result(1);
                }
            })
		} else {
			result(1);
		}
	});
}
function showMessage(msg, answer) {
	if (msg > answer) {
		hint.innerHTML = "Too High!";
	} else if (msg < answer) {
		hint.innerHTML = "Too Low!";
	}
    input.value = '';
}
function result(res) {
	input.disabled = true;
    subm.disabled = true;
	if (res) {
		hint.innerHTML = "Bingo!";
		won.remove("d-none");
	} else {
		lost.remove("d-none");
	}
	restartBtn.classList.remove("d-none");
}
