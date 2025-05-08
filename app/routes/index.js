const { createBrowserRouter } = require("react-router-dom");
const { default: Home } = require("../page");
const { default: Dashboard } = require("../admin/page");
const { default: page } = require("../admin/addProduct/page");


const router=createBrowserRouter([
    {
        path:"/",
        element:Home()
    },{
        path:"/admin",
        element:Dashboard()
    },
    {
        path:"/admin/addProduct",
        element:page(),


    }

]);

export {router};