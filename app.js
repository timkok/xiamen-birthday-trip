// --- 奶奶70岁生日家庭行程 WebApp 逻辑控制 ---

// --- 状态控制 ---
let seniorsModeActive = false;
let todayModeActive = false;
let menuFilterCheckedOnly = false;
let checklistFilterUnfinishedOnly = false;

// 当前美食菜单处于激活状态的餐厅 (anxi, waldorf, lohkah)
let activeMenuTab = 'anxi';

// --- 全程日程数据 (已确定 7/29-8/2 行程，8/2 晚提供续住备选方案) ---
const itineraryData = [
  {
    dayNum: 1,
    dayName: "7月29日 (周三)",
    theme: "安溪茶山",
    title: "广州东 ➔ 厦门北 ➔ 安溪悦泉",
    hotel: "安溪悦泉行馆 (大山温泉别墅)",
    intensity: "🟢 低强度 (坐车与温泉洗尘)",
    transport: "🚄 高铁 (广州东站) + 🚙 租车自驾",
    latestTime: "12:00 抵达厦门北站取车",
    steps: [
      { icon: "🚄", label: "上午高铁出发" },
      { icon: "🚙", label: "12:00 北站取车" },
      { icon: "♨️", label: "下午茶山温泉" },
      { icon: "🍲", label: "晚上悦泉晚餐" }
    ],
    times: [
      { time: "上午", label: "全家6人从广州东站乘高铁前往厦门北站" },
      { time: "12:00", label: "抵达厦门北站，爸爸负责办理取车及安全配置" },
      { time: "中午", label: "车站附近简单洗尘午餐，随后驾车前往安溪 (约1.5小时)" },
      { time: "下午", label: "入住悦泉温泉行馆，全家在别墅内小憩、泡茶、享私人温泉" }
    ],
    fallback: "若高铁遭遇晚点，则取消茶园闲逛，抵达酒店后直接泡汤温泉洗尘。"
  },
  {
    dayNum: 2,
    dayName: "7月30日 (周四)",
    theme: "鼓浪屿",
    title: "安溪 ➔ 华尔道夫寄存 ➔ 鼓浪屿晃岩36",
    hotel: "鼓浪屿晃岩 36 号别墅 (近日光岩老洋房)",
    intensity: "🟡 中等强度 (步行石板路多)",
    transport: "🚙 驾车自驾 + ⛴️ 轮渡上岛 (东渡码头)",
    latestTime: "14:30 必须抵达东渡邮轮中心登船",
    steps: [
      { icon: "🚙", label: "上午驾车回厦" },
      { icon: "🧳", label: "华府寄存大行李" },
      { icon: "⛴️", label: "14:30 轮渡上岛" },
      { icon: "🏡", label: "入住晃岩36别墅" }
    ],
    times: [
      { time: "09:30", label: "安溪悦泉行馆退房，全家驾车返回厦门市区" },
      { time: "11:00", label: "抵达厦门华尔道夫酒店，寄放全家大件行李箱，只带随身过夜包" },
      { time: "12:00", label: "市区闽南本地简单午餐，随后前往东渡邮轮中心" },
      { time: "14:30", label: "乘专船轮渡前往鼓浪屿三丘田码头，入住晃岩36别墅，享受静谧时光" }
    ],
    fallback: "若遇到台风或轮渡因风浪停航，则无条件取消上岛，全家直接提前入住华尔道夫酒店休养。"
  },
  {
    dayNum: 3,
    dayName: "7月31日 (周五)",
    theme: "华府",
    title: "下岛 ➔ 华府鲜承午宴 ➔ 中山路夜游",
    hotel: "厦门华尔道夫酒店 (Waldorf Astoria)",
    intensity: "🟡 中等强度 (上午登岛漫步，下午换酒店)",
    transport: "⛴️ 轮渡下岛 + 🚶 步行夜游",
    latestTime: "13:30 准时出席鲜承精致午宴",
    steps: [
      { icon: "🌅", label: "晨起享受琴岛静谧" },
      { icon: "⛴️", label: "上午下岛回市区" },
      { icon: "🥩", label: "13:30 华府鲜承午宴" },
      { icon: "🌃", label: "傍晚中山路廊柱骑楼" }
    ],
    times: [
      { time: "上午", label: "睡到自然醒，在别墅阳光庭院漫步，随后退房，乘轮渡返回市区" },
      { time: "13:30", label: "抵达华尔道夫，享用鲜承中餐厅精致午宴 (主打闽粤菜)" },
      { time: "下午", label: "华尔道夫大堂办理入住，在大浴缸中洗去岛上疲惫，舒适午休" },
      { time: "18:00", label: "傍晚凉爽时段前往中山路步行街，观赏百年南洋骑楼，品尝花生汤" }
    ],
    fallback: "若天气过于炎热或老人疲惫，取消傍晚中山路步行，直接改为在酒店内享用下午茶或在套房内休息。"
  },
  {
    dayNum: 4,
    dayName: "8月1日 (周六)",
    theme: "庆生",
    title: "换店七尚 ➔ 五缘湾游艇 ➔ 厦餐厅生日晚宴",
    hotel: "厦门七尚酒店 (Lohkah Hotel & Spa)",
    intensity: "🟢 低强度 (专车转场与生日晚宴)",
    transport: "🚙 专车/打车",
    latestTime: "19:00 奶奶70岁生日晚宴开席",
    steps: [
      { icon: "🧳", label: "上午华府悠闲退房" },
      { icon: "🏨", label: "中午换店入住七尚" },
      { icon: "⛵", label: "下午五缘湾帆船游艇" },
      { icon: "🎂", label: "19:00 奶奶生日家宴" }
    ],
    times: [
      { time: "11:00", label: "华尔道夫退房，驾车/打车搬店前往五缘湾七尚酒店" },
      { time: "12:00", label: "七尚酒店办理入住，在大堂水院散步，享用本地风味简餐" },
      { time: "15:00", label: "五缘湾港区帆船游艇出海体验 (视天气风浪及老人体能选择)" },
      { time: "19:00", label: "在七尚厦餐厅包房，准时开启奶奶 70 岁大寿生日家宴，合影留念" }
    ],
    fallback: "若海上风浪较大，帆船活动立即取消，改为在七尚海湾大堂吧静听水声，享受下午茶。"
  },
  {
    dayNum: 5,
    dayName: "8月2日 (周日)",
    theme: "决策",
    title: "最后一晚住宿决策日 (待确定)",
    hotel: "视下方决策方案而定",
    intensity: "🟢 低强度 (全天静养度假)",
    transport: "🚙 视决策而定",
    latestTime: "8月2日中午前最终决定是否返程",
    steps: [
      { icon: "❓", label: "上午全家商议" },
      { icon: "🅰️", label: "方案A: 退房返穗" },
      { icon: "🅱️", label: "方案B: 续住七尚" },
      { icon: "🌅", label: "8月3日从容回家" }
    ],
    times: [
      { time: "方案 A", label: "[退房后返穗] 8月2日中午退房，驱车前往厦门北站还车，乘高铁返回广州" },
      { time: "方案 B", label: "[续住七尚] 不动行李，在五缘湾继续漫步、游泳，8月3日再返穗" }
    ],
    fallback: "全家商议后决定，不默认已预订任何续住选项，以父母松弛为最高原则。"
  },
  {
    dayNum: 6,
    dayName: "8月3日 (周一)",
    theme: "返程",
    title: "若续住：返程日 ➔ 广州东站",
    hotel: "温馨的家",
    intensity: "🟢 低强度 (从容高铁返穗)",
    transport: "🚙 驾车还车 + 🚄 返回广州",
    latestTime: "按返程高铁车次时间前往车站",
    steps: [
      { icon: "🌅", label: "上午海湾睡到自然醒" },
      { icon: "🚙", label: "中午北站还车" },
      { icon: "🚄", label: "下午高铁返穗" },
      { icon: "🏠", label: "顺利安全到家" }
    ],
    times: [
      { time: "09:00", label: "若选择续住，在七尚享用早餐，全家在大堂拍摄全家福" },
      { time: "11:30", label: "办理退房，开车前往厦门北站，检查并归还租赁车辆" },
      { time: "下午", label: "厦门北站乘高铁舒适返回广州东站，行程圆满结束" }
    ],
    fallback: "若遇高铁晚点，可在厦门北站候车室舒适休息，注意为老人补水。"
  }
];

// --- 旅途画卷照片墙数据 ---
const galleryData = [
  { src: "anxi_resort.webp", date: "7月29日", location: "安溪悦泉行馆", desc: "山林郁郁，温泉白雾升腾，奶奶出行第一天清幽避暑之景。" },
  { src: "gulangyu_island.webp", date: "7月30日", location: "鼓浪屿琴岛", desc: "日光岩下，红瓦老洋房与海滨绿树，午后安宁的海岛时光。" },
  { src: "huangyan_36.webp", date: "7月30日", location: "晃岩36号客栈", desc: "具有百年历史的西式石雕老别墅，私享繁花掩映的静谧庭院。" },
  { src: "lujiang_night.webp", date: "7月31日", location: "安溪茶山温泉", desc: "暖黄色汤池在竹林中若隐若现，给长辈洗去一路舟车劳顿。" },
  { src: "zhongshan_road.webp", date: "7月31日", location: "中山路步行街", desc: "连绵的闽南骑楼廊柱投下历史光影，长辈品尝花生汤的温馨角落。" },
  { src: "lohkah_resort.webp", date: "8月1日", location: "五缘湾畔七尚", desc: "私密且高雅的水畔建筑，海天一色，为奶奶庆生提供的绝佳大堂机位。" },
  { src: "waldorf_dining.webp", date: "8月1日", location: "七尚·生日晚宴", desc: "铺满好事发生花瓣的精致餐桌，黑金片皮鸭与全家福合影的欢乐寿宴。" },
  { src: "xiamen_travel_banner.webp", date: "8月3日", location: "厦门北站高铁", desc: "干净明亮的候车大厅，全家收拾行李乘车返穗，旅程圆满落幕。" }
];

// --- 美食菜单数据 (Curated menu data based on user raw file) ---
// anxi, waldorf, lohkah
const menuData = {
  anxi: [
    { name: "茶香温泉土鸡蛋", price: 38, desc: "精致头盘。悦泉温泉水慢煮，口感极其软嫩，孩子老人极佳。", checked: true, rec: true, tags: ["老人友好", "孩子友好", "当地特色"] },
    { name: "古法手剥傍林笋", price: 38, desc: "精致头盘。当地特色脆爽笋，膳食纤维丰富，清爽解腻。", checked: true, rec: true, tags: ["当地特色"] },
    { name: "铁观音茶香虾", price: 128, desc: "茶乡特色。将安溪铁观音茶香焗入鲜虾，虾壳酥脆，必点特色菜。", checked: true, rec: true, tags: ["当地特色", "推荐"] },
    { name: "山茶油小黄姜煎土鸡", price: 158, desc: "禅悦主推。土黄姜片煎本鸡，茶油温补不上火，驱风散寒。", checked: true, rec: true, tags: ["老人友好", "当地特色"] },
    { name: "本地光鱼两吃", price: 228, desc: "禅悦主推。溪水光鱼，肉质极细。注意：刺多，老人小孩需慢咽。", checked: true, rec: true, tags: ["当地特色", "有鱼刺"] },
    { name: "土猪肉焖安溪麻笋煲", price: 88, desc: "茶乡特色。浓汤小火焖制，笋吸满肉汁，十分下饭。", checked: false, rec: false, tags: ["当地特色"] },
    { name: "原香小笋芥菜煲", price: 88, desc: "幸福味道。清热去火的热汤菜，滑嫩养胃。", checked: true, rec: true, tags: ["老人友好"] },
    { name: "幸福炒饭", price: 58, desc: "五谷丰登。配有虾仁、叉烧粒，米粒分明，分量足。", checked: true, rec: true, tags: ["孩子友好"] },
    { name: "湖头咸笋包 (6个)", price: 48, desc: "安溪申遗特色点心，外糯里咸，一人尝鲜一个。", checked: true, rec: true, tags: ["当地特色", "孩子友好"] }
  ],
  waldorf: [
    { name: "荞葱煎炒客家牛三宝", price: 298, desc: "主厨特别推荐。牛肚牛筋软烂入味，荞葱提鲜，爽脆适中。", checked: true, rec: true, tags: ["少辣"] },
    { name: "客家盐酒煮河田鸡", price: 188, desc: "肉禽类。精选长汀河田鸡，淡淡黄酒香，皮黄肉嫩，容易咬碎。", checked: true, rec: true, tags: ["老人友好", "当地特色"] },
    { name: "白切东山深海手钓大红管", price: 298, desc: "精致头盘。白灼深海大红管，滑爽弹牙，附芥末籽酱。", checked: true, rec: true, tags: ["当地特色", "孩子友好"] },
    { name: "鲜承姜母鸭", price: 158, desc: "肉禽类。生姜片慢煨香气四溢，传统沙鸭，火候极足易咬。", checked: true, rec: true, tags: ["当地特色", "推荐"] },
    { name: "鲜承海鲜泡饭", price: 138, desc: "主食。浓稠海鲜高汤泡饭，口感香滑软糯，小孩最爱。", checked: true, rec: true, tags: ["孩子友好", "老人友好"] },
    { name: "泉州卤面", price: 98, desc: "主食。配料丰富，汤头浓厚黏稠，面条吸汁易消化。", checked: true, rec: true, tags: ["老人友好", "孩子友好"] },
    { name: "时令田园蔬菜", price: 58, desc: "蔬食。当季清汤鲜蔬，富含维生素，均衡膳食。", checked: true, rec: true, tags: ["老人友好", "孩子友好"] },
    { name: "鹭岛香芋花生汤", price: 38, desc: "甜品。华府甜品师特制冰爽花生乳，解暑佳品。", checked: false, rec: false, tags: ["孩子友好"] }
  ],
  lohkah: [
    { name: "贵妃蚌土笋冻", price: 87, desc: "精致冷盘。厦门非遗小吃，口感像清凉海鲜果冻，老人浅尝。", checked: true, rec: true, tags: ["当地特色"] },
    { name: "红葱酥南日鲜鲍 (4只)", price: 228, desc: "精致冷盘。鲍鱼片开，葱油慢焗，肉质非常脆嫩易咬。", checked: true, rec: true, tags: ["老人友好"] },
    { name: "白切海钓东山大管", price: 247, desc: "精致冷盘。东山海域大管，口感鲜脆香甜，蘸点轻酱油。", checked: true, rec: true, tags: ["当地特色", "孩子友好"] },
    { name: "沙虫双脆鳕鱼盏", price: 87, desc: "主食/汤品/甜点。滋补热羹，沙虫极其鲜美，适合调理脾胃。", checked: true, rec: true, tags: ["老人友好", "当地特色"] },
    { name: "永安黄椒烧角蟹佐年糕", price: 427, desc: "特色小炒。招牌主蟹，黄椒微辣吊鲜。注意：有壳碎屑。", checked: true, rec: true, tags: ["🌶️ 辣", "FHR额度限制"] },
    { name: "陈年老萝卜焗竹午鱼", price: 257, desc: "特色小炒。竹午鱼油脂丰厚，老萝卜干提鲜，几乎无小刺。", checked: true, rec: true, tags: ["老人友好", "当地特色", "推荐"] },
    { name: "嫩姜芽炒蛏子皇", price: 257, desc: "特色小炒。去壳蛏子皇，鲜嫩爆汁，微辛姜片驱寒。", checked: true, rec: true, tags: ["当地特色"] },
    { name: "韭香浸长汀河田鸡", price: 127, desc: "精致冷盘。高汤浸鸡，鸡皮滑爽鸡肉极嫩，富含蛋白质。", checked: true, rec: true, tags: ["老人友好", "孩子友好"] },
    { name: "黑金果木片皮鸭", price: 397, desc: "招牌烧腊。庆生大主菜。配鱼子酱，分量足。", checked: true, rec: true, tags: ["孩子友好", "FHR额度限制"] },
    { name: "芋泥香酥鸭", price: 77, desc: "精致冷盘。外酥内糯，香甜适口。", checked: true, rec: true, tags: ["孩子友好"] },
    { name: "自制腊肉蒸时令鲜笋", price: 127, desc: "精选肉类。竹笋配微咸腊肉，清香可口。", checked: false, rec: false, tags: ["当地特色"] },
    { name: "头水紫菜煲沙地萝卜", price: 117, desc: "主食/汤品。红菇汤炖豆腐，汤汁极鲜拌饭一流。", checked: true, rec: true, tags: ["老人友好"] },
    { name: "橄榄菜焗扁豆", price: 57, desc: "精致冷盘。清爽解腻蔬菜，不可缺少。", checked: true, rec: true, tags: ["孩子友好"] },
    { name: "猎爪菇烧芋仔佐火腿", price: 157, desc: "热荤。芋头焖得极粉极糯，入口即化，非常适合老人。", checked: true, rec: true, tags: ["老人友好"] },
    { name: "梅干菜猪油粕捞饭", price: 197, desc: "主食。大铁锅焖饭，猪油和梅干菜香气扑鼻，可多人分食。", checked: true, rec: true, tags: ["当地特色"] },
    { name: "陈皮莲子红豆沙", price: 47, desc: "甜品。花生软烂化沙，香甜解暑。", checked: true, rec: true, tags: ["当地特色", "孩子友好"] }
  ]
};

// --- 行前准备清单数据 ---
const checklistData = {
  traffic: [
    { text: "全家6人往返高铁车票及座位确认", checked: false, owner: "爸爸" },
    { text: "厦门北站租车行 7 座商务 MPV 预订确认", checked: false, owner: "爸爸" },
    { text: "7/30 14:30 往返鼓浪屿六人船票核对", checked: false, owner: "妈妈" },
    { text: "高德地图导航链接发送家人群", checked: false, owner: "爸爸" }
  ],
  hotel: [
    { text: "安溪悦泉两房连通/相邻备注及儿童增高垫备注", checked: false, owner: "酒店确认" },
    { text: "鼓浪屿晃岩 36 管家行李接送及次日离店对接", checked: false, owner: "酒店确认" },
    { text: "华尔道夫鲜承午餐关联两间房 FHR 抵扣拆分确认", checked: false, owner: "酒店确认" },
    { text: "七尚酒店8月1日大床/双床相邻预订及 Chase 酒店券挂接", checked: false, owner: "酒店确认" }
  ],
  birthday: [
    { text: "七尚包房免费生日长寿面及简单装饰对接", checked: false, owner: "酒店确认" },
    { text: "“好事发生”生日桌面立牌准备", checked: false, owner: "妈妈" },
    { text: "奶奶70岁生日寿卡手写与小物件清点", checked: false, owner: "妈妈" },
    { text: "单反相机/备用电池及拍照手机内存提前清理", checked: false, owner: "爸爸" }
  ],
  overnight: [
    { text: "长辈及儿童实名身份证件原件 (上船必带，放随身包)", checked: false, owner: "出发当天检查" },
    { text: "过夜包精简衣物 (1晚量，不带大行李箱上岛)", checked: false, owner: "妈妈" },
    { text: "海岛户外防蚊贴、防蚊手环 (儿童专用)", checked: false, owner: "妈妈" },
    { text: "充电线、充电宝、相机备用电池放入随身包", checked: false, owner: "出发当天检查" }
  ],
  health: [
    { text: "长辈高血压/心血管常备药及急救药 (必须7天量随身带)", checked: false, owner: "出发当天检查" },
    { text: "长辈健步防滑老布鞋/软底鞋清点", checked: false, owner: "妈妈" },
    { text: "物理防晒霜、轻便防晒帽、防紫外线晴雨伞", checked: false, owner: "出发当天检查" },
    { text: "随身温水杯 (符合长辈喝温水习惯)", checked: false, owner: "出发当天检查" }
  ]
};

// --- 沟通文案模板 ---
const contactTemplates = [
  {
    icon: "🏡",
    title: "鼓浪屿晃岩 36",
    text: "您好，我们预订了7月30日入住晃岩36号，一行6人，包含两位老人和两个小孩。请问能否协助安排三丘田码头到酒店的行李接送？下午希望安排约2小时的轻松人文讲解，以老别墅和外围平路为主，不登日光岩顶。谢谢！"
  },
  {
    icon: "🏨",
    title: "厦门华尔道夫",
    text: "您好，我们预订了7月31日入住的两间房，此行是为长辈庆祝70岁生日。烦请关联两间订单，并尽量安排连通房或相邻房。我们已预约当日13:30鲜承午餐，结账时需要协助拆分挂账。感谢！"
  },
  {
    icon: "🎂",
    title: "七尚生日晚宴",
    text: "您好，我们已预约8月1日19:00厦餐厅生日晚宴，共6位，为长辈庆祝70岁生日。烦请安排相对安静的位置，并确认长寿面和“好事发生”立牌。结账时请协助将合规消费分别挂到两间客房。谢谢！"
  }
];

// --- 初始化入口 ---
document.addEventListener("DOMContentLoaded", () => {
  loadLocalState();
  updateCountdown();
  renderAll();
});

// --- 渲染总指挥 ---
function renderAll() {
  renderDayNav();
  renderItinerary();
  renderVisualGallery();
  renderMenus();
  renderChecklists();
  renderContactTemplates();
}

// --- 1. 老人模式切换 ---
function toggleSeniorsMode() {
  seniorsModeActive = !seniorsModeActive;
  const body = document.body;
  const btn = document.getElementById("btn-seniors-mode");
  const toolsEl = document.getElementById("section-leader-tools");
  
  if (seniorsModeActive) {
    body.classList.add("seniors-mode");
    if (btn) btn.innerHTML = "👴 恢复默认";
    if (toolsEl) toolsEl.style.display = "none"; // 隐藏带队人工具
  } else {
    body.classList.remove("seniors-mode");
    if (btn) btn.innerHTML = "👵 老人模式";
    if (toolsEl) toolsEl.style.display = "block"; // 显示带队人工具
  }
  
  saveLocalState();
  renderItinerary(); // 重新渲染卡片，滤除非必要信息
  renderMenus();
  renderChecklists();
  showToast(seniorsModeActive ? "老人大字阅读模式已开启" : "已恢复默认阅读模式");
}

// --- 2. 今天模式切换 ---
function toggleTodayMode() {
  todayModeActive = !todayModeActive;
  const banner = document.getElementById("today-mode-banner");
  const btn = document.getElementById("btn-today-mode");
  
  if (todayModeActive) {
    const todayIndex = getTodayItineraryIndex();
    if (todayIndex === -1) {
      todayModeActive = false;
      showToast("当前日期不在旅行期间内，显示完整行程。");
      return;
    }
    if (banner) banner.style.display = "flex";
    if (btn) btn.innerHTML = "📅 完整日程";
  } else {
    if (banner) banner.style.display = "none";
    if (btn) btn.innerHTML = "📅 只看今天";
  }
  
  renderDayNav();
  renderItinerary();
}

// 获取今日对应的行程索引
function getTodayItineraryIndex() {
  const today = new Date();
  const month = today.getMonth() + 1; // 1-12
  const date = today.getDate();
  
  if (month === 7) {
    if (date === 29) return 0;
    if (date === 30) return 1;
    if (date === 31) return 2;
  } else if (month === 8) {
    if (date === 1) return 3;
    if (date === 2) return 4;
    if (date === 3) return 5;
  }
  return -1; // 不在区间
}

// --- 3. 倒计时计算 ---
function updateCountdown() {
  const targetDate = new Date("2026-07-29T00:00:00+08:00");
  const currentDate = new Date();
  
  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const currentMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
  const timeDiff = targetMidnight.getTime() - currentMidnight.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  const countdownEl = document.getElementById("countdown-days-val");
  if (countdownEl) {
    if (daysDiff > 0) {
      countdownEl.innerHTML = `${daysDiff} <small style="font-size: 14px; font-weight: 600;">天</small>`;
    } else if (daysDiff === 0) {
      countdownEl.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: #e74c3c;">🎉 今天启程！</span>`;
    } else if (daysDiff >= -5) {
      countdownEl.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: #e74c3c;">🎂 旅程中！</span>`;
    } else {
      countdownEl.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: #7f8c8d;">旅程已圆满</span>`;
    }
  }
}

// --- 4. 渲染导航天数标签 ---
function renderDayNav() {
  const navContainer = document.getElementById("day-nav-list");
  if (!navContainer) return;
  
  let days = itineraryData;
  if (todayModeActive) {
    const idx = getTodayItineraryIndex();
    if (idx !== -1) {
      days = [itineraryData[idx]];
    }
  }
  
  navContainer.innerHTML = days.map((day, idx) => `
    <button class="day-nav-btn ${idx === 0 ? 'active' : ''}" id="nav-btn-day-${day.dayNum}" onclick="scrollToDay(${day.dayNum})">
      <span class="d-num">D${day.dayNum} · ${day.theme}</span>
      <span class="d-name">${day.dayName.split(' ')[0]}</span>
    </button>
  `).join('');
}

// --- 5. 渲染日程卡片 ---
function renderItinerary() {
  const listContainer = document.getElementById("itinerary-list");
  if (!listContainer) return;
  
  let days = itineraryData;
  if (todayModeActive) {
    const idx = getTodayItineraryIndex();
    if (idx !== -1) {
      days = [itineraryData[idx]];
    }
  }
  
  listContainer.innerHTML = days.map(day => {
    // 过滤老人模式展现
    const stepsHtml = day.steps.map(s => `
      <div class="step-badge">
        <span class="step-icon">${s.icon}</span>
        <span class="step-label">${s.label}</span>
      </div>
    `).join('<span class="step-arrow">➔</span>');
    
    const timesHtml = day.times.map(t => `
      <div class="time-item">
        <span class="time-label">${t.time}</span>
        <span class="time-text">${t.label}</span>
      </div>
    `).join('');
    
    // Day 5 (8月2日) 特殊备选逻辑展现
    let decisionHtml = "";
    if (day.dayNum === 5 && !seniorsModeActive) {
      decisionHtml = `
        <div class="lodging-decision-box">
          <h5>⚠️ 8月2日晚续住方案决策</h5>
          <div class="decision-options-row">
            <div class="dec-opt-card">
              <h6>方案 A (不续住)</h6>
              <p>中午退房后驱车去北站，还车乘坐高铁返回广州。</p>
            </div>
            <div class="dec-opt-card">
              <h6>方案 B (续住一晚)</h6>
              <p>继续留宿七尚酒店，8月3日中午再退房从容返穗。</p>
            </div>
          </div>
        </div>
      `;
    }

    if (seniorsModeActive) {
      // 老人模式下的简化行程面板
      return `
        <article class="itinerary-card" id="day-card-${day.dayNum}">
          <div class="card-header">
            <div class="day-badge-large">D${day.dayNum}</div>
            <div>
              <h3>${day.dayName} · ${day.theme}</h3>
              <p class="hotel-title">🏨 住宿：${day.hotel.split(' (')[0]}</p>
            </div>
          </div>
          
          <div class="easy-route-row">
            ${stepsHtml}
          </div>
          
          <div class="key-times-box">
            ${timesHtml}
          </div>
        </article>
      `;
    }

    // 完整丰富版本
    return `
      <article class="itinerary-card" id="day-card-${day.dayNum}">
        <div class="card-header">
          <div class="day-badge-large">D${day.dayNum}</div>
          <div>
            <h3>${day.dayName} · ${day.theme}</h3>
            <p class="hotel-title">🏨 住宿：${day.hotel}</p>
          </div>
        </div>
        
        <div class="meta-metrics-grid">
          <div class="metric-item"><strong>🚴 体力：</strong>${day.intensity}</div>
          <div class="metric-item"><strong>🚗 交通：</strong>${day.transport}</div>
          <div class="metric-item"><strong>⏰ 关键点：</strong>${day.latestTime}</div>
        </div>

        <div class="easy-route-row">
          ${stepsHtml}
        </div>
        
        ${decisionHtml}

        <details class="timeline-details" open>
          <summary class="timeline-summary">📖 展开/折叠详细时间表</summary>
          <div class="key-times-box">
            ${timesHtml}
          </div>
          <div class="fallback-box">
            <strong>⛈️ 天气/体力预案：</strong>${day.fallback}
          </div>
        </details>
      </article>
    `;
  }).join('');
}

// 滚动定位
function scrollToDay(dayNum) {
  const el = document.getElementById(`day-card-${dayNum}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 更新导航激活态
    document.querySelectorAll(".day-nav-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`nav-btn-day-${dayNum}`);
    if (activeBtn) activeBtn.classList.add("active");
  }
}

// --- 6. 渲染画卷照片墙 ---
function renderVisualGallery() {
  const galleryContainer = document.getElementById("mosaic-gallery-container");
  if (!galleryContainer) return;
  
  galleryContainer.innerHTML = galleryData.map((img, idx) => `
    <div class="mosaic-item" onclick="openLightbox(${idx})">
      <img src="${img.src}" alt="${img.location}" loading="lazy">
      <div class="mosaic-overlay">
        <span class="m-date">${img.date} · ${img.location}</span>
      </div>
    </div>
  `).join('');
}

// --- 7. 灯箱大图交互 ---
let currentLightboxIdx = 0;

function openLightbox(idx) {
  currentLightboxIdx = idx;
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  
  if (modal && img && caption) {
    img.src = galleryData[idx].src;
    caption.innerHTML = `
      <strong>${galleryData[idx].date} · ${galleryData[idx].location}</strong>
      <p>${galleryData[idx].desc}</p>
    `;
    modal.classList.add("active");
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) modal.classList.remove("active");
}

function nextLightboxImage(e) {
  e.stopPropagation();
  currentLightboxIdx = (currentLightboxIdx + 1) % galleryData.length;
  openLightbox(currentLightboxIdx);
}

function prevLightboxImage(e) {
  e.stopPropagation();
  currentLightboxIdx = (currentLightboxIdx - 1 + galleryData.length) % galleryData.length;
  openLightbox(currentLightboxIdx);
}

// --- 8. 菜单预算逻辑 ---
function switchMenuTab(tab) {
  activeMenuTab = tab;
  document.querySelectorAll(".menu-tab-btn").forEach(btn => btn.classList.remove("active"));
  
  // 查找对应的激活按钮
  const tabs = ['anxi', 'waldorf', 'lohkah'];
  const activeIdx = tabs.indexOf(tab);
  const btns = document.querySelectorAll(".menu-tab-btn");
  if (btns[activeIdx]) btns[activeIdx].classList.add("active");
  
  renderMenus();
}

function toggleMenuFilter() {
  menuFilterCheckedOnly = !menuFilterCheckedOnly;
  const btn = document.getElementById("btn-filter-menu");
  if (btn) {
    btn.innerHTML = menuFilterCheckedOnly ? "📋 显示全部菜品" : "🔍 仅看已选菜品";
  }
  renderMenus();
}

function renderMenus() {
  const container = document.getElementById("menu-panels-container");
  if (!container) return;
  
  let dishes = menuData[activeMenuTab];
  if (menuFilterCheckedOnly) {
    dishes = dishes.filter(d => d.checked);
  }
  
  if (dishes.length === 0) {
    container.innerHTML = `<div class="empty-placeholder">⚠️ 暂无已选菜品，请在完整菜单中进行勾选。</div>`;
    updateMenuCosts();
    return;
  }
  
  container.innerHTML = dishes.map((d, idx) => {
    const tagsHtml = d.tags.map(t => `<span class="dish-tag ${t === 'FHR额度限制' ? 'danger' : ''}">${t}</span>`).join('');
    return `
      <div class="dish-card ${d.checked ? 'selected' : ''}">
        <label class="dish-label">
          <input type="checkbox" ${d.checked ? 'checked' : ''} onchange="toggleDish(${idx}, this.checked)">
          <div class="dish-info">
            <span class="dish-title">${d.name} <strong class="dish-price">¥${d.price}</strong></span>
            <p class="dish-desc">${d.desc}</p>
            <div class="dish-tags-row">${tagsHtml}</div>
          </div>
        </label>
      </div>
    `;
  }).join('');
  
  updateMenuCosts();
}

function toggleDish(idx, isChecked) {
  let dishes = menuData[activeMenuTab];
  if (menuFilterCheckedOnly) {
    const checkedDishes = dishes.filter(d => d.checked);
    const targetDish = checkedDishes[idx];
    if (targetDish) {
      targetDish.checked = isChecked;
    }
  } else {
    if (dishes[idx]) {
      dishes[idx].checked = isChecked;
    }
  }
  saveLocalState();
  renderMenus();
}

function updateMenuCosts() {
  const dishes = menuData[activeMenuTab];
  const checkedDishes = dishes.filter(d => d.checked);
  
  let subtotal = 0;
  checkedDishes.forEach(d => {
    subtotal += d.price;
  });
  
  // 服务费计算逻辑 (仅华尔道夫加收15%)
  let serviceFee = 0;
  const serviceFeeRow = document.getElementById("waldorf-fhr-row");
  const fhrDetailsNote = document.getElementById("fhr-details-note");
  
  if (activeMenuTab === 'waldorf') {
    serviceFee = Math.round(subtotal * 0.15);
    if (serviceFeeRow) serviceFeeRow.style.display = "flex";
    if (fhrDetailsNote) fhrDetailsNote.style.display = "block";
  } else {
    if (serviceFeeRow) serviceFeeRow.style.display = "none";
    if (fhrDetailsNote) fhrDetailsNote.style.display = "none";
  }
  
  const total = subtotal + serviceFee;
  const perPerson = Math.round(total / 6);
  
  const dishCountEl = document.getElementById("calc-dish-count");
  const subtotalEl = document.getElementById("calc-dish-subtotal");
  const serviceFeeEl = document.getElementById("calc-service-fee");
  const totalCostEl = document.getElementById("calc-total-cost");
  const perPersonEl = document.getElementById("calc-per-person");
  
  if (dishCountEl) dishCountEl.innerHTML = `${checkedDishes.length} 项`;
  if (subtotalEl) subtotalEl.innerHTML = `¥${subtotal}`;
  if (serviceFeeEl) serviceFeeEl.innerHTML = `¥${serviceFee}`;
  if (totalCostEl) totalCostEl.innerHTML = `¥${total}`;
  if (perPersonEl) perPersonEl.innerHTML = `¥${perPerson} / 人`;
}

// --- 9. 清单列表逻辑 ---
function toggleChecklistFilter() {
  checklistFilterUnfinishedOnly = !checklistFilterUnfinishedOnly;
  const btn = document.getElementById("btn-filter-checklist");
  if (btn) {
    btn.innerHTML = checklistFilterUnfinishedOnly ? "📋 显示全部清单" : "🔍 只看未完成";
  }
  renderChecklists();
}

function resetChecklistWithConfirm() {
  if (confirm("第一步确认：确定要重置所有清单打卡状态与责任人吗？")) {
    if (confirm("第二步确认：此操作不可恢复，确定重置？")) {
      Object.keys(checklistData).forEach(cat => {
        checklistData[cat].forEach(item => {
          item.checked = false;
        });
      });
      saveLocalState();
      renderChecklists();
      showToast("清单状态已成功重置");
    }
  }
}

function renderChecklists() {
  const container = document.getElementById("checklist-groups-container");
  if (!container) return;
  
  const categories = {
    traffic: "🚄 交通与自驾证件",
    hotel: "🏨 酒店与餐饮备注",
    birthday: "🎂 奶奶生日寿礼准备",
    overnight: "🎒 鼓浪屿过夜随身包",
    health: "💊 药品、防晒与健步"
  };
  
  let totalItems = 0;
  let completedItems = 0;
  
  const groupsHtml = Object.keys(categories).map(cat => {
    let items = checklistData[cat];
    
    // 计算原始总量用于统计
    totalItems += items.length;
    completedItems += items.filter(i => i.checked).isActive = items.filter(i => i.checked).length;
    
    if (checklistFilterUnfinishedOnly) {
      items = items.filter(i => !i.checked);
    }
    
    if (items.length === 0 && checklistFilterUnfinishedOnly) {
      return "";
    }
    
    const itemsHtml = items.map((item, idx) => {
      const ownerBadge = item.owner ? `<span class="owner-badge ${getOwnerClass(item.owner)}" onclick="cycleOwner('${cat}', ${idx})">${item.owner}</span>` : `<span class="owner-badge none-badge" onclick="cycleOwner('${cat}', ${idx})">未指派</span>`;
      return `
        <li class="checklist-item ${item.checked ? 'completed' : ''}">
          <label class="checklist-lbl">
            <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleChecklistItem('${cat}', ${idx}, this.checked)">
            <span>${item.text}</span>
          </label>
          ${seniorsModeActive ? '' : ownerBadge}
        </li>
      `;
    }).join('');
    
    return `
      <div class="checklist-group-card">
        <h5>${categories[cat]}</h5>
        <ul class="checklist-ul">
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join('');
  
  container.innerHTML = groupsHtml;
  
  // 更新总进度与百分比
  const progressBadge = document.getElementById("checklist-progress-badge");
  const progressBar = document.getElementById("checklist-progress-bar");
  
  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  if (progressBadge) progressBadge.innerHTML = `已完成 ${completedItems} / ${totalItems} 项 (${percentage}%)`;
  if (progressBar) progressBar.style.width = `${percentage}%`;
}

function toggleChecklistItem(cat, idx, isChecked) {
  let items = checklistData[cat];
  if (checklistFilterUnfinishedOnly) {
    const unfinished = items.filter(i => !i.checked);
    const target = unfinished[idx];
    if (target) target.checked = isChecked;
  } else {
    if (items[idx]) items[idx].checked = isChecked;
  }
  saveLocalState();
  renderChecklists();
}

function cycleOwner(cat, idx) {
  const owners = ["未指派", "爸爸", "妈妈", "酒店确认", "出发当天检查"];
  let items = checklistData[cat];
  let target = items[idx];
  
  if (checklistFilterUnfinishedOnly) {
    const unfinished = items.filter(i => !i.checked);
    target = unfinished[idx];
  }
  
  if (!target) return;
  
  const currentOwner = target.owner || "未指派";
  let nextIdx = (owners.indexOf(currentOwner) + 1) % owners.length;
  target.owner = owners[nextIdx] === "未指派" ? "" : owners[nextIdx];
  
  saveLocalState();
  renderChecklists();
}

function getOwnerClass(owner) {
  if (owner === '爸爸') return 'dad-badge';
  if (owner === '妈妈') return 'mom-badge';
  if (owner === '酒店确认') return 'hotel-badge';
  if (owner === '出发当天检查') return 'check-badge';
  return 'none-badge';
}

// --- 10. 渲染沟通文案模板 ---
function renderContactTemplates() {
  const container = document.getElementById("contact-templates-list");
  if (!container) return;
  
  container.innerHTML = contactTemplates.map((t, idx) => `
    <div class="contact-card">
      <div class="contact-card-header">
        <span>${t.icon} ${t.title}</span>
        <button class="copy-btn" id="btn-copy-${idx}" onclick="copyTemplateText(${idx})">一键复制</button>
      </div>
      <p class="contact-card-text" id="template-text-${idx}">${t.text}</p>
    </div>
  `).join('');
}

function copyTemplateText(idx) {
  const text = contactTemplates[idx].text;
  const btn = document.getElementById(`btn-copy-${idx}`);
  
  // 兼容性复制方法
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      onCopySuccess(btn);
    }).catch(err => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function onCopySuccess(btn) {
  if (btn) {
    btn.innerHTML = "✓ 已复制";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.innerHTML = "一键复制";
      btn.classList.remove("copied");
    }, 2000);
  }
  showToast("文案已成功复制到剪贴板，可前往微信粘贴！");
}

function fallbackCopy(text, btn) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    onCopySuccess(btn);
  } catch (err) {
    showToast("复制失败，请在输入框中手动选择复制。");
  }
  document.body.removeChild(textArea);
}

// --- 11. LocalStorage 数据存取 ---
const STORAGE_KEYS = {
  seniors: 'xiamen_seniors_mode',
  menu: 'xiamen_menu_state',
  checklist: 'xiamen_checklist_state'
};

function saveLocalState() {
  try {
    localStorage.setItem(STORAGE_KEYS.seniors, seniorsModeActive ? 'true' : 'false');
    localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(menuData));
    localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(checklistData));
  } catch (e) {
    console.warn("LocalStorage save failed", e);
  }
}

function loadLocalState() {
  try {
    const savedSeniors = localStorage.getItem(STORAGE_KEYS.seniors);
    if (savedSeniors === 'true') {
      seniorsModeActive = true;
      document.body.classList.add("seniors-mode");
      const btn = document.getElementById("btn-seniors-mode");
      if (btn) btn.innerHTML = "👴 恢复默认";
      const toolsEl = document.getElementById("section-leader-tools");
      if (toolsEl) toolsEl.style.display = "none";
    }
    
    const savedMenu = localStorage.getItem(STORAGE_KEYS.menu);
    if (savedMenu) {
      const parsedMenu = JSON.parse(savedMenu);
      if (parsedMenu && typeof parsedMenu === 'object') {
        // 增量式安全对齐，防止旧的破损缓存数据导致崩坏
        Object.keys(menuData).forEach(key => {
          if (Array.isArray(parsedMenu[key])) {
            parsedMenu[key].forEach((d, idx) => {
              if (menuData[key][idx] && typeof d.checked === 'boolean') {
                menuData[key][idx].checked = d.checked;
              }
            });
          }
        });
      }
    }
    
    const savedChecklist = localStorage.getItem(STORAGE_KEYS.checklist);
    if (savedChecklist) {
      const parsedCheck = JSON.parse(savedChecklist);
      if (parsedCheck && typeof parsedCheck === 'object') {
        Object.keys(checklistData).forEach(key => {
          if (Array.isArray(parsedCheck[key])) {
            parsedCheck[key].forEach((item, idx) => {
              if (checklistData[key][idx]) {
                if (typeof item.checked === 'boolean') {
                  checklistData[key][idx].checked = item.checked;
                }
                if (typeof item.owner === 'string') {
                  checklistData[key][idx].owner = item.owner;
                }
              }
            });
          }
        });
      }
    }
  } catch (e) {
    console.warn("LocalStorage load failed, fallback to defaults.", e);
  }
}

// --- 12. 全局轻 Toast 提示 ---
function showToast(message) {
  const oldToast = document.querySelector(".toast-bubble");
  if (oldToast) oldToast.remove();
  
  const toast = document.createElement("div");
  toast.className = "toast-bubble";
  toast.innerText = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add("visible");
  }, 50);
  
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
