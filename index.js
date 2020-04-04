// Deck functions

const card = function(value, suit) {
    return { value:value, suit:suit }
}

const createDeck = function() {
    let deck = []
    let suits = ["H", "S", "D", "C"]

    for(let i = 0; i < 4; i++) {
        for(let j = 1; j <= 13; j++) {
            deck.push(card(j, suits[i]))
        }
    }

    return deck
}

const shuffle = function(deck) {
    
    for(let i = 0; i < deck.length; i++) {

        let randomIndex = Math.floor(Math.random() * 52)

        let temp = deck[i]
        deck[i] = deck[randomIndex]
        deck[randomIndex] = temp
    }
}

const draw = function(deck) {
    
    let card = deck[deck.length - 1]

    deck.pop()

    return card
}

const setCardImage = function(card, toHand, faceDown) {

    let img

    if(faceDown) {
        img = document.createElement("img");
        img.src = "cardimages/fbcardback.png"
        img.width = 128
        img.height = 194
        img.className = "faceDownCard"
    } else {
        img = document.createElement("img");
        img.src = "cardimages/" + card.value + card.suit + ".png"
        img.width = 128
        img.height = 196
    }

    let element = document.getElementById(toHand);
    element.appendChild(img);
}

// Game mechanics

const newGame = function() {

    deck = createDeck()
    shuffle(deck)

    playersHand.push(draw(deck))
    dealersHand.push(draw(deck))
    playersHand.push(draw(deck))
    dealersHand.push(draw(deck))

    setCardImage(dealersHand[0], "dealersHand", false)
    setCardImage(dealersHand[1], "dealersHand", true)

    setCardImage(playersHand[0], "playersHand", false)
    setCardImage(playersHand[1], "playersHand", false)

    evaluateScore(playersHand)
}

const score = function(hand) {

    let score = 0
    let containsAce = false
    let numberOfAces = 0

    for(let i = 0; i < hand.length; i++) {

        switch(hand[i].value) {
            case 1:
                containsAce = true
                numberOfAces++
                score += 11
                break
            case 11:
                score += 10
                break
            case 12:
                score += 10
                break
            case 13:
                score += 10
                break
            default:
                score += hand[i].value
                break
        }
    }

    if(score > 21 && containsAce) {
        for(let i = 0; i < numberOfAces; i++) {
            if(score > 21) {
                score -= 10
            }
        }
    }

    return score
}

const printPlayerScore = function() {

    let playerScore = score(playersHand)
    document.getElementById("handValue").textContent = "Your score is: " + playerScore
}

const evaluateScore = function(hand) {

    let playerScore = score(hand)

    if(playerScore > 21) {
        document.getElementById("handValue").textContent = "Your score is: " + playerScore + ". Bust..."
        document.getElementById("hitButton").disabled = true
    } else if(playerScore === 21 && hand.length === 2) {
        // Pay out 1.5x the bet
        document.getElementById("handValue").textContent = "Your score is: " + playerScore + ". BLACK JACK!!!!!"
    } else if(playerScore === 21) {
        document.getElementById("handValue").textContent = "Your score is: " + playerScore + ". You win? You stand?"
    } else {
        document.getElementById("handValue").textContent = "Your score is: " + playerScore + ". Hit or stand?"
    }
}

// UI

const hit = function() {

    let newCard = draw(deck)

    console.log(newCard)

    playersHand.push(newCard)

    setCardImage(newCard, "playersHand", false)

    evaluateScore(playersHand)

    console.log(deck.length)
}

const stand = function() {
    // Dealer plays until minimum 17 or bust
    // Then evaluates which bets to collect and what the pay outs are
}

const split = function() {
    // Split if the 2 original cards have the same value
    // If there are aces only 1 extra card is dealt
    // 1.5x multiplier does not apply when black jack
}

const double = function() {
    // If the value of the first 2 cards is 9, 10, 11 double the original bet
    // Deal 1 card face down
    // Turned up before or after dealer plays?
}

// Game logic

let deck

let dealersHand = []
let playersHand = []

newGame()