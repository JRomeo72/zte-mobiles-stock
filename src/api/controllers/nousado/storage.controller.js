

const postStorage = (req, res) => {
    const { filename } = req.params
    res.send( { 'message': "Archivo" } )
}

export default postStorage