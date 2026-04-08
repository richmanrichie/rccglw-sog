  // ============================================================
  //  STEP 3: Paste your Google Apps Script Web App URL below
  //  Replace the placeholder text with your actual URL
  // ============================================================
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxKZWu6h7GE9yVi7voEkWUo_FQ_fgO_sUDj9cNLgptNsahI-kVWwaGaNVUWoIUSGkl-LA/exec";
  // ============================================================

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => obs.observe(r));

  // Form submission → Google Sheets
  document.getElementById('regForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    const payload = {
      firstName:     document.getElementById('fname').value.trim(),
      lastName:      document.getElementById('lname').value.trim(),
      email:         document.getElementById('email').value.trim(),
      phone:         document.getElementById('phone').value.trim(),
      gender:        document.getElementById('gender').value,
      ageGroup:      document.getElementById('age').value,
      heardFrom:     document.getElementById('heard').value,
      prayerRequest: document.getElementById('prayer').value.trim()
    };

    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.className = 'form-status sending';
    status.textContent = 'Submitting your registration…';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',   // Required for Apps Script — response will be opaque
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // With no-cors we can't read the response body, so we assume success
      document.getElementById('regForm').style.display = 'none';
      status.style.display = 'none';
      document.getElementById('successMsg').style.display = 'block';
      window.scrollTo({ top: document.getElementById('register').offsetTop - 80, behavior: 'smooth' });

    } catch (err) {
      status.className = 'form-status error';
      status.textContent = 'Something went wrong. Please try again or contact us directly.';
      btn.disabled = false;
      btn.textContent = 'Reserve My Place →';
    }
  });
