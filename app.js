import express from 'express';
const servidor = express();
servidor.use(express.json());


servidor.get('/helloword', (req, resp) => {
    resp.send({
        mensagem: 'Hello Word !!!'
    })
})

servidor.get('/mensagem/boasvindas', (req,resp) => {
    resp.send({
        mensagem:'Olá sejam bem vindo'

    })
})


servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);

    let soma = n1 + n2

    resp.send({
        soma: soma
    })
})

servidor.get('/calculadora/somar2', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);

    let soma = n1 + n2

    resp.send({
        soma: soma
    })
})

servidor.get('/mensagem/ola', (req,resp) => {
    let pessoa = req.query.nome ?? 'Desconhecido'

    resp.send({
        mensagem: "Olá " + pessoa

    })
})

servidor.post('/media', (req,resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = (n1+n2+n3)/3

    resp.send({
        nota1: n1,
        nota2: n2,
        nota3: n3,
        media: media
    });
})

servidor.post('/dobro', (req,resp) => {
    let nums1 = req.body.numeros

    let nums2 = []

    for(let i = 0; i < nums1.length; i++){
        nums2[i] = nums1[i] * 2 
    }

    resp.send({
        nums: nums1,
        dobro: nums2})
})


servidor.post('/loja/pedido', (req,resp) => {
    let total= req.body.total
    let parcelas = req.body.parcelas
    let cupom = req.query.cupom

    if(parcelas > 1){
        let juros = total * 0.05
        total += juros
    }

    if(cupom == "QUERO100"){
        total -= 100
    }

    resp.send({
        total: total
    });
})


servidor.post('/loja/pedido/completo', (req,resp) => {
    let parcelas = req.body.parcelas
    let itens = req.body.itens
    let cupom = req.query.cupom

    let total = 0;

    for(let produtos of itens){
        total += produtos.preco
    }

    if(parcelas > 1){
        let juros = total * 0.05
        total += juros
    }

    if(cupom == "QUERO100"){
        total -= 100
    }

    resp.status(404).send({
        total: total,
        parcelas: parcelas,
        ValorParce: total / parcelas
    })
})

 console.log("bbbbbbbb")

  
servidor.listen(
    5001, 
    () => console.log("API subiu com sucesso!")) 