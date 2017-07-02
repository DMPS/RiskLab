// === Game Data ===
var gameData = {
	commandCounter : 0,
	gameOver : false,
	introText : 'Welcome to RiskLab, a partially exploded International Institute of Actuaries built to create the next groundbreaking techniques. You are a treasure hunter, sent here by the ACME Corporation to find a technique rumoured to be lost in the rubble.',
	outroText : 'Thanks For playing!',
	player : {
		currentLocation : 'Lab Entrance',
		inventory : {},
		pen : false,
		HallwayCorrect:false,
		OfficeCorrect:false
	},
	map : {
		'Lab Entrance' : {
			firstVisit : true,
			displayName : 'Lab Entrance',
			description : 'You stand at the partially collapsed entrance to the Lab. Nearby there is a note sticking out of a pyramid of ballpoint pens. There is a poster on the wall in front of you.',
			interactables : {
				pens : { look : 'The pens still seem to work, although, their ink is a weird shade of red...' },
				note : { look : 'The note reads, "final salary = length of service times accrual rate times final pensionable salary"' },
				poster : { look : 'The poster says, "Remember that only skilled actuarial scientists are allowed at RiskLab! For all others, DEATH. :)"' }
			},
			items : {
				pen : {
					displayName : 'Ballpoint Pen',
					description : 'A well made ballpoint pen. Allows you to write down calculations.',
					use : function(){return calculate();},
					quantity : 1,
					hidden : true
				}
			},
			exits : {
				inside : {
					displayName : 'Inside',
					destination : 'Hallway'
				}
			},
		},
		'Hallway' : {
			firstVisit : true,
			displayName : 'Hallway',
			description : 'It is dimly lit here. You can see an empty doorway to your left. The CEO of ACME Corporation told yu before that all empty doorways in the buildings are booby trapped and you need to solve a prble to go through safely. You can see a problem inscribed just above the doorway, "What is the final salary of an employee who worked for 40 years, had a final salary of £44,000, and agreed (foolishly) to an accrual rate of 0.003?".',
			exits : {
				outside : {
					displayName : 'Outside',
					destination : 'Lab Entrance'
				},
				doorway : {
					displayName : 'Through the Doorway',
					destination : 'Office'
				}
			}
		},
		
		'Office' : {
			firstVisit : true,
			description : 'You gingerly walk through the doorway to find yourself in an office as the doorway collapses behind you. There is a file sitting on a mahogany desk in front of you. Under the desk is a tunnel. There is another question inscribed on the tunnel, "A king decides that how long your meeting with him lasts depends on whether you have asked for a meeting the week before, (the more you ask for audiences, the shorter the meeting). The meetings can be 1 minute, 10 minutes or 1 hour. The probability of seeking an audience with the king is 0.12. What is the probability of having a 1 minute meeting at the end of a month given that you had no meetings with him the previous month?"',
			setup : function(){boobytrap('Hallway','Office');},
			exits: {
				hole: {
					displayName: "Down the Hole",
					destination: 'Tunnel'
				}
			},
			items:{
				file : {
					displayName : 'Manila File',
					description : 'A shabby looking manila file. You better wait until you are safe to open it.',
					use : function(){return 'Professor Oak: "Now is not the time to use that"';},
					quantity : 1,
					hidden : true
				}
			}
		},
		'Tunnel' : {
			firstVisit : true,
			description : 'placeholder',
			setup : function(){
				if(!gameData.player.OfficeCorrect){
					boobytrap('Office','Tunnel');
				}else{
					end();
				}
			}
		}
	}
};

// === Game Actions ===
var gameActions = {
	"calculate":function(game,command,consoleInterface){
		if(game.player.pen){
			console.log(command,parseFloat(command.subject))
			var res = checkAnswer(parseFloat(command.subject),game.player.currentLocation); //checks the answer
			console.log(res)
			if(res.ans) {
				game.player[res.location+'Correct'] = true;
				return 'You throw your answer into the doorway. Your answer then vanishes in a flash of light. The '+res.location+' is safe now.'
			}else{
				console.log(false)
				return 'You throw your answer into the doorway. It burns up.'
			}
		}else{
			return 'You need to use a pen in order write down your answer.'
		}
	}

}

// === Necessary Exports ===
module.exports.gameData = gameData;
module.exports.gameActions = gameActions;

// === Helper Functions ===

function calculate(){ //checks the user has uncapped their pen in order to use it
	gameData.player.pen = true; 
	return 'You uncap the pen.'
}

function checkAnswer(ans,location){
	switch (location) {
		case 'Hallway':
			if(ans===5280){ //checks for the right answer
				return {
					ans:true,
					location: 'Hallway'
				}
			}else{
				return {
					ans:false,
					location: 'Hallway'
				}
			}
		case 'Office':
			if(Math.round(ans*1000)/1000===0.016){ //checks for the right answer to 3dp
				return {
					ans:true,
					location: 'Office'
				}
			}else{
				return {
					ans:false,
					location: 'Office'
				}
			}
		default:
			break;
	}
	return r;
}
function boobytrap(previousLocation,currentLocation){ //checks that the boobytraps have been disabled by completing the questions
	console.log(gameData.player[previousLocation+'Correct'])
	if(!gameData.player[previousLocation+'Correct']){
		gameData.map[currentLocation].description = 'You were blown up by a booby trap.'
		gameData.gameOver = true;
	}
}

function end(){
	gameData.gameOver = true;
	if(gameData.player.inventory.file){
		gameData.map.Tunnel.description = 'You take the tunnel to a location outside of the lab. Feeling safe, you open the file. There is a piece of paper that reads "Oranges, Apples, Coleslaw, Rice, Milk". It appears to be a shopping list. You realize that you are going to have to go back in...'
	}else{
		gameData.map.Tunnel.description = 'You take the tunnel to a location outside of the lab. You look at your inventory and find nothing but dust and a ballpoint pen. You realize that you are going to have to go back in...'
	}
}