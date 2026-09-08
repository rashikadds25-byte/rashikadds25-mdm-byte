// Matrix Dataset Definitions
const FORMULA_DATABASE = [
    { id: 1, topic: 'algebra', title: 'Quadratic Formula', equation: 'x = (-b ± √(b² - 4ac)) / 2a', desc: 'Solves generic second-degree parabolic polynomial equations.' },
    { id: 2, topic: 'algebra', title: 'Binomial Theorem Expansion', equation: '(x + y)ⁿ = ∑ (ⁿk) xⁿ⁻ᵏ yᵏ', desc: 'Computes polynomial powers expand indexes systematically.' },
    { id: 3, topic: 'calculus', title: 'Fundamental Theorem Part 1', equation: 'd/dx [∫ x_a f(t)dt] = f(x)', desc: 'Connects operational derivation directly with area accumulation integration.' },
    { id: 4, topic: 'calculus', title: 'Chain Derivative Rule', equation: '(f ∘ g)\'(x) = f\'(g(x)) · g\'(x)', desc: 'Differentiates composition functions via cascading pipelines.' },
    { id: 5, topic: 'trigonometry', title: 'Pythagorean Fundamental Identity', equation: 'sin²(θ) + cos²(θ) = 1', desc: 'Basic unit circle trigonometric operational anchor.' },
    { id: 6, topic: 'trigonometry', title: 'Double Angle Cosine Identity', equation: 'cos(2θ) = cos²(θ) - sin²(θ)', desc: 'Compresses periodic function arguments down an order level.' },
    { id: 7, topic: 'matrices', title: 'Determinant of 2x2 Target Matrix', equation: 'det(A) = ad - bc', desc: 'Computes scaling scalar metric parameters of two-dimensional matrices.' },
    { id: 8, topic: 'matrices', title: 'Inversion Transform Definition', equation: 'A⁻¹ = (1/det(A)) · adj(A)', desc: 'Calculates structural operational multiplicative inverses for linear systems.' }
];

// Problem Bank Repository Builder Mapping
const QUESTION_BANK = {
    easy: [
        { topic: 'algebra', type: 'mcq', question: 'Find the discriminant value of the equation: x² - 4x + 4 = 0.', options: ['0', '4', '16', '-8'], answer: '0' },
        { topic: 'trigonometry', type: 'fib', question: 'Complete the trigonometric identity expression target: sin²(x) + cos²(x) = ?', answer: '1' },
        { topic: 'matrices', type: 'mcq', question: 'What is the determinant of the matrix [[2, 0], [0, 3]]?', options: ['6', '0', '5', '2'], answer: '6' },
        { topic: 'calculus', type: 'fib', question: 'What is the derivative value of f(x) = 5x with respect to x?', answer: '5' }
    ],
    medium: [
        { topic: 'calculus', type: 'mcq', question: 'Evaluate the derivative: d/dx [ln(x²)]', options: ['2/x', '1/x²', '2x', 'x/2'], answer: '2/x' },
        { topic: 'trigonometry', type: 'mcq', question: 'Which formula maps correctly to cos(2θ)?', options: ['cos²θ - sin²θ', '2sinθcosθ', '1 + sin²θ', 'cos²θ + sin²θ'], answer: 'cos²θ - sin²θ' },
        { topic: 'algebra', type: 'fib', question: 'State the highest power degree value of a quadratic equation expression.', answer: '2' },
        { topic: 'matrices', type: 'mcq', question: 'If matrix A has dimension 3x2 and matrix B has 2x4, what is the dimension configuration order of AB?', options: ['3x4', '2x2', '3x2', 'Incompatible'], answer: '3x4' }
    ],
    hard: [
        { topic: 'calculus', type: 'mcq', question: 'Evaluate the integral boundary area: ∫ x·e^x dx', options: ['e^x(x - 1) + C', 'x·e^x + C', 'e^x(1 - x) + C', 'x²/2 · e^x + C'], answer: 'e^x(x - 1) + C' },
        { topic: 'matrices', type: 'fib', question: 'What is the trace value of the identity matrix I with order dimension 3?', answer: '3' },
        { topic: 'algebra', type: 'mcq', question: 'What is the total count number of roots for a cubic polynomial statement equation according to Fundamental Theorem of Algebra?', options: ['3', '2', '1', 'Variable'], answer: '3' },
        { topic: 'trigonometry', type: 'fib', question: 'If tan(θ) = 1, calculate the principal degree angle evaluation value in the first quadrant.', answer: '45' }
    ]
};

// Global App State Scope Variables
let appState = {
    currentView: 'home',
    theme: 'light',
    config: { difficulty: 'easy', categories: ['algebra', 'calculus', 'trigonometry', 'matrices'], username: 'Engineer Candidate' },
    quiz: { activeQuestions: [], currentIdx: 0, score: 0, timerId: null, timeLeft: 20, answersLog: [] },
    libraryTab: 'all'
};

// Initialization System Loop
document.addEventListener('DOMContentLoaded', () => {
    loadCachedSettings();
    renderFormulaLibrary();
    setupThemeToggle();
    navigateTo('home');
});

// Navigation System Controller
function navigateTo(targetPage) {
    appState.currentView = targetPage;
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    const targetedView = document.getElementById(`page-${targetPage}`);
    if (targetedView) targetedView.classList.remove('hidden');

    // Update Nav bar visual feedback indicators
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('text-indigo-600', 'dark:text-indigo-400');
        btn.classList.add('text-slate-600', 'dark:text-slate-300');
    });
    const activeNav = document.getElementById(`nav-${targetPage}`);
    if (activeNav) {
        activeNav.classList.remove('text-slate-600', 'dark:text-slate-300');
        activeNav.classList.add('text-indigo-600', 'dark:text-indigo-400');
    }

    if(targetPage === 'leaderboard') renderLeaderboard();
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Light / Dark Theme Module
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Read stored system state preference
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
        appState.theme = 'dark';
    } else {
        root.classList.remove('dark');
        appState.theme = 'light';
    }

    toggleBtn.addEventListener('click', () => {
        if (root.classList.contains('dark')) {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            appState.theme = 'light';
        } else {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            appState.theme = 'dark';
        }
    });
}

// Quiz setup configurations actions
function selectDifficulty(diff) {
    appState.config.difficulty = diff;
    document.querySelectorAll('.diff-btn').forEach(b => {
        b.className = "diff-btn py-3 px-4 rounded-xl border-2 border-transparent bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-all shadow-sm";
    });
    
    const targetStyles = {
        easy: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
        medium: 'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400',
        hard: 'border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-400'
    };
    
    document.getElementById(`diff-${diff}`).className = `diff-btn py-3 px-4 rounded-xl border-2 ${targetStyles[diff]} font-bold transition-all shadow-sm`;
}

function toggleCategory(cat) {
    const idx = appState.config.categories.indexOf(cat);
    if(idx > -1) {
        if(appState.config.categories.length === 1) return; // Retain at least one topic area block
        appState.config.categories.splice(idx, 1);
        document.getElementById(`cat-${cat}`).className = "cat-btn p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold flex flex-col items-center justify-center space-y-2 transition-all";
    } else {
        appState.config.categories.push(cat);
        document.getElementById(`cat-${cat}`).className = "cat-btn p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold flex flex-col items-center justify-center space-y-2 transition-all";
    }
}

// Formula library view management logic
function renderFormulaLibrary() {
    const container = document.getElementById('library-container');
    container.innerHTML = '';
    
    const searchVal = document.getElementById('library-search').value.toLowerCase();
    
    const filtered = FORMULA_DATABASE.filter(f => {
        const matchesTab = appState.libraryTab === 'all' || f.topic === appState.libraryTab;
        const matchesQuery = f.title.toLowerCase().includes(searchVal) || f.equation.toLowerCase().includes(searchVal) || f.desc.toLowerCase().includes(searchVal);
        return matchesTab && matchesQuery;
    });

    if(filtered.length === 0) {
        container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400"><i class="fas fa-search-minus text-2xl block mb-2"></i>No matching identities mapped in database.</div>`;
        return;
    }

    filtered.forEach(f => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow";
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">${f.topic}</span>
                    <button onclick="copyToClipboard('${f.equation.replace(/'/g, "\'")}')" class="text-slate-400 hover:text-indigo-500 text-xs transition-colors" title="Copy Formula"><i class="far fa-copy"></i></button>
                </div>
                <h3 class="font-bold text-lg text-slate-900 dark:text-slate-50">${f.title}</h3>
                <div class="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-center text-indigo-600 dark:text-indigo-400 overflow-x-auto text-sm scrollbar-none font-bold my-2 select-all">${f.equation}</div>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${f.desc}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function switchLibraryTab(tab) {
    appState.libraryTab = tab;
    document.querySelectorAll('.lib-tab').forEach(b => {
        b.className = "lib-tab px-4 py-2.5 font-semibold text-sm border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-indigo-500 whitespace-nowrap";
    });
    document.getElementById(`tab-${tab}`).className = "lib-tab px-4 py-2.5 font-semibold text-sm border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 whitespace-nowrap";
    renderFormulaLibrary();
}

function searchLibrary() {
    renderFormulaLibrary();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Formula string targeted copied to clip space matrix!");
    });
}

// Core Runtime Engine Loop execution
function startQuiz() {
    const inputName = document.getElementById('username-input').value.trim();
    if (inputName) appState.config.username = inputName;
    
    // Pick matched elements from database configuration parameters parameters
    const sourcePool = QUESTION_BANK[appState.config.difficulty] || [];
    const matchedPool = sourcePool.filter(q => appState.config.categories.includes(q.topic));
    
    if(matchedPool.length === 0) {
        alert("No questions matching chosen parameters. Adjust options settings criteria matrix.");
        return;
    }

    // Shuffle operations configuration
    appState.quiz.activeQuestions = matchedPool.sort(() => 0.5 - Math.random());
    appState.quiz.currentIdx = 0;
    appState.quiz.score = 0;
    appState.quiz.answersLog = [];
    
    navigateTo('quiz');
    displayQuestion();
}

function displayQuestion() {
    // Reset structural state nodes
    clearInterval(appState.quiz.timerId);
    document.getElementById('next-question-btn').classList.add('hidden');
    document.getElementById('fib-input').value = '';
    
    const total = appState.quiz.activeQuestions.length;
    const current = appState.quiz.currentIdx;
    const qData = appState.quiz.activeQuestions[current];
    
    // Update HUD counters metrics components
    document.getElementById('quiz-progress-text').innerText = `${current + 1}/${total}`;
    document.getElementById('quiz-progress-bar').style.width = `${((current + 1) / total) * 100}%`;
    document.getElementById('quiz-score').innerText = appState.quiz.score;
    
    // Populate Question parameters components
    const badge = document.getElementById('question-topic-badge');
    badge.innerText = qData.topic;
    document.getElementById('question-text').innerText = qData.question;
    
    // Routing render schemas criteria definitions
    if (qData.type === 'mcq') {
        document.getElementById('fib-container').classList.add('hidden');
        const mcqWrapper = document.getElementById('mcq-options-container');
        mcqWrapper.classList.remove('hidden');
        mcqWrapper.innerHTML = '';
        
        qData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = "option-btn";
            btn.innerHTML = `<span>${opt}</span><i class="far fa-circle text-slate-300 dark:text-slate-700 text-sm"></i>`;
            btn.onclick = () => evaluateAnswer(opt, btn);
            mcqWrapper.appendChild(btn);
        });
    } else if (qData.type === 'fib') {
        document.getElementById('mcq-options-container').classList.add('hidden');
        document.getElementById('fib-container').classList.remove('hidden');
    }

    // Launch Timer engine clock
    appState.quiz.timeLeft = 20;
    document.getElementById('quiz-timer').innerText = `00:${appState.quiz.timeLeft}`;
    appState.quiz.timerId = setInterval(() => {
        appState.quiz.timeLeft--;
        document.getElementById('quiz-timer').innerText = `00:${appState.quiz.timeLeft < 10 ? '0' + appState.quiz.timeLeft : appState.quiz.timeLeft}`;
        
        if(appState.quiz.timeLeft <= 0) {
            clearInterval(appState.quiz.timerId);
            evaluateAnswer('', null); // Timeout step validation logic routine execution
        }
    }, 1000);
}

function evaluateAnswer(userAns, selectedBtnElement) {
    clearInterval(appState.quiz.timerId);
    const qData = appState.quiz.activeQuestions[appState.quiz.currentIdx];
    const isCorrect = userAns.trim().toLowerCase() === qData.answer.trim().toLowerCase();
    
    if (isCorrect) appState.quiz.score += 10;
    
    appState.quiz.answersLog.push({ question: qData.question, userAns, correctAns: qData.answer, status: isCorrect });

    // Render operational feedback indicators values blocks layout layers
    if (qData.type === 'mcq') {
        const mcqWrapper = document.getElementById('mcq-options-container');
        // Disable choices selection
        Array.from(mcqWrapper.children).forEach(btn => {
            btn.onclick = null;
            const itemText = btn.querySelector('span').innerText;
            if(itemText === qData.answer) {
                btn.className = "option-btn border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                btn.querySelector('i').className = "fas fa-check-circle text-emerald-500";
            } else if (selectedBtnElement && itemText === userAns) {
                btn.className = "option-btn border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold";
                btn.querySelector('i').className = "fas fa-times-circle text-rose-500";
            }
        });
    } else if (qData.type === 'fib') {
        const fibContainer = document.getElementById('fib-container');
        const infoMsg = document.createElement('div');
        infoMsg.id = 'fib-feedback-node';
        if (isCorrect) {
            infoMsg.className = "p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold";
            infoMsg.innerHTML = `<i class="fas fa-check-circle mr-2"></i>Correct formulation!`;
        } else {
            infoMsg.className = "p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-sm font-semibold";
            infoMsg.innerHTML = `<i class="fas fa-times-circle mr-2"></i>Incorrect. Target: <span class="font-mono font-bold">${qData.answer}</span>`;
        }
        fibContainer.appendChild(infoMsg);
        fibContainer.querySelector('button').disabled = true;
    }

    document.getElementById('next-question-btn').classList.remove('hidden');
}

function submitFibAnswer() {
    const val = document.getElementById('fib-input').value;
    evaluateAnswer(val, null);
}

function nextQuestion() {
    // Remove dynamically injected FIB tracking message frame elements
    const extra = document.getElementById('fib-feedback-node');
    if(extra) extra.remove();
    document.querySelector('#fib-container button').disabled = false;

    appState.quiz.currentIdx++;
    if (appState.quiz.currentIdx < appState.quiz.activeQuestions.length) {
        displayQuestion();
    } else {
        processQuizResults();
    }
}

// Evaluation Metrics processing pipeline engine layers mapping structures
function processQuizResults() {
    const totalQ = appState.quiz.activeQuestions.length;
    const maxPossibleScore = totalQ * 10;
    const percentage = Math.round((appState.quiz.score / maxPossibleScore) * 100) || 0;
    
    let correctCount = appState.quiz.answersLog.filter(x => x.status).length;
    let incorrectCount = totalQ - correctCount;

    // Display fields maps binding configurations strings definitions
    document.getElementById('res-score').innerText = appState.quiz.score;
    document.getElementById('res-percentage').innerText = `${percentage}%`;
    document.getElementById('res-correct').innerText = correctCount;
    document.getElementById('res-incorrect').innerText = incorrectCount;

    // Generate descriptive feedback layers nodes configurations
    const insightIcon = document.getElementById('res-insight-icon');
    const insightTitle = document.getElementById('res-insight-title');
    const insightDesc = document.getElementById('res-insight-desc');

    if (percentage >= 80) {
        insightIcon.className = "p-4 rounded-full text-4xl bg-amber-500/10 text-amber-500";
        insightIcon.innerHTML = `<i class="fas fa-award"></i>`;
        insightTitle.innerText = "Mastery Level Achievement!";
        insightDesc.innerText = "You verified advanced engineering criteria parameters matching master structural matrices indices thresholds.";
        
        // Trigger certificate visibility block
        setTimeout(() => triggerCertificate(percentage), 600);
    } else if (percentage >= 50) {
        insightIcon.className = "p-4 rounded-full text-4xl bg-indigo-500/10 text-indigo-500";
        insightIcon.innerHTML = `<i class="fas fa-user-graduate"></i>`;
        insightTitle.innerText = "Competent Standard Verified.";
        insightDesc.innerText = "Solid fundamental knowledge bases verified. Review target libraries elements nodes to clear missing parameters values indices.";
    } else {
        insightIcon.className = "p-4 rounded-full text-4xl bg-rose-500/10 text-rose-500";
        insightIcon.innerHTML = `<i class="fas fa-book-reader"></i>`;
        insightTitle.innerText = "Development Pipeline Suggested";
        insightDesc.innerText = "Sub-optimal metrics verified. Review standard textbook definitions or reference identities lists inside reference library indexes.";
    }

    // Cache parameters down into global local storage records pipelines mapping lists array structures
    saveScoreToLeaderboard(appState.config.username, appState.config.difficulty, appState.quiz.score);
    navigateTo('page-result'); // Route display view mapping parameter step
    
    // Explicit bypass to raw element id assignment routing loop
    document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-result').classList.remove('hidden');
}

// Certificate overlay handling
function triggerCertificate(pct) {
    document.getElementById('cert-user-name').innerText = appState.config.username;
    document.getElementById('cert-percentage').innerText = `${pct}%`;
    document.getElementById('cert-date-stamp').innerText = new Date().toISOString().split('T')[0];
    document.getElementById('certificate-modal').classList.remove('hidden');
}

function closeCertificate() {
    document.getElementById('certificate-modal').classList.add('hidden');
}

// Local Storage Leaderboard Logic Controller Module Core
function saveScoreToLeaderboard(username, diff, score) {
    let board = JSON.parse(localStorage.getItem('edumath_leaderboard')) || [];
    board.push({ name: username, difficulty: diff, score: score, timestamp: Date.now() });
    // Sort array components sequences descending
    board.sort((a,b) => b.score - a.score || b.timestamp - a.timestamp);
    // Truncate size matrix allocation lengths threshold checks
    if(board.length > 10) board = board.slice(0, 10);
    localStorage.setItem('edumath_leaderboard', JSON.stringify(board));
}

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    const emptyState = document.getElementById('leaderboard-empty-state');
    tbody.innerHTML = '';

    const board = JSON.parse(localStorage.getItem('edumath_leaderboard')) || [];
    
    if(board.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    board.forEach((row, idx) => {
        const tr = document.createElement('tr');
        tr.className = "border-b border-slate-100 dark:border-slate-800/70 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 text-sm font-medium transition-colors";
        
        let rankBadge = `<span class="font-bold text-slate-500">${idx + 1}</span>`;
        if (idx === 0) rankBadge = `<i class="fas fa-medal text-amber-500 text-base"></i>`;
        if (idx === 1) rankBadge = `<i class="fas fa-medal text-slate-400 text-base"></i>`;
        if (idx === 2) rankBadge = `<i class="fas fa-medal text-amber-700 text-base"></i>`;

        let diffBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">Easy</span>`;
        if (row.difficulty === 'medium') diffBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">Med</span>`;
        if (row.difficulty === 'hard') diffBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">Hard</span>`;

        tr.innerHTML = `
            <td class="py-3 px-6 text-center">${rankBadge}</td>
            <td class="py-3 px-6 text-slate-900 dark:text-slate-100 font-semibold">${row.name}</td>
            <td class="py-3 px-6">${diffBadge}</td>
            <td class="py-3 px-6 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">${row.score}</td>
        `;
        tbody.appendChild(tr);
    });
}

function clearLeaderboard() {
    if(confirm("Confirm action: purge all cached record data arrays loops from local store parameters?")) {
        localStorage.removeItem('edumath_leaderboard');
        renderLeaderboard();
    }
}

function loadCachedSettings() {
    // Read local system flags maps configurations references
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        appState.theme = 'dark';
    }
}
