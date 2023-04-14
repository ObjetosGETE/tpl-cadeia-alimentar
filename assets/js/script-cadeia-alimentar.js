function proportionScale(largura, altura) {

  var larguraScreen = $(window).width();
  var alturaScreen = $(window).height();
  var proporcaoAltura = (alturaScreen * 100) / altura;
  var proporcaoLargura = (larguraScreen * 100) / largura;
  var proporcao, larguraAltura, larguraAlturaAuto;

  if (proporcaoAltura < proporcaoLargura) {
    larguraAltura = "height";
    larguraAlturaAuto = "width";
    proporcao = proporcaoAltura / 100;
  } else {
    larguraAltura = "width";
    larguraAlturaAuto = "height";
    proporcao = proporcaoLargura / 100;
  }

  console.log(proporcao, proporcaoAltura, proporcaoLargura)
  return [proporcao, larguraAltura, larguraAlturaAuto];
}

function resizeBodyCadeia() {

  var proporcao1920 = proportionScale(1920, 1080)[0];

  $(".correcao-adaptativa").css({
    "transform": "scale(" + proporcao1920 + ")",
    "transform-origin": "center center"
  });

  var proporcao900;

  if ($(window).width() < 992) {
    proporcao900 = proportionScale(900, 576)[0];
  } else {
    proporcao900 = 1;
  }
}

$(document).ready(function () {
  resizeBodyCadeia()
  $(window).resize(function () {
    resizeBodyCadeia()
  })

});

function draggableCadeia() {
  var numConectados = 0;
  var totalDivs = $(".animal").length;

  $(".draggable").draggable({
    connectToSortable: ".encaixe",
    cursor: "move",
    appendTo: "body",
    delay: 200,
    opacity: 0,
    stop: function(event, ui) {
      if (ui.helper.data("ui-sortable-previous-container") !== null) {
        numConectados++;
      } else {
        numConectados--;
      }

      if (numConectados === totalDivs) {
        $("#btnEnviar").removeClass("disabled");
      }
    }
  });

  $(".encaixe").sortable({
    stop: function(event, ui) {
      $(ui.item).data("ui-draggable").elementConnected = true;
      $("#antes-1").on("click", function() {
        $(this).attr("src", "assets/img/fase1-1.png");
      });
      $("#antes-2").on("click", function() {
        $(this).attr("src", "assets/img/fase1-2.png");
      });
      $("#antes-3").on("click", function() {
        $(this).attr("src", "assets/img/fase1-3.png");
      });
      $("#antes-4").on("click", function() {
        $(this).attr("src", "assets/img/fase1-4.png");
      });
    }
  });
}

function feedbackFase1() {
  $("#btnEnviar").on("click", function () {
    var messages = [];

    if ($("#limite1").children("#Produtor").length) {
      messages.push("<strong>Resposta Correta!</strong><br>Parabéns! Você demonstrou compreender que as plantas são organismos produtores, capazes de produzir seu próprio alimento por meio da fotossíntese, sendo fundamentais para a cadeia alimentar dos ecossistemas.");
    } else {
      messages.push("<strong>Resposta Incorreta!</strong><br>Lembre-se de que as plantas produzem seu próprio alimento a partir da luz solar e são fundamentais para a cadeia alimentar.");
    }

    if ($("#limite2").children("#primario").length) {
      messages.push("<strong>Resposta Correta!</strong><br>Parabéns! Você demonstrou compreender que esse animal é um detritívoro, alimentando-se de restos de matéria orgânica em decomposição, desempenhando um importante papel na reciclagem de nutrientes nos ecossistemas.");
    } else {
      messages.push("<strong>Resposta Incorreta!</strong><br>Lembre-se de que esse animal se alimenta de restos de matéria orgânica em decomposição, desempenhando um importante papel na reciclagem de nutrientes nos ecossistemas.");
    }

    if ($("#limite3").children("#secundario").length) {
      messages.push("<strong>Resposta Correta!</strong><br>Parabéns! Você demonstrou compreender que os peixes que se alimentam de outros seres vivos são consumidores, desempenhando um importante papel na cadeia alimentar dos ecossistemas aquáticos como predadores e consumidores de níveis tróficos mais elevados.");
    } else {
      messages.push("<strong>Resposta Incorreta!</strong><br>Lembre-se de que esse animal se alimenta de outros seres vivos, sendo um importante membro da cadeia alimentar dos ecossistemas aquáticos.");
    }

    if ($("#limite4").children("#terciario").length) {
      messages.push("<strong>Resposta Correta!</strong> <br>Parabéns! Você demonstrou compreender que as garças se alimentam de outros animais, como peixes e pequenos mamíferos, o que as coloca em um nível trófico mais elevado na cadeia alimentar dos ecossistemas em que vivem.");
    } else {
      messages.push("<strong>Resposta Incorreta!</strong><br>Lembre-se de que as garças, por se alimentarem de outros animais, como peixes e pequenos mamíferos, estão em um nível trófico mais elevado na cadeia alimentar dos ecossistemas em que vivem.");
    }

    var modalContent = messages.join("<br><br>");

    if ($("#myModal").length === 0) {
      var modalHtml = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header estilo-pontas">' +
        '<h5 class="modal-title" id="exampleModalLabel fs-5 desc-modal"><strong>Fase 1 concluída com sucesso.</strong></h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p>' + modalContent + '</p>' +
        '</div>' +
        '<div class="modal-footer estilo-pontas">' +
        '<button type="button" class="btn btn-secondary btn-fechar" data-bs-dismiss="modal">Fechar</button>' +
        '<button type="button" class="btn btn-secondary btn-prox-fase" data-bs-dismiss="modal">Próxima fase</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

      $("body").append(modalHtml);
    } else {
      $("#myModal .modal-body p").html(modalContent);
    }

    $("#myModal").modal("show");

    $(".btn-fechar").on("click", function () {
      $("#myModal .modal-body p").empty();
    });

    $(".btn-prox-fase").on("click", function () {
      $(".jogo-1").addClass("d-none");
      $(".jogo-2").removeClass("d-none");
    });
  });
}

feedbackFase1();
draggableCadeia();