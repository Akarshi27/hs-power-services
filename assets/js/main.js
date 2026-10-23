/**
 * H.S. POWER SERVICES — Master Frontend Script
 * Purposeful, accessible, lightweight interactions for enterprise B2B infrastructure portal.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // 2. Back-to-Top Control
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Project Gallery Filter
  const filterBtns = document.querySelectorAll('.filter-pill');
  const galleryItems = document.querySelectorAll('.project-card-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Accessible Modal Lightbox with Prev / Next Navigation
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
  let currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox || index < 0 || index >= triggers.length) return;
    currentIndex = index;
    const trigger = triggers[index];
    const imgSrc = trigger.getAttribute('data-img');
    const title = trigger.getAttribute('data-title') || 'Project Infrastructure';
    const desc = trigger.getAttribute('data-desc') || 'H.S. Power Services Field Work';

    if (lightboxImg) lightboxImg.src = imgSrc;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
      openLightbox(currentIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % triggers.length;
      openLightbox(currentIndex);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        openLightbox(currentIndex);
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % triggers.length;
        openLightbox(currentIndex);
      }
    });
  }

  // 5. Professional B2B RFQ Form Handler
  const contactForm = document.getElementById('hs-rfq-form');
  const formSuccess = document.getElementById('rfq-success-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('rfq-name')?.value || '').trim();
      const phone = (document.getElementById('rfq-phone')?.value || '').trim();
      const email = (document.getElementById('rfq-email')?.value || '').trim();
      const company = (document.getElementById('rfq-company')?.value || '').trim();
      const sector = document.getElementById('rfq-sector')?.value || 'Not Specified';
      const location = (document.getElementById('rfq-location')?.value || '').trim();
      const scope = (document.getElementById('rfq-scope')?.value || '').trim();

      if (!name || !phone) {
        alert('Please provide your Contact Name and Telephone Number.');
        return;
      }

      const text = encodeURIComponent(
        `*Project Enquiry — H.S. Power Services*\n` +
        `• Name: ${name}\n` +
        `• Company: ${company || 'Not Specified'}\n` +
        `• Phone: ${phone}\n` +
        `• Email: ${email || 'Not Provided'}\n` +
        `• Sector: ${sector}\n` +
        `• Location: ${location || 'Not Specified'}\n` +
        `• Requirements: ${scope || 'Requesting technical consultation'}`
      );

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        contactForm.reset();
      }

      // Allow immediate WhatsApp routing
      setTimeout(() => {
        const proceed = confirm('Thank you. Would you like to forward this technical enquiry directly to our project desk on WhatsApp?');
        if (proceed) {
          window.open(`https://wa.me/917905701738?text=${text}`, '_blank');
        }
      }, 300);
    });
  }

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
});
