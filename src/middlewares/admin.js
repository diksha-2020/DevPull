const adminRoutes = (req, resp, next) => {
    console.log("Admin Routes are setting checked here!!");
    const token = "qweasdzxclmnop";
    const isAuthorized = token === "qweasdzxclmnop";
    console.log("^isAuthorized", isAuthorized);
    if(!isAuthorized){
        resp.status(401).send("Admin is not authorized!!");
    } else {
        resp.send("Admin Roues are getting handled here!!");
        // next()
    }
}

const userRoutes = (req, resp, next) => {
    console.log("User Routes are sgetting checked here!!");
    const token = "qweasdzxclmnop";
    const isAuthorized = token === "qweasdzxclmnop";
    if(!isAuthorized){
        resp.status(401).send("User is not authorized!!");
    } else {
        resp.send("User routes are getting handled here!!");
        // next() 
    }
}

module.exports = {
    adminRoutes,
    userRoutes
}