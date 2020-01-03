// Inital screen set up, hard coded in HTML

// Part One.
// When ANY character is chosen, other characters move to the ENEMIES stage and their background turn red.
// The CHOOSE AN ENEMY stage flag is dynamically created when ANY character is chosen. 
// Whichever character is chosen moves down and is labeled "your character"
// The above three lines should happen inside the character click event. 

// Part two.
// Once an enemy is clicked, the enemy moves down into the staging area and the 
// other enemies backgrounds turn back to white.
// The attack button is dynamically created. 


$(document).ready(function () {

    var isRunning = false;
    var enemySelected = false;
    var characters = { 
            names: ["Baby Yoda", "Baby Jabba", "Baby Ewok", "Baby Jedi"],
            hp: [100, 120, 150, 180], 
            counterAttack: [5, 15, 20, 25],
            attackBase: [10, 8, 6, 3],
    }

    console.log(characters[1[1]])

    // Creates a variable to hold a clone of the character div with all four characters to be able to 
    // retore later. 
    var divClone = $("div.characters").clone(true)

    function initializeGame() {
        isRunning = false;
        enemySelected = false;

        // adding clone of div characters back to top of game.
        $(divClone.clone(true)).appendTo(".game-start");


        // clears other divs on the page to return appearance to the same as the start.
        $("div.enemies, div.your-character, div.fight-character, div.fight-stage, div.battle-text").empty();


        // Hides buttons and VS, displays "CHOOSE CHARACTER" message.
        $("button").hide();
        $(".battle-flag").hide();
        $(".start-message").show();


        }

        // creating a click event for user to choose a character.
        $(".image-container-char").on("click", function () {

            if (isRunning) {
                return false;
            }

            else {

                // cloning character div after click listener has been added.
               divClone = $("div.characters").clone(true)
             
             
                // setting boolean to true to prevent game from selecting multiple characters as your character.
                isRunning = true;
                
                // hides the user selected character in the character div.
                $(this).hide();

                // adds words to the 'your character' div.
                $("div.your-character").append("<h3>Your Character:</h3>")

                // adds the user selected character to the your character div.
                $(this).appendTo("div.your-character")

                // hides remaining characters
                $("div.characters").hide()

                // hides choose your character
                $(".start-message").hide();

                // adds words to enemy div
                $("div.enemies").append("<h3 class='enemy-flag'>CHOOSE AN ENEMY:</h3>");
                
                // adds remaining characters to enemies div
                $(".characters").appendTo("div.enemies");
               
                // reveals selected character in your character div.
                $(this).show();

                // reveals remaining characters in enemies div
                $("div.characters").show();

                // adds class to characters in enemies div for use later.
                $("div.enemies div.image-container-char").addClass("image-enemies");

              
                // creating a click event for user to select an enemy
                $(".image-enemies").on("click", function () {

                    if (enemySelected) {
                        return false;
                    }
    
                    else {

                    // setting boolean to true to ensure only one enemy can be chosen.
                    enemySelected = true;
                
                    // hiding selected enemy in enemies div
                    $(this).hide();

                    // hiding choose enemy message
                    $(".enemy-flag").hide();

                    // adding words to fight character div
                    $("div.fight-character").append("<h3>Destroy them!</h3>")

                    // adding chosen enemy to fight character div
                    $(this).appendTo("div.fight-character")

                    // adding VS battle flag
                    $("div.your-character").after("<p class=battle-flag>VS</p>")

                    // adding attack and reset buttons to buttons div.
                    $("div.buttons").append("<button class='attack'>ATTACK</button>", "<button class='reset'>RESET GAME</button>");
                    
                    // showing chosen enemy in fight character div.
                    $(this).show()

                    $(".buttons").on("click", ".attack", function () {

                        // Gets the starting HP value for player and enemy, turns to integers, stores as variables.
                       var userHP = parseInt( $("div.your-character div.image-container-char div.hp-text span.hp").text());
                       var computerHP = parseInt( $("div.fight-character div.image-container-char.image-enemies div.hp-text span.hp").text());
                        
                       console.log(userHP);
                       console.log(computerHP);
                    
                        if (userHP > 0 && computerHP > 0) {
                         // Pulls the name of the character the user has chosen. 
                         player = $("div.your-character div.image-container-char div.name").text();

                        //  Pulls the index from the names array that matches the name of player.
                         playerIndex = characters.names.indexOf(player);
                        //  Using the index that matches the index of the name of player, pulls the HP for player character.
                         playerHP = characters.hp[playerIndex];
                        //  Using the index that matches the index of the name of player, pulls the attabkBase for Player character.
                         playerAttackBase = characters.attackBase[playerIndex];
                         
                         // Pulls the name of enemy the user has chosen. 
                         opponent = $("div.fight-character div.image-container-char.image-enemies div.name").text();

                         //  Pulls the index from the names array that matches the name of the enemy.
                         opponentIndex = characters.names.indexOf(opponent);
                         //  Using the index that matches the index of the name of the enemy, pulls the HP for enemy.
                         opponentHP = characters.hp[opponentIndex];
                        //  Using the index that matches the index of the name of enemy, pulls the attack for enemy character. 
                        //  Per directions, this number does not change based on turn, only character.
                         opponentAttack = characters.counterAttack[opponentIndex];

                         $("div.battle-text").text('You attacked ' + opponent + ' for ' + playerAttackBase + ' damage. ' + opponent + ' attacked you back for ' + opponentAttack + ' damage.');   
                         $("div.your-character div.image-container-char div.hp-text span.hp").text(userHP - opponentAttack);
                         $("div.fight-character div.image-container-char.image-enemies div.hp-text span.hp").text(computerHP - playerAttackBase);        

                        }
                        
                        else if (userHP <= 0 && computerHP > 0) {
                            
                            $("div.your-character div.image-container-character").hide();
                            $("div.battle-text").text('OH NO! You have been defeated. Reset Game to try again.');
                        
                        }

                        else if  (userHP > 0 && computerHP <=0) {
                            enemySelected = false;
                            $("div.fight-character div.image-container-cha.image-enemies").hide();
                            $("div.battle-text").text('Excellent! You have defeated ' + opponent + ". Please select a new enemy to continue.</p>")
                            $(".enemy-flag").show();

                        }

                        else {

                            $("div.battle-text").text("Please select an enemy to continue.");
                        
                        
                        }
                
                    })


                }

            })


            }

        })

    // setting up a click event for the attack button. 

    // $(".buttons").on("click", ".attack", function () {

    //     $("battle-text").css('visibility','visible');

    // })

        // if (enemySelected) {


        // }

    // setting up a click event for the reset button.
    $(".buttons").on("click", ".reset", function () {
    
    // calling the reset function, sets all variables and elements back to starting positions. 
        initializeGame();
     })

    })



// Part three.
// When the attack button is clicked, text-based attacks are made. 
// The enemies attack amount should always be the same, whereas the player's
// character should gain in attack HP each time. 

// If the enemy reaches 0 HP, the player has won. a message stating "You've won!
// Choose another enemy to fight" should display. Another enemy is selected and the patten repeats
// until the player has defeated all of the enemies. 

// IF however the player reaches 0 HP before any of the enemies, it is game over. 
// A message alerting the player they have lost should appear, and a reset game button should display. 

// When reset game is selected, initializeGame function should run. 
