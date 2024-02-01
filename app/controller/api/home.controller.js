const Controller = require("../Controller");
class HomeController extends Controller{
    async indexPage(req, res, next){
        try{
            res.status(200).json({
                statusCode: 200,
                data: {
                    message: "Welcome to Home Page...."
                }
            })
        }catch (e) {
            next(e);
        }
    }
}


module.exports = {
    HomeController : new  HomeController()
}