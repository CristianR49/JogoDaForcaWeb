class ForcaIndexView
{
    txtPalavraMisteriosaUnderLine = document.getElementById('txtPalavraMisteriosa');
    txtLetrasErradas = document.getElementById('txtLetrasErradas');
    txtChute = document.getElementById('txtChute');
    btnChute = document.getElementById('btnChute');
    txtNotificacao = document.getElementById('txtNotificacao');
    btnTentarNovamente = document.getElementById('btnTentarNovamente');
    imgForca = document.getElementById('imgForca');
    palavras = ["ABACATE","ABACAXI","ACEROLA","ACAI","ARACA","ABACATE","BACABA","BACURI","BANANA","CAJA","CAJU","CARAMBOLA","CUPUACU","GRAVIOLA","GOIABA","JABUTICABA","JENIPAPO","MACA","MANGABA","MANGA","MARACUJA","MURICI","PEQUI","PITANGA","PITAYA","SAPOTI","TANGERINA","UMBU","UVA","UVAIA"];
    palavraMisteriosa;
    palavraMisteriosaUnderLine = "";
    chute;
    erros = 0;

    constructor()
    {
        this.txtLetrasErradas.textContent = "";
        this.registrarEventos();
        this.escolherPalavraAleatoria();
    }

    registrarEventos()
    {
        this.btnChute.addEventListener('click', () => this.avaliarChute());
        this.btnTentarNovamente.addEventListener('click', () => this.tentarNovamente());
        this.txtChute.addEventListener('input', () => this.restringirParaLetras());
    }

    restringirParaLetras()
    {
        this.txtChute.value = this.txtChute.value.replace(/[^a-zA-Z]/g, "");
    }

    escolherPalavraAleatoria()
    {
        let numeroAleatorio = Math.floor(Math.random() * 30) + 1;
        this.palavraMisteriosa = this.palavras[numeroAleatorio - 1];
        this.palavraMisteriosaUnderLine = "";

        for (let i = 0; i < this.palavraMisteriosa.length; i++)
        {

            this.palavraMisteriosaUnderLine += " _";
        }
        this.txtPalavraMisteriosaUnderLine.textContent = this.palavraMisteriosaUnderLine;
    }

    avaliarChute()
    {
        this.chute = this.txtChute.value.toUpperCase();
        let palavraEmArray = this.palavraMisteriosa.split('');
        let palavraUnderLineEmArray = this.txtPalavraMisteriosaUnderLine.textContent.split('');
        let novaPalavra = "";
        this.txtChute.value = "";

        if (this.txtLetrasErradas.textContent.includes(this.chute))
        {
            return;
        }

        if (this.palavraMisteriosa.includes(this.chute))
        {
            
            for (let i = 0; i < this.palavraMisteriosa.length; i++)
            {

                if (palavraEmArray[i] == this.chute && palavraUnderLineEmArray[i*2+1] == "_")
                {
                    novaPalavra += " ";
                    novaPalavra += this.chute;
                }
                else
                {
                    novaPalavra += " ";
                    novaPalavra += palavraUnderLineEmArray[i*2+1];
                }
            }
            this.txtPalavraMisteriosaUnderLine.textContent = novaPalavra;
            if (!this.txtPalavraMisteriosaUnderLine.textContent.includes("_"))
            {
                this.btnChute.disabled = true;
                this.txtNotificacao.style.color = "green";
                this.txtNotificacao.innerHTML = "Você<br>Venceu!"
            }
        }
        else
        {
            if (this.txtLetrasErradas.textContent != "")
            {
                this.txtLetrasErradas.textContent += ", ";
            }
            this.txtLetrasErradas.textContent += this.chute;
            this.erros++;

            for (let i = 1; i <= 6; i++)
            if (this.erros == i)
            {
                this.imgForca.src = 'assets/Forca' + i +'.png';

                if (this.erros == 6)
                {
                    this.btnChute.disabled = true;
                    this.txtNotificacao.style.color = "red";
                    this.txtNotificacao.innerHTML = "Você<br>Perdeu!"
                }
            }
        }
    }

    tentarNovamente()
    {
        this.escolherPalavraAleatoria();
        this.txtLetrasErradas.textContent = "";
        this.erros = 0;
        this.btnChute.disabled = false;
        this.imgForca.src = 'Forca0.png';
        this.txtNotificacao.textContent = "";
    }
}
window.addEventListener('load', () => new ForcaIndexView());