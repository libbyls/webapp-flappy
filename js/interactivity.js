jQuery("#credits").on("dblclick", function() {
  var message = "game created by libby!";
  alert(message);}
);
jQuery("#scoresbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" +
    "<li>" + "me" + "</li>" +
    "<li>" + "also me" + "</li>" +
    "<li>" + "me again lol" + "</li>" +
    "</ul>"
  );
});

jQuery("#creditsbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<div>" + "game created by libby! (lol thats me)" + "</div>"
  );
});

jQuery("#helpbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>"+"<li>" + "press space super duper fast to jump"+ "</li>"+"<li>" + "dont go into the green pipes or u will die" + "</li>"+"</ul>"
  );
});

function registerScore (score){
//  var playerName = prompt("What's your name?");
//  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
}
