  $(document).ready(function() {

    var smallItems = ["assets/images/items/Arrow.png", "assets/images/items/Bomb.png", "assets/images/items/Deku_Nut.png", "assets/images/items/Deku_Seeds.png", "assets/images/items/Deku_Shield.png", "assets/images/items/Deku_Stick.png", "assets/images/items/Fairy_Slingshot.png", "assets/images/items/Keaton_Mask.png", "assets/images/items/Blue_Potion.png", "assets/images/items/Red_Potion.png", "assets/images/items/Green_Potion.png", "assets/images/items/Bombchu.png", "assets/images/items/Fairy_Ocarina.png", "assets/images/items/Kokiri_Tunic.png", "assets/images/items/Goron_Tunic.png", "assets/images/items/Zora_Tunic.png", "assets/images/items/Gold_Skulltula_Token.png"]
    var medItems = ["assets/images/medium/Bomb_Bag.png", "assets/images/medium/Boomerang.png", "assets/images/medium/Hookshot.png", "assets/images/medium/Hylian_Shield.png", "assets/images/medium/Iron_Boots.png", "assets/images/medium/Kokiri_Sword.png", "assets/images/medium/Mask_of_Truth.png", "assets/images/medium/Ocarina_of_Time.png", "assets/images/medium/Piece_of_Heart.png"]
    var premItems = ["assets/images/premium/Fire_Arrow.png", "assets/images/premium/Ice_Arrow.png", "assets/images/premium/Light_Arrow.png", "assets/images/premium/Goron_Bracelet.png", "assets/images/premium/Heart_Container.png", "assets/images/premium/Hero_Bow.png", "assets/images/premium/Hover_Boots.png", "assets/images/premium/Master_Sword.png", "assets/images/premium/Mirror_Shield.png", "assets/images/premium/premium_ocarina.png"]

    var rupeeIDs = ["#green-rupee", "#blue-rupee", "#red-rupee", "#orange-rupee"];
    
    var premPrice;
    var medPrice;
    var smallLeftPrice;
    var smallRightPrice;

    var moneyCounter;
    var premCounter = 0;
    var boughtCounter = 0;
    var failCounter = 0;

    var finalMessage = "";
    var gameover = false;
    var failedPrem = false;

    $("#premium").text(premCounter);
    $("#bought").text(boughtCounter);
    $("#fail").text(failCounter);

    function areaMapCoords() {
      // Convoluted work-around to create dynamic coords for the rupee map area
      var rupeeGreen = ("0,0," + Math.floor($("#rupeeImg").width()/4) + "," + ($("#rupeeImg").height()));
      var rupeeBlue = (Math.floor($("#rupeeImg").width()/4) + ",0," + Math.floor($("#rupeeImg").width()/2) + "," + ($("#rupeeImg").height()));
      var rupeeRed = (Math.floor($("#rupeeImg").width()/2) + ",0," + (Math.floor($("#rupeeImg").width()/4)*3) + "," + ($("#rupeeImg").height()));
      var rupeeOrange = (Math.floor(($("#rupeeImg").width()/4)*3) + ",0," + ($("#rupeeImg").width()) + "," + ($("#rupeeImg").height()));
      var rupeeCoords = [rupeeGreen, rupeeBlue, rupeeRed, rupeeOrange];

      // Fill the map area coords for the rupees
      for (var i = 0; i < rupeeCoords.length; i++) {
        //console.log(rupeeIDs[i]);
        $(rupeeIDs[i]).attr("coords", rupeeCoords[i]);
        //console.log(rupeeCoords[i]);
      }
    };
    
    function giveRupeesValues() {
      // Next we create a for loop to give the rupees values.
      for (var i = 0; i < rupeeIDs.length; i++) {

        // Each rupee click area will be given a data attribute called data-rupeevalue.
        $(rupeeIDs[i]).attr("data-rupeevalue", (Math.floor(Math.random() * 12) + 1));
      }
    };

    function gameSetup() {
      $("#item-prem").css("background-image", "url(" + premItems[Math.floor(Math.random() * premItems.length)] + ")");
      $("#item-med").css("background-image", "url(" + medItems[Math.floor(Math.random() * medItems.length)] + ")");
      $("#item-small-left").css("background-image", "url(" + smallItems[Math.floor(Math.random() * smallItems.length)] + ")");
      $("#item-small-right").css("background-image", "url(" + smallItems[Math.floor(Math.random() * smallItems.length)] + ")");

      $("#peek").css("display", "none");

      moneyCounter = 0;
      premPrice = Math.floor(Math.random() * 102) + 19;
      medPrice = Math.floor(Math.random() * 102) + 19;
      smallLeftPrice = Math.floor(Math.random() * 102) + 19;
      smallRightPrice = Math.floor(Math.random() * 102) + 19;

      $("#message-one").html("What'll it be? You can only buy one, so choose wisely.");
      $("#message-two").html("Click the rupees to get your money together and match the price of the item you want.<br>What?<br>You don't know what each rupee is worth? Have you been hitting the Poe Spirits? *sigh* Just click them, you'll figure it out.");

      $("#money").text(moneyCounter);
      $("#premPrc").text(premPrice);
      $("#medPrc").text(medPrice);
      $("#smlLftPrc").text(smallLeftPrice);
      $("#smlRghtPrc").text(smallRightPrice);
      $(".rupee-value").text("");

      giveRupeesValues()

      gameover = false;
      failedPrem = false;
    };

    //Grab coordinates
    areaMapCoords();
    // Setup game
    gameSetup();

    function gameOver(finishMessage) {
      $("#item-prem").css("background-image", "url( )");
      $("#item-med").css("background-image", "url( )");
      $("#item-small-left").css("background-image", "url( )");
      $("#item-small-right").css("background-image", "url( )");

      $("#premPrc").text("");
      $("#medPrc").text("");
      $("#smlLftPrc").text("");
      $("#smlRghtPrc").text("");

      gameover = true;
      console.log(finishMessage);

      $("#message-one").html(finishMessage);
      $("#message-two").html("<br>We'll have to restock the items if you want to buy something else.");
    };

    // This time, our click event applies to every single crystal on the page. Not just one.
    $(".rupee").on("click", function(e) {
      e.preventDefault();
      console.log("A");

      if (!gameover) {
        // Determining the rupee's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the rupee value of the clicked rupee.
        // Using the .attr("data-rupeevalue") allows us to grab the value out of the "data-rupeevalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
        
        var rupeeValue = ($(this).attr("data-rupeevalue"));
        rupeeValue = parseInt(rupeeValue);

        $($(this).attr("rupeeColor")).text(rupeeValue);

        $("#peek").css("display", "inline-block");
        // We then add the rupeeValue to the user's "counter" which is a global variable.
        // Every click, from every rupee adds to the global counter.
        moneyCounter += rupeeValue;
        $("#money").text(moneyCounter);
        console.log(rupeeValue);

        if (moneyCounter === premPrice) {
          //alert("You got the premium item! Good deal.");
          if (moneyCounter < 60) {
            finalMessage = "You got the premium item for " + moneyCounter + " rupees? What a great deal!";
          } else {
            finalMessage = "You got the premium item! Good job.";
          }
          boughtCounter++
          premCounter++
          $("#bought").text(boughtCounter);
          $("#premium").text(premCounter);
          gameOver(finalMessage);
        } else if (moneyCounter === medPrice) {
          //alert("You've bought the mid-level item. Nice!");
          boughtCounter++
          $("#bought").text(boughtCounter);
          gameOver("You've bought the moderate level item. Nice!");
        } else if (moneyCounter === smallLeftPrice || moneyCounter === smallRightPrice) {
          if (moneyCounter > 60) {
            finalMessage = "You bought a common item for " + moneyCounter + " rupees? That's a terrible deal, but I guess it's better than nothing.";
          } else {
            finalMessage = "You've bought one of the common items. Not bad.<br>Not great, but not bad.";
          }
          boughtCounter++
          $("#bought").text(boughtCounter);
          gameOver(finalMessage);
        } else if (moneyCounter > premPrice && (moneyCounter < medPrice || moneyCounter < smallLeftPrice || moneyCounter < smallRightPrice) && !failedPrem) {
          //alert("Well, you missed the premium item, but you still have a chance at one of the others.");
          $("#message-one").html("Too bad.");
          $("#message-two").html("You missed the premium item, but you still have a chance at one of the others.");
          failedPrem = true;
        } else if (moneyCounter > premPrice && moneyCounter > medPrice && moneyCounter > smallLeftPrice && moneyCounter > smallRightPrice) {
          //alert("Looks like you won't be buying anything today.");
          failCounter++
          $("#fail").text(failCounter);
          gameOver("Looks like you won't be buying anything today.");
        }
      }
    });

    $("#restock").on("click", function() {
      gameSetup();

    });

    $("#peek").on("click", function() {
      if ($("#rupee-values").css("display") === "none") {
        $("#rupee-values").css("display", "inline-block");
      } else {
        $("#rupee-values").css("display", "none");
      }
    });

    window.addEventListener('resize', function(){
      areaMapCoords();
    }, true);
  });