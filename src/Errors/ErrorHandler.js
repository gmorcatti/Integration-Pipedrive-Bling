import AppError from "./AppError.js"

const errorHandler = (err, req, res, next) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).send(err.message)
    }
    
    console.error(err)
    return res.status(500).send('Internal Server Error')
}

export default errorHandler