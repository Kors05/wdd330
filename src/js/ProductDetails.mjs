export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    document.querySelector('h3').textContent = this.product.Brand.Name;

    document.querySelector('h2').textContent = this.product.NameWithoutBrand;

    const image = document.querySelector('img.divider');
    image.src = this.product.Image;
    image.alt = this.product.NameWithoutBrand;

    document.querySelector('.product-card__price').textContent =
      `$${this.product.FinalPrice}`;
    
const discount = Math.round(
  ((this.product.SuggestedRetailPrice - this.product.FinalPrice) /
    this.product.SuggestedRetailPrice) *
    100
);

document.querySelector('.product-card__discount').textContent =
  discount > 0 ? `${discount}% OFF` : '';

    document.querySelector('.product__color').textContent =
      this.product.Colors[0].ColorName;

    document.querySelector('.product__description').innerHTML =
      this.product.DescriptionHtmlSimple;
  }
addProductToCart() {
  const existingCart = JSON.parse(localStorage.getItem('so-cart')) || [];

  if (Array.isArray(existingCart)) {
    existingCart.push(this.product);
    localStorage.setItem('so-cart', JSON.stringify(existingCart));
  } else {
    localStorage.setItem('so-cart', JSON.stringify([existingCart, this.product]));
  }
}
}