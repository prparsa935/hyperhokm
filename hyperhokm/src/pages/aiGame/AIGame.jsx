import { useEffect, useState } from "react";
import useDidMountEffect from "../../utils/useDidMountEffect ";
import { aiMove, getCarpetCardPoints, hokmSetter } from "../../utils/hokmAi";

// import image from '../../asserts/fronts/png_96_dpi/clubs_2.png'
// import image2 from '../../asserts/backs/blue2.svg'
// import bgImage from '../../asserts/IMG_20240329_170516_335.jpg'
const AIGame = () => {
  const [turn, setTurn] = useState("");
  const [turnCount, setTurnCount] = useState(1);
  const [notDroppedCards, setNotDroppedCards] = useState({});
  const [availableSuits, setAvailableSuits] = useState(["D", "C", "S", "H"]);
  const [carpetCards, setCarpetCards] = useState([false, false, false, false]);
  const [firstDrop, setFirstDrop] = useState({});
  const [lastPlay, setLastPlay] = useState({});
  const [hokm, setHokm] = useState(null);
  const [ruler, setRuler] = useState();

  const [suitsPlayersDontHave, setSuitsPlayersDontHave] = useState([
    [],
    [],
    [],
    [],
  ]);

  const [cardDeck, setCardDeck] = useState({
    D: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    C: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    S: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    H: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  });

  const [players, setPlayers] = useState({
    player1: {
      cards: {
        D: [],
        C: [],
        S: [],
        H: [],
      },
      enemies: [2, 4],
      teamMate: 3,
      winGameCount: 0,
      stackWins: 0,
    },
    player2: {
      cards: {
        D: [],
        C: [],
        S: [],
        H: [],
      },
      enemies: [1, 3],
      teamMate: 4,
      winGameCount: 0,
      stackWins: 0,
    },
    player3: {
      cards: {
        D: [],
        C: [],
        S: [],
        H: [],
      },
      enemies: [2, 4],
      teamMate: 1,
      winGameCount: 0,
      stackWins: 0,
    },
    player4: {
      cards: {
        D: [],
        C: [],
        S: [],
        H: [],
      },
      enemies: [1, 3],
      teamMate: 2,
      winGameCount: 0,
      stackWins: 0,
    },
  });
  // useEffect(()=>{
  //     set

  //     // const d=[{age:23},{age:33},{age:55},false]
  //     // console.log(d.reduce((prev,curr)=>{
  //     //     if(prev===false){
  //     //         return curr
  //     //     }
  //     //     if(curr===false){
  //     //         return prev
  //     //     }
  //     //     return prev.age>curr.age?prev:curr}))

  // },[hokm])
  useEffect(() => {
    const rulerplayer = Math.floor(Math.random() * 4) + 1;
    setPlayersCards(20);
    setNotDroppedCards(cardDeck);
    setRuler(rulerplayer);
    setFirstDrop({ player: rulerplayer });
  }, []);
  useDidMountEffect(() => {
    if (ruler !== 2) {
      setHokm(hokmSetter(players["player" + ruler].cards));
    }
  }, [ruler]);
  useDidMountEffect(() => {
    setPlayersCards(32);
    setTurn(ruler);

    //     let localCardDeck= {"D":[
    //         1,2,3,4,5,6,7,8,9,10,11,12,13],
    //     "C":[
    //         1,2,3,4,5,6,7,8,9,10,11,12,13
    //     ],
    //     "S":[
    //         1,2,3,4,5,6,7,8,9,10,11,12,13
    //     ],
    //     "H":[
    //         1,2,3,4,5,6,7,8,9,10,11,12,13
    //     ]
    // }

    //     let availableSuits=Object.keys(localCardDeck)

    //     let playerTurn=1

    //     let localPlayers=JSON.parse(JSON.stringify(players));

    //     for (let i=1;i<53;i++) {

    //         let randomSuit=availableSuits[Math.floor(Math.random() * (availableSuits.length) ) ]

    //         let chosenSuit=localCardDeck[randomSuit]

    //         let chosenCardIndex=Math.floor(Math.random() * (chosenSuit.length) )
    //         let chosencard=chosenSuit[chosenCardIndex]

    //         localPlayers['player'+playerTurn]['cards'][randomSuit].push(chosencard)

    //         localCardDeck[randomSuit].splice(chosenCardIndex,1)

    //         if(localCardDeck[randomSuit].length===0){

    //             availableSuits.splice(availableSuits.indexOf(randomSuit),1)
    //         }
    //         if(playerTurn===4){
    //             playerTurn=1

    //         }
    //         else{
    //             playerTurn+=1

    //         }

    //     }
    //     Object.keys(localPlayers['player'+playerTurn]['cards']).forEach((key)=>{
    //         ['player1','player2','player3','player4'].forEach((player)=>{
    //             localPlayers[player]['cards'][key].sort(function(a, b){return a - b})

    //         })

    //     })

    // setHokm('D')
    // setRuler(rulerplayer)
  }, [hokm]);

  useDidMountEffect(() => {
    if (turn !== 2) {
      const cardToPlay = aiMove(
        turn,
        players,
        notDroppedCards,
        carpetCards,
        firstDrop,
        hokm,
        suitsPlayersDontHave,
        turnCount
      );
      setTimeout(() => {
        playerPlay(turn, cardToPlay.suit, cardToPlay.cardIndex);
      }, 1000);
    }
  }, [turnCount, turn]);
  useDidMountEffect(() => {
    // let roundCount=0

    // carpetCards.forEach((card)=>{

    //     if(card!==false){

    //         roundCount+=1
    //     }

    // })

    let localfirstDrop = JSON.parse(JSON.stringify(firstDrop));
    if (turnCount === 1) {
      setTurnCount(turnCount + 1);

      setFirstDrop({
        player: turn,
        card: { cardIndex: lastPlay.cardIndex, suit: lastPlay.suit },
      });
      localfirstDrop = {
        player: turn,
        card: { cardIndex: lastPlay.cardIndex, suit: lastPlay.suit },
      };
    }
    console.log(lastPlay.suit);
    console.log(localfirstDrop.card.suit);
    if (lastPlay.suit !== localfirstDrop.card.suit) {
      setSuitsPlayersDontHave((prevValue) => {
        prevValue[turn - 1].push(localfirstDrop.card.suit);
        console.log(prevValue);
        return prevValue;
      });
    }

    if (turnCount === 4) {
      setTimeout(() => {
        const carpetpoints = getCarpetCardPoints(carpetCards, firstDrop, hokm);

        // need test

        const maxPoint = Math.max(...carpetpoints);
        const wonPlayer = carpetpoints.indexOf(maxPoint) + 1;

        let localPlayers = JSON.parse(JSON.stringify(players));

        localPlayers["player" + wonPlayer]["stackWins"] += 1;
        localPlayers["player" + localPlayers["player" + wonPlayer]["teamMate"]][
          "stackWins"
        ] += 1;

        setTurn(wonPlayer);
        setTurnCount(1);
        setNotDroppedCards((notDropped) => {
          let localnotDropped = JSON.parse(JSON.stringify(notDropped));
          for (const card of carpetCards) {
            localnotDropped[card.suit].splice(
              localnotDropped[card.suit].indexOf(card.cardIndex),
              1
            );
          }

          return localnotDropped;
        });

        setCarpetCards([false, false, false, false]);

        setFirstDrop({ player: wonPlayer, card: null });
        setPlayers(localPlayers);
        if (localPlayers["player" + wonPlayer]["stackWins"] === 7) {
          localPlayers["player" + wonPlayer]["winGameCount"] += 1;
          localPlayers[
            "player" + localPlayers["player" + wonPlayer]["teamMate"]
          ]["winGameCount"] += 1;
        }

        if (localPlayers["player" + wonPlayer]["winGameCount"] === 7) {
          alert("اتمام بازی");
          return;
        }
      }, 1000);
    } else {
      setTurnCount(turnCount + 1);
      setTurn((turn % 4) + 1);
    }
  }, [lastPlay]);
  const hokmToPersion = () => {
    if (hokm === "S") {
      return "پیک";
    } else if (hokm === "C") {
      return "خاج";
    } else if (hokm === "H") {
      return "دل";
    } else if (hokm === "D") {
      return "خشت";
    }
  };
  const playerPlay = (player, suit, cardIndex) => {
    // console.log(players['player'+player].cards)
    // console.log(suit)
    // console.log(players['player'+player].cards[suit].length)
    if (
      turnCount !== 1 &&
      suit !== firstDrop.card.suit &&
      players["player" + player].cards[firstDrop.card.suit].length !== 0
    ) {
      return;
    }
    let localPlayers = JSON.parse(JSON.stringify(players));
    // let localNotDroppedCards=notDroppedCards
    let localCarpetCards = [...carpetCards];
    const card = { suit: suit, cardIndex: cardIndex };
    localCarpetCards[player - 1] = card;

    // localNotDroppedCards[suit].splice(localNotDroppedCards[suit].indexOf(cardIndex),1)
    localPlayers["player" + player]["cards"][suit].splice(
      localPlayers["player" + player]["cards"][suit].indexOf(cardIndex),
      1
    );
    setPlayers(localPlayers);

    setCarpetCards(localCarpetCards);
    setLastPlay({ player: player, suit: suit, cardIndex: cardIndex });
    return;
  };
  const DeckOfcards = ({ isPlayer, player, playerIndex }) => {
    let count =
      player.cards["D"].length +
      player.cards["C"].length +
      player.cards["H"].length +
      player.cards["S"].length;
    const firstCount = count;

    return (
      <>
        {" "}
        {Object.keys(player.cards).map((suit) => {
          return player.cards[suit]?.map((card) => {
            count -= 1;

            return (
              <div
                onMouseDown={(e) => {
                  if (turn === playerIndex) {
                    playerPlay(playerIndex, suit, card);
                  }
                }}
                role="button"
                style={{
                  marginRight: "-50px",
                  zIndex: count,
                  transform: `rotate(${
                    (count - firstCount / 2) * 4
                  }deg) translateY(${(count - firstCount / 2) ** 2}px)`,
                }}
                className="  w-5r  "
              >
                <img
                  className="w-100 border"
                  src={
                    isPlayer
                      ? "/backs/blue2.svg"
                      : "/fronts/" + suit + card + ".svg"
                  }
                ></img>
              </div>
            );
          });
        })}
      </>
    );
  };
  const setPlayersCards = (cardsRemain) => {
    const rulerplayer = Math.floor(Math.random() * 4) + 1;
    let localCardDeck = JSON.parse(JSON.stringify(cardDeck));

    let localAvailableSuits = availableSuits;

    let playerTurn = 1;

    let localPlayers = JSON.parse(JSON.stringify(players));

    for (let i = 1; i <= cardsRemain; i++) {
      let randomSuit =
        localAvailableSuits[
          Math.floor(Math.random() * localAvailableSuits.length)
        ];

      let chosenSuit = localCardDeck[randomSuit];

      let chosenCardIndex = Math.floor(Math.random() * chosenSuit.length);
      let chosencard = chosenSuit[chosenCardIndex];

      localPlayers["player" + playerTurn]["cards"][randomSuit].push(chosencard);

      localCardDeck[randomSuit].splice(chosenCardIndex, 1);

      if (localCardDeck[randomSuit].length === 0) {
        localAvailableSuits.splice(localAvailableSuits.indexOf(randomSuit), 1);
      }
      if (playerTurn === 4) {
        playerTurn = 1;
      } else {
        playerTurn += 1;
      }
    }
    Object.keys(localPlayers["player" + playerTurn]["cards"]).forEach((key) => {
      ["player1", "player2", "player3", "player4"].forEach((player) => {
        localPlayers[player]["cards"][key].sort(function (a, b) {
          return a - b;
        });
      });
    });
    setPlayers(localPlayers);
    setCardDeck(localCardDeck);
  };
  return (
    <div className=" h-100vh  d-flex flex-column justify-content-between position-relaive overflow-hidden text-white ">
      <div
        className={
          "d-flex align-items-center position-absolute w-100 d-flex justify-content-center h-100 align-items-center z-index-10  " +
          (turn.length === 0 ? "" : "d-none")
        }
      >
        <div className="row w-25r">
          <h3 className="col-12 text-center"> لطفا خال حکم را انتخاب کنید</h3>

          <div onClick={() => setHokm("C")} role="button" className=" col-3 ">
            <img className="w-100" src="club.svg"></img>
          </div>
          <div onClick={() => setHokm("H")} role="button" className=" col-3">
            <img className="w-100" src="heart.svg"></img>
          </div>
          <div onClick={() => setHokm("S")} role="button" className=" col-3">
            <img className="w-100" src="spade.svg"></img>
          </div>

          <div onClick={() => setHokm("D")} role="button" className=" col-3">
            <img className="w-100" src="diamond.svg"></img>
          </div>
        </div>
      </div>
      <img
        className="position-absolute top-0 w-100 h-100 z-index--1"
        src="/IMG_20240329_170516_335.jpg"
      ></img>
      <div className="h-25 d-flex justify-content-center align-items-center">
        <div dir="rtl" className="d-flex position-relative ">
          {/* {DeckOfcards(true,players.player3)} */}
          {
            <DeckOfcards
              isPlayer={true}
              player={players.player4}
              playerIndex={4}
            />
          }

          {/* <div style={{marginRight:'-50px',zIndex:12}} className=" w-5r  ">
                        <img className="w-100" src={image2}></img>

                    </div> */}
        </div>
      </div>
      <div className="flex-grow-1 d-flex justify-content-between overflow-hidden ">
        <div className="d-flex align-items-center col-1 ">
          <div
            dir="rtl"
            className="d-flex rotate-90 w-15r position-relative p-ln8"
          >
            {
              <DeckOfcards
                isPlayer={true}
                player={players.player1}
                playerIndex={1}
              />
            }

            {/* <div style={{zIndex:13}} className="  w-5r ">
                                <img className="w-100  " src={image2}></img>

                            </div>
                            <div style={{marginRight:'-50px',zIndex:12}} className=" w-5r  ">
                                <img className="w-100" src={image2}></img>

                            </div>
                            <div style={{marginRight:'-50px',zIndex:11}} className=" w-5r  ">
                                <img className="w-100" src={image2}></img>

                            </div> */}
            {/* <div style={{marginRight:'-150px',zIndex:10}} className=" w-5r  ">
                                <img className="w-100" src={image}></img>

                            </div> */}
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            {/* <div className="w-5r ">
                            <img className="w-100" src={'/fronts/C1.svg'}></img>

                        </div> */}
            <div
              className={
                "w-5r  " +
                (carpetCards[3]
                  ? "transition-500"
                  : "opacity-0 transform-top-card")
              }
            >
              <img
                className="w-100  "
                src={
                  "/fronts/" +
                  (carpetCards[3]["suit"] + carpetCards[3]["cardIndex"]) +
                  ".svg"
                }
              ></img>
            </div>
          </div>
          <div className="d-flex justify-content-between  w-15r">
            <div
              className={
                "w-5r   " +
                (carpetCards[0]
                  ? "transition-500 "
                  : "opacity-0 transform-left-card   ")
              }
            >
              <img
                className="w-100 rotate-90  "
                src={
                  "/fronts/" +
                  (carpetCards[0]["suit"] + carpetCards[0]["cardIndex"]) +
                  ".svg"
                }
              ></img>
            </div>
            <div
              className={
                "w-5r  " +
                (carpetCards[2]
                  ? "transition-500"
                  : "opacity-0 transform-right-card")
              }
            >
              <img
                className="w-100 rotate-90  "
                src={
                  "/fronts/" +
                  (carpetCards[2]["suit"] + carpetCards[2]["cardIndex"]) +
                  ".svg"
                }
              ></img>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className={
                "w-5r  " +
                (carpetCards[1]
                  ? "transition-500"
                  : "opacity-0 transform-bottom-card")
              }
            >
              <img
                className="w-100 "
                src={
                  "/fronts/" +
                  (carpetCards[1]["suit"] + carpetCards[1]["cardIndex"]) +
                  ".svg"
                }
              ></img>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center col-1 ">
          <div
            dir="rtl"
            className="d-flex rotate-270 w-15r position-relative p-ln4 "
          >
            {
              <DeckOfcards
                isPlayer={true}
                player={players.player3}
                playerIndex={3}
              />
            }

            {/* <div style={{zIndex:13}} className="  w-5r ">
                                <img className="w-100  " src={image2}></img>

                            </div>
                            <div style={{marginRight:'-50px',zIndex:12}} className=" w-5r  ">
                                <img className="w-100" src={image2}></img>

                            </div>
                            <div style={{marginRight:'-50px',zIndex:11}} className=" w-5r  ">
                                <img className="w-100" src={image2}></img>

                            </div>
                            <div style={{marginRight:'-50px',zIndex:10}} className=" w-5r  ">
                                <img className="w-100" src={image2}></img>

                            </div> */}
          </div>
        </div>
      </div>
      <div className="position-absolute d-flex flex-column">
        <div className="d-flex">
          <h3>حکم:</h3> <h3 className="">{hokmToPersion()}</h3>
        </div>
        <div className="d-flex">
          <h3>امتیاز شما:</h3>{" "}
          <h3 className="">{players["player2"].stackWins}</h3>
        </div>
        <div className="d-flex">
          <h3>امتیاز حریف:</h3>{" "}
          <h3 className="">{players["player1"].stackWins}</h3>
        </div>
      </div>
      <div className="h-25 d-flex justify-content-center align-items-center overflow-hidden">
        <div dir="rtl" className="d-flex position-relative ">
          {
            <DeckOfcards
              isPlayer={false}
              player={players.player2}
              playerIndex={2}
            />
          }
          {/* <div style={{zIndex:13}} className="  w-5r ">
                        <img className="w-100" src={image}></img>

                    </div>
                    <div style={{marginRight:'-50px',zIndex:12}} className=" w-5r  ">
                        <img className="w-100" src={image}></img>

                    </div> */}
        </div>
      </div>
    </div>
  );
};
export default AIGame;
