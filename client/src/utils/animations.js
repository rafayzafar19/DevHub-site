export const fadeIn = (element, duration = 300) => {
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    element.style.opacity = '1';
  }, 10);
};

export const slideIn = (element, direction = 'up', duration = 300) => {
  const directions = {
    up: { transform: 'translateY(20px)', opacity: '0' },
    down: { transform: 'translateY(-20px)', opacity: '0' },
    left: { transform: 'translateX(20px)', opacity: '0' },
    right: { transform: 'translateX(-20px)', opacity: '0' }
  };

  const initial = directions[direction];
  element.style.transform = initial.transform;
  element.style.opacity = initial.opacity;
  element.style.transition = `all ${duration}ms ease-out`;

  setTimeout(() => {
    element.style.transform = 'translate(0, 0)';
    element.style.opacity = '1';
  }, 10);
};

export const scaleIn = (element, duration = 300) => {
  element.style.transform = 'scale(0.9)';
  element.style.opacity = '0';
  element.style.transition = `all ${duration}ms ease-out`;

  setTimeout(() => {
    element.style.transform = 'scale(1)';
    element.style.opacity = '1';
  }, 10);
};

export const bounce = (element, duration = 600) => {
  element.style.animation = `bounce ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
};

export const pulse = (element, duration = 1000) => {
  element.style.animation = `pulse ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
};

export const shake = (element, duration = 500) => {
  element.style.animation = `shake ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
};

export const addToCartAnimation = (button) => {
  const originalText = button.innerHTML;
  button.innerHTML = '✓ Added!';
  button.style.backgroundColor = '#10B981';
  button.style.transform = 'scale(1.05)';
  
  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.backgroundColor = '';
    button.style.transform = '';
  }, 1500);
};

export const showLoading = (element) => {
  element.innerHTML = `
    <div class="flex items-center justify-center">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      <span class="ml-2">Loading...</span>
    </div>
  `;
};

export const showSuccess = (element, message = 'Success!') => {
  const originalContent = element.innerHTML;
  element.innerHTML = `
    <div class="flex items-center justify-center text-green-600">
      <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      ${message}
    </div>
  `;
  
  setTimeout(() => {
    element.innerHTML = originalContent;
  }, 2000);
};

export const showError = (element, message = 'Error!') => {
  const originalContent = element.innerHTML;
  element.innerHTML = `
    <div class="flex items-center justify-center text-red-600">
      <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>
      ${message}
    </div>
  `;
  
  setTimeout(() => {
    element.innerHTML = originalContent;
  }, 2000);
};

export const smoothScrollTo = (element, offset = 0) => {
  const elementPosition = element.offsetTop - offset;
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
};

export const parallax = (element, speed = 0.5) => {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    element.style.transform = `translateY(${rate}px)`;
  });
};

export const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  element.innerHTML = '';
  
  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

export const animateCounter = (element, target, duration = 1000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
};

export const addHoverEffects = (element) => {
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'translateY(-2px)';
    element.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translateY(0)';
    element.style.boxShadow = '';
  });
};

export const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
};

export const initAnimations = () => {
  document.querySelectorAll('.product-card, .category-card').forEach(el => {
    el.classList.add('fade-in');
  });
  
  observeElements();
  
  document.querySelectorAll('.btn-hover').forEach(el => {
    addHoverEffects(el);
  });
};

export const cssAnimations = `
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0,-30px,0);
    }
    70% {
      transform: translate3d(0,-15px,0);
    }
    90% {
      transform: translate3d(0,-4px,0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(10px);
    }
  }

  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .product-card {
    transition: all 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .btn-hover {
    transition: all 0.3s ease;
  }

  .btn-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`; 