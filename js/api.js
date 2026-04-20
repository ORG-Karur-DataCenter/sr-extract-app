/* Backend API client — single source of truth for all server calls.
 * Exposes window.SRApi = { pingHealth, startJob, getStatus, downloadResult, cancelJob, ApiError, API_BASE }
 */
(function () {
  'use strict';
  const DEFAULT_BASE = 'https://sr-extract-api.onrender.com';
  const API_BASE = (window.SR_API_BASE || DEFAULT_BASE).replace(/\/$/, '');

  class ApiError extends Error {
    constructor(code, message, status) {
      super(message);
      this.code = code;
      this.status = status;
    }
  }

  async function _readError(resp) {
    let body = null;
    try { body = await resp.json(); } catch (_) {}
    const code = (body && body.error_code) || 'http_' + resp.status;
    const msg  = (body && body.error_message) || resp.statusText;
    throw new ApiError(code, msg, resp.status);
  }

  async function pingHealth() {
    const r = await fetch(`${API_BASE}/health`, { method: 'GET' });
    if (!r.ok) await _readError(r);
    return r.json();
  }

  async function startJob({ pdfs, template, apiKeys, model, outputFormat }) {
    const fd = new FormData();
    fd.append('api_keys', apiKeys);
    fd.append('model', model);
    fd.append('output_format', outputFormat || 'xlsx');
    fd.append('template', template, template.name || 'template.xlsx');
    pdfs.forEach((f) => fd.append('pdfs', f, f.name));
    const r = await fetch(`${API_BASE}/jobs`, { method: 'POST', body: fd });
    if (!r.ok) await _readError(r);
    return r.json();
  }

  async function getStatus(jobId) {
    const r = await fetch(`${API_BASE}/jobs/${jobId}/status`);
    if (!r.ok) await _readError(r);
    return r.json();
  }

  async function downloadResult(jobId) {
    const r = await fetch(`${API_BASE}/jobs/${jobId}/result`);
    if (!r.ok) await _readError(r);
    return r;  // caller handles the blob
  }

  async function cancelJob(jobId) {
    const r = await fetch(`${API_BASE}/jobs/${jobId}`, { method: 'DELETE' });
    if (!r.ok && r.status !== 404) await _readError(r);
  }

  window.SRApi = { pingHealth, startJob, getStatus, downloadResult, cancelJob, ApiError, API_BASE };
})();
