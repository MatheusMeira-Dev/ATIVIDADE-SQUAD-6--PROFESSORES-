const { Router } = require("express");
const Produto = require("../models/produto")
const router = Router();

// const { nome, 
// descricao, 
// quantidade, 
// preco, 
// desconto, 
// dataDesconto, 
// categoria, 
// imagemProduto } = req.body;

router.post("/produtos", async (req, res) => {
        try { 
            const produto = new Produto(req.body);
            await produto.save();
            res.status(201).json({ message: "Produto cadastrado com sucesso"});
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Um erro aconteceu"});
        }
})

router.get("/produtos", async (req, res) => {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
});

router.get("/produtos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const ProdutoFound = await Produto.findById(id);
        if(ProdutoFound) {
            res.json(ProdutoFound);
        } else {
            res.status(404).json({ message: "Produto não existe"})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu"})
    }
});

router.put("/produtos/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const { nome, 
            descricao, 
            quantidade, 
            preco, 
            desconto, 
            dataDesconto, 
            categoria, 
            imagemProduto } = req.body;

        const ProdutoFound = await Produto.findByIdAndUpdate(id, 
            { nome, 
            descricao, 
            quantidade, 
            preco, 
            desconto, 
            dataDesconto, 
            categoria, 
            imagemProduto });

        if (ProdutoFound) {
            res.status(201).json({ message: "Produto editado"});
        } else {
            res.status(404).json({ message: "Produto não encontrado."});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu"});
    }
})

router.delete("/Produtos/:id", async (req, res) => {
    
    try{
        const { id } = req.params;
        const ProdutoFound = await Produto.findByIdAndDelete(id);
        if(ProdutoFound) {
            res.status(201).json({ message: "Produto deletado"});
        } else {
            res.status(404).json({ message: "Produto não existe"})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu"})
    }
});

router.get('/produtos-filtragem', async (req, res) => {
    try {

        //quando for maior que X quantidade
      const filter = {};
      if (req.query.quantidademaior) {
        filter.quantidade = { $gte: req.query.quantidademaior }; 
      }

      // quando for menor que X
      if (req.query.quantidademenor) {
        filter.quantidade = { $lte: req.query.quantidademenor }; 
      }

      // quando for maior que x preço
      if (req.query.precomaior) {
        filter.preco = { $gte: req.query.precomaior }; 
      }

      // quando o preço for menor que x
      if (req.query.precomenor) {
        filter.preco = { $lte: req.query.precomenor }; 
      }

      // Descontos maiores que X
      if (req.query.descontomaior) {
        filter.desconto = { $gte: req.query.descontomaior }; 
      }

        //Buscar apenas X categoria

      if (req.query.categoria) {

        filter.categoria =  { $regex: new RegExp(req.query.categoria, 'i') } 

    }

      //Buscar apenas X nome

      if (req.query.nome) {

        filter.nome =  { $regex: new RegExp(req.query.nome, 'i') } 

    }

      const produtos = await Produto.find(filter);
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ message: "Um erro aconteceu" });
      console.log(error)
    }  });

module.exports = router;
