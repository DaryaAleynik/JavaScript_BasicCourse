'use strict';

const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basket-total');
const basketTotalValueEl = document.querySelector('.basket-total-value');

/**
 * Обработчик открытия/закрытия корзины при нажатии на иконку.
 */
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

/**
 * Объект для хранения товаров
 * Ключ - id товара, значение - объект, содержащий id, название, цену, кол-во.
 */
const basket = {};

/**
 * Обработчик нажатия на кнопку "Add to cart".
 */
document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.add-to-cart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

/**
 * Функция добавления товара в корзину.
 * @param {number} id Id товара.
 * @param {string} name Название товара.
 * @param {number} price Цена товара.
 */
function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getBasketTotalCount().toString();
    basketTotalValueEl.textContent = getBasketTotalPrice().toFixed(2);
    renderProductInBasket(id);
}

/**
 * Функция для подсчёта количества товаров в корзине.
 * @return {number} Количество товаров в корзине.
 */
function getBasketTotalCount() {
    return Object.values(basket).reduce((pval, product) => pval + product.count, 0);
}

/**
 * Функция для подсчёта итоговой цены.
 * @return {number} Итоговая цена всех товаров в корзине.
 */
function getBasketTotalPrice() {
    return Object.values(basket).reduce((pval, product) => pval + product.price * product.count, 0);
}

/**
 * Отрисовка в корзину информации о товаре.
 * @param {number} productId Id товара.
 */
function renderProductInBasket(productId) {
    const basketRowEl = basketEl.querySelector(`.basket-row[data-id="${productId}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
        return;
    }

    const product = basket[productId];
    basketRowEl.querySelector('.product-count').textContent = product.count;
    basketRowEl.querySelector('.product-total-row').textContent = (product.price * product.count).toFixed(2);
}

/**
 * * Отрисовка информации о новом товаре в корзину.
 * @param {number} productId - Id товара.
 */
function renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basket-row" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div><span class="product-count">${basket[productId].count}</span> шт.</div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="product-total-row">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}