/* =====================================================
   SPEED FITNESS
   JAVASCRIPT PRINCIPAL
===================================================== */


/* =====================================================
   NÚMERO DO WHATSAPP
===================================================== */

/*
   IMPORTANTE:
   O número oficial da recepção ainda não foi confirmado.

   Quando você me passar o número correto, vamos colocar
   somente os números aqui.

   Exemplo:
   const numeroWhatsApp = "5518999999999";
*/

const numeroWhatsApp = "5518991654745";


/* =====================================================
   QUANDO A PÁGINA CARREGAR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    configurarPlanoAutomatico();

    configurarPlanoFamilia();

    configurarCadastro();

    configurarWhatsApp();

});


/* =====================================================
   SELECIONAR O PLANO AUTOMATICAMENTE
===================================================== */

/*
   Quando a pessoa clicar em "Escolher plano" dentro
   da página de planos, o nome do plano vem na URL.

   Exemplo:
   cadastro.html?plano=Mensal
*/

function configurarPlanoAutomatico() {

    const campoPlano = document.getElementById("plano");

    if (!campoPlano) {
        return;
    }


    const parametros = new URLSearchParams(
        window.location.search
    );


    const planoURL = parametros.get("plano");


    if (!planoURL) {
        return;
    }


    const opcoes = campoPlano.options;


    for (let i = 0; i < opcoes.length; i++) {

        const texto = opcoes[i].text.toLowerCase();

        const plano = planoURL.toLowerCase();


        if (texto.includes(plano)) {

            campoPlano.value = opcoes[i].value;

            campoPlano.dispatchEvent(
                new Event("change")
            );

            break;

        }

    }

}


/* =====================================================
   PLANO FAMÍLIA
===================================================== */

function configurarPlanoFamilia() {

    const campoPlano = document.getElementById("plano");

    const campoFamilia = document.getElementById("campoFamilia");

    const quantidadeFamilia =
        document.getElementById("quantidadeFamilia");


    if (
        !campoPlano ||
        !campoFamilia ||
        !quantidadeFamilia
    ) {

        return;

    }


    campoPlano.addEventListener(
        "change",
        function () {

            const planoSelecionado =
                campoPlano.value.toLowerCase();


            if (
                planoSelecionado.includes("família") ||
                planoSelecionado.includes("familia")
            ) {

                campoFamilia.style.display = "block";

                quantidadeFamilia.required = true;

            } else {

                campoFamilia.style.display = "none";

                quantidadeFamilia.required = false;

                quantidadeFamilia.value = "";

            }

        }
    );

}


/* =====================================================
   CADASTRO
===================================================== */

function configurarCadastro() {

    const formulario =
        document.getElementById("formCadastro");


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nome =
                document.getElementById("nome").value.trim();


            const numero =
                document.getElementById("numero").value.trim();


            const sexo =
                document.getElementById("sexo").value;


            const telefone =
                document.getElementById("telefone").value.trim();


            const nascimento =
                document.getElementById("nascimento").value;


            const plano =
                document.getElementById("plano").value;


            const pagamento =
                document.getElementById("pagamento").value;


            const observacoes =
                document.getElementById("observacoes").value.trim();


            const quantidadeFamilia =
                document.getElementById(
                    "quantidadeFamilia"
                );


            let familia = "";


            if (
                quantidadeFamilia &&
                quantidadeFamilia.value
            ) {

                familia =
                    quantidadeFamilia.value;

            }


            /* ==========================================
               FORMATA DATA
            ========================================== */

            let nascimentoFormatado =
                nascimento;


            if (nascimento) {

                const partes =
                    nascimento.split("-");


                if (partes.length === 3) {

                    nascimentoFormatado =
                        partes[2] +
                        "/" +
                        partes[1] +
                        "/" +
                        partes[0];

                }

            }


            /* ==========================================
               MONTAR MENSAGEM
            ========================================== */

            let mensagem =
                "🏋️ *NOVO CADASTRO — SPEED FITNESS*"
                + "\n\n";


            mensagem +=
                "👤 *Nome:* "
                + nome
                + "\n";


            mensagem +=
                "🪪 *CPF / Número:* "
                + numero
                + "\n";


            mensagem +=
                "⚧️ *Sexo:* "
                + sexo
                + "\n";


            mensagem +=
                "📱 *Telefone:* "
                + telefone
                + "\n";


            mensagem +=
                "🎂 *Data de nascimento:* "
                + nascimentoFormatado
                + "\n\n";


            mensagem +=
                "💰 *Plano:* "
                + plano
                + "\n";


            if (familia) {

                mensagem +=
                    "👨‍👩‍👧‍👦 *Plano Família:* "
                    + familia
                    + "\n";

            }


            mensagem +=
                "💳 *Forma de pagamento:* "
                + pagamento
                + "\n";


            if (observacoes) {

                mensagem +=
                    "\n📝 *Observações:*\n"
                    + observacoes;

            }


            /* ==========================================
               VERIFICAR WHATSAPP
            ========================================== */

            if (!numeroWhatsApp) {

                alert(
                    "O cadastro está funcionando! 💙\n\n" +
                    "Só falta configurar o número oficial " +
                    "do WhatsApp da recepção."
                );

                console.log(
                    "Mensagem que será enviada:\n\n"
                    + mensagem
                );

                return;

            }


            /* ==========================================
               ABRIR WHATSAPP
            ========================================== */

            const mensagemCodificada =
                encodeURIComponent(mensagem);


            const link =
                "https://wa.me/"
                + numeroWhatsApp
                + "?text="
                + mensagemCodificada;


            window.open(
                link,
                "_blank"
            );

        }
    );

}


/* =====================================================
   BOTÃO DE WHATSAPP DA PÁGINA DE CONTATO
===================================================== */

function configurarWhatsApp() {

    const linkWhatsApp =
        document.getElementById("linkWhatsApp");


    if (!linkWhatsApp) {
        return;
    }


    linkWhatsApp.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            if (!numeroWhatsApp) {

                alert(
                    "O número oficial do WhatsApp da " +
                    "recepção ainda precisa ser configurado."
                );

                return;

            }


            const mensagem =
                encodeURIComponent(
                    "Olá! Vim pelo site da Speed Fitness e gostaria de mais informações. 💙"
                );


            window.open(
                "https://wa.me/"
                + numeroWhatsApp
                + "?text="
                + mensagem,
                "_blank"
            );

        }
    );

}


/* =====================================================
   MÁSCARA DE CPF
===================================================== */

const campoCPF =
    document.getElementById("numero");


if (campoCPF) {

    campoCPF.addEventListener(
        "input",
        function () {

            let valor =
                campoCPF.value.replace(/\D/g, "");


            valor =
                valor.substring(0, 11);


            valor =
                valor.replace(
                    /(\d{3})(\d)/,
                    "$1.$2"
                );


            valor =
                valor.replace(
                    /(\d{3})(\d)/,
                    "$1.$2"
                );


            valor =
                valor.replace(
                    /(\d{3})(\d{1,2})$/,
                    "$1-$2"
                );


            campoCPF.value =
                valor;

        }
    );

}


/* =====================================================
   MÁSCARA DE TELEFONE
===================================================== */

const campoTelefone =
    document.getElementById("telefone");


if (campoTelefone) {

    campoTelefone.addEventListener(
        "input",
        function () {

            let valor =
                campoTelefone.value.replace(/\D/g, "");


            valor =
                valor.substring(0, 11);


            if (valor.length <= 10) {

                valor =
                    valor.replace(
                        /(\d{2})(\d)/,
                        "($1) $2"
                    );


                valor =
                    valor.replace(
                        /(\d{4})(\d)/,
                        "$1-$2"
                    );

            } else {

                valor =
                    valor.replace(
                        /(\d{2})(\d)/,
                        "($1) $2"
                    );


                valor =
                    valor.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );

            }


            campoTelefone.value =
                valor;

        }
    );

}


/* =====================================================
   EFEITO NOS CAMPOS
===================================================== */

const campos =
    document.querySelectorAll(
        "input, select, textarea"
    );


campos.forEach(function (campo) {

    campo.addEventListener(
        "focus",
        function () {

            campo.parentElement.classList.add(
                "campo-focado"
            );

        }
    );


    campo.addEventListener(
        "blur",
        function () {

            campo.parentElement.classList.remove(
                "campo-focado"
            );

        }
    );

});


/* =====================================================
   ANIMAÇÃO AO ROLAR A PÁGINA
===================================================== */

const elementos =
    document.querySelectorAll(
        ".beneficio, .diferencial, .plano-card, .passo, .contato-card"
    );


const observador =
    new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";

                    entrada.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


elementos.forEach(function (elemento) {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(25px)";

    elemento.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observador.observe(elemento);

});