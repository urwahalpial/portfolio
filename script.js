// Small enhancement only: the website works without JavaScript.
document.getElementById('year').textContent = new Date().getFullYear();
// Before publishing, replace the email and LinkedIn placeholders in index.html.
// To enable résumé downloads, add your PDF at assets/resume.pdf.
const resumeLink = document.querySelector('[data-resume]');
resumeLink?.addEventListener('click', (event) => {
  // Prevent an accidental broken download until the real PDF has been added.
  if (resumeLink.getAttribute('href') === 'assets/resume.pdf') {
    // Remove this handler after you have added the real file.
    event.preventDefault();
    alert('Add your résumé PDF to assets/resume.pdf to enable this download.');
  }
});

// Keep the taskbar category in sync with the section at the reading line.
const categoryLabel = document.getElementById('active-category');
const categorySections = [...document.querySelectorAll('[data-category]')];
let categoryUpdatePending = false;
function updateCategory() {
  categoryUpdatePending = false;
  if (!categoryLabel || !categorySections.length) return;
  const readingLine = Math.max(80, Math.min(window.innerHeight * 0.25, 180));
  let active = categorySections[0];
  for (const section of categorySections) {
    if (section.getBoundingClientRect().top <= readingLine) active = section;
    else break;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    active = categorySections[categorySections.length - 1];
  }
  categoryLabel.textContent = active.dataset.category;
}
function scheduleCategoryUpdate() {
  if (categoryUpdatePending) return;
  categoryUpdatePending = true;
  requestAnimationFrame(updateCategory);
}
window.addEventListener('scroll', scheduleCategoryUpdate, {passive: true});
window.addEventListener('resize', scheduleCategoryUpdate);
window.addEventListener('pageshow', scheduleCategoryUpdate);
updateCategory();
