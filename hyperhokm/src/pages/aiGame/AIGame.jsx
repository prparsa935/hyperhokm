import { useEffect, useState } from "react"

// import image from '../../asserts/fronts/png_96_dpi/clubs_2.png'
// import image2 from '../../asserts/backs/blue2.svg'
// import bgImage from '../../asserts/IMG_20240329_170516_335.jpg'
const AIGame=()=>{
    const [turn,setTurn]=useState('')
    const [notDroppedCards,setNotDroppedCards]=useState({})
    const [carpetCards,setCarpetCards]=useState([false,false,false,false])
    const [hokm,setHokm]=useState('')
    const [ruler,setRuler]=useState()
    const [cardDeck,setCardDeck]=useState(
        {"D":[
            1,2,3,4,5,6,7,8,9,10,11,12,13
        ],
        "C":[
            1,2,3,4,5,6,7,8,9,10,11,12,13
        ],
        "S":[
            1,2,3,4,5,6,7,8,9,10,11,12,13
        ],
        "H":[
            1,2,3,4,5,6,7,8,9,10,11,12,13
        ]
        }
    )
    const [players,setPlayers]=useState(
        {'player1':{
            cards:{
                "D":[
              
            
                ],
                "C":[
                
                ],
                "S":[
                
                ],
                "H":[
                
                ]
            },
            winGameCount:0,
            stackWins:0
            
        },
        'player2':{
            cards:{
                "D":[
               
            
                ],
                "C":[
                
                ],
                "S":[
                
                ],
                "H":[
                
                ]
            },
            winGameCount:0,
            stackWins:0
            
        },
        'player3':{
            cards:{
                "D":[
            
                ],
                "C":[
                
                ],
                "S":[
                
                ],
                "H":[
                
                ]
            },
            winGameCount:0,
            stackWins:0
            
        },
        'player4':{
            cards:{
                "D":[
            
                ],
                "C":[
                
                ],
                "S":[
                
                ],
                "H":[
                
                ]
            },
            winGameCount:0,
            stackWins:0
            
        }}

    )

    useEffect(()=>{
        const rulerplayer='player'+(Math.floor(Math.random() * (4) ) + 1)
        
        
        

       

    },[])
    useEffect(()=>{
        

    },[turn])
    const deckOfcards=(Isenemy,player)=>{
        let count=13
        return Object.keys(player.cards).map((suit)=>{
                     
            return (player.cards[suit]?.map((card)=>{
                count-=1
    
                return(
                    <div style={{zIndex:count}} className="  w-5r ">
                        <img className="w-100" src={Isenemy?'/backs/blue2.svg':('/fronts/'+suit+card+'.svg')}></img>
    
                    </div>
    
                    
                )
            }))
    
        })
        
    }
    return(
        <div  className=" h-100vh  d-flex flex-column justify-content-between position-relaive">
            <img className="position-absolute top-0 w-100 h-100 z-index--1" src='/IMG_20240329_170516_335.jpg'></img>
            <div className="h-25 d-flex justify-content-center align-items-center">
                <div dir="rtl" className="d-flex position-relative ">
                    {deckOfcards(true,players.player3)}

                    {/* <div style={{marginRight:'-50px',zIndex:12}} className=" w-5r  ">
                        <img className="w-100" src={image2}></img>

                    </div> */}
                    

                </div>


            </div>
            <div className="flex-grow-1 d-flex justify-content-between">
                 <div className="d-flex align-items-center">
                      <div dir="rtl" className="d-flex rotate-90">

                            {deckOfcards(true,players.player4)}
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
                        <div className="w-5r ">
                            <img className="w-100" src={'/fronts/C1.svg'}></img>

                        </div>

                    </div>
                    <div className="d-flex justify-content-between justify-content-center w-15r">
                        <div className="w-5r  ">
                            <img className="w-100 rotate-90  " src={'/fronts/C1.svg'}></img>

                        </div>
                        <div className="w-5r  ">
                            <img className="w-100 rotate-90 " src={'/fronts/C1.svg'}></img>

                        </div>

                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="w-5r  ">
                            <img className="w-100 " src={'/fronts/C1.svg'}></img>

                        </div>

                    </div>

                </div>
                <div className="d-flex align-items-center">
                        <div dir="rtl" className="d-flex rotate-90">
                            {deckOfcards(true,players.player2)}
                        
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
            <div className="h-25 d-flex justify-content-center align-items-center">
                <div dir="rtl" className="d-flex position-relative ">

                    {deckOfcards(false,players.player1)}
                    {/* <div style={{zIndex:13}} className="  w-5r ">
                        <img className="w-100" src={image}></img>

                    </div>
                    <div style={{marginRight:'-50px',zIndex:12}} className=" w-5r  ">
                        <img className="w-100" src={image}></img>

                    </div> */}



                    
                    

                </div>


            </div>
            
            
            
        </div>
    )
    
}
export default AIGame