/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,gamePlaying,activePlayer;
 
 function init() {
 				scores=[0,0];
 				roundScore=0;
 				activePlayer=0;
 				gamePlaying=true;

 				document.querySelector('.dice1').style.display="none";
 				document.querySelector('.dice2').style.display="none";
 				document.getElementById('score-0').textContent="0";
 				document.getElementById('score-1').textContent="0";

 				document.getElementById('current-0').textContent="0";
 				document.getElementById('current-1').textContent="0";

 				document.getElementById('name-0').textContent="Player 1";
 				document.getElementById('name-1').textContent="Player 2";

 				document.querySelector('.player-0-panel').classList.remove('winner');
   			 	document.querySelector('.player-1-panel').classList.remove('winner');
    			document.querySelector('.player-0-panel').classList.remove('active');
    			document.querySelector('.player-1-panel').classList.remove('active');
    			document.querySelector('.player-0-panel').classList.add('active');
 				
}
init();

document.querySelector('.btn-roll').addEventListener('click',function() {
			
			if (gamePlaying) {
				var dice1=Math.floor(Math.random()*6)+1;
				var dice2=Math.floor(Math.random()*6)+1;
				var diceDom1=document.querySelector('.dice1');
				diceDom1.style.display="block";
				diceDom1.src ="dice-"+dice1+".png";

				var diceDom2=document.querySelector('.dice2');
				diceDom2.style.display="block";
				diceDom2.src ="dice-"+dice2+".png";

				if (dice1 ==1	|| dice2 ==1) {
					nextPlayer();
				}
				else{
					roundScore=roundScore+dice1+dice2;
					document.getElementById('current-'+activePlayer).textContent=roundScore;
				}

				if(dice1 ==6 && dice2==6){
					scores[activePlayer]=0;
					document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
					nextPlayer();
				}
			}
});
 

document.querySelector(".btn-hold").addEventListener('click',function() {
			if(gamePlaying){
				scores[activePlayer]=scores[activePlayer] + roundScore;
				document.querySelector("#score-"+activePlayer).textContent=scores[activePlayer];
				var input=document.querySelector('.final-score').value;
				var winningscore;

				if(input){
					winningscore=input;
				}
				else{
					winningscore=100;
				}

				if (scores[activePlayer] >= winningscore) {
					document.querySelector("#name-"+activePlayer).textContent="Winner!!";

					if (activePlayer==1) {
						var lose=0;
					}
					else{
						lose=1;
					}

					document.querySelector("#name-"+lose).textContent="Loser";

					document.querySelector('.dice1').style.display="none";
					document.querySelector('.dice2').style.display="none";

					document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
					document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
					gamePlaying = false;
				}
				else{

					nextPlayer();	
				}
			}
});
document.querySelector('.btn-new').addEventListener('click', init);
function nextPlayer() {
	
			if (gamePlaying) {

						activePlayer===0 ? activePlayer = 1:activePlayer = 0;
				roundScore=0;

			    document.getElementById('current-0').textContent = '0';
  				document.getElementById('current-1').textContent = '0';

  				document.querySelector('.player-0-panel').classList.toggle('active');
  				document.querySelector('.player-1-panel').classList.toggle('active');

			}
				
}