const aiMove=(turn,players,notDroppedCards,carpetCards,firstDrop,hokm,suitsPlayersDontHave,turnCount)=>{

    let turnPlayer=players['player'+turn]

    const yourteamMateIndex=turnPlayer['teamMate']
    const yourEnemiesIndexes=[]
  
    let turnPlayerCards=turnPlayer['cards']
    // let choosenCard={}
    const yourTeamMate=players[players['player'+turn]['teamMate']]
    // agar shoro konande shomaii

    if(firstDrop['player']===turn){
       
        let minSuit={count:14}
        let minSuitWithPb={count:14}

        for (const suit of Object.keys(turnPlayerCards)) {

            const cardsInSuit=turnPlayerCards[suit]
            if(cardsInSuit.length!==0){
               
                const remainEnemiesHaveCarpetSuit=doesRemainEnemiesHaveCarpetSuit(suit,turnPlayer.enemies,carpetCards,suitsPlayersDontHave)
                if(!remainEnemiesHaveCarpetSuit){
                    minSuitWithPb.count=cardsInSuit.length
                    minSuitWithPb['suit']=suit
                    continue
                }
                console.log(suit)
                console.log()
                if(minSuit.count>=cardsInSuit.length&&suit!==hokm){
                   
                    minSuit.count=cardsInSuit.length
                    minSuit['suit']=suit
                }
                const highestCardInSuit=cardsInSuit[cardsInSuit.length-1]
    
                if(isHighestNotDroppedCard(notDroppedCards[suit],{cardIndex:highestCardInSuit})){

                        return {cardIndex:highestCardInSuit,suit:suit}
      
                }

            }
 
            
        }
    
        if(minSuit.count===14){
       
            return {cardIndex:turnPlayerCards[minSuitWithPb.suit][0],suit:minSuitWithPb.suit}
        }
   
        return {cardIndex:turnPlayerCards[minSuit.suit][0],suit:minSuit.suit}
        


    }
    // agar shoro konande shoma nisti
    else{
        const firstDropedSuit=firstDrop['card']['suit']
        const carpetCardsWithPoint=getCarpetCardsWithPoint(carpetCards,hokm,firstDropedSuit)
        const allowedCards=getAllowedCardWithPoints(turnPlayer,firstDropedSuit,hokm)
    
        const yourTeamMateCard=carpetCards[turnPlayer['teamMate']-1]
        const yourteamMateCanWin=doesThisCardPlayedForWin(yourTeamMateCard,carpetCardsWithPoint,notDroppedCards,hokm,suitsPlayersDontHave,yourTeamMate,firstDropedSuit,true,turnCount)
     
        if(yourteamMateCanWin){
            return selectLowestValueCard(allowedCards)

        }
        else{
            let choosenCards=[]
            for (const allowedCard of allowedCards ) {
                const youCanWinGame=doesThisCardPlayedForWin(allowedCard,carpetCardsWithPoint,notDroppedCards,hokm,suitsPlayersDontHave,turnPlayer,firstDropedSuit,false,turnCount)
                
                if(youCanWinGame){
                    choosenCards.push(allowedCard)   
                }        
            }
            // agar carte montakhabi nabood koochik bendaz
            if(choosenCards.length===0){
                return selectLowestValueCard(allowedCards)
                
            }
            // agar carte khoobi bood kamtarin arzesho bendaz
            else{
                return selectLowestValueCard(choosenCards)
            }



        }

    }
    

    

}
const getCarpetCardPoints=(carpetCards,firstDrop,hokm)=>{
    let carpetpoints=[]
    for (const cardIndex in carpetCards) {
  
        const card=carpetCards[cardIndex]
        if(card===false){
            carpetpoints[cardIndex]=-1
        }
        if(card['suit']===firstDrop.card.suit){
            carpetpoints[cardIndex]=Number(card['cardIndex'])
        }
        else{
            if(card['suit']===hokm){
               
                carpetpoints[cardIndex]=Number(card['cardIndex'])+13
            }
            else{
                carpetpoints[cardIndex]=0
            }
            
        }

        
        
    }
    return carpetpoints

}
const getAllowedCardWithPoints=(player,carpetSuit,hokm)=>{
    const cards=player['cards']
    let allowedCards=[]
    let AllowedSuits=[]
    if(cards[carpetSuit].length!==0){
        AllowedSuits=[carpetSuit]
        
            
    }
    else{
        AllowedSuits=['D','C','S','H']

    }
   
    for (const suit of AllowedSuits) {
        let intercept=0
        let ct=1
        if(suit===hokm){
            intercept=13    
        }
        if(suit!==carpetSuit&&suit!==hokm){
            ct=0
        }
        for (const cardIndex of cards[suit]) {
     
            allowedCards.push({cardIndex:cardIndex,suit:suit,point:ct*(intercept+cardIndex)})
            


    
        }
    
    }

    return allowedCards
    

    
}
const getCarpetCardsWithPoint=(carpetCards,hokm,carpetSuit)=>{
    let carpetCardWithPoint=[]
    for (const card of carpetCards) {
        if(card===false){
            carpetCardWithPoint.push(false)
            
        }
        else{
         
            let intercept=0
            let ct=1
            if(card.suit===hokm){
                intercept=13    
            }
            if(card.suit!==carpetSuit&&card.suit!==hokm){
                ct=0
            }
            carpetCardWithPoint.push({cardIndex:card.cardIndex,suit:card.suit,point:ct*(intercept+card.cardIndex)})

        }

       
        
        
    }
    return carpetCardWithPoint

}
// TESTS
const selectLowestValueCard=(allowedCards)=>{

    return allowedCards.reduce((prev, curr) => prev.point <= curr.point ? prev : curr)

    
}
const selectHighestValueCard=(cardList)=>{

    return cardList.reduce((prev, curr) => {
        if(prev===false){
            return curr
        }
        if(curr===false){
            return prev
        }
        return (prev.point < curr.point ? curr : prev)
    })

    


}
// test 2
const isHighestNotDroppedCard=(notDroppedFromSuit,card)=>{
    // minus turnplayer cards
    return notDroppedFromSuit[notDroppedFromSuit.length-1]===card.cardIndex
     
    

}
// test1
const isCardCarpetWinner=(carpetCards,card)=>{
    const bigestcard=selectHighestValueCard(carpetCards)

    return card.point > bigestcard.point
     
    
}
// test3
const doesRemainEnemiesHaveCarpetSuit=(suit,enemies,carpetCards,suitsPlayersDontHave)=>{
    for (const enemy of enemies) {
        if(carpetCards[enemy-1]===false){
          
            if(suitsPlayersDontHave[enemy-1].includes(suit)){
               console.log('not win')
                return false
            }
        }
        
        
    }
    return true
    
    
 
        
}
const doesThisCardPlayedForWin=(card,carpetCards,notDropped,hokm,suitsPlayersDontHave,turnPlayer,carpetSuit,isTeamMateCard,turnCount)=>{
    const isCarpetwinner=isCardCarpetWinner(carpetCards,card)
    
    if(!isCarpetwinner){
        return false
    }

    if(turnCount===4){
        // need test
   
        return true
    }

    // my cards must add to not dropped its not cheat whink about that
  
    const isHighestNotDropped=isHighestNotDroppedCard(notDropped[card.suit],card)

    const enemies=turnPlayer.enemies

    if(isHighestNotDropped||hokm===card.suit){  
        return doesRemainEnemiesHaveCarpetSuit(carpetSuit,enemies,suitsPlayersDontHave)
    
    }
    else{

        return false
    }

    
}
const hokmSetter=(cards)=>{
    let selectedSuit=''
    let max={len:14}
    for (const suit of Object.keys(cards)) {
        if(cards[suit].length<max.len){
            max={len:cards[suit].length,suit:suit}
        }
        
        
    }
    return max.suit
    
    
    
}
export {getCarpetCardPoints,aiMove,hokmSetter}
