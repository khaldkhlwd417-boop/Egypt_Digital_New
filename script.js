/* ============================
   أصوات التفاعل
============================ */
let audioContext = null;

function getAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    return audioContext;
}

function clickSound() {
    try {
        const ctx = getAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = 650;

        gain.gain.setValueAtTime(.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.08, ctx.currentTime + .01);
        gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + .1);
    } catch (e) {}
}

function answerSound(type) {
    try {
        const ctx = getAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === "correct") {
            osc.frequency.setValueAtTime(660, now);
            osc.frequency.setValueAtTime(880, now + .08);
        } else {
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.setValueAtTime(170, now + .1);
        }

        gain.gain.setValueAtTime(.001, now);
        gain.gain.exponentialRampToValueAtTime(.1, now + .02);
        gain.gain.exponentialRampToValueAtTime(.001, now + .25);

        osc.start(now);
        osc.stop(now + .26);
    } catch (e) {}
}

function testClickSound() {
    clickSound();
}

document.addEventListener("click", function (e) {
    if (e.target.closest("button") && !e.target.closest(".answer-button")) {
        clickSound();
    }
});

/* ============================
   التنقل بين الصفحات
============================ */
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);
    if (!page) return;

    page.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function startJourney() {
    showPage("map");
}

function openWorld(world) {
    if (world === "education") showPage("education");
    if (world === "health") showPage("health");
    if (world === "industry") showPage("industry");
}

/* ============================
   تشغيل الفيديو
============================ */
function openVideo() {
    const box = document.getElementById("videoBox");
    const video = document.getElementById("achievementVideo");

    box.classList.toggle("active");

    if (box.classList.contains("active")) {
        setTimeout(() => {
            box.scrollIntoView({ behavior: "smooth", block: "center" });
            if (video) video.play().catch(e => console.log("تعذر التشغيل التلقائي:", e));
        }, 100);
    } else {
        if (video) video.pause();
    }
}

/* ============================
   بيانات التعليم والصحة والصناعة
============================ */
const educationTopics = {
    platforms: {
        icon: "🌐",
        title: "المنصات التعليمية",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
        intro: "أصبحت المنصات الرقمية جزءًا مهمًا من منظومة التعليم، حيث تتيح الوصول إلى المحتوى والمصادر التعليمية إلكترونيًا.",
        boxes: [
            { title: "🏫 منصة مدرستنا", text: "منصة تعليمية رقمية تقدم محتوى ودروسًا ومواد تعليمية تساعد الطلاب على التعلم عبر الإنترنت." },
            { title: "💻 منصة كيريو QUREO", text: "منصة مرتبطة بتعلم البرمجة والذكاء الاصطناعي وتنمية المهارات الرقمية لدى الطلاب." },
            { title: "📺 المحتوى التعليمي الرقمي", text: "تتيح المنظومة الرقمية الوصول إلى مواد ودروس ومراجعات إلكترونية." },
            { title: "🌐 الخدمات الإلكترونية", text: "تساعد الخدمات والمنصات الإلكترونية في الوصول إلى مصادر ومواد تعليمية بصورة رقمية." }
        ],
        source: "https://moe.gov.eg/"
    },
    ekb: {
        icon: "📚",
        title: "بنك المعرفة المصري",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
        intro: "بنك المعرفة المصري منظومة رقمية توفر مصادر معرفية وتعليمية وبحثية لمستخدمين من فئات مختلفة.",
        boxes: [
            { title: "🔎 البحث", text: "يمكن البحث داخل مصادر ومحتوى معرفي ورقمي متنوع." },
            { title: "📖 مصادر تعليمية", text: "يضم مواد ومصادر تساعد الطلاب والمعلمين على التعلم والتوسع في المعرفة." },
            { title: "🧪 البحث العلمي", text: "يوفر مصادر تساعد الباحثين والطلاب على الوصول إلى المعرفة والمراجع العلمية." },
            { title: "🌍 المعرفة الرقمية", text: "يجمع الوصول الرقمي إلى عدد كبير من المصادر في منظومة واحدة." }
        ],
        source: "https://www.ekb.eg/"
    },
    programming: {
        icon: "👩‍💻",
        title: "البرمجة والذكاء الاصطناعي",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        intro: "تعلم البرمجة والذكاء الاصطناعي يساعد الطلاب على فهم التكنولوجيا وبناء حلول رقمية.",
        boxes: [
            { title: "💻 البرمجة", text: "يتعلم الطالب التفكير بطريقة منظمة وتقسيم المشكلات إلى خطوات يمكن للحاسوب تنفيذها." },
            { title: "🤖 الذكاء الاصطناعي", text: "يتعرف الطلاب على مفاهيم الذكاء الاصطناعي وتطبيقاته في الحياة والعمل." },
            { title: "🧠 حل المشكلات", text: "البرمجة تنمي التفكير المنطقي والتحليل وبناء الحلول." },
            { title: "🚀 مهارات المستقبل", text: "تساعد المهارات الرقمية الطلاب على الاستعداد لعالم يعتمد بصورة متزايدة على التكنولوجيا." }
        ],
        source: "https://moe.gov.eg/"
    },
    digitalization: {
        icon: "📊",
        title: "رقمنة التعليم",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
        intro: "التحول الرقمي يعني استخدام التكنولوجيا والبيانات والأنظمة الإلكترونية لتطوير العملية التعليمية.",
        boxes: [
            { title: "💾 البيانات", text: "تساعد الأنظمة الرقمية في تنظيم وإدارة البيانات التعليمية." },
            { title: "📱 الخدمات الرقمية", text: "تتيح التكنولوجيا تقديم خدمات ومصادر تعليمية إلكترونية." },
            { title: "🖥️ المحتوى الرقمي", text: "أصبح المحتوى التعليمي متاحًا في صور رقمية متنوعة بجانب الوسائل التقليدية." }
        ],
        source: "https://moe.gov.eg/"
    }
};

const healthTopics = {
    records: {
        icon: "📋",
        title: "البيانات والسجلات الصحية",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        intro: "يساعد التحول الرقمي في تنظيم البيانات والسجلات الصحية وتطوير طريقة إدارة المعلومات.",
        boxes: [
            { title: "📋 السجل الإلكتروني", text: "يساعد على تنظيم المعلومات الصحية إلكترونيًا بدل الاعتماد الكامل على الملفات الورقية." },
            { title: "🔐 حماية البيانات", text: "البيانات الصحية حساسة ولذلك تحتاج إلى أنظمة للحماية والأمان." },
            { title: "📊 تحليل البيانات", text: "يمكن استخدام البيانات المنظمة في التخطيط ودراسة احتياجات الخدمات الصحية." }
        ],
        source: "https://www.mohp.gov.eg/"
    },
    ai: {
        icon: "🤖",
        title: "الذكاء الاصطناعي في الصحة",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
        intro: "يمكن لتقنيات الذكاء الاصطناعي تحليل كميات كبيرة من البيانات والمساعدة في بعض المهام الطبية.",
        boxes: [
            { title: "🩻 تحليل الصور", text: "يمكن للذكاء الاصطناعي تحليل الصور الطبية والمساعدة في اكتشاف مؤشرات معينة." },
            { title: "🔬 الكشف المبكر", text: "تستخدم تقنيات الذكاء الاصطناعي في أبحاث وتطبيقات تهدف إلى اكتشاف مؤشرات مبكرة لبعض الحالات." },
            { title: "👨‍⚕️ أداة مساعدة", text: "الذكاء الاصطناعي أداة مساعدة للمختصين وليس بديلًا عن الطبيب." }
        ],
        source: "https://www.mohp.gov.eg/"
    },
    telemedicine: {
        icon: "📡",
        title: "الخدمات الصحية الرقمية",
        image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
        intro: "تستخدم التكنولوجيا في تقديم بعض الخدمات الصحية والتواصل والاستشارات عن بُعد.",
        boxes: [
            { title: "📱 الاستشارات", text: "يمكن تقديم بعض أنواع الاستشارات باستخدام وسائل الاتصال الرقمية." },
            { title: "👨‍⚕️ التواصل", text: "تساعد التكنولوجيا في تسهيل التواصل بين مقدمي الخدمات الصحية والمستفيدين." },
            { title: "🌍 الوصول للخدمة", text: "قد تساعد الخدمات الرقمية في توسيع الوصول إلى بعض الخبرات والخدمات الصحية." }
        ],
        source: "https://www.mohp.gov.eg/"
    },
    data: {
        icon: "☁️",
        title: "البيانات والتكنولوجيا الصحية",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        intro: "تحتاج الخدمات الصحية الرقمية إلى بنية تكنولوجية قادرة على تخزين ومعالجة البيانات.",
        boxes: [
            { title: "☁️ الحوسبة", text: "تساعد تقنيات الحوسبة في تخزين ومعالجة البيانات والخدمات الرقمية." },
            { title: "🖥️ البنية التحتية", text: "تحتاج الخدمات الرقمية إلى أنظمة وشبكات ومراكز بيانات لتشغيلها." },
            { title: "📈 التخطيط", text: "تحليل البيانات يمكن أن يدعم التخطيط وتطوير الخدمات الصحية." }
        ],
        source: "https://www.mohp.gov.eg/"
    }
};

const industryTopics = {
    electronics: {
        icon: "🔌",
        title: "الإلكترونيات",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        intro: "تشمل صناعة الإلكترونيات التصميم والتطوير والتصنيع والاختبار للمنتجات والأنظمة الإلكترونية.",
        boxes: [
            { title: "🔧 التصنيع", text: "تدخل الإلكترونيات في عدد كبير من الأجهزة والأنظمة الحديثة." },
            { title: "🧠 الأنظمة المدمجة", text: "توجد أنظمة حاسوبية صغيرة داخل أجهزة ومنتجات لتنفيذ وظائف محددة." },
            { title: "📟 المنتجات الذكية", text: "تستخدم الحساسات والمعالجة والاتصال في العديد من المنتجات الذكية." }
        ],
        source: "https://itida.gov.eg/"
    },
    chips: {
        icon: "💾",
        title: "أشباه الموصلات والدوائر المتكاملة",
        image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=1200&q=80",
        intro: "أشباه الموصلات والدوائر المتكاملة من أساسيات التكنولوجيا الحديثة.",
        boxes: [
            { title: "💾 الشرائح", text: "تحتوي الشرائح الإلكترونية على مكونات دقيقة تستخدم في أجهزة كثيرة." },
            { title: "📱 الاستخدامات", text: "تدخل في الهواتف وأجهزة الحاسب والسيارات والأجهزة الطبية وغيرها." },
            { title: "🔬 التكنولوجيا", text: "تتطلب صناعة المكونات الإلكترونية معرفة دقيقة بالتصميم والهندسة والتصنيع." }
        ],
        source: "https://itida.gov.eg/"
    },
    iot: {
        icon: "🌐",
        title: "إنترنت الأشياء",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        intro: "إنترنت الأشياء يربط الأجهزة والحساسات بالشبكات لتبادل البيانات وتنفيذ وظائف ذكية.",
        boxes: [
            { title: "📡 أجهزة متصلة", text: "يمكن للأجهزة إرسال البيانات واستقبال الأوامر عبر الشبكات." },
            { title: "🏠 المنازل والمدن الذكية", text: "يمكن استخدام إنترنت الأشياء في الطاقة والمياه والمباني والنقل." },
            { title: "📊 البيانات", text: "تجمع الأجهزة بيانات يمكن تحليلها والاستفادة منها في تحسين الخدمات." }
        ],
        source: "https://itida.gov.eg/"
    },
    industry4: {
        icon: "🤖",
        title: "الصناعة 4.0",
        image: "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?auto=format&fit=crop&w=1200&q=80",
        intro: "الصناعة 4.0 تعتمد على دمج البيانات والاتصال والأتمتة والأنظمة الذكية في التصنيع.",
        boxes: [
            { title: "🤖 الروبوتات", text: "يمكن للروبوتات تنفيذ بعض المهام الصناعية المتكررة أو الدقيقة." },
            { title: "📊 البيانات", text: "تساعد البيانات في متابعة خطوط الإنتاج وتحليل الأداء." },
            { title: "⚙️ الأتمتة", text: "تساعد الأتمتة في تنفيذ عمليات صناعية بصورة منظمة وآلية." },
            { title: "🔧 الصيانة التنبؤية", text: "يمكن تحليل بيانات المعدات للمساعدة في توقع الحاجة إلى الصيانة." }
        ],
        source: "https://itida.gov.eg/"
    },
    innovation: {
        icon: "🚀",
        title: "الابتكار التكنولوجي",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
        intro: "يساعد الابتكار التكنولوجي على تحويل الأفكار إلى منتجات وحلول رقمية.",
        boxes: [
            { title: "💡 الفكرة", text: "تبدأ الحلول التكنولوجية بفكرة تعالج مشكلة أو تلبي احتياجًا." },
            { title: "🧪 التجربة", text: "يتم اختبار النماذج وتحسينها قبل الانتقال إلى مراحل التطوير والإنتاج." },
            { title: "🏢 الشركات", text: "توجد برامج وجهات تعمل على دعم الشركات والمواهب في قطاع التكنولوجيا." }
        ],
        source: "https://itida.gov.eg/"
    }
};

/* ============================
   عرض عناصر الموضوعات
============================ */
function createTopicHTML(topic) {
    let boxes = "";
    topic.boxes.forEach(box => {
        boxes += `
            <article class="info-box">
                <h3>${box.title}</h3>
                <p>${box.text}</p>
            </article>
        `;
    });

    return `
        <div class="topic-hero">
            <img class="info-image" src="${topic.image}" alt="${topic.title}">
            <div class="topic-icon">${topic.icon}</div>
            <h1>${topic.title}</h1>
            <p>${topic.intro}</p>
            <a class="source-button" href="${topic.source}" target="_blank" rel="noopener">🔎 المصدر الرسمي</a>
        </div>
        <div class="info-grid">${boxes}</div>
    `;
}

function openTopic(name) {
    const topic = educationTopics[name];
    if (!topic) return;
    document.getElementById("topicContent").innerHTML = createTopicHTML(topic);
    showPage("topic");
}

function openHealthTopic(name) {
    const topic = healthTopics[name];
    if (!topic) return;
    document.getElementById("healthTopicContent").innerHTML = createTopicHTML(topic);
    showPage("healthTopic");
}

function openIndustryTopic(name) {
    const topic = industryTopics[name];
    if (!topic) return;
    document.getElementById("industryTopicContent").innerHTML = createTopicHTML(topic);
    showPage("industryTopic");
}

/* ============================
   الاختبار (Quiz)
============================ */
const quizQuestions = [
    { question: "أي منصة ترتبط بتعلم البرمجة والذكاء الاصطناعي؟", answers: ["كيريو QUREO", "منصة الطقس", "منصة السياحة", "منصة النقل"], correct: 0 },
    { question: "ما الهدف من بنك المعرفة المصري؟", answers: ["إتاحة مصادر المعرفة والتعليم والبحث", "تصنيع السيارات", "إدارة المصانع", "حجز المستشفيات"], correct: 0 },
    { question: "ماذا يعني إنترنت الأشياء؟", answers: ["ربط الأجهزة والحساسات بالشبكات وتبادل البيانات", "استخدام الكتب الورقية فقط", "مشاهدة الأفلام", "تصنيع الملابس"], correct: 0 },
    { question: "ما التقنية التي يمكنها تحليل بعض الصور والبيانات الطبية؟", answers: ["الذكاء الاصطناعي", "الطباعة الورقية", "الرسم اليدوي", "الآلة الكاتبة"], correct: 0 },
    { question: "ماذا تعتمد عليه الصناعة 4.0؟", answers: ["البيانات والأتمتة والاتصال والأنظمة الذكية", "الورق فقط", "إلغاء التكنولوجيا", "العمل اليدوي فقط"], correct: 0 },
    { question: "ما فائدة السجل الصحي الإلكتروني؟", answers: ["تنظيم المعلومات الصحية إلكترونيًا", "تصنيع الهواتف", "تعلم البرمجة", "إدارة المدارس"], correct: 0 },
    { question: "لماذا تعتبر البيانات مهمة في التحول الرقمي؟", answers: ["لأنها تساعد على التحليل وتطوير الخدمات", "لأنها تمنع الإنترنت", "لأنها تستخدم للصور فقط", "لأنها تلغي التكنولوجيا"], correct: 0 },
    { question: "ما فائدة تعلم البرمجة؟", answers: ["تنمية التفكير المنطقي وحل المشكلات", "حفظ الكتب فقط", "زيادة سرعة الإنترنت", "تعلم الرسم فقط"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    document.getElementById("quiz-result").innerHTML = "";
    showPage("quiz");
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById("question-number").textContent = `السؤال ${currentQuestion + 1} من ${quizQuestions.length}`;
    document.getElementById("question").textContent = question.question;
    document.getElementById("score").textContent = `النقاط: ${score}`;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";
    answered = false;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer-button";
        button.textContent = answer;
        button.onclick = () => { checkAnswer(index, button); };
        answers.appendChild(button);
    });
}

function checkAnswer(selected, selectedButton) {
    if (answered) return;
    answered = true;

    const question = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-button");

    buttons.forEach(button => { button.disabled = true; });

    if (selected === question.correct) {
        selectedButton.classList.add("correct");
        selectedButton.textContent = "✅ " + selectedButton.textContent;
        score++;
        answerSound("correct");
    } else {
        selectedButton.classList.add("wrong");
        selectedButton.textContent = "❌ " + selectedButton.textContent;
        buttons[question.correct].classList.add("correct");
        buttons[question.correct].textContent = "✅ " + buttons[question.correct].textContent;
        answerSound("wrong");
    }

    document.getElementById("score").textContent = `النقاط: ${score}`;

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 1300);
}

function finishQuiz() {
    const percentage = Math.round(score / quizQuestions.length * 100);
    let message;

    if (percentage === 100) {
        message = "🏆 مذهل! كل الإجابات صحيحة!";
    } else if (percentage >= 75) {
        message = "🌟 ممتاز! عندك معرفة قوية جدًا.";
    } else if (percentage >= 50) {
        message = "👏 نتيجة جيدة! استكشفي المعلومات مرة أخرى.";
    } else {
        message = "🚀 الرحلة لسه مستمرة! اكتشفي المزيد.";
    }

    document.getElementById("quiz-result").innerHTML = `
        <div>
            <div style="font-size:70px">${percentage >= 75 ? "🏆" : "🌟"}</div>
            <h2>انتهى الاختبار!</h2>
            <p style="margin-top:15px">حصلتِ على <strong>${score}</strong> من <strong>${quizQuestions.length}</strong></p>
            <p style="margin-top:10px">النسبة: <strong>${percentage}%</strong></p>
            <p style="margin-top:15px">${message}</p>
            <button class="main-button" onclick="startQuiz()">🔄 إعادة الاختبار</button>
        </div>
    `;
}