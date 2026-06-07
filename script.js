/* ==========================================================================
   PORTFOLIO INTERACTIVE CONTROLLER (MONOCHROME GRUNGE STYLE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Check if data is loaded
  if (typeof portfolioData === 'undefined') {
    console.error("portfolioData tidak ditemukan! Pastikan data.js dimuat sebelum script.js.");
    return;
  }

  // Initialize UI components and render data
  initCustomCursor();
  renderProfile();
  renderSkills();
  renderExperience();
  renderProjects();
  initTypewriter();
  initMobileMenu();
  initContactForm();
  
  // Trigger Lucide icons replacing
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* ==========================================================================
   1. CUSTOM CURSOR CONTROLLER
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById("customCursor");
  const cursorDot = document.getElementById("customCursorDot");
  
  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  // Track mouse coordinates
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow (lerp)
  function animateCursor() {
    // Outer circle delay follow
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    // Inner dot instant follow
    dotX += (mouseX - dotX) * 0.8;
    dotY += (mouseY - dotY) * 0.8;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover classes for interactive elements
  const interactiveSelector = "a, button, .filter-btn, input, textarea, select, .project-card";
  
  function addHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelector);
    targets.forEach(target => {
      // Avoid duplication
      target.removeEventListener("mouseenter", handleMouseEnter);
      target.removeEventListener("mouseleave", handleMouseLeave);
      
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);
    });
  }

  function handleMouseEnter() {
    document.body.classList.add("hovered-link");
  }

  function handleMouseLeave() {
    document.body.classList.remove("hovered-link");
  }

  // Initial bindings
  addHoverListeners();

  // Expose to trigger again when DOM updates dynamically (e.g. projects rendering)
  window.refreshCursorListeners = addHoverListeners;
}

/* ==========================================================================
   2. RENDER PROFILE INFORMATION
   ========================================================================== */
function renderProfile() {
  const { name, bio, resumeUrl } = portfolioData.profile;
  
  // Set hero text description
  const heroDesc = document.getElementById("heroDesc");
  if (heroDesc) heroDesc.textContent = bio;

  // Set bio text inside about
  const bioText = document.getElementById("bioText");
  if (bioText) bioText.textContent = bio;

  // Set CV/Resume download link
  const resumeLink = document.getElementById("resumeLink");
  if (resumeLink) resumeLink.href = resumeUrl;

  // Set social media links in footer
  const socialsFooter = document.getElementById("socialsFooter");
  if (socialsFooter) {
    socialsFooter.innerHTML = portfolioData.profile.socials.map(social => `
      <a href="${social.url}" class="footer-social-link" target="_blank" rel="noopener noreferrer">
        [${social.name.toUpperCase()}]
      </a>
    `).join("");
  }
}

/* ==========================================================================
   3. TYPEWRITER ANIMATION (HERO SECTION)
   ========================================================================== */
function initTypewriter() {
  const typingText = document.getElementById("typingText");
  if (!typingText) return;

  const subtitles = portfolioData.profile.subtitles;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = subtitles[wordIndex];
    
    if (isDeleting) {
      // Deleting characters
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // delete faster
    } else {
      // Typing characters
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // normal speed
    }

    // Handle end of typing / deleting word cycle
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Go to next word
      wordIndex = (wordIndex + 1) % subtitles.length;
      typeSpeed = 500; // Pause before next word starts typing
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing loop
  setTimeout(type, 1000);
}

/* ==========================================================================
   4. RENDER TIMELINE (EXPERIENCE)
   ========================================================================== */
function renderExperience() {
  const container = document.getElementById("experienceTimeline");
  if (!container) return;

  container.innerHTML = portfolioData.experience.map(exp => `
    <div class="timeline-item">
      <span class="timeline-period">${exp.period}</span>
      <h3 class="timeline-role">${exp.role}</h3>
      <div class="timeline-company">// ${exp.company}</div>
      <p class="timeline-desc">${exp.description}</p>
    </div>
  `).join("");
}

/* ==========================================================================
   5. RENDER SKILLS & SKILLS PROGRESS ANIMATION
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  container.innerHTML = portfolioData.skills.map(category => `
    <div class="skills-column">
      <h3 class="skills-column-title">
        <span>${category.category}</span>
        <span class="font-mono">// 0${portfolioData.skills.indexOf(category) + 1}</span>
      </h3>
      <div class="skills-list">
        ${category.items.map(skill => `
          <div class="skill-item">
            <div class="skill-info">
              <span>${skill.name}</span>
              <span>${skill.level}%</span>
            </div>
            <div class="skill-bar-outer">
              <div class="skill-bar-inner" data-level="${skill.level}%"></div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  // Animate skill bars on scroll (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-bar-inner");
        skillBars.forEach(bar => {
          bar.style.width = bar.getAttribute("data-level");
        });
        // Unobserve once loaded
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Start observing
  const skillsColumns = document.querySelectorAll(".skills-column");
  skillsColumns.forEach(column => observer.observe(column));
}

/* ==========================================================================
   6. RENDER PROJECTS & FILTERING LOGIC
   ========================================================================== */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  const filterContainer = document.getElementById("filterContainer");
  if (!grid || !filterContainer) return;

  // Render project cards HTML
  grid.innerHTML = portfolioData.projects.map(proj => {
    // Generate links if available
    const githubLinkHtml = proj.githubUrl ? `
      <a href="${proj.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
        <i data-lucide="github" style="width:14px;height:14px;"></i> GITHUB
      </a>
    ` : "";

    const demoLinkHtml = proj.demoUrl ? `
      <a href="${proj.demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
        <i data-lucide="external-link" style="width:14px;height:14px;"></i> LIHAT PROYEK
      </a>
    ` : "";

    return `
      <div class="project-card" data-category="${proj.category}">
        <div class="project-img-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-img" data-id="${proj.id}">
          <canvas class="project-fallback-canvas" data-id="${proj.id}" width="400" height="240" style="display:none; width:100%; height:100%; object-fit:cover;"></canvas>
          <div class="halftone-overlay"></div>
        </div>
        <div class="project-card-content">
          <div class="project-tags">
            ${proj.tags.map(tag => `<span class="project-tag">${tag.toUpperCase()}</span>`).join("")}
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-links">
            ${demoLinkHtml}
            ${githubLinkHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Handle fallback dynamic canvas drawing if image fails to load
  setupImageFallbacks();

  // Setup filtering triggers
  const filterButtons = filterContainer.querySelectorAll(".filter-btn");
  const cards = grid.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active button
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      // Filter animation
      cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          // Show matching card
          card.classList.remove("fade-out");
          card.style.display = "flex";
          // Small timeout to trigger transition
          setTimeout(() => {
            card.classList.add("fade-in");
          }, 10);
        } else {
          // Hide non-matching card
          card.classList.remove("fade-in");
          card.classList.add("fade-out");
          
          // Wait for fade-out animation steps to complete
          card.addEventListener("animationend", function handleAnimEnd() {
            if (card.classList.contains("fade-out")) {
              card.style.display = "none";
            }
            card.removeEventListener("animationend", handleAnimEnd);
          });
        }
      });
    });
  });

  // Re-run cursor link attachments
  if (window.refreshCursorListeners) {
    window.refreshCursorListeners();
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* Fallback Canvas Painter: generates brutalist monochrome digital abstract patterns */
function setupImageFallbacks() {
  const images = document.querySelectorAll(".project-img");
  
  images.forEach(img => {
    img.addEventListener("error", () => {
      const projId = img.getAttribute("data-id");
      const canvas = document.querySelector(`canvas[data-id="${projId}"]`);
      if (canvas) {
        // Swap visibility
        img.style.display = "none";
        canvas.style.display = "block";
        
        drawBrutalistPattern(canvas, projId);
      }
    });
    
    // Explicit trigger check in case image is missing and cached error is bypassed
    if (!img.complete || img.naturalWidth === 0) {
      // Handled via load/error event loops
    }
  });
}

function drawBrutalistPattern(canvas, id) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  
  // Fill background off-white
  ctx.fillStyle = "#f5f5f2";
  ctx.fillRect(0, 0, w, h);
  
  // Set stroke settings
  ctx.strokeStyle = "#0c0c0c";
  ctx.fillStyle = "#0c0c0c";
  ctx.lineWidth = 3;
  
  // Draw random geometric structures based on project ID seed
  const seed = parseInt(id) || 1;
  const cols = 8 + (seed % 4);
  const cellW = w / cols;
  const cellH = h / cols;

  ctx.save();
  
  // Grid Lines
  ctx.strokeStyle = "rgba(12, 12, 12, 0.15)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellW, 0);
    ctx.lineTo(i * cellW, h);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * cellH);
    ctx.lineTo(w, i * cellH);
    ctx.stroke();
  }
  
  // Bold elements
  ctx.strokeStyle = "#0c0c0c";
  ctx.lineWidth = 3;
  
  // Draw crossing lines
  ctx.beginPath();
  ctx.moveTo(cellW * 2, cellH * (seed % cols));
  ctx.lineTo(w - cellW * 2, h - cellH * (seed % cols));
  ctx.stroke();

  // Circle overlay
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, Math.min(w, h) / 4, 0, Math.PI * 2);
  ctx.stroke();
  
  // Inverted rectangle
  ctx.fillRect(cellW, cellH, cellW * (3 + (seed % 3)), cellH * (2 + (seed % 2)));
  
  // Add some typewriter styled noise text
  ctx.font = "bold 14px 'Courier Prime', monospace";
  ctx.fillStyle = "#f5f5f2"; // write inside inverted black rectangle
  ctx.fillText(`RAW_ARCHIVE_${id}`, cellW + 10, cellH + 24);
  ctx.fillText("FAILSAFE_ACTIVE", cellW + 10, cellH + 44);

  // Halftone mesh simulator (radial grids)
  ctx.restore();
  ctx.fillStyle = "rgba(12,12,12,0.6)";
  for (let x = 0; x < w; x += 12) {
    for (let y = 0; y < h; y += 12) {
      if ((x + y) % 5 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

/* ==========================================================================
   7. MOBILE MENU LOGIC
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("menuClose");
  const navOverlay = document.getElementById("mobileNav");
  const links = document.querySelectorAll(".mobile-link");

  if (!toggleBtn || !navOverlay) return;

  function openMenu() {
    navOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  function closeMenu() {
    navOverlay.classList.remove("open");
    document.body.style.overflow = ""; // Re-enable scrolling
  }

  toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  
  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

/* ==========================================================================
   8. CONTACT FORM retro terminal logger feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("formStatus");

  if (!form || !statusDiv) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      showStatus("LENGKAPI_SEMUA_FIELD_FORMULIR!", "error");
      return;
    }

    // Interactive retro logger
    let logSteps = [
      "[CONNECTING TO SERVER...]",
      "[CONNECTION FOUND // RETRY SECURE SHELL]",
      "[SENDING METADATA: ENCRYPTING DATA]",
      "[WRITING TO RAW ARCHIVE LOGS...]",
      "[PESAN BERHASIL DIKIRIM! RAKA AKAN SEGERA MENGHUBUNGI ANDA]"
    ];

    let currentStep = 0;
    statusDiv.className = "form-status success";
    statusDiv.style.display = "block";
    form.querySelector(".btn-submit").disabled = true;

    function runLogger() {
      if (currentStep < logSteps.length) {
        statusDiv.textContent = logSteps[currentStep];
        currentStep++;
        setTimeout(runLogger, 400 + Math.random() * 400); // randomize retro delay
      } else {
        // Reset form
        form.reset();
        form.querySelector(".btn-submit").disabled = false;
        
        // Refresh cursor listeners on new state
        if (window.refreshCursorListeners) window.refreshCursorListeners();
      }
    }

    runLogger();
  });

  function showStatus(msg, type) {
    statusDiv.textContent = `[ERROR: ${msg.toUpperCase()}]`;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = "block";
    
    setTimeout(() => {
      statusDiv.style.display = "none";
    }, 5000);
  }
}
