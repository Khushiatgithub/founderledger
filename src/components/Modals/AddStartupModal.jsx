import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  Upload, 
  Globe, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { createStartup } from '../../services/supabaseService';

export default function AddStartupModal({ isOpen, onClose, onSuccess, userId }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('b2b_saas');
  const [description, setDescription] = useState('');
  const [founded, setFounded] = useState('2024');
  const [website, setWebsite] = useState('');
  const [mrr, setMrr] = useState('');
  const [customerCount, setCustomerCount] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('Logo file size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter a startup name');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a short description or tagline');
      return;
    }
    if (!mrr || parseFloat(mrr) <= 0) {
      setErrorMsg('Please enter a valid monthly MRR');
      return;
    }
    if (!customerCount || parseInt(customerCount, 10) <= 0) {
      setErrorMsg('Please enter a valid customer count');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        name: name.trim(),
        category,
        description: description.trim(),
        logo: logoPreview,
        founded: founded.trim() || '2024',
        website: website.trim() || `https://${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.io`,
        mrr: parseFloat(mrr),
        customerCount: parseInt(customerCount, 10)
      };

      const res = await createStartup(formData, userId);
      if (res.success && res.startup) {
        onSuccess(res.startup);
      } else {
        setErrorMsg('Failed to save startup. Please try again.');
      }
    } catch (err) {
      console.error('Error in AddStartupModal:', err);
      setErrorMsg(err.message || 'An error occurred while creating startup');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card-elevated)',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-light)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--brand-soft)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 size={18} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Add New Startup
              </h2>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Register your startup ledger to verify ARR via Razorpay, UPI & GSTR-3B.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {errorMsg && (
          <div className="error-banner" style={{ marginBottom: '16px', padding: '8px 12px', fontSize: '0.75rem' }}>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Logo Upload & Preview */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Startup Logo
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  border: '1px dashed var(--border-medium)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
                    <Upload size={16} />
                  </div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={handleLogoChange}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '6px 12px', gap: '6px' }}
                >
                  <ImageIcon size={14} />
                  <span>{logoPreview ? 'Change Logo Image' : 'Upload PNG / SVG / JPG'}</span>
                </button>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Recommended: Square 256x256 px (Max 2MB). If left empty, initials will be generated.
                </div>
              </div>
            </div>
          </div>

          {/* Row 1: Startup Name & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                Startup Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Kubernetix AI"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="b2b_saas">B2B SaaS</option>
                <option value="ai_devtools">AI & DevTools</option>
                <option value="fintech">FinTech & Payments</option>
                <option value="d2c_ecommerce">D2C & Commerce</option>
                <option value="edtech_hr">EdTech & HR Tech</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Description / Tagline *
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g., Autonomous Kubernetes cloud cost optimization for Indian engineering teams."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                resize: 'none'
              }}
            />
          </div>

          {/* Row 2: Founded Year & Website */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                Founded Year
              </label>
              <div style={{ position: 'relative' }}>
                <Calendar size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="2024"
                  value={founded}
                  onChange={(e) => setFounded(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 32px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                Website URL
              </label>
              <div style={{ position: 'relative' }}>
                <Globe size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 32px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Monthly MRR & Customer Count */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                Monthly MRR (₹ INR) *
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.875rem' }}>₹</span>
                <input
                  type="number"
                  required
                  min="1000"
                  step="1000"
                  placeholder="e.g., 650000"
                  value={mrr}
                  onChange={(e) => setMrr(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 28px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Auto-computed ARR: <strong>{mrr ? `₹${((parseFloat(mrr) * 12) / 10000000).toFixed(2)} Cr` : '₹0 Cr'}</strong>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                Paying Customers *
              </label>
              <div style={{ position: 'relative' }}>
                <Users size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g., 78"
                  value={customerCount}
                  onChange={(e) => setCustomerCount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 32px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Estimated ARPU: <strong>{mrr && customerCount ? `₹${Math.round(parseFloat(mrr) / parseInt(customerCount, 10)).toLocaleString('en-IN')}` : '₹0'} / mo</strong>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px' }}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Creating & Auditing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Create Startup Profile</span>
                </>
              )}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
