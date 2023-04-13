function draggableCadeia() {
  $(".draggable").draggable({
    connectToSortable: ".encaixe",
    cursor: "move",
    appendTo: "body",
    delay: 200,
    opacity: 0
  });

  $(".encaixe").sortable({
    stop: function (event, ui) {
      $(ui.item).data("ui-draggable").elementConnected = true;
      $("#antes-1").on("click", function () {
        $(this).attr("src", "assets/img/fase1-1.png");
      });
      $("#antes-2").on("click", function () {
        $(this).attr("src", "assets/img/fase1-2.png");
      });
      $("#antes-3").on("click", function () {
        $(this).attr("src", "assets/img/fase1-3.png");
      });
      $("#antes-4").on("click", function () {
        $(this).attr("src", "assets/img/fase1-4.png");
      });
    }
  });
}

draggableCadeia();

// function funcao() {
//   document.getElementById("resposta1").innerHTML = "Consumidor Primário";
// }