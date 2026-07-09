'use client';

import { useEffect, useState } from 'react';

import { Close, Plus, Minus, Bag, Receipt, Chevron, Share } from './Icons';
import DealCountdown from './DealCountdown';
import * as cart from '@/lib/cart';
import { handoffToApp } from '@/lib/handoff';
import { productUrl } from '@/lib/config';

function naira(n) {
  return `₦${Number(n || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
}
function priceOf(p) {
  const d = Number(p.discountedPrice || 0);
  return d > 0 ? d : Number(p.price || 0);
}

// Product details — mirrors the app's product sheet. "Add to Cart" builds the
// web cart; "Pay Installment" hands off to the app's create-plan screen.
export default function ProductModal({ slug, vendorId, storeName, product, deal, onClose, onAdded }) {
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const [shared, setShared] = useState(false);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const disc = Number(product.discountedPrice || 0);
  const hasDisc = disc > 0 && disc < Number(product.price || 0);
  const images = product.images?.length ? product.images : [''];
  const outOfStock = product.availableStock <= 0;
  const canReserve = product.allowReservation && !outOfStock;

  function addToCart() {
    cart.addToCart(vendorId, product, qty);
    setAdded(true);
    setTimeout(() => onAdded?.(), 500);
  }

  function payInstallment() {
    handoffToApp(slug, { productId: product.id, action: 'installment' });
  }

  async function shareProduct() {
    const url = productUrl(slug, product.id);
    const shareData = { title: product.name, text: `${product.name} on Korra`, url };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Cancelled or unsupported, no action needed.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      // Clipboard unavailable, silently no-op.
    }
  }

  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <button className="sheet-close" onClick={onClose} aria-label="Close">
          <Close size={18} />
        </button>
        <button className="sheet-share" onClick={shareProduct} aria-label="Share product">
          <Share size={16} />
          {shared ? <span className="sheet-share-toast">Link copied</span> : null}
        </button>

        <div className="p-gallery">
          {images[img] ? (
            <img src={images[img]} alt={product.name} />
          ) : (
            <div className="p-gallery-empty">
              <Bag size={40} />
            </div>
          )}
          <span className="deal-badge-wrap">
            <DealCountdown deal={deal} />
          </span>
        </div>

        {images.length > 1 ? (
          <div className="p-thumbs">
            {images.map((src, i) => (
              <button
                key={i}
                className={`p-thumb ${i === img ? 'on' : ''}`}
                onClick={() => setImg(i)}
              >
                {src ? <img src={src} alt="" /> : null}
              </button>
            ))}
          </div>
        ) : null}

        <div className="p-body">
          {product.category ? <span className="p-cat">{product.category}</span> : null}
          <h3 className="p-name">{product.name}</h3>

          <div className="p-price">
            {naira(priceOf(product))}
            {hasDisc ? <span className="p-was">{naira(product.price)}</span> : null}
          </div>

          {product.description ? (
            <p className="p-desc">{product.description}</p>
          ) : null}

          <div className="p-stock">
            {outOfStock ? (
              <span className="stock-out">Out of stock</span>
            ) : (
              <span className="stock-in">{product.availableStock} in stock</span>
            )}
          </div>

          {!outOfStock ? (
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                <Minus size={16} />
              </button>
              <span className="tabular">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.availableStock, q + 1))}
                aria-label="Increase"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : null}
        </div>

        <div className="p-actions">
          <button className="btn btn-soft" disabled={outOfStock} onClick={addToCart}>
            <Bag size={16} />
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
          {canReserve ? (
            <button className="btn btn-brand" onClick={payInstallment}>
              <Receipt size={16} />
              Pay Installment
            </button>
          ) : null}
        </div>

        {/* How Korra installment works — only when Pay Installment is offered */}
        {canReserve ? (
          <div className="hiw">
            <button
              className="hiw-toggle"
              onClick={() => setHowOpen((o) => !o)}
              aria-expanded={howOpen}
            >
              <span className="hiw-mark">!</span>
              <span>How Korra installment works</span>
              <span className={`hiw-chev ${howOpen ? 'open' : ''}`}>
                <Chevron size={14} />
              </span>
            </button>
            <div className={`hiw-body ${howOpen ? 'open' : ''}`}>
              <div className="hiw-inner">
                <ol className="hiw-steps">
                  <li>
                    <strong>Reserve your item</strong> {storeName || 'The merchant'} holds your
                    item for you while you pay.
                  </li>
                  <li>
                    <strong>Pay at your own pace</strong> Complete payment within the agreed
                    time.
                  </li>
                  <li>
                    <strong>Get your item</strong> Once fully paid, collect it from{' '}
                    {storeName || 'the store'}.
                  </li>
                </ol>
                <p className="hiw-note">
                  If payment isn&apos;t completed in time or you close a plan, funds paid are
                  converted to store balance usable on a future purchase with{' '}
                  {storeName || 'this store'}.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <p className="p-foot">Payments are completed securely in the Korra app.</p>
      </div>
    </div>
  );
}
