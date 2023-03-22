module.exports = (req, res, next) => {
    
    const rootPassword  = req.body.rootPassword

    if(rootPassword == '@#xh*bkP'){
        next()
    } else {
        res.status(403);
        res.send('Insira a senha root corretamente')
        return;
    }

}