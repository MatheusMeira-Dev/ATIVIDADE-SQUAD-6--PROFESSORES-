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

module.exports = router;
