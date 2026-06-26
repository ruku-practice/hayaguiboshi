const STORAGE_KEY = "slowMealApp.sessions.v1";
const SETTINGS_KEY = "slowMealApp.settings.v1";

const strategies = [
  { id: "eat_over_target_minutes", label: "20分以上かけて食べる" },
  { id: "put_down_chopsticks", label: "ひと口ごとに箸を置く" },
  { id: "save_portion_for_tomorrow", label: "明日の分を先に分ける" },
  { id: "no_second_serving", label: "おかわりしない" },
  { id: "pause_at_70_percent", label: "7割で一度止まる" },
  { id: "no_distraction", label: "ながら食べをしない" },
  { id: "drink_water_first", label: "水を飲んでから食べる" },
];

const fullnessLevels = [
  { id: "30_percent", label: "3割", line: "まだ余裕あり。急がず進もう。" },
  { id: "50_percent", label: "5割", line: "いいペース。ここからゆっくりが大事。" },
  { id: "70_percent", label: "7割", line: "一度、箸を置いて様子を見よう。" },
  { id: "enough", label: "もう十分", line: "ここで終われたら大成功。" },
  { id: "too_much", label: "食べすぎかも", line: "気づけた時点で前進。ここから整えよう。" },
];

const resultOptions = [
  { id: "just_right", label: "ちょうどよかった" },
  { id: "slightly_overate", label: "少し食べすぎた" },
  { id: "overate", label: "かなり食べすぎた" },
];

const causeOptions = [
  { id: "fast_eating", label: "早食い" },
  { id: "cooked_too_much", label: "作りすぎ" },
  { id: "served_too_much", label: "盛りすぎ" },
  { id: "alcohol", label: "お酒" },
  { id: "distracted_eating", label: "ながら食べ" },
  { id: "stress", label: "ストレス" },
  { id: "mottainai", label: "もったいなくて食べた" },
  { id: "too_hungry", label: "空腹すぎた" },
  { id: "other", label: "その他" },
];

const strategyResults = [
  { id: "success", label: "守れた" },
  { id: "partial", label: "半分守れた" },
  { id: "failed", label: "守れなかった" },
];

const reminders = [
  "いまの一口をゆっくり味わおう。",
  "一度、箸を置いてみよう。",
  "水を一口飲んで、少し間を作ろう。",
  "急がなくて大丈夫。満腹感を待とう。",
  "口の中が空になってから、次の一口へ。",
  "いまの満腹度に気づいてみよう。",
  "ここで一度、呼吸しよう。",
  "食べきる前に、十分かどうか確認しよう。",
];

const supporters = [
  {
    id: "sakuya",
    name: "咲耶",
    image: "./assets/characters/sakuya.png",
    tone: {
      home: "今日もいっしょに、ゆっくり食べよ。小さく勝てたらそれで十分だよ。",
      strategy: "今日の作戦は1つで大丈夫。咲耶といっしょに、やさしく整えよ。",
      achieved: "やったね。ゆっくり食べられてるよ、この調子。",
      fullnessPrompt: "ここで一度、からだの声を聞いてみよ。",
      review: "記録できたら十分だよ。次の一食に、ちょっとだけ活かそ。",
      records: "できた日も、崩れた日も、ぜんぶ大事なヒントだよ。",
      settings: "続けやすい形にしてね。無理しないのがいちばん。",
      emergency: "大丈夫。まずは5分だけ、咲耶と一緒に間を作ろ。",
      emergencyDone: "一回止まれたね。すごくいい選択だよ。",
      reminders: [
        "いまの一口、ゆっくり味わってみよ。",
        "一度、箸を置いてみよっか。",
        "お水を一口。少しだけ間を作ろ。",
        "急がなくて大丈夫だよ。満腹感を待ってあげよ。",
        "口の中が空になってから、次の一口にしよ。",
        "いま、どれくらいお腹が満ちてるかな。",
        "ここで一度、ふーっと呼吸しよ。",
        "食べきる前に、もう十分か見てみよ。",
      ],
    },
  },
  {
    id: "gokou",
    name: "ゴコウ",
    image: "./assets/characters/gokou.png",
    tone: {
      home: "今日も一食、落ち着いていくぞ。急がず食えたら勝ちだ。",
      strategy: "作戦は1つでいい。決めたら、あとは淡々といこうぜ。",
      achieved: "よし、いいペースだ。ゆっくり食えてるぞ。",
      fullnessPrompt: "一回止まって、腹の具合を確認しようぜ。",
      review: "記録できれば十分だ。次に勝つ材料になる。",
      records: "勝った日も崩れた日も、全部データだ。ちゃんと前に進んでる。",
      settings: "自分に合う設定にしようぜ。続く形が一番強い。",
      emergency: "まず5分止まれ。今ここで流れを変えればいい。",
      emergencyDone: "今止まれたのは強い。次もその調子だ。",
      reminders: [
        "いまの一口、ちゃんと味わっていこうぜ。",
        "一回、箸を置こう。",
        "水を一口。間を作るぞ。",
        "急ぐ必要はない。満腹感を待てばいい。",
        "口の中が空になってから、次だ。",
        "いまの満腹度、確認してみようぜ。",
        "ここで一回、呼吸だ。",
        "食べきる前に、もう十分か見よう。",
      ],
    },
  },
];

const defaultSettings = {
  targetMinutes: 20,
  reminderSeconds: 60,
  sound: true,
  vibration: true,
  supporterId: "sakuya",
};

const app = document.querySelector("#app");

let state = {
  screen: "home",
  sessions: loadSessions(),
  settings: loadSettings(),
  selectedStrategy: null,
  activeSession: null,
  elapsedSeconds: 0,
  timerId: null,
  modal: null,
  review: {
    result: null,
    causes: [],
    strategyResult: null,
    memo: "",
  },
  emergencyStartedAt: null,
};

function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveSessions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.sessions));
}

function loadSettings() {
  try {
    return { ...defaultSettings, ...(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}) };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function setScreen(screen) {
  state.screen = screen;
  render();
}

function resetTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
  }
  state.timerId = null;
}

function startMeal() {
  if (!state.selectedStrategy) return;
  const supporter = getSelectedSupporter();
  state.elapsedSeconds = 0;
  state.activeSession = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    startedAt: new Date().toISOString(),
    endedAt: null,
    durationSeconds: 0,
    targetDurationSeconds: state.settings.targetMinutes * 60,
    selectedStrategy: state.selectedStrategy,
    fullnessChecks: [],
    result: null,
    overeatingCauses: [],
    strategyResult: null,
    memo: "",
    supporterCharacterId: supporter.id,
  };
  state.screen = "timer";
  resetTimer();
  state.timerId = setInterval(tick, 1000);
  render();
}

function tick() {
  if (!state.activeSession) return;
  state.elapsedSeconds += 1;
  state.activeSession.durationSeconds = state.elapsedSeconds;

  const interval = state.settings.reminderSeconds;
  if (state.elapsedSeconds > 0 && state.elapsedSeconds % interval === 0) {
    notifySoft();
  }
  if (state.elapsedSeconds === 300 || state.elapsedSeconds === 600) {
    state.modal = "fullnessPrompt";
    notifySoft();
  }
  if (state.elapsedSeconds === state.activeSession.targetDurationSeconds) {
    notifySoft(true);
  }
  render();
}

function notifySoft(stronger = false) {
  if (state.settings.vibration && navigator.vibrate) {
    navigator.vibrate(stronger ? [80, 60, 80] : 45);
  }
  if (state.settings.sound) {
    playBeep(stronger);
  }
}

function playBeep(stronger) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.value = stronger ? 660 : 520;
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.18);
    setTimeout(() => context.close(), 260);
  } catch {
    // Sound is optional. Some mobile browsers block it until the user interacts.
  }
}

function openFullnessModal() {
  state.modal = "fullness";
  render();
}

function saveFullness(level) {
  if (!state.activeSession) return;
  state.activeSession.fullnessChecks.push({
    checkedAtSeconds: state.elapsedSeconds,
    level,
  });
  state.modal = "fullnessResult";
  state.lastFullness = fullnessLevels.find((item) => item.id === level);
  render();
}

function endMeal() {
  resetTimer();
  if (state.activeSession) {
    state.activeSession.durationSeconds = state.elapsedSeconds;
  }
  state.review = {
    result: null,
    causes: [],
    strategyResult: null,
    memo: "",
  };
  setScreen("review");
}

function saveReview() {
  if (!state.activeSession || !state.review.result || !state.review.strategyResult) return;
  const session = {
    ...state.activeSession,
    endedAt: new Date().toISOString(),
    durationSeconds: state.elapsedSeconds,
    result: state.review.result,
    overeatingCauses: state.review.causes,
    strategyResult: state.review.strategyResult,
    memo: state.review.memo.trim(),
  };
  state.sessions = [session, ...state.sessions];
  saveSessions();
  state.activeSession = null;
  state.selectedStrategy = null;
  state.elapsedSeconds = 0;
  setScreen("records");
}

function startEmergency() {
  state.emergencyStartedAt = Date.now();
  setScreen("emergency");
}

function completeEmergency() {
  state.emergencyStartedAt = null;
  setScreen("home");
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function labelOf(list, id) {
  return list.find((item) => item.id === id)?.label || id;
}

function supporterForSession(session) {
  return supporters.find((item) => item.id === session?.supporterCharacterId) || supporters[0];
}

function getCurrentSupporter() {
  return supporterForSession(state.activeSession);
}

function getSelectedSupporter() {
  return supporters.find((item) => item.id === state.settings.supporterId) || supporters[0];
}

function line(key, supporter = getSelectedSupporter()) {
  return supporter.tone[key] || "";
}

function reminderFor(supporter, elapsedSeconds) {
  const lines = supporter.tone.reminders || reminders;
  return lines[Math.floor(elapsedSeconds / state.settings.reminderSeconds) % lines.length];
}

function isSlowSuccess(session) {
  return session.durationSeconds >= session.targetDurationSeconds;
}

function getStats() {
  const sessions = state.sessions;
  const targetSuccess = sessions.filter(isSlowSuccess).length;
  const strategySuccess = sessions.filter((item) => item.strategyResult === "success").length;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = sessions.filter((item) => new Date(item.startedAt).getTime() >= sevenDaysAgo).length;
  const streak = getSlowStreak(sessions);
  const causes = {};
  sessions.forEach((session) => {
    session.overeatingCauses.forEach((cause) => {
      causes[cause] = (causes[cause] || 0) + 1;
    });
  });
  const topCauses = Object.entries(causes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => `${labelOf(causeOptions, id)} ${count}回`);

  return {
    total: sessions.length,
    targetSuccess,
    strategySuccess,
    recent,
    streak,
    topCauses,
  };
}

function getSlowStreak(sessions) {
  const days = [...new Set(
    sessions
      .filter(isSlowSuccess)
      .map((session) => new Date(session.startedAt).toLocaleDateString("ja-JP"))
  )];
  let count = 0;
  const cursor = new Date();
  for (;;) {
    const key = cursor.toLocaleDateString("ja-JP");
    if (!days.includes(key)) break;
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function render() {
  const screens = {
    home: renderHome,
    strategy: renderStrategy,
    timer: renderTimer,
    review: renderReview,
    records: renderRecords,
    settings: renderSettings,
    emergency: renderEmergency,
  };
  app.innerHTML = screens[state.screen]();
  bindEvents();
}

function renderTopbar(title = "") {
  return `
    <div class="topbar">
      <button class="icon-button" data-action="home" aria-label="ホームへ戻る">←</button>
      <strong>${title}</strong>
      <button class="icon-button" data-action="settings" aria-label="設定">⚙</button>
    </div>
  `;
}

function renderSupporter(line, supporter = getSelectedSupporter(), compact = false, mood = "idle") {
  return `
    <div class="supporter ${compact ? "compact" : ""} supporter-${supporter.id} mood-${mood}">
      <div class="avatar" aria-hidden="true">
        <img src="${supporter.image}" alt="${supporter.name}" loading="lazy" />
      </div>
      <div>
        <div class="supporter-name">${supporter.name}</div>
        <p class="supporter-line">${line}</p>
      </div>
    </div>
  `;
}

function renderHome() {
  const stats = getStats();
  return `
    <main class="screen">
      <div class="topbar">
        <span></span>
        <button class="icon-button" data-action="settings" aria-label="設定">⚙</button>
      </div>
      <section class="brand">
        <p class="eyebrow">満腹感が追いつくまで、一緒に待つ</p>
        <h1>よく噛んで<br />ゆっくりたべよう</h1>
        <p class="lead">食べる量を減らす前に、食べる速度を整えるための食事ペースメーカーです。</p>
      </section>
      ${renderSupporter(line("home"), getSelectedSupporter(), false, "cheer")}
      <section class="stats">
        <div class="stat">
          <div class="stat-value">${stats.streak}</div>
          <div class="stat-label">連続ゆっくり日数</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.targetSuccess}</div>
          <div class="stat-label">${state.settings.targetMinutes}分達成</div>
        </div>
      </section>
      <div class="actions">
        <button class="button primary" data-action="strategy">食事を始める</button>
        <button class="button warn" data-action="emergency">いま食べすぎそう</button>
        <button class="button secondary" data-action="records">記録を見る</button>
      </div>
    </main>
  `;
}

function renderStrategy() {
  return `
    <main class="screen">
      ${renderTopbar("今日の作戦")}
      ${renderSupporter(line("strategy"), getSelectedSupporter(), true, "idle")}
      <section class="brand">
        <h2>作戦を1つ選ぶ</h2>
        <p class="lead">食事中に意識することを、ひとつだけ選びます。</p>
      </section>
      <div class="option-list">
        ${strategies.map((item) => `
          <button class="option ${state.selectedStrategy === item.id ? "selected" : ""}" data-action="select-strategy" data-id="${item.id}">
            <span class="radio-dot"></span>
            <strong>${item.label}</strong>
          </button>
        `).join("")}
      </div>
      <div class="actions">
        <button class="button primary" data-action="start-meal" ${state.selectedStrategy ? "" : "disabled"}>食事タイマーを開始</button>
      </div>
    </main>
  `;
}

function renderTimer() {
  const session = state.activeSession;
  const target = session.targetDurationSeconds;
  const remaining = Math.max(0, target - state.elapsedSeconds);
  const percent = Math.min(100, (state.elapsedSeconds / target) * 100);
  const achieved = state.elapsedSeconds >= target;
  const supporter = getCurrentSupporter();
  const reminder = reminderFor(supporter, state.elapsedSeconds);
  return `
    <main class="screen">
      <div class="topbar">
        <span></span>
        <strong>食事中</strong>
        <button class="icon-button" data-action="open-fullness" aria-label="満腹度">○</button>
      </div>
      <section class="timer-panel">
        <div>
          <div class="time-main">${formatTime(state.elapsedSeconds)}</div>
          <div class="time-sub">${achieved ? "目標達成。ここからも急がずいこう。" : `目標まで あと ${formatTime(remaining)}`}</div>
        </div>
        <div class="progress" aria-label="進捗">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
        <div class="pill-row">
          <span class="pill green">${labelOf(strategies, session.selectedStrategy)}</span>
          <span class="pill gold">${state.settings.targetMinutes}分目標</span>
        </div>
      </section>
      ${renderSupporter(achieved ? line("achieved", supporter) : reminder, supporter, false, achieved ? "cheer" : "idle")}
      <div class="actions">
        <button class="button secondary" data-action="open-fullness">満腹度をチェック</button>
        <button class="button primary" data-action="end-meal">食事を終了する</button>
      </div>
      ${renderModal()}
    </main>
  `;
}

function renderModal() {
  if (!state.modal) return "";
  if (state.modal === "fullnessPrompt") {
    return `
      <div class="modal-backdrop">
        <section class="modal">
          <h2>いまの満腹度は？</h2>
          ${renderSupporter(line("fullnessPrompt", getCurrentSupporter()), getCurrentSupporter(), true, "cheer")}
          <button class="button primary" data-action="open-fullness">満腹度を選ぶ</button>
          <button class="button secondary" data-action="close-modal">あとで</button>
        </section>
      </div>
    `;
  }
  if (state.modal === "fullnessResult") {
    return `
      <div class="modal-backdrop">
        <section class="modal">
          <h2>${state.lastFullness.label}</h2>
          ${renderSupporter(state.lastFullness.line, getCurrentSupporter(), true, "cheer")}
          <button class="button primary" data-action="close-modal">食事に戻る</button>
        </section>
      </div>
    `;
  }
  return `
    <div class="modal-backdrop">
      <section class="modal">
        <h2>満腹度チェック</h2>
        <div class="option-list">
          ${fullnessLevels.map((item) => `
            <button class="option" data-action="save-fullness" data-id="${item.id}">
              <span class="radio-dot"></span>
              <strong>${item.label}</strong>
            </button>
          `).join("")}
        </div>
        <button class="button secondary" data-action="close-modal">閉じる</button>
      </section>
    </div>
  `;
}

function renderReview() {
  return `
    <main class="screen">
      <div class="topbar">
        <span></span>
        <strong>食後の記録</strong>
        <span></span>
      </div>
      ${renderSupporter(line("review", getCurrentSupporter()), getCurrentSupporter(), true, "idle")}
      <section class="panel">
        <div class="field">
          <div class="label">今日はどうだった？</div>
          <div class="option-list">
            ${resultOptions.map((item) => optionButton(item, state.review.result, "select-result")).join("")}
          </div>
        </div>
        <div class="field">
          <div class="label">食べすぎた原因があれば</div>
          <div class="option-list">
            ${causeOptions.map((item) => checkboxButton(item, state.review.causes.includes(item.id), "toggle-cause")).join("")}
          </div>
        </div>
        <div class="field">
          <div class="label">今日の作戦は守れた？</div>
          <div class="option-list">
            ${strategyResults.map((item) => optionButton(item, state.review.strategyResult, "select-strategy-result")).join("")}
          </div>
        </div>
        <div class="field">
          <label class="label" for="memo">メモ</label>
          <textarea id="memo" data-action="memo" placeholder="気づいたことを短く残せます">${state.review.memo}</textarea>
        </div>
      </section>
      <div class="actions">
        <button class="button primary" data-action="save-review" ${state.review.result && state.review.strategyResult ? "" : "disabled"}>記録を保存</button>
      </div>
    </main>
  `;
}

function optionButton(item, selected, action) {
  return `
    <button class="option ${selected === item.id ? "selected" : ""}" data-action="${action}" data-id="${item.id}">
      <span class="radio-dot"></span>
      <strong>${item.label}</strong>
    </button>
  `;
}

function checkboxButton(item, selected, action) {
  return `
    <button class="option ${selected ? "selected" : ""}" data-action="${action}" data-id="${item.id}">
      <span class="check-dot"></span>
      <strong>${item.label}</strong>
    </button>
  `;
}

function renderRecords() {
  const stats = getStats();
  return `
    <main class="screen">
      ${renderTopbar("記録")}
      ${renderSupporter(line("records"), getSelectedSupporter(), true, "idle")}
      <section class="stats">
        <div class="stat">
          <div class="stat-value">${stats.total}</div>
          <div class="stat-label">総記録数</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.streak}</div>
          <div class="stat-label">連続ゆっくり日数</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.targetSuccess}</div>
          <div class="stat-label">${state.settings.targetMinutes}分達成</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.strategySuccess}</div>
          <div class="stat-label">作戦達成</div>
        </div>
      </section>
      <section class="panel">
        <h3>よく出る原因</h3>
        <p class="lead">${stats.topCauses.length ? stats.topCauses.join(" / ") : "まだ原因の記録はありません。"}</p>
      </section>
      <section class="record-list">
        ${state.sessions.length ? state.sessions.map(renderRecord).join("") : `<div class="empty">最初の食事記録を保存すると、ここに表示されます。</div>`}
      </section>
    </main>
  `;
}

function renderRecord(session) {
  const success = isSlowSuccess(session);
  return `
    <article class="record">
      <div class="record-head">
        <span>${formatDate(session.startedAt)}</span>
        <span class="pill ${success ? "green" : ""}">${success ? "ゆっくり達成" : "記録済み"}</span>
      </div>
      <div class="record-meta">
        食事時間: ${formatTime(session.durationSeconds)} / 作戦: ${labelOf(strategies, session.selectedStrategy)}<br />
        結果: ${labelOf(resultOptions, session.result)} / 作戦: ${labelOf(strategyResults, session.strategyResult)}<br />
        原因: ${session.overeatingCauses.length ? session.overeatingCauses.map((id) => labelOf(causeOptions, id)).join("、") : "なし"}
        ${session.memo ? `<br />メモ: ${escapeHtml(session.memo)}` : ""}
      </div>
    </article>
  `;
}

function renderSettings() {
  return `
    <main class="screen">
      ${renderTopbar("設定")}
      <section class="panel">
        <div class="field">
          <label class="label" for="targetMinutes">目標食事時間</label>
          <select id="targetMinutes" data-action="setting-select" data-key="targetMinutes">
            ${[10, 15, 20, 25].map((minute) => `<option value="${minute}" ${state.settings.targetMinutes === minute ? "selected" : ""}>${minute}分</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label class="label" for="reminderSeconds">リマインド間隔</label>
          <select id="reminderSeconds" data-action="setting-select" data-key="reminderSeconds">
            ${[
              [30, "30秒"],
              [60, "1分"],
              [120, "2分"],
              [180, "3分"],
            ].map(([value, label]) => `<option value="${value}" ${state.settings.reminderSeconds === value ? "selected" : ""}>${label}</option>`).join("")}
          </select>
        </div>
        <div class="setting-row">
          <div>
            <div class="label">音</div>
            <p class="lead">リマインド時に短く鳴らします。</p>
          </div>
          <button class="switch ${state.settings.sound ? "on" : ""}" data-action="toggle-setting" data-key="sound" aria-label="音">
            <span class="switch-knob"></span>
          </button>
        </div>
        <div class="setting-row">
          <div>
            <div class="label">バイブレーション</div>
            <p class="lead">対応端末のみ動作します。</p>
          </div>
          <button class="switch ${state.settings.vibration ? "on" : ""}" data-action="toggle-setting" data-key="vibration" aria-label="バイブレーション">
            <span class="switch-knob"></span>
          </button>
        </div>
      </section>
      <section class="panel">
        <h3>応援キャラ</h3>
        <div class="option-list">
          ${supporters.map((item) => `
            <button class="option ${state.settings.supporterId === item.id ? "selected" : ""}" data-action="select-supporter" data-id="${item.id}">
              <span class="radio-dot"></span>
              <span class="setting-character">
                <img src="${item.image}" alt="${item.name}" />
                <strong>${item.name}</strong>
              </span>
            </button>
          `).join("")}
        </div>
      </section>
      ${renderSupporter(line("settings"), getSelectedSupporter(), true, "idle")}
    </main>
  `;
}

function renderEmergency() {
  return `
    <main class="screen">
      ${renderTopbar("いま食べすぎそう")}
      ${renderSupporter(line("emergency"), getSelectedSupporter(), false, "cheer")}
      <section class="panel">
        <h2>今できる小さな一手</h2>
        <div class="option-list">
          <div class="option"><span class="check-dot"></span><strong>水か炭酸水を飲む</strong></div>
          <div class="option"><span class="check-dot"></span><strong>歯を磨く</strong></div>
          <div class="option"><span class="check-dot"></span><strong>明日の分を先に分ける</strong></div>
          <div class="option"><span class="check-dot"></span><strong>5分だけ待ってから決める</strong></div>
        </div>
      </section>
      <div class="actions">
        <button class="button primary" data-action="complete-emergency">いったん整えた</button>
        <button class="button secondary" data-action="strategy">食事タイマーを使う</button>
      </div>
    </main>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  app.querySelectorAll("[data-action]").forEach((element) => {
    const action = element.dataset.action;
    if (action === "memo") {
      element.addEventListener("input", (event) => {
        state.review.memo = event.target.value;
      });
      return;
    }
    if (action === "setting-select") {
      element.addEventListener("change", (event) => {
        state.settings[element.dataset.key] = Number(event.target.value);
        saveSettings();
        render();
      });
      return;
    }
    element.addEventListener("click", () => handleAction(element));
  });
}

function handleAction(element) {
  const action = element.dataset.action;
  const id = element.dataset.id;
  if (action === "home") setScreen("home");
  if (action === "settings") setScreen("settings");
  if (action === "strategy") setScreen("strategy");
  if (action === "records") setScreen("records");
  if (action === "emergency") startEmergency();
  if (action === "complete-emergency") completeEmergency();
  if (action === "select-strategy") {
    state.selectedStrategy = id;
    render();
  }
  if (action === "start-meal") startMeal();
  if (action === "open-fullness") openFullnessModal();
  if (action === "save-fullness") saveFullness(id);
  if (action === "close-modal") {
    state.modal = null;
    render();
  }
  if (action === "end-meal") endMeal();
  if (action === "select-result") {
    state.review.result = id;
    render();
  }
  if (action === "toggle-cause") {
    if (state.review.causes.includes(id)) {
      state.review.causes = state.review.causes.filter((cause) => cause !== id);
    } else {
      state.review.causes = [...state.review.causes, id];
    }
    render();
  }
  if (action === "select-strategy-result") {
    state.review.strategyResult = id;
    render();
  }
  if (action === "save-review") saveReview();
  if (action === "toggle-setting") {
    state.settings[element.dataset.key] = !state.settings[element.dataset.key];
    saveSettings();
    render();
  }
  if (action === "select-supporter") {
    state.settings.supporterId = id;
    saveSettings();
    render();
  }
}

render();
