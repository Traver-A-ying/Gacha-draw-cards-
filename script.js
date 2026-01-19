const monsters = [
  { name: "丘丘人射手", file: "丘丘人射手.webp" },
  { name: "丘丘游侠", file: "丘丘游侠.webp" },
  { name: "丘丘王", file: "丘丘王.webp" },
  { name: "丘丘萨满", file: "丘丘萨满.webp" },
  { name: "债务处理人", file: "债务处理人.webp" },
  { name: "元能构装体", file: "元能构装体.webp" },
  { name: "兽境之狼", file: "兽境之狼.webp" },
  { name: "冬国仕女", file: "冬国仕女.webp" },
  { name: "原海异种", file: "原海异种.webp" },
  { name: "发条机关", file: "发条机关.webp" },
  { name: "史莱姆", file: "史莱姆.webp" },
  { name: "圣骸兽", file: "圣骸兽.webp" },
  { name: "大灵显化身", file: "大灵显化身.webp" },
  { name: "大驮兽", file: "大驮兽.webp" },
  { name: "奇怪的丘丘人", file: "奇怪的丘丘人.webp" },
  { name: "小型深海龙蜥", file: "小型深海龙蜥.webp" },
  { name: "小驮兽", file: "小驮兽.webp" },
  { name: "巡陆艇", file: "巡陆艇.webp" },
  { name: "愚人众先遣队", file: "愚人众先遣队.webp" },
  { name: "愚人众特辖队", file: "愚人众特辖队.webp" },
  { name: "愚人众风役人", file: "愚人众风役人.webp" },
  { name: "浊水幻灵", file: "浊水幻灵.webp" },
  { name: "深渊法师", file: "深渊法师.webp" },
  { name: "深邃拟覆叶", file: "深邃拟覆叶.webp" },
  { name: "深黯钓客", file: "深黯钓客.webp" },
  { name: "炉壳山鼬", file: "炉壳山鼬.webp" },
  { name: "熔岩游像", file: "熔岩游像.webp" },
  { name: "玄文兽", file: "玄文兽.webp" },
  { name: "盗宝团", file: "盗宝团.webp" },
  { name: "秘源机兵", file: "秘源机兵.webp" },
  { name: "荒野狂猎", file: "荒野狂猎.webp" },
  { name: "蕈兽", file: "蕈兽.webp" },
  { name: "蕴光异兽", file: "蕴光异兽.webp" },
  { name: "遗迹守卫", file: "遗迹守卫.webp" },
  { name: "遗迹机兵", file: "遗迹机兵.webp" },
  { name: "遗迹龙兽", file: "遗迹龙兽.webp" },
  { name: "野伏众", file: "野伏众.webp" },
  { name: "镀金旅团", file: "镀金旅团.webp" },
  { name: "隙境原体", file: "隙境原体.webp" },
  { name: "霜夜灵嗣", file: "霜夜灵嗣.webp" },
  { name: "飘浮灵", file: "飘浮灵.webp" },
  { name: "飞萤", file: "飞萤.webp" },
  { name: "骗骗花", file: "骗骗花.webp" },
  { name: "魔像禁卫", file: "魔像禁卫.webp" },
  { name: "黑蛇众", file: "黑蛇众.webp" },
  { name: "龙形武士", file: "龙形武士.webp" },
  { name: "龙蜥", file: "龙蜥.webp" },
];

const BLANK_RATE = 0.85;

const pickMonster = () => {
  const index = Math.floor(Math.random() * monsters.length);
  return monsters[index];
};

const drawOnce = () => {
  if (Math.random() < BLANK_RATE) {
    return { type: "blank" };
  }
  return { type: "monster", monster: pickMonster() };
};

const buildCard = (result) => {
  const card = document.createElement("div");
  card.className = `card ${result.type}`;

  if (result.type === "blank") {
    card.innerHTML = `
      <div class="card__name">空白</div>
      <p>这次什么也没抽到</p>
    `;
    return card;
  }

  const img = document.createElement("img");
  img.src = `monster/${result.monster.file}`;
  img.alt = result.monster.name;

  const name = document.createElement("div");
  name.className = "card__name";
  name.textContent = result.monster.name;

  card.appendChild(img);
  card.appendChild(name);

  return card;
};

document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cards");
  const overlay = document.getElementById("overlay");
  const stage = document.getElementById("stage");
  const stageText = document.querySelector(".stage__text");
  const summary = document.getElementById("summary");
  const buttons = document.querySelectorAll("button[data-draw]");

  const setButtonsDisabled = (disabled) => {
    buttons.forEach((button) => {
      button.disabled = disabled;
    });
  };

  const drawCards = (count) => {
    cardsContainer.innerHTML = "";
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    stage.classList.add("is-drawing");
    stageText.textContent = "抽卡中...";
    setButtonsDisabled(true);

    setTimeout(() => {
      const results = Array.from({ length: count }, drawOnce);
      results.forEach((result) => {
        cardsContainer.appendChild(buildCard(result));
      });

      const monsterCount = results.filter((result) => result.type === "monster").length;
      const blankCount = results.length - monsterCount;
      summary.textContent = `本次抽卡：${count} 抽，怪物 ${monsterCount}，空白 ${blankCount}`;

      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden", "true");
      stage.classList.remove("is-drawing");
      stageText.textContent = "点击按钮开始抽卡";
      setButtonsDisabled(false);
    }, 900);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const count = Number(button.dataset.draw);
      drawCards(count);
    });
  });
});
