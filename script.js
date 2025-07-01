document.addEventListener('DOMContentLoaded', () => {

    // --- ギミック1: タイプライター風エフェクト ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML; // Use innerHTML to preserve <br>
        heroTitle.innerHTML = '';
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                // Check for <br> tag
                if (originalText.substring(i, i + 4) === '<br>') {
                    heroTitle.innerHTML += '<br>';
                    i += 4;
                } else {
                    heroTitle.innerHTML += originalText.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 80);
            }
        }
        typeWriter();
    }


    // --- ギミック2: スクロールに応じたフェードイン ---
    const faders = document.querySelectorAll('.section, .problem-item, .strength-card, .output-card, .voice-card, .feedback-box, .req-item, .faq-item, .link-card, .audio-card');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fade-in');
        appearOnScroll.observe(fader);
    });

    // --- ギミック3: 「毎日クイズBot」体験 ---
    const quizTrigger = document.querySelector('.quiz-trigger');
    if (quizTrigger) {
        quizTrigger.style.cursor = 'pointer';
        quizTrigger.addEventListener('click', () => {
            if (document.querySelector('.quiz-modal-overlay')) return; // Prevent multiple modals

            const modal = document.createElement('div');
            modal.className = 'quiz-modal-overlay';
            modal.innerHTML = `
                <div class="quiz-modal-content">
                    <span class="quiz-close-btn">×</span>
                    <h3>Metagri 毎日クイズ体験！</h3>
                    <p class="quiz-question">Q. Metagri研究所が初めて発行した農産物NFTは何でしょう？</p>
                    <div class="quiz-options">
                        <button class="quiz-option">A. 高級メロン</button>
                        <button class="quiz-option" data-correct="true">B. 接ぎ木された柑橘</button>
                        <button class="quiz-option">C. 幻のイチゴ</button>
                    </div>
                    <p class="quiz-result"></p>
                </div>
            `;
            document.body.appendChild(modal);

            const closeModal = () => {
                 if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }

            modal.querySelector('.quiz-close-btn').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if(e.target === modal) {
                    closeModal();
                }
            });

            modal.querySelectorAll('.quiz-option').forEach(button => {
                button.addEventListener('click', (e) => {
                    const resultEl = modal.querySelector('.quiz-result');
                    if (e.target.dataset.correct) {
                        resultEl.textContent = "正解！🎉 Metagriでは「選べる柑橘接ぎ木NFT」を発行しました！";
                        resultEl.style.color = '#66BB6A';
                    } else {
                        resultEl.textContent = "残念！もう一度挑戦してみて！";
                        resultEl.style.color = '#EF5350';
                    }
                    modal.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);
                });
            });
        });
    }

    // --- ギミック4: マウス追従のカスタムカーソル ---
    if (window.matchMedia("(min-width: 1025px)").matches) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', e => {
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });

        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        });
        
        document.querySelectorAll('a, button, .quiz-trigger').forEach(el => {
            el.addEventListener('mouseover', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
});
