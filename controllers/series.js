const labels = [
    {id: 'to-watch', name: 'Para assistir'}, 
    {id: 'watching', name: 'Assistindo'},
    {id: 'watched', name: 'Assistido'}
]

const index = async ({ Serie }, req, res) => {
    const docs  = await Serie.find({})
     res.render('series/index', { series: docs, labels })
}


const novaForm = (req, res)=> {
    res.render('series/nova')
}

const novaProcess =  async ({ Serie }, req, res) => {
    const serie =  new Serie(req.body)
    await serie.save()
    res.redirect('/series')
}

const editarForm =async ({Serie}, req, res)=> {
   const serie = await Serie.findOne({ _id: req.params.id })
    res.render('series/editar', { serie, labels })
}

const editarProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
        serie.name = req.body.name, 
        serie.status = req.body.status 
        await serie.save()
    res.redirect('/series')
}

const excluir = async ( {Serie}, req, res)=> {
   await Serie.deleteOne({
        _id: req.params.id 
    })
    res.redirect('/series')
}



module.exports = {
    index, 
    novaForm,
    novaProcess,
    excluir,
    editarForm,
    editarProcess
}