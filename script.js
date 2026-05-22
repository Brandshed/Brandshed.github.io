// Navbar scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for reveal animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

reveals.forEach(el => observer.observe(el));

// Smooth scrolling for anchor links (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Contact form submission (real, via Web3Forms)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate required fields
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--rose)';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }

        // Show sending state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending…';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showFormStatus('Thanks for reaching out! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            } else {
                const data = await response.json();
                showFormStatus(data.message || 'Something went wrong. Please email us directly at hello@brandshed.co.za', 'error');
            }
        } catch (error) {
            showFormStatus('Connection error. Please email us directly at hello@brandshed.co.za', 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    formStatus.style.color = type === 'success' ? 'var(--sage)' : 'var(--rose)';
    if (type === 'success') {
        setTimeout(() => { formStatus.style.display = 'none'; }, 8000);
    }
}

// ========== READ MORE FUNCTIONALITY (mobile only) ==========
function initReadMore() {
    // Select all text elements that might be long
    const textBlocks = document.querySelectorAll('.t-text, .care-desc, .pkg-desc');
    
    textBlocks.forEach(block => {
        // Get the parent card – we'll wrap content inside
        const parent = block.parentNode;
        
        // Only process on screens < 900px
        if (window.innerWidth >= 900) return;
        
        // If block already has a read-more wrapper, skip
        if (block.parentNode.classList && block.parentNode.classList.contains('read-more-content')) return;
        
        // Get original text
        const originalText = block.innerText;
        const wordCount = originalText.split(/\s+/).length;
        
        // Only add read more if text is long (e.g., > 80 words or > 300 chars)
        if (wordCount <= 60 && originalText.length <= 280) return;
        
        // Wrap the block's inner content in a new div
        const wrapper = document.createElement('div');
        wrapper.className = 'read-more-content collapsed';
        // Move all child nodes into wrapper
        while (block.firstChild) {
            wrapper.appendChild(block.firstChild);
        }
        block.appendChild(wrapper);
        
        // Create toggle button
        const toggle = document.createElement('a');
        toggle.href = 'javascript:void(0)';
        toggle.className = 'read-more-toggle';
        toggle.innerText = 'Read more ↓';
        
        // Add click event
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isCollapsed = wrapper.classList.contains('collapsed');
            if (isCollapsed) {
                wrapper.classList.remove('collapsed');
                toggle.innerText = 'Read less ↑';
            } else {
                wrapper.classList.add('collapsed');
                toggle.innerText = 'Read more ↓';
            }
        });
        
        block.appendChild(toggle);
    });
}



// Run on load and on window resize (to re-run if orientation changes)
window.addEventListener('load', () => {
    initReadMore();
});
window.addEventListener('resize', () => {
    // Remove all existing read-more setups first to avoid duplication
    document.querySelectorAll('.read-more-toggle').forEach(btn => btn.remove());
    document.querySelectorAll('.read-more-content').forEach(wrapper => {
        const parent = wrapper.parentNode;
        // Unwrap content
        while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
        }
        wrapper.remove();
    });
    initReadMore();
});

// Auto-update copyright year in footer
const copyrightYearEl = document.getElementById('copyrightYear');
if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
}

// FAQ accordion: only one item open at a time
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
        if (item.open) {
            faqItems.forEach(other => {
                if (other !== item && other.open) {
                    other.open = false;
                }
            });
        }
    });
});

// Care Plan buttons: scroll to contact form and prefill message
const careBtns = document.querySelectorAll('.care-btn[data-plan]');

careBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();  // stop any default link behaviour

    const planName = this.getAttribute('data-plan');
    const contactSection = document.getElementById('contact');
    const messageField = document.querySelector('#contactForm textarea[name="message"]');

    if (contactSection && messageField) {
      // Prefill the message box with a nice, custom message
      const prefillMessage = `Hi Brandshed team,

I'm interested in your **${planName}** Care Plan. Could you please send me more details about what's included and how to get started?

Thank you!`;

      messageField.value = prefillMessage;

      // Scroll directly to the contact form (so the input boxes are visible)
      const contactFormElement = document.getElementById('contactForm');
      if (contactFormElement) {
        contactFormElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Optional: highlight the message field briefly
      messageField.style.transition = 'box-shadow 0.3s';
      messageField.style.boxShadow = '0 0 0 3px var(--rose-glow)';
      setTimeout(() => {
        messageField.style.boxShadow = '';
      }, 1500);
    } else {
      // Fallback: if something is missing, just go to contact section
      window.location.href = '#contact';
    }
  });
});

// ========== FAQ "SHOW MORE / SHOW LESS" (fixed) ==========
(function() {
    const faqList = document.querySelector('.faq-list');
    if (!faqList) return;

    const allFaQs = Array.from(document.querySelectorAll('.faq-item'));
    const total = allFaQs.length;
    const VISIBLE_COUNT = 5;

    // If 5 or fewer, hide the button and exit
    if (total <= VISIBLE_COUNT) {
        const btnContainer = document.querySelector('.faq-more-btn-container');
        if (btnContainer) btnContainer.style.display = 'none';
        return;
    }

    // Store indices of items that start hidden (index >= 5)
    const hiddenIndices = [];
    for (let i = VISIBLE_COUNT; i < total; i++) {
        hiddenIndices.push(i);
        allFaQs[i].classList.add('hidden-faq');
    }

    const toggleBtn = document.getElementById('faqToggleBtn');
    if (!toggleBtn) return;

    let expanded = false;

    function setHiddenState(expand) {
        const currentItems = document.querySelectorAll('.faq-item');
        hiddenIndices.forEach(idx => {
            if (currentItems[idx]) {
                if (expand) {
                    currentItems[idx].classList.remove('hidden-faq');
                } else {
                    currentItems[idx].classList.add('hidden-faq');
                }
            }
        });
    }

    toggleBtn.addEventListener('click', () => {
        if (!expanded) {
            setHiddenState(true);
            toggleBtn.innerHTML = 'Show less ↑';
            expanded = true;
        } else {
            setHiddenState(false);
            toggleBtn.innerHTML = 'Show more ↓';
            expanded = false;
        }
    });
})();


