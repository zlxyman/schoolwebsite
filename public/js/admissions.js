function switchAdmissionFlow(level) {
    const indicator = document.getElementById('admission-indicator');
    const buttons = document.getElementById('admission-toggle').querySelectorAll('button');
    const obsKbtk = document.getElementById('obs-kbtk');
    const obsSd = document.getElementById('obs-sd');
    
    if (level === 'kbtk') {
        indicator.style.transform = 'translateX(0)';
        buttons[0].classList.replace('text-gray-500', 'text-brand-primary');
        buttons[1].classList.replace('text-brand-primary', 'text-gray-500');
        
        obsKbtk.style.display = 'block';
        obsSd.style.display = 'none';
    } else {
        indicator.style.transform = 'translateX(100%)';
        buttons[0].classList.replace('text-brand-primary', 'text-gray-500');
        buttons[1].classList.replace('text-gray-500', 'text-brand-primary');
        
        obsKbtk.style.display = 'none';
        obsSd.style.display = 'block';
    }
}
