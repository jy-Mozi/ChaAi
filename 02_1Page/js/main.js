(function () {
  const { profile, stats, levels, skills, experience, projects, links } = SITE_DATA;
  const $ = (sel) => document.querySelector(sel);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // 프로필 기본 정보
  document.querySelectorAll("[data-bind]").forEach((node) => {
    node.textContent = profile[node.dataset.bind];
  });
  if (!profile.status) $("#status").hidden = true;
  $("#year").textContent = new Date().getFullYear();

  // 첫 화면 코드 창 (타이핑 효과)
  const allSkills = skills.flatMap((g) => g.items);
  const strArray = (items) => [
    ["", "["],
    ...items.flatMap((s, i) => (i ? [["", ", "], ["str", `"${s}"`]] : [["str", `"${s}"`]])),
    ["", "],\n"],
  ];
  const codeTokens = [
    ["kw", "const "], ["var", "developer"], ["", " = {\n"],
    ["", "  "], ["prop", "name"], ["", ": "], ["str", `"${profile.name}"`], ["", ",\n"],
    ["", "  "], ["prop", "experience"], ["", ": "], ["str", `"${stats[0].value} years"`], ["", ",\n"],
    ["", "  "], ["prop", "focus"], ["", ": "], ...strArray(levels.slice(0, 2).map((l) => l.name)),
    ["", "  "], ["prop", "stack"], ["", ": "], ...strArray(skills.slice(0, 3).map((g) => g.items[0])),
    ["", "  "], ["prop", "coffee"], ["", ": "], ["num", "Infinity"], ["", ",\n"],
    ["", "};\n\n"],
    ["fn", "developer"], ["", "."], ["fn", "build"], ["", "("], ["str", '"오래 가는 소프트웨어"'], ["", ");"],
  ];
  const code = $("#code");
  if (reduceMotion) {
    codeTokens.forEach(([cls, text]) => code.appendChild(el("span", cls, text)));
  } else {
    let ti = 0, ci = 0, span = null;
    (function type() {
      if (ti >= codeTokens.length) return;
      const [cls, text] = codeTokens[ti];
      if (ci === 0) { span = el("span", cls); code.appendChild(span); }
      const ch = text[ci++];
      span.textContent += ch;
      if (ci >= text.length) { ti++; ci = 0; }
      setTimeout(type, ch === "\n" ? 120 : 28);
    })();
  }

  // 기술 흐름 띠 (두 번 반복해 끊김 없이 흐르게)
  const marquee = $("#marquee");
  for (let i = 0; i < 2; i++) {
    allSkills.forEach((s) => {
      marquee.appendChild(el("span", "marquee-item", s));
      marquee.appendChild(el("span", "marquee-sep", "✦"));
    });
  }

  // 소개
  const avatar = $("#avatar");
  if (profile.photo) {
    const img = el("img");
    img.src = profile.photo;
    img.alt = profile.name;
    avatar.appendChild(img);
  } else {
    avatar.textContent = profile.name.charAt(0);
  }
  profile.intro.forEach((p) => $("#about-text").appendChild(el("p", null, p)));
  stats.forEach((s) => {
    const item = el("div", "stat");
    const value = el("dd", "stat-value", s.value);
    value.dataset.count = s.value;
    item.append(el("dt", "stat-label", s.label), value);
    $("#stats").appendChild(item);
  });

  // 핵심 역량 막대
  levels.forEach((l) => {
    const row = el("div", "level");
    const head = el("div", "level-head");
    head.append(el("span", null, l.name), el("span", "level-value", `${l.value}%`));
    const bar = el("div", "level-bar");
    const fill = el("div", "level-fill");
    fill.style.setProperty("--w", `${l.value}%`);
    bar.appendChild(fill);
    row.append(head, bar);
    $("#levels").appendChild(row);
  });

  // 기술 스택
  skills.forEach((g, i) => {
    const card = el("div", "skill-group card reveal");
    card.style.setProperty("--delay", `${i * 60}ms`);
    const title = el("h3", "card-title");
    title.append(el("span", "skill-index", String(i + 1).padStart(2, "0")), g.group);
    card.appendChild(title);
    const list = el("ul", "tags");
    g.items.forEach((s) => list.appendChild(el("li", "tag", s)));
    card.appendChild(list);
    $("#skills-list").appendChild(card);
  });

  // 경력
  experience.forEach((e) => {
    const li = el("li", "timeline-item reveal");
    li.appendChild(el("p", "timeline-period", e.period));
    const head = el("h3");
    head.append(e.company, el("span", "timeline-role", e.role));
    li.appendChild(head);
    const ul = el("ul", "timeline-points");
    e.points.forEach((p) => ul.appendChild(el("li", null, p)));
    li.appendChild(ul);
    $("#timeline").appendChild(li);
  });

  // 프로젝트 + 분야 필터
  const list = $("#project-list");
  const cards = projects.map((p, i) => {
    const card = el("article", "project reveal");
    card.dataset.category = p.category;
    card.style.setProperty("--delay", `${(i % 2) * 80}ms`);
    const thumb = el("div", `project-thumb thumb-${i % 4}`);
    thumb.appendChild(el("span", "project-badge", p.category));
    thumb.appendChild(el("span", "project-no", String(i + 1).padStart(2, "0")));
    const body = el("div", "project-body");
    const tags = el("ul", "tags");
    p.tech.forEach((t) => tags.appendChild(el("li", "tag", t)));
    body.append(
      el("p", "project-meta", `${p.period} · ${p.role}`),
      el("h3", "project-title", p.title),
      el("p", "project-summary", p.summary),
      el("p", "project-result", p.result),
      tags
    );
    if (p.link) {
      const a = el("a", "project-link", "자세히 보기 →");
      a.href = p.link;
      a.target = "_blank";
      a.rel = "noopener";
      body.appendChild(a);
    }
    card.append(thumb, body);
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
    list.appendChild(card);
    return card;
  });

  const categories = ["전체", ...new Set(projects.map((p) => p.category))];
  categories.forEach((c, i) => {
    const btn = el("button", "filter", c);
    btn.type = "button";
    btn.setAttribute("aria-pressed", i === 0);
    btn.addEventListener("click", () => {
      $("#filters").querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", b === btn));
      cards.forEach((card) => {
        card.hidden = c !== "전체" && card.dataset.category !== c;
      });
    });
    $("#filters").appendChild(btn);
  });

  // 연락처: 전화번호는 tel: 링크로 바로 걸 수 있게 한다.
  if (profile.phone) {
    const tel = `tel:${profile.phone.replace(/[^\d+]/g, "")}`;
    document.querySelectorAll(".js-tel").forEach((a) => {
      a.href = tel;
      a.setAttribute("aria-label", `${profile.phone}로 전화 걸기`);
    });
    $("#phone-text").textContent = profile.phone;
  } else {
    $("#phone-link").hidden = true;
  }
  const emailLink = $("#email-link");
  emailLink.href = `mailto:${profile.email}`;
  emailLink.textContent = profile.email;
  links.forEach((l) => {
    const li = el("li");
    const a = el("a", null, l.label);
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    li.appendChild(a);
    $("#links").appendChild(li);
  });

  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  }
  $("#copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast("이메일 주소를 복사했습니다.");
    } catch (e) {
      showToast("복사하지 못했습니다. 직접 선택해 주세요.");
    }
  });

  // 모바일 메뉴
  const nav = $("#nav");
  const menuBtn = $("#menu-toggle");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") setMenu(false);
  });

  // 다크 모드 스위치
  const root = document.documentElement;
  const themeBtn = $("#theme-toggle");
  themeBtn.setAttribute("aria-pressed", root.dataset.theme === "dark");
  themeBtn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    themeBtn.setAttribute("aria-pressed", next === "dark");
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // 숫자 올라가는 효과: "20+" → 0부터 20까지 센 뒤 접미사 표시
  function countUp(node) {
    const m = node.dataset.count.match(/^(\d+)(.*)$/);
    if (!m || reduceMotion) return;
    const target = Number(m[1]);
    const start = performance.now();
    (function step(now) {
      const t = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = Math.round(target * eased) + m[2];
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  // 화면에 들어오면 나타나기 + 숫자/막대 애니메이션
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      entry.target.querySelectorAll("[data-count]").forEach(countUp);
      revealer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((n) => revealer.observe(n));

  // 스크롤 진행 막대, 맨 위로 버튼
  const progress = $("#progress");
  const toTop = $("#to-top");
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    toTop.classList.toggle("show", scrollY > innerHeight * 0.8);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  // 스크롤 위치에 따라 현재 메뉴 강조
  const navLinks = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
})();
