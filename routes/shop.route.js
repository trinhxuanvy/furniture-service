const express = require("express");
const shopController = require("../controllers/shop.controller");
const authUserController = require("../controllers/auth-user.controller");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/index", shopController.getIndex);

router.get("/signup", shopController.signup);

router.get("/signup/:username", shopController.getUserbyUserName);

router.get("/cart/delete/product/:productId", shopController.deleteProductCart);

router.get("/cart/change/product/:productId/:productAmount", shopController.getAllPriceByProductId);

router.get("/profile", shopController.profile);

router.get("/changepassword", shopController.changepassword);

router.get("/orders", shopController.getOrder);

router.get("/orders/:orderId", shopController.getOrdersDetail);

router.get("/confirm/:token", shopController.verifyCustomer);

router.post("/signup", shopController.postCustomer);

router.post("/update/customer", shopController.updateCustomerProfile);


//router.get("/categories/:page?", shopController.categories);

router.get("/categories", shopController.categories);

router.get("/cart", shopController.cart);

router.get("/cart/add/product/:id", shopController.addCard);

router.get("/cart/add/product/:id/:amount", shopController.addCardProductDetail);

router.get("/order/add/coupon/:code", shopController.addCoupon);

router.get("/products/:id", shopController.getProduct);

router.post("/products/comment/:productId", shopController.postComment);

router.get("/checkout",authUserController.checkExistUser, shopController.checkout);

router.post("/checkout",authUserController.checkExistUser, shopController.postOrder);

module.exports = router;
