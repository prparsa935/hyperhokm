import { useEffect, useState } from "react"

import image from '../../asserts/fronts/png_96_dpi/clubs_2.png'
const AIGame=()=>{
    const [turn,setTurn]=useState('')
    const [droppedCards,setDroppedCards]=useState({})
    const [carpetCards,setCarpetCards]=useState([false,false,false,false])
    const [hokm,setHokm]=useState('')
    const [ruler,setRuler]=useState()
    const [cardDeck,setCardDeck]=useState(
        {"D":[
            1,2,3,4,5,6,7,8,9,10,11,12
        ],
        "C":[
            1,2,3,4,5,6,7,8,9,10,11,12
        ],
        "S":[
            1,2,3,4,5,6,7,8,9,10,11,12
        ],
        "H":[
            1,2,3,4,5,6,7,8,9,10,11,12
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
       

    },[])
    useEffect(()=>{

    },[turn])
    return(
        <div style={{backgroundImage:{image}}} className="container-fluid h-100vh bg-success d-flex flex-column justify-content-between">
            <div className="h-25 d-flex justify-content-center align-items-center">
                <div className="">
                    player1
                    

                </div>


            </div>
            <div className="flex-grow-1 d-flex justify-content-between">
                 <div className="d-flex align-items-center">
                    <div>
                        player4

                    </div>
            
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-center">
                        <span> card1</span>

                    </div>
                    <div className="justify-content-between justify-content-center">
                        <span>card4</span>
                        <span>card2</span>

                    </div>
                    <div className="d-flex justify-content-center">
                        <span> card3</span>

                    </div>

                </div>
                <div className="d-flex align-items-center">
                    <div>
                        player2

                    </div>
            
                </div>
                
            </div>
            <div className="h-25 d-flex justify-content-center align-items-center">
                <div className="d-flex position-relative">
                    <div className="w-5r padding-b-120p">
                        card1

                    </div>
                    
                    <div style={{right:'10px',zIndex:13}} className="position-absolute w-100  ">
                        <img className="w-100" src={image}></img>

                    </div>
                    <div style={{right:'20px',zIndex:12}} className="position-absolute w-100  ">
                    <img className="w-100" src={image}></img>

                    </div>
                    <div style={{right:'30px',zIndex:11}} className="position-absolute w-100 ">
                        <img className="w-100" src={image}></img>

                    </div>
                    <div style={{right:'40px',zIndex:10}} className="position-absolute w-100 ">
                        <img className="w-100" src={image}></img>

                    </div>
                    <div style={{right:'50px',zIndex:9}} className="position-absolute w-100 ">
                        <img className="w-100" src={image}></img>

                    </div>
                    <div style={{right:'60px',zIndex:8}} className="position-absolute w-100 ">
                        <img className="w-100" src={image}></img>

                    </div>
                    <div style={{right:'70px',zIndex:7}} className="position-absolute w-100 ">
                        <img className="w-100" src={image}></img>

                    </div>



                    
                    

                </div>


            </div>
            
            
            
        </div>
    )
    
}
export default AIGame