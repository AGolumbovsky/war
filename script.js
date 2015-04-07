$(document).ready(function() {

	//what does this do?
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	//Creates a deck
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
	//This shuffles the deck. creates a new array and pushes the cards into it, deletes the card from the old array
	// when i becomes 0 it is falsy and the loop stops
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	deck = shuffle(deck);

	
	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evently divide the deck up between the two players
	var deal = function(array) {
		for (var i = array.length-1; i > 0; i -= 2) {
			cards_player_1.push(array[i]);
			cards_player_2.push(array[i-1]);     //not sure if it works, not surprised if it doesn't
	    }
	}
	deal(deck);
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(p1, p2) {
	  if (p1 > p2) {  //return the winner card
	  	return cards_player_1; //returns the winnig player ARRAY?
	  }		
	  else if (p2 > p1) {  // return the winner card
	  	return cards_player_2; //returns the the winning player ARRAY?
	  }
	  else return false; //return a tie
	};
	// war(cards_player_1, cards_player_2);
	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var tieStack = [];
	var play = function play() {
		
		//this function (defined below) will continue to the next turn
		
		var card1 = cards_player_1.shift();
		var card2 = cards_player_2.shift();
		console.log(card1, card2)
		var winner = war(card1.number, card2.number); //this function stops but does the program GO ON?
		console.log(winner);
		if (winner) {
			winner.push(card1);
			winner.push(card2);
			winner.concat(tieStack)
		}
		else {
			tieStack.push(card1);
			tieStack.push(card2);
			play();

			 // Oh yeah? if you so smart, then hwo do you add the rest of the cards to the winner?
		
	   	}
	   	advance();
}

	advance();
	
	$(".btn").click(function() {
		play();
	});
});
