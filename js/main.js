// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // 1. LOADER
    // ============================================
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }, 1500);
    }

    // ============================================
    // 2. PROGRESS BAR
    // ============================================
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
            
            if (scrollTop > 100) {
                progressBar.style.opacity = '1';
            } else {
                progressBar.style.opacity = '0';
            }
        });
    }

    // ============================================
    // 3. MOBILE MENU
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // ============================================
    // 4. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // 5. TYPING EFFECT
    // ============================================
    const typingElement = document.getElementById('typing');
    if (typingElement) {
        const words = ['لتنمية أعمالك', 'للتطوير المستمر', 'لتحقيق النجاح', 'للتحول الرقمي'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // ============================================
    // 6. COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.counter');
    let counterStarted = false;

    function startCounters() {
        if (counterStarted) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
        counterStarted = true;
    }

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

// ============================================
// 7. SKY ASSISTANT - البوت التفاعلي (نسخة دروب داون)
// ============================================
const assistantBtn = document.getElementById('assistantBtn');
const assistantPopup = document.getElementById('assistantPopup');
const closeAssistant = document.getElementById('closeAssistant');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const selectedQuestion = document.getElementById('selectedQuestion');
const assistantAnswer = document.getElementById('assistantAnswer');
const answerText = document.getElementById('answerText');

// قاعدة الأسئلة والأجوبة
const faqData = {
    'q1': 'نقدم حلولاً برمجية متكاملة تشمل الأنظمة المحاسبية، ERP، CRM، إدارة الموارد البشرية، نقاط البيع، والدعم الفني.',
    'q2': 'نعم، نوفر دعماً فنياً متخصصاً لمساعدة عملائنا في أي وقت.',
    'q3': 'نعم، يمكن تطوير الأنظمة بما يتناسب مع احتياجات كل مؤسسة.',
    'q4': 'يمكنك التواصل معنا عبر نموذج الدعم داخل الموقع، أو من خلال الواتساب، أو البريد الإلكتروني، أو المكالمة الهاتفية المباشرة. نحن متاحون يوميًا للرد على جميع الاستفسارات في أسرع وقت ممكن.',
    'q5': 'نعم، سكاي سوفت متوافق مع جميع أنواع طابعات الكاشير والباركود وقوارئ الرموز (Barcode Scanners) وأنظمة نقاط البيع POS.',
    'q6': 'يوفر سكاي سوفت مجموعة شاملة من التقارير المالية والإدارية مثل الأرباح والخسائر، المبيعات اليومية، حركة المخزون، وتقارير العملاء والموردين.',
    'q7': 'نعم، يعمل فريق الدعم الفني على مدار الساعة لضمان استقرار النظام واستمرارية عملك دون انقطاع.',
    'q8': 'بالتأكيد. جميع عملاء سكاي سوفت يحصلون على دعم فني مجاني بعد الشراء، بالإضافة إلى تحديثات وتحسينات مستمرة للنظام.',
    'q9': 'لا، واجهة سكاي سوفت مصممة لتكون سهلة الاستخدام حتى لغير المحاسبين، مع شروحات وفيديوهات توضيحية داخل النظام.',
    'q10': 'بالتأكيد، سكاي سوفت يعتمد على أنظمة حماية قوية وتشفير متقدم لضمان سرية بياناتك ومنع أي وصول غير مصرح به.'
};

// فتح/غلق البوب أب
if (assistantBtn && assistantPopup) {
    assistantBtn.addEventListener('click', function() {
        const isVisible = assistantPopup.style.display === 'block';
        assistantPopup.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            // إعادة تعيين عند الفتح
            selectedQuestion.textContent = '-- اختر سؤالك --';
            assistantAnswer.style.display = 'none';
            dropdownMenu.classList.remove('open');
        }
    });

    if (closeAssistant) {
        closeAssistant.addEventListener('click', function() {
            assistantPopup.style.display = 'none';
        });
    }

    document.addEventListener('click', function(e) {
        if (assistantPopup.style.display === 'block') {
            if (!assistantPopup.contains(e.target) && !assistantBtn.contains(e.target)) {
                assistantPopup.style.display = 'none';
            }
        }
    });
}

// فتح/غلق القائمة المنسدلة
if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('open');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('open');
    });

    // اختيار عنصر من القائمة
    dropdownMenu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const text = this.textContent;
            
            selectedQuestion.textContent = text;
            dropdownMenu.classList.remove('open');
            
            // عرض الإجابة
            if (value && faqData[value]) {
                answerText.textContent = faqData[value];
                assistantAnswer.style.display = 'block';
                assistantAnswer.style.animation = 'none';
                setTimeout(() => {
                    assistantAnswer.style.animation = 'fadeIn 0.3s ease';
                }, 10);
            }
        });
    });
}
    // ============================================
    // 8. BACK TO TOP BUTTON
    // ============================================
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                topBtn.classList.add('show');
            } else {
                topBtn.classList.remove('show');
            }
        });

        topBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 9. COPY EMAIL TOAST
    // ============================================
    /*
    const copyEmail = document.getElementById('copyEmail');
    const toast = document.getElementById('toast');

    if (copyEmail && toast) {
        copyEmail.addEventListener('click', function() {
            const email = this.querySelector('p').textContent;
            navigator.clipboard.writeText(email).then(() => {
                toast.textContent = '📧 تم نسخ البريد الإلكتروني!';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2500);
            });
        });
    }*/

    // ============================================
    // 10. REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ============================================
    // 11. FOOTER YEAR
    // ============================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ============================================
    // 12. ACTIVE NAV LINK
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    console.log('✅ Sky Soft website loaded successfully!');
});