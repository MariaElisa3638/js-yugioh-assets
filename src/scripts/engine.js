const state = {
    //guarda o estado de memoria
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById('card_image'),
        cardName: document.getElementById('card_name'),
        cardDescription: document.getElementById('card_type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),

    },
    playerSides: {
        player1: "player-cards",
        computer: "computer-cards",
        player1BOX: document.querySelector("#player-cards"),
        computerBOX: document.querySelector("#computer-cards"),
    },

    actions: {
        button: document.getElementById('next-duel'),

    }
};
const pathImages = "./src/assets/icons/";

const playerSides = { player1: "player-cards", computer: "computer-cards" };

const cardData = [
    {
        id: 0,
        name: "Blue-Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2]
    }
    , {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0]
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1]
    }];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;

}
async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard); //salva o id da carta
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });
    }
    cardImage.addEventListener("click", () => {
        setCardsField(cardImage.getAttribute("data-id"));
    });
    cardImage.addEventListener("mouseover", () => {
        drawSelectCard(IdCard);
    })

    return cardImage;
}



async function setCardsField(cardId) {
    //remove todas as cartas
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";


    state.fieldCards.player.src = cardData[cardId].img;
      state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResult = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResult);

}
async function drawButton() {
    state.actions.button.innerText = result;
    state.actions.button.style.display = "block";

}
async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Loser: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];
    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Ganhou";
        state.score.playerScore++;

    }
    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "Perdeu";
        state.score.computerScore++;
    }
    return duelResults;
}
async function removeAllCardsImages() {

 /*   let cards = state.playerSides.computerBOX;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.array.forEach((img) => img.remove());


    cards = state.playerSides.player1BOX;
    imtElements = player1BOX.querySelectorAll("img");
    imgElements.array.forEach((img) => img.remove());
*/


        let computerImgs = Array.from(state.playerSides.computerBOX.querySelectorAll("img"));
    computerImgs.forEach((img) => img.remove());
    
    let playerImgs = Array.from(state.playerSides.player1BOX.querySelectorAll("img"));
    playerImgs.forEach((img) => img.remove());


}


async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.cardName.innerText = cardData[index].name;
    state.cardSprites.cardDescription.innerText = "Attribute:" + cardData[index].type;

}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }

}

function init() {

    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}
init();

//video: implementando efeitos sonoros