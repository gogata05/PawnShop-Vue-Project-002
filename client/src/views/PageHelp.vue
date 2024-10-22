<!-- client\src\views\PageHelp.vue -->
<template>
  <div class="help-page">
    <h1>Help Page</h1>
    <h2>Frequently Asked Questions</h2>

    <!-- Dropdown for selecting user type -->
    <div class="user-type-selection">
      <label> <input type="radio" value="buyer" v-model="userType" /> Buyer </label>
      <label> <input type="radio" value="pawnshop" v-model="userType" /> Pawn Shop </label>
    </div>

    <!-- FAQ Section for Buyers -->
    <div v-if="userType === 'buyer'" class="faq-section">
      <CollapsibleItem v-for="(item, index) in buyerFaq" :key="index" :title="item.title" :description="item.description" />
    </div>

    <!-- FAQ Section for Pawn Shops -->
    <div v-if="userType === 'pawnshop'" class="faq-section">
      <CollapsibleItem v-for="(item, index) in pawnshopFaq" :key="index" :title="item.title" :description="item.description" />
    </div>
  </div>
</template>

<script>
import CollapsibleItem from "../components/CollapsibleItem.vue";

export default {
  components: {
    CollapsibleItem
  },
  data() {
    return {
      userType: "buyer", // Default user type
      buyerFaq: [
        { title: "How do I buy an item?", description: "To buy an item, simply browse through the available products and add your desired item to the shopping cart. After reviewing your cart, you can proceed to checkout, where you will be prompted to enter your shipping and payment details." },
        { title: "Can I return an item?", description: "Returns depend on the pawn shop’s specific policy. You should check the return conditions listed on the product page or contact the shop directly for more information. Some shops may offer returns within a certain period, while others may not accept returns." },
        { title: "How do I track my order?", description: "Once your order has been shipped, you can track its progress by going to your account page and selecting 'Order History'. Here, you will find the tracking number along with real-time updates from the shipping carrier." },
        { title: "What payment methods are accepted?", description: "We accept a variety of payment methods, including credit and debit cards, PayPal, and bank transfers. Please note that some payment methods may take longer to process than others." },
        { title: "Is shipping insured?", description: "Yes, all shipments are insured to protect against loss or damage during transit. If anything happens to your item while it's being shipped, you can file a claim through our customer support team for a replacement or refund." },
        { title: "How long does delivery take?", description: "Delivery times vary based on your location and the shipping method you choose. Typically, domestic shipments take 3-7 business days, while international orders can take 7-14 business days. You can view estimated delivery times during checkout." }
      ],
      pawnshopFaq: [
        { title: "How do I sell an item?", description: "To sell an item, you first need to register your pawn shop with us. Once registered, you can list items through your account dashboard by providing detailed descriptions and images of the products you want to sell. Make sure to keep your listings updated to reflect availability." },
        { title: "How do I get paid?", description: "Payments for sales made through our platform are processed through a secure payment gateway. Once a transaction is completed, the funds will be deposited into your account after a brief holding period to ensure customer satisfaction." },
        { title: "How do I manage my listings?", description: "Managing your listings is simple through the dashboard. From there, you can update product descriptions, adjust pricing, and mark items as sold or unavailable. It's important to keep your inventory up-to-date to avoid any issues with customers." },
        { title: "How do I contact customers?", description: "You can contact customers directly through our platform's secure messaging system. This allows you to answer any questions they may have before or after a purchase, ensuring clear communication without sharing personal contact details." },
        { title: "What fees are associated with selling?", description: "We charge a small commission fee on each sale you make through our platform. This fee is automatically deducted from your earnings when the payment is processed. You can view a breakdown of fees in your account settings." },
        { title: "Can I offer discounts?", description: "Yes, you have the option to offer discounts or promotions on specific items. You can set up these promotions through your dashboard, where you can control the percentage discount, the duration of the offer, and which items it applies to." }
      ]
    };
  }
};
</script>

<style scoped>
.help-page {
  padding: 20px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.faq-section {
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
}

.collapsible-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  width: 100%;
  max-width: 600px;
}

.user-type-selection {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
