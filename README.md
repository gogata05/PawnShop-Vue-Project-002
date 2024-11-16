# Pawn Shop

SoftUni Project Defense

How to Start:

1."npm install" on both server and clint terminal location

2."npm start" on server terminal location

3."npm run dev" on client terminal location

4.Also Add 2 .env files in client and server before starting the app:

```
# server\.env
PORT=5000
DB_CONNECTION_STRING=yourConnectionString

STRIPE_SECRET_KEY=YourStripeSecretKey
STRIPE_SUCCESS_URL=http://localhost:5173/success
STRIPE_CANCEL_URL=http://localhost:5173/cart
```

```
# client\.env
VITE_GOOGLE_MAPS_API_KEY=yourGoogleMapsIPkey
VITE_BASE_URL=http://localhost:5000
```

Features:

- Find us page with Google Maps
- Stripe Payment
- Shopping Cart
- Order functionality
- Notifications
- Spinner
- Product Searcher
- Search sorting
- Search filters
- Pagination
- Likes,Dislikes
- Comments
- Favorites
- Change Account information //change password/email/first name/last name
- Home page recent added products Slider
- Select your user type:Buyer or Pawn Shop //for Home page and Help page
- State management Pinia // for Cart and User
- Page error 404
- Page error 500
- Help page // frequently asked questions
- Footer links
- Composition API
- Star Rating
- Seed Data Products

How to add seed data:
Post http://localhost:5000/seed or npm run seed

## Photos

All Posts page with sorting, ordering & star rating system:

![image](/client/public/pics/allProductsWithStarRatings.png)

Recently Added Posts in Home page:

![image](/client/public/pics/Home1.png)

Stripe Payment:

![image](/client/public/pics/Stripe_Payment.png)

Google Maps Find Us 1:

![image](/client/public/pics/googleMaps1.png)

Google Maps Find Us 2:

![image](/client/public/pics/googleMaps2.png)

Cart:

![image](/client/public/pics/Cart.png)

Comments on Post:

![image](/client/public/pics/comments.png)

Likes and Dislikes on Post:

![image](/client/public/pics/DetailspagewithLikesandDislikes.png)

Add Post page:

![image](/client/public/pics/AddProduct.png)

Edit Post page:

![image](/client/public/pics/EditProduct.png)

Edit User Info page:

![image](/client/public/pics/changename,emailAnd-password.png)

Search page:

![image](/client/public/pics/Search.png)

Delete Post With Confirmation:

![image](/client/public/pics/DeleteModal.png)

Details:

![image](/client/public/pics/DetailspagewithLikesandDislikes.png)

Order Summary with Shipping Details:

![image](/client/public/pics/Order-Summary.png)

Orders:

![image](/client/public/pics/OrdersPage.png)

Help page:

![image](/client/public/pics/HelpPage.png)

Error 404:

![image](/client/public/pics/404.png)

Error 500:

![image](/client/public/pics/error500.png)

Footer and Pagination:

![image](/client/public/pics/FooterAndPagination.png)

Register page:

![image](/client/public/pics/Register.png)

Login:

![image](/client/public/pics/login.png)

Notification:

![image](/client/public/pics/Notifications.png)
