'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const TABS = { overview: 'overview', products: 'products', orders: 'orders' };

const formatDate = (d) => (d ? new Date(d).toLocaleDateString('en-US', { dateStyle: 'medium' }) : '—');
const formatCurrency = (n) => (n != null ? `$${Number(n).toFixed(2)}` : '—');

const emptyProduct = { name: '', description: '', price: '', image: '', category: '', stock: 0 };

function ProductForm({ product, onSave, onCancel, saving }) {
  const isEdit = product && product.id != null;
  const [form, setForm] = useState(isEdit ? { ...product, price: String(product.price ?? ''), stock: String(product.stock ?? 0) } : { ...emptyProduct, price: '', stock: '0' });

  useEffect(() => {
    if (product && product.id != null) {
      setForm({ ...product, price: String(product.price ?? ''), stock: String(product.stock ?? 0) });
    } else {
      setForm({ ...emptyProduct, price: '', stock: '0' });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      description: form.description?.trim() || null,
      price: parseFloat(form.price) || 0,
      image: form.image?.trim() || null,
      category: form.category?.trim() || null,
      stock: parseInt(form.stock, 10) || 0,
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4 border">
      <h6 className="mb-3">{isEdit ? 'Edit product' : 'Add product'}</h6>
      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label small">Name</label>
          <input type="text" className="form-control" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        </div>
        <div className="col-md-6">
          <label className="form-label small">Category</label>
          <input type="text" className="form-control" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. Tops" />
        </div>
        <div className="col-12">
          <label className="form-label small">Description</label>
          <textarea className="form-control" rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="col-md-4">
          <label className="form-label small">Price</label>
          <input type="number" step="0.01" min="0" className="form-control" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
        </div>
        <div className="col-md-4">
          <label className="form-label small">Stock</label>
          <input type="number" min="0" className="form-control" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
        </div>
        <div className="col-md-4">
          <label className="form-label small">Image URL</label>
          <input type="url" className="form-control" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://..." />
        </div>
        <div className="col-12 d-flex gap-2 mt-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : (isEdit ? 'Update' : 'Create')}</button>
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(TABS.overview);

  const [stats, setStats] = useState({ products: 0, orders: 0, reviews: 0, users: 0 });
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [productForm, setProductForm] = useState(undefined);
  const [productSaving, setProductSaving] = useState(false);

  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  const loadStats = useCallback(() => {
    if (!session || session.user.role !== 'ADMIN') return;
    setStatsLoading(true);
    setStatsError(null);
    fetch('/api/admin/stats')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load stats'))))
      .then((data) => {
        setStats(data);
        setStatsLoaded(true);
      })
      .catch(setStatsError)
      .finally(() => setStatsLoading(false));
  }, [session]);

  const loadProducts = useCallback(() => {
    if (!session || session.user.role !== 'ADMIN') return;
    setProductsLoading(true);
    setProductsError(null);
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load products'))))
      .then((data) => {
        setProducts(data);
        setProductsLoaded(true);
      })
      .catch(setProductsError)
      .finally(() => setProductsLoading(false));
  }, [session]);

  const loadOrders = useCallback(() => {
    if (!session || session.user.role !== 'ADMIN') return;
    setOrdersLoading(true);
    setOrdersError(null);
    fetch('/api/admin/orders')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load orders'))))
      .then((data) => {
        setOrders(data);
        setOrdersLoaded(true);
      })
      .catch(setOrdersError)
      .finally(() => setOrdersLoading(false));
  }, [session]);

  useEffect(() => {
    if (activeTab === TABS.overview && !statsLoaded && !statsLoading) loadStats();
  }, [activeTab, statsLoaded, statsLoading, loadStats]);

  useEffect(() => {
    if (activeTab === TABS.products && !productsLoaded && !productsLoading) loadProducts();
  }, [activeTab, productsLoaded, productsLoading, loadProducts]);

  useEffect(() => {
    if (activeTab === TABS.orders && !ordersLoaded && !ordersLoading) loadOrders();
  }, [activeTab, ordersLoaded, ordersLoading, loadOrders]);

  const handleProductSave = (payload) => {
    const isEdit = productForm && productForm.id != null;
    setProductSaving(true);
    const url = isEdit ? `/api/products?id=${productForm.id}` : '/api/products';
    const method = isEdit ? 'PATCH' : 'POST';
    fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then((res) => (res.ok ? res.json() : res.json().then((e) => Promise.reject(new Error(e.error || 'Request failed')))))
      .then((saved) => {
        setProductForm(undefined);
        if (isEdit) {
          setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
        } else {
          setProducts((prev) => [saved, ...prev]);
          setStats((s) => ({ ...s, products: s.products + 1 }));
        }
      })
      .catch((err) => {
        alert(err.message || 'Failed to save product');
      })
      .finally(() => setProductSaving(false));
  };

  const handleProductDelete = (p) => {
    if (!window.confirm(`Delete "${p.name}"?`)) return;
    fetch(`/api/products?id=${p.id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(new Error(e.error || 'Delete failed')));
      })
      .then(() => {
        setProducts((prev) => prev.filter((x) => x.id !== p.id));
        setStats((s) => ({ ...s, products: Math.max(0, s.products - 1) }));
      })
      .catch((err) => alert(err.message || 'Failed to delete'));
  };

  if (status === 'loading') {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h2 mb-3">Admin Dashboard</h1>
          <p className="text-muted">Welcome, {session.user.name}!</p>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button type="button" className={`nav-link ${activeTab === TABS.overview ? 'active' : ''}`} onClick={() => setActiveTab(TABS.overview)}>Overview</button>
        </li>
        <li className="nav-item">
          <button type="button" className={`nav-link ${activeTab === TABS.products ? 'active' : ''}`} onClick={() => setActiveTab(TABS.products)}>Products</button>
        </li>
        <li className="nav-item">
          <button type="button" className={`nav-link ${activeTab === TABS.orders ? 'active' : ''}`} onClick={() => setActiveTab(TABS.orders)}>Orders</button>
        </li>
        <li className="nav-item ms-auto">
          <Link href="/products" className="nav-link">View Store</Link>
        </li>
      </ul>

      {activeTab === TABS.overview && (
        <>
          <div className="row mb-4">
            {statsLoading ? (
              <div className="col-12 text-center py-4"><div className="spinner-border text-primary" /></div>
            ) : statsError ? (
              <div className="col-12 text-center py-4 text-danger">{statsError.message}</div>
            ) : (
              <>
                <div className="col-md-3 mb-3"><div className="card"><div className="card-body text-center"><h3 className="h2 mb-0">{stats.products}</h3><p className="text-muted mb-0">Products</p></div></div></div>
                <div className="col-md-3 mb-3"><div className="card"><div className="card-body text-center"><h3 className="h2 mb-0">{stats.orders}</h3><p className="text-muted mb-0">Orders</p></div></div></div>
                <div className="col-md-3 mb-3"><div className="card"><div className="card-body text-center"><h3 className="h2 mb-0">{stats.reviews}</h3><p className="text-muted mb-0">Reviews</p></div></div></div>
                <div className="col-md-3 mb-3"><div className="card"><div className="card-body text-center"><h3 className="h2 mb-0">{stats.users}</h3><p className="text-muted mb-0">Users</p></div></div></div>
              </>
            )}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header"><h5 className="mb-0">Account</h5></div>
                <div className="card-body">
                  <p><strong>Role:</strong> {session.user.role}</p>
                  <p><strong>Email:</strong> {session.user.email}</p>
                  <p className="mb-0"><strong>Name:</strong> {session.user.name}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === TABS.products && (
        <div className="row">
          <div className="col-12">
            {productForm !== undefined ? (
              <ProductForm product={productForm} onSave={handleProductSave} onCancel={() => setProductForm(undefined)} saving={productSaving} />
            ) : (
              <button type="button" className="btn btn-primary mb-3" onClick={() => setProductForm(null)}>Add product</button>
            )}
            {productsLoading ? (
              <div className="text-center py-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">Loading products…</p></div>
            ) : productsError ? (
              <div className="text-center py-5 text-danger">{productsError.message}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-5 text-muted">No products yet. Click &quot;Add product&quot; to create one.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          {p.image ? (
                            <Image src={p.image} alt={p.name || ''} width={48} height={48} className="rounded" style={{ objectFit: 'cover' }} />
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td>{p.name ?? '—'}</td>
                        <td>{p.category ?? '—'}</td>
                        <td>{formatCurrency(p.price)}</td>
                        <td>{p.stock ?? 0}</td>
                        <td className="text-end">
                          <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => setProductForm(p)}>Edit</button>
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleProductDelete(p)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === TABS.orders && (
        <div className="row">
          <div className="col-12">
            {ordersLoading ? (
              <div className="text-center py-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">Loading orders…</p></div>
            ) : ordersError ? (
              <div className="text-center py-5 text-danger">{ordersError.message}</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-5 text-muted">No orders yet.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Order #</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Ship to</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td>{o.orderNumber ?? '—'}</td>
                        <td>{o.user?.name || o.user?.email || o.userId || '—'}</td>
                        <td>{formatCurrency(o.total)}</td>
                        <td><span className="badge bg-secondary">{o.status ?? '—'}</span></td>
                        <td>{o.shippingName ?? '—'}</td>
                        <td>{formatDate(o.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
