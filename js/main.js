// Defer DOM-dependent initialization until DOM is ready so elements (like #whatsapp-btn) exist
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form submission handler
  function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  }

  // Expose handleSubmit globally (because the form uses onsubmit="handleSubmit(event)")
  window.handleSubmit = handleSubmit;

  const whatsappBtn = document.getElementById('whatsapp-btn');
  if (whatsappBtn) {
    // Build a device-aware WhatsApp link: web for desktop, api/wa for mobile
    const phone = '+2348035245911';
    const text = 'Hello, I am interested in your services.';
    const encodedText = encodeURIComponent(text);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const href = isMobile
      ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodedText}`;

    whatsappBtn.href = href;
    whatsappBtn.addEventListener('click', () => console.log('WhatsApp button clicked'));

    // Ensure accessible hidden text exists (do not remove it)
    if (!whatsappBtn.querySelector('.sr-only')) {
      const span = document.createElement('span');
      span.className = 'sr-only';
      span.textContent = 'Chat with Robez on WhatsApp';
      whatsappBtn.appendChild(span);
    }

    // Inject the original outline SVG glyph (stroke-only) so the WhatsApp mark sits on top of the green CSS circle
    if (!whatsappBtn.querySelector('svg')) {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', '28');
      svg.setAttribute('height', '28');
      svg.setAttribute('aria-hidden', 'true');

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#FFFFFF');
      path.setAttribute('stroke-width', '1.6');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('d', 'M20.52 3.48C18.313 1.273 15.294 0 12 0 5.38 0 0 5.38 0 12c0 2.115.553 4.172 1.6 5.99L0 24l6.32-1.6C8.847 23.333 10.398 24 12 24c6.62 0 12-5.38 12-12 0-3.294-1.273-6.313-3.48-8.52zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.668.15-.197.297-.768.967-.943 1.165-.174.198-.347.223-.644.074-1.758-.868-2.905-1.538-4.066-3.148-.307-.42.307-.39.882-1.29.098-.12.049-.223-.025-.372-.074-.148-.668-1.61-.915-2.205-.242-.579-.488-.5-.668-.51l-.57-.01c-.197 0-.516.074-.786.372-.27.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487 2.98 1.289 3.98 1.152 4.32 1.08.33-.074 1.047-.427 1.195-.84.148-.413.148-.766.104-.84-.044-.074-.297-.115-.643-.264z');

      svg.appendChild(path);
      whatsappBtn.appendChild(svg);
    }
  }
});