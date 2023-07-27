// Numbers
// 1
async function favNum(num) {
    let res = await axios.get(`http://numbersapi.com/${num}?json`)
    let fact = res.data.text
    console.log(fact)
}

// 2
async function multNums(nums) {
    let allNums = nums.join()
    let res = await axios.get(`http://numbersapi.com/${allNums}?json`)
    console.log(res.data)
    for(let item in res.data) {
        console.log(res.data[item])
    }
}

// 3
async function multFact(num) {
    let responses = await Promise.all([
        axios.get(`http://numbersapi.com/${num}?json`),
        axios.get(`http://numbersapi.com/${num}?json`),
        axios.get(`http://numbersapi.com/${num}?json`),
        axios.get(`http://numbersapi.com/${num}?json`)
    ])

    console.log(responses[0].data.text)
    console.log(responses[1].data.text)
    console.log(responses[2].data.text)
    console.log(responses[3].data.text)
}

// ##############################################################################

// Cards 
// 1
async function newCardDeck() {
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    let card = res.data.cards[0].value
    let suit = res.data.cards[0].suit
    console.log(`${card} of ${suit}`)
}

// 2
async function firstAndSecond() {
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    let card = res.data.cards[0].value
    let suit = res.data.cards[0].suit
    let deckID = res.data.deck_id
    console.log(`${card} of ${suit}`)
    let res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    card = res2.data.cards[0].value
    suit = res2.data.cards[0].suit
    console.log(`${card} of ${suit}`)
}

// 3

cardNum = 0
deckID = null
url = ''



async function startDeck() {
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    let card = res.data.cards[0].value
    let suit = res.data.cards[0].suit
    $('#card').html(`<p>${card} of ${suit}</p>`)
    cardNum ++ 
    deckID = res.data.deck_id
    url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    console.log(`${card} of ${suit}`)
    console.log(cardNum)
}

async function continueDeck(url) {
    let res = await axios.get(url)
    let card = res.data.cards[0].value
    let suit = res.data.cards[0].suit
    $('#card').html(`<p>${card} of ${suit}</p>`)
    cardNum ++
    console.log(`${card} of ${suit}`)
    console.log(cardNum)
    // if (res.data.remaining === 0) {
    //     deckID = null
    //     $('button').remove()
    //     // $('button').toggleClass('start', true)
    // }
    if (cardNum === 52) {
        deckID = null;
        cardNum = 0;
        $('button').html('Shuffle');
        $('button').addClass('reset');
        $('button').removeClass('start');
      }

}


$(document).on('click', 'button.start', function() {
  if (!deckID || cardNum === 0) {
    startDeck();
  } else if (deckID && cardNum <= 52) {
    continueDeck(url);
  }
});


$(document).on('click', 'button.reset', function() {
    
    $('#card').html('');
    $('button').html('Get Card');
    $('button').removeClass('reset')
    $('button').addClass('start')
    // $('button').toggleClass('start', false)
    cardNum = 0
})