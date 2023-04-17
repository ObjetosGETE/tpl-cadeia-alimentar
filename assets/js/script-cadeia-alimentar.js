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
    stop: function (event, ui) {
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

function feedbackFase1() {
  $("#btnEnviar").on("click", function () {
    var messages = [];

    if ($("#limite1").children("#produtor").length) {
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

function exibeLista() {
  $(document).ready(function () {
    $("#interrogacao1").click(function () {
      $("#rapina1").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao2").click(function () {
      $("#rapina3").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao3").click(function () {
      $("#rapina2").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao5").click(function () {
      $("#cobra1").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao4").click(function () {
      $("#cobra2").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao6").click(function () {
      $("#sapo1").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao7").click(function () {
      $("#lagarta1").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao8").click(function () {
      $("#arvore1").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao9").click(function () {
      $("#passaro1").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });

  $(document).ready(function () {
    $("#interrogacao10").click(function () {
      $("#passaro2").removeClass("d-none");
      $(this).addClass("d-none");
    });
  });
}

function feedbackFase2() {
  $(".listaRapina").on("change", function () {
    var resposta = $(this).val();
    if (resposta == "consumidor-terciario" || resposta == "consumidor-quaternario" || resposta == "consumidor-secundario") {
      $("#mensagemResposta").html("Você acertou!");
    } else {
      $("#mensagemResposta").html("Quase acertou! As aves de rapina se alimentam de outros animais que estão em níveis tróficos mais baixos na cadeia alimentar");
    }
    $('#respostaModal').modal('show');
  });

  $(".listaCobra").on("change", function () {
    var resposta = $(this).val();
    if (resposta == "consumidor-terciario" || resposta == "consumidor-secundario") {
      $("#mensagemResposta").html("Você acertou!");
    } else {
      $("#mensagemResposta").html("Quase lá! As serpentes se alimentam de outros animais que estão em um nível trófico abaixo delas na cadeia alimentar.");
    }
    $('#respostaModal').modal('show');
  });

  $(".listaSapo").on("change", function () {
    var resposta = $(this).val();
    if (resposta == "consumidor-secundario") {
      $("#mensagemResposta").html("Você acertou!");
    } else {
      $("#mensagemResposta").html("Quase acertou! Os sapos se alimentam dos animais que estão em um nível trófico abaixo deles na cadeia alimentar");
    }
    $('#respostaModal').modal('show');
  });

  $(".listaLagarta").on("change", function () {
    var resposta = $(this).val();
    if (resposta == "consumidor-primario") {
      $("#mensagemResposta").html("Você acertou!");
    } else {
      $("#mensagemResposta").html("Quase lá! As lagartas se alimentam diretamente dos seres vivos que iniciam a cadeia alimentar.");
    }
    $('#respostaModal').modal('show');
  });

  $(".listaArvore").on("change", function () {
    var resposta = $(this).val();
    if (resposta == "produtor") {
      $("#mensagemResposta").html("Você acertou!");
    } else {
      $("#mensagemResposta").html("Quase lá! Lembre-se de que as árvores são os seres vivos que iniciam a cadeia alimentar e fornecem alimento para outros animais.");
    }
    $('#respostaModal').modal('show');
  });

  $(".listaPassaro").on("change", function () {
    var resposta = $(this).val();
    if (resposta == "consumidor-primario" || resposta == "consumidor-secundario") {
      $("#mensagemResposta").html("Você acertou!");
    } else {
      $("#mensagemResposta").html("Quase acertou! Os pássaros podem se alimentar diretamente dos produtores ou de outros animais que já se alimentaram dos produtores");
    }
    $('#respostaModal').modal('show');
  });
}



draggableCadeia();
feedbackFase1();
exibeLista();
feedbackFase2();