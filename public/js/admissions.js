/* Halaman Admissions: saklar jenjang KB-TK / SD pada langkah observasi. */
window.SedayaAksi.switchAdmissionFlow = (level) => {
    const indicator = document.getElementById('admission-indicator');
    const toggle = document.getElementById('admission-toggle');
    const obsKbtk = document.getElementById('obs-kbtk');
    const obsSd = document.getElementById('obs-sd');
    if (!indicator || !toggle || !obsKbtk || !obsSd) return;

    const sd = level === 'sd';
    indicator.classList.toggle('translate-x-full', sd);
    toggle.querySelectorAll('button').forEach(btn => {
        const aktif = (btn.dataset.arg === 'sd') === sd;
        btn.setAttribute('aria-pressed', String(aktif));
        btn.classList.toggle('text-brand-primary', aktif);
        btn.classList.toggle('text-gray-600', !aktif);
    });
    obsKbtk.classList.toggle('hidden', sd);
    obsSd.classList.toggle('hidden', !sd);
};
