/**
 * ELARA DENTAL CARE — Interactive Scripts
 * Client-Conversion Redesign Demo
 * Technology: Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // Treatment Data Dictionary for Accessible Modal
  // -------------------------------------------------------------------------
  const treatmentsData = {
    'consultations': {
      title: 'Dental Consultations & Check-ups',
      category: 'Preventive Care',
      desc: 'A comprehensive oral health evaluation tailored to your individual dental history and smile goals.',
      whyMatters: 'Routine examinations identify subtle tooth wear, early enamel erosion, gum sensitivity, and occult decay long before they cause acute discomfort or require invasive treatments.',
      whatToExpect: 'An attentive 30 to 45-minute consultation with Dr. Nikita More in an unhurried setting. We perform an external and intraoral examination, evaluate your bite, check soft tissue health, and clearly discuss any findings. You receive transparent options without pressure.',
      prepTip: 'Bring any recent dental records or X-rays if available, and note down any specific tooth sensitivities or smile questions you would like to discuss.'
    },
    'root-canal': {
      title: 'Root Canal Treatment',
      category: 'Restorative Care',
      desc: 'Restorative therapy designed to relieve deep tooth discomfort, eliminate root infection, and preserve your natural tooth.',
      whyMatters: 'Preserving your natural tooth structure is always the premier clinical goal. When pulp tissue becomes inflamed due to deep decay or trauma, root canal therapy cleans and hermetically seals the internal canal system.',
      whatToExpect: 'Gentle, localized anesthesia for comfort, careful tooth isolation, precision removal of inflamed nerve tissue, thorough antimicrobial irrigation, and biocompatible sealing. A dental crown is typically discussed to restore full chewing strength.',
      prepTip: 'Have a light meal prior to your appointment unless advised otherwise. Treatments are performed with careful pacing to maintain your comfort.'
    },
    'cleaning': {
      title: 'Teeth Cleaning & Polishing',
      category: 'Preventive Care',
      desc: 'Professional scaling and high-luster polishing to remove tartar calculus, bacterial plaque, and surface stains.',
      whyMatters: 'Daily brushing and flossing are essential, but cannot remove hardened calculus deposits under the gum margin. Routine clinical cleanings safeguard against gingivitis, periodontal recession, and persistent bad breath.',
      whatToExpect: 'Gentle ultrasonic scaling using lukewarm water mist to loosen tartar, precision hand scaling for fine contours, followed by a prophylactic polishing paste that leaves your teeth smooth and fresh.',
      prepTip: 'Recommended every 6 months for most adults to maintain pristine gum health.'
    },
    'fillings': {
      title: 'Dental Fillings & Restorative Care',
      category: 'Restorative Care',
      desc: 'Natural tooth-colored composite restorations that repair cavities, chip damage, and minor fractures seamlessly.',
      whyMatters: 'Modern composite resins bond directly to your enamel and dentin, conserving healthy tooth structure while creating a virtually invisible, durable restoration.',
      whatToExpect: 'Conservative removal of damaged tissue, precision shade selection to blend with your natural enamel, layer-by-layer resin placement cured with specialized blue light, and meticulous bite-checking for total comfort.',
      prepTip: 'Avoid extremely hot or ice-cold beverages for a few hours after placement while numbness subsides.'
    },
    'orthodontics': {
      title: 'Braces & Clear Aligners',
      category: 'Orthodontics',
      desc: 'Orthodontic consultations and alignment therapies to correct crowding, gaps, and bite alignment with discreet precision.',
      whyMatters: 'Properly aligned teeth not only elevate your smile confidence, but also distribute bite forces evenly, prevent premature enamel wear, and are substantially easier to keep clean.',
      whatToExpect: 'Orthodontic diagnostic evaluation, facial and bite harmony assessment, digital planning, and personalized discussion between discreet clear aligners or traditional ceramic/metal brackets based on your lifestyle.',
      prepTip: 'Consultations include realistic timelines, treatment roadmaps, and maintenance care instructions.'
    },
    'implants': {
      title: 'Dental Implants',
      category: 'Restorative Care',
      desc: 'Modern, permanent tooth replacement foundations utilizing biocompatible titanium posts and custom crowns.',
      whyMatters: 'A dental implant is the only restorative option that replaces both the tooth crown and the biological root, halting jawbone resorption and keeping neighboring teeth from drifting.',
      whatToExpect: 'Comprehensive assessment of bone density and oral anatomy, precision surgical placement under local anesthesia, an osseointegration healing period, followed by custom porcelain crown restoration matching your natural smile.',
      prepTip: 'Detailed evaluation is conducted first to confirm clinical candidacy and discuss timeline expectations.'
    },
    'whitening': {
      title: 'Teeth Whitening',
      category: 'Cosmetic Dentistry',
      desc: 'Safe, clinically supervised enamel brightening designed to lift tea, coffee, and age-related discoloration evenly.',
      whyMatters: 'Supervised clinical whitening uses balanced formulations and protective gum barriers that deliver reliable brightening while protecting vulnerable enamel and delicate gingival tissues.',
      whatToExpect: 'Shade assessment against a clinical shade guide, gum isolation barrier, application of specialized whitening gel, and guidance on maintaining your brightened smile.',
      prepTip: 'A routine dental cleaning is recommended prior to whitening for maximum and uniform aesthetic results.'
    },
    'cosmetic': {
      title: 'Smile-Related Cosmetic Treatments',
      category: 'Cosmetic Dentistry',
      desc: 'Artistic smile enhancements including composite bonding, porcelain veneers, and subtle contouring for facial harmony.',
      whyMatters: 'Cosmetic treatments address tooth proportions, uneven edges, persistent dark discolorations, and small spacing variations to create a balanced, natural-looking smile.',
      whatToExpect: 'A thorough aesthetic dialogue to understand your personal vision, digital smile assessment, conservative treatment options, and meticulous hand-crafted restorations.',
      prepTip: 'Feel free to share photos of smiles you admire to help communicate your aesthetic preferences during the consultation.'
    }
  };

  // -------------------------------------------------------------------------
  // 1. Sticky Header & Scroll Spy
  // -------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // IntersectionObserver for active navigation highlight
  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
          } else if (href.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

  // -------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation (Accessible)
  // -------------------------------------------------------------------------
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  function openMobileMenu() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (drawerCloseBtn) drawerCloseBtn.focus();
  }

  function closeMobileMenu() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuBtn.focus();
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
  if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // -------------------------------------------------------------------------
  // 3. Treatment Category Filtering
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const treatmentCards = document.querySelectorAll('.treatment-row, .treatment-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      treatmentCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Accessible Treatment Detail Modal
  // -------------------------------------------------------------------------
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalDialog = document.querySelector('.modal-dialog');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalWhy = document.getElementById('modal-why');
  const modalExpect = document.getElementById('modal-expect');
  const modalPrep = document.getElementById('modal-prep');
  const modalEnquireBtn = document.getElementById('modal-enquire-btn');

  let lastActiveElement = null;

  function openTreatmentModal(treatmentKey) {
    const data = treatmentsData[treatmentKey];
    if (!data) return;

    lastActiveElement = document.activeElement;

    modalTag.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalWhy.textContent = data.whyMatters;
    modalExpect.textContent = data.whatToExpect;
    modalPrep.textContent = data.prepTip;

    modalEnquireBtn.setAttribute('data-treatment-title', data.title);

    modalBackdrop.classList.add('is-open');
    modalDialog.classList.add('is-open');
    modalDialog.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    modalCloseBtn.focus();
  }

  function closeTreatmentModal() {
    modalBackdrop.classList.remove('is-open');
    modalDialog.classList.remove('is-open');
    modalDialog.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
  }

  // Bind "Learn More" buttons
  document.querySelectorAll('.treatment-learn-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const treatmentKey = btn.getAttribute('data-treatment');
      openTreatmentModal(treatmentKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTreatmentModal);
  const modalCloseSecondary = document.querySelector('.modal-close-btn-secondary');
  if (modalCloseSecondary) modalCloseSecondary.addEventListener('click', closeTreatmentModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeTreatmentModal);

  // Modal Enquire action
  if (modalEnquireBtn) {
    modalEnquireBtn.addEventListener('click', () => {
      const treatmentName = modalEnquireBtn.getAttribute('data-treatment-title');
      closeTreatmentModal();
      selectTreatmentAndScroll(treatmentName);
    });
  }

  // -------------------------------------------------------------------------
  // 5. Treatment Quick-Select & Scroll to Appointment
  // -------------------------------------------------------------------------
  const treatmentSelect = document.getElementById('treatment');
  const fullNameInput = document.getElementById('fullname');

  function selectTreatmentAndScroll(treatmentName) {
    if (treatmentSelect && treatmentName) {
      // Find matching option
      for (let i = 0; i < treatmentSelect.options.length; i++) {
        if (treatmentSelect.options[i].text.toLowerCase().includes(treatmentName.toLowerCase()) ||
            treatmentName.toLowerCase().includes(treatmentSelect.options[i].text.toLowerCase())) {
          treatmentSelect.selectedIndex = i;
          break;
        }
      }
    }

    const appointmentSection = document.getElementById('appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (fullNameInput) fullNameInput.focus();
      }, 600);
    }
  }

  // Bind card "Enquire" buttons
  document.querySelectorAll('.treatment-enquire-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.treatment-row, .treatment-card');
      const titleElem = card ? card.querySelector('.treatment-title') : null;
      const treatmentName = titleElem ? titleElem.textContent.trim() : '';
      selectTreatmentAndScroll(treatmentName);
    });
  });

  // Global Esc key listener for modal & drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalDialog && modalDialog.classList.contains('is-open')) {
        closeTreatmentModal();
      }
      if (drawer && drawer.classList.contains('is-open')) {
        closeMobileMenu();
      }
    }
  });

  // -------------------------------------------------------------------------
  // 6. Mobile Bottom Action Bar Auto-Hide on Appointment Section
  // -------------------------------------------------------------------------
  const mobileActionBar = document.querySelector('.mobile-action-bar');
  const appointmentSec = document.getElementById('appointment');

  if (mobileActionBar && appointmentSec) {
    const bottomBarObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mobileActionBar.classList.add('is-hidden');
        } else {
          mobileActionBar.classList.remove('is-hidden');
        }
      });
    }, { threshold: 0.1 });

    bottomBarObserver.observe(appointmentSec);
  }

  // -------------------------------------------------------------------------
  // 7. Interactive Appointment Form Validation & Local Demo Success
  // -------------------------------------------------------------------------
  const appointmentForm = document.getElementById('appointment-form');
  const formSuccessCard = document.getElementById('form-success-card');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const summaryName = document.getElementById('summary-name');
  const summaryPhone = document.getElementById('summary-phone');
  const summaryTreatment = document.getElementById('summary-treatment');
  const summarySlot = document.getElementById('summary-slot');

  // Input helper: Indian phone number validation
  // Indian phone numbers: 10 digits starting with 6, 7, 8, or 9
  function isValidIndianPhone(phoneStr) {
    // Strip whitespace, plus sign, dashes, parentheses
    const cleaned = phoneStr.replace(/[\s\-\(\)\+]/g, '');
    // If starts with 91 (country code) and 12 digits total
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return /^[6-9]\d{9}$/.test(cleaned.slice(2));
    }
    // If starts with 0 and 11 digits
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return /^[6-9]\d{9}$/.test(cleaned.slice(1));
    }
    // Standard 10 digit
    return /^[6-9]\d{9}$/.test(cleaned);
  }

  function setFieldError(fieldId, errorMsg) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const parentGroup = field.closest('.form-group');
    field.classList.add('is-invalid');
    if (parentGroup) {
      parentGroup.classList.add('has-error');
      const errElem = parentGroup.querySelector('.form-error-msg');
      if (errElem && errorMsg) errElem.textContent = errorMsg;
    }
  }

  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const parentGroup = field.closest('.form-group');
    field.classList.remove('is-invalid');
    if (parentGroup) {
      parentGroup.classList.remove('has-error');
    }
  }

  // Real-time clearance of errors on user input
  ['fullname', 'phone', 'treatment', 'consent'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => clearFieldError(id));
      input.addEventListener('change', () => clearFieldError(id));
    }
  });

  // Set minimum date to today
  const dateInput = document.getElementById('preferred-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;

      // Validate Name
      const nameVal = fullNameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        setFieldError('fullname', 'Please enter your full name (at least 2 characters).');
        hasError = true;
      } else {
        clearFieldError('fullname');
      }

      // Validate Phone
      const phoneInput = document.getElementById('phone');
      const phoneVal = phoneInput.value.trim();
      if (!phoneVal) {
        setFieldError('phone', 'Phone number is required to confirm appointments.');
        hasError = true;
      } else if (!isValidIndianPhone(phoneVal)) {
        setFieldError('phone', 'Please enter a valid 10-digit Indian mobile number (e.g. 98200 12345).');
        hasError = true;
      } else {
        clearFieldError('phone');
      }

      // Validate Treatment
      if (!treatmentSelect.value) {
        setFieldError('treatment', 'Please choose a treatment or consultation of interest.');
        hasError = true;
      } else {
        clearFieldError('treatment');
      }

      // Validate Consent Checkbox
      const consentCheck = document.getElementById('consent');
      if (!consentCheck.checked) {
        setFieldError('consent', 'Please check the box to confirm your appointment request.');
        hasError = true;
      } else {
        clearFieldError('consent');
      }

      if (hasError) {
        const firstInvalid = appointmentForm.querySelector('.is-invalid, .has-error input, .has-error select');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Submit Animation (Simulated Local Processing)
      const submitBtn = appointmentForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 6px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2 A10 10 0 0 1 22 12" stroke-linecap="round"/>
        </svg> Submitting Request...
      `;

      setTimeout(() => {
        // Populate Summary details
        if (summaryName) summaryName.textContent = nameVal;
        if (summaryPhone) summaryPhone.textContent = phoneVal;
        if (summaryTreatment) summaryTreatment.textContent = treatmentSelect.options[treatmentSelect.selectedIndex].text;
        
        const slotSelect = document.getElementById('preferred-time');
        const dateVal = dateInput && dateInput.value ? dateInput.value : 'Any upcoming date';
        const timeVal = slotSelect && slotSelect.value ? slotSelect.options[slotSelect.selectedIndex].text : 'Flexible';
        if (summarySlot) summarySlot.textContent = `${dateVal} • ${timeVal}`;

        // Switch to success card
        appointmentForm.style.display = 'none';
        formSuccessCard.classList.add('is-visible');

        // Restore button state for future
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Scroll into view if needed
        formSuccessCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }

  // Reset Form
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      appointmentForm.reset();
      formSuccessCard.classList.remove('is-visible');
      appointmentForm.style.display = 'flex';
      fullNameInput.focus();
    });
  }

  // -------------------------------------------------------------------------
  // 8. Footer Current Year
  // -------------------------------------------------------------------------
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 9. Graceful Image Fallbacks
  // -------------------------------------------------------------------------
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      // If an image fails to load, replace with a subtle styled fallback
      img.style.display = 'none';
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'img-fallback-box';
      fallbackDiv.style.width = '100%';
      fallbackDiv.style.height = '100%';
      fallbackDiv.style.minHeight = '200px';
      fallbackDiv.style.backgroundColor = '#F0EDE3';
      fallbackDiv.style.display = 'flex';
      fallbackDiv.style.alignItems = 'center';
      fallbackDiv.style.justifyContent = 'center';
      fallbackDiv.style.color = '#78917D';
      fallbackDiv.style.fontFamily = 'var(--font-serif)';
      fallbackDiv.style.fontSize = '1.1rem';
      fallbackDiv.style.padding = '1.5rem';
      fallbackDiv.style.textAlign = 'center';
      fallbackDiv.textContent = 'Elara Dental Care • Prabhadevi, Mumbai';
      img.parentNode.insertBefore(fallbackDiv, img);
    });
  });

});
