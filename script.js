// Set current dynamic year in footer
const yearElem = document.getElementById('year');
if (yearElem) yearElem.textContent = new Date().getFullYear();

// DOM Elements
const htmlElem = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const menuBtn = document.getElementById('menu-btn');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const mobileMenu = document.getElementById('mobile-menu');
const shareBtn = document.getElementById('share-btn');
const toast = document.getElementById('toast');

// Theme Toggle Functionality (Dark Mode Default)
function updateThemeUI(isDark) {
  if (isDark) {
    htmlElem.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    htmlElem.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
}

// Default to dark theme unless specified
let isDarkMode = true;
updateThemeUI(isDarkMode);

themeToggleBtn.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  updateThemeUI(isDarkMode);
});

// Mobile Navigation Menu Toggle
let isMenuOpen = false;
menuBtn.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    mobileMenu.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// Smooth Scroll Helper & Mobile Menu Close
function scrollToSection(event, sectionId) {
  event.preventDefault();
  
  // Close mobile menu if open
  if (isMenuOpen) {
    isMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Toast Notification Handler
function showToast() {
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

// Share / Copy Link Handler
shareBtn.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Eza Askara - Official Website',
        text: 'Eza Askara - Aktif Menulis Fiksi',
        url: window.location.href,
      });
    } catch (err) {
      copyToClipboard();
    }
  } else {
    copyToClipboard();
  }
});

function copyToClipboard() {
  const tempInput = document.createElement('input');
  tempInput.value = window.location.href;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast();
  } catch (err) {
    console.error('Failed to copy', err);
  }
  document.body.removeChild(tempInput);
}

// Active Navigation Highlight on Scroll
const sections = ['home', 'follow', 'about'];
window.addEventListener('scroll', () => {
  let currentSection = 'home';
  const scrollPos = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPos) {
      currentSection = id;
    }
  });

  // Update Desktop Nav Links
  sections.forEach(id => {
    const navLink = document.getElementById(`nav-${id}`);
    if (navLink) {
      if (id === currentSection) {
        navLink.className = 'nav-link capitalize transition-colors text-black dark:text-white font-semibold';
      } else {
        navLink.className = 'nav-link capitalize transition-colors text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white';
      }
    }
  });
});


