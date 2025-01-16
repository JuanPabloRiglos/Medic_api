
export function logErrors(err, req, res, next){
    console.error('ERROR AQUI >> :',err)
};


export function boomErrorHanlder(err, req, res, next){
    res.status(500)({
        message: err.message,
        stack: err.stack,
    })
};


export function errorsHanlder(err, req, res, next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }else{
     next(err) 
  }

};



