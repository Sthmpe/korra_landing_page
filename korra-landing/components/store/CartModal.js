'use client';

import { useEffect, useState } from 'react';

import { Close, Plus, Minus, Trash, Bag, Shield } from './Icons';
import * as cart from '@/lib/cart';
import { handoffToApp } from '@/lib/handoff';

function naira(n) {
  return `₦${Number(n || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
}

// Web cart — mirrors the app cart sheet. Store balance + wallet are masked
// (those live in the customer's account, which the website can't see); the fee
// is shown as computed in-app. "Proceed to Payment" hands the whole cart off to
// the app for the actual outright purchase.
export default function CartModal({ slug, store, onClose }) {
  const [items, setItems] = useState(() => cart.getItems(store.id));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const unsub = cart.subscribe(() => setItems(cart.getItems(store.id)));
    return () => {
      document.body.style.overflow = '';
      unsub();
    };
  }, [store.id]);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const units = items.reduce((n, i) => n + i.quantity, 0);

  function checkout() {
    handoffToApp(slug, {
      cartIds: items.map((i) => i.productId),
      action: 'outright',
    });
  }

  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <button className="sheet-close" onClick={onClose} aria-label="Close">
          <Close size={18} />
        </button>

        <div className="cart-head">
          <div className="cart-icon">
            <Bag size={18} />
          </div>
          <div>
            <h3 className="p-name" style={{ margin: 0 }}>My Cart</h3>
            <span className="cart-sub">{store.name}</span>
          </div>
          <span className="cart-units">{units} item{units === 1 ? '' : 's'}</span>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-icon-lg"><Bag size={34} /></div>
            <h4>Your cart is empty</h4>
            <p>Browse {store.name} and add items you love.</p>
            <button className="btn btn-soft" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((it) => (
                <div className="cart-item" key={it.productId}>
                  <div className="cart-thumb">
                    {it.imageUrl ? <img src={it.imageUrl} alt={it.name} /> : null}
                  </div>
                  <div className="cart-item-main">
                    <div className="cart-item-name">{it.name}</div>
                    <div className="cart-item-price">{naira(it.price)}</div>
                  </div>
                  <div className="cart-qty">
                    <button onClick={() => cart.updateQuantity(store.id, it.productId, -1)} aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span className="tabular">{it.quantity}</span>
                    <button onClick={() => cart.updateQuantity(store.id, it.productId, 1)} aria-label="Increase">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() => cart.removeItem(store.id, it.productId)}
                    aria-label="Remove"
                  >
                    <Trash size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-foot">
              {/* Account values live in the app — masked here on purpose. */}
              <div className="masked-row">
                <span>Store Balance</span>
                <span className="masked">₦ ••••••</span>
              </div>
              <div className="masked-row">
                <span>Wallet</span>
                <span className="masked">₦ ••••••</span>
              </div>
              <div className="cart-divider" />
              <div className="sum-row">
                <span>Subtotal</span>
                <span>{naira(subtotal)}</span>
              </div>
              <div className="sum-row muted">
                <span>Processing fee</span>
                <span>Calculated in app</span>
              </div>
              <div className="cart-divider" />
              <div className="sum-row total">
                <span>Total</span>
                <span>{naira(subtotal)}+</span>
              </div>

              <button className="btn btn-brand cart-cta" onClick={checkout}>
                Proceed to Payment
              </button>
              <div className="cart-secure">
                <Shield size={13} />
                <span>Complete your purchase securely in the Korra app</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
