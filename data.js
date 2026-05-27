// data.js - 核心数据与逻辑
const shopInfo = {
    name: "喜多.卤.小面 (thindo)",
    address: "重庆市XX区XX路XX号",
    phone: "138-0000-0000",
    slogan: "恭喜发财，大吉大利！感谢光临喜多卤小面！"
};

// 产品菜单（含图片、规格、口味）
const menu = [
    // 面系列
    { id: 1, name: "重庆小面", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400", price: 12, category: "面系列", desc: "麻辣鲜香，重庆灵魂", options: { soup: ["全汤","半汤","干馏"], spice: ["微辣","中辣","特辣"] } },
    { id: 2, name: "杂酱面", img: "https://images.unsplash.com/photo-1569718212165-83d8d1a1b6d6?w=400", price: 14, category: "面系列", desc: "肉粒酥香，酱味浓郁", options: { soup: ["全汤","半汤","干馏"], spice: ["微辣","中辣"] } },
    { id: 3, name: "碗杂面", img: "https://images.unsplash.com/photo-1591814468924-c736c2a6e66e?w=400", price: 15, category: "面系列", desc: "耙豌豆与杂酱的完美结合", options: { soup: ["全汤","半汤","干馏"], spice: ["微辣","中辣"] } },
    { id: 4, name: "凉面", img: "https://images.unsplash.com/photo-1552611052-33e8f01a6a44?w=400", price: 13, category: "面系列", desc: "清爽开胃，夏日必备", options: { spice: ["微辣","中辣","特辣"] } },
    
    // 小吃系列
    { id: 5, name: "卤猪耳", img: "https://images.unsplash.com/photo-1604908176997-125f25e4ee4e?w=400", price: 15, category: "卤味小吃", desc: "脆嫩爽口", options: { weight: ["半斤","一斤"] } },
    { id: 6, name: "卤猪脚", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400", price: 18, category: "卤味小吃", desc: "软糯Q弹", options: { weight: ["半斤","一斤"] } },
    { id: 7, name: "卤豆干", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400", price: 5, category: "卤味小吃", desc: "吸满卤汁" },
    { id: 8, name: "卤蛋", img: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=400", price: 3, category: "卤味小吃", desc: "入味十足" },
    { id: 9, name: "煎鸡蛋", img: "https://images.unsplash.com/photo-1582047727331-102538bf51d8?w=400", price: 3, category: "卤味小吃", desc: "外焦里嫩" },
    { id: 10, name: "凉拌缸豆", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", price: 6, category: "凉菜", desc: "酸辣解腻" },
    { id: 11, name: "凉拌三丝", img: "https://images.unsplash.com/photo-1540420828642-f9906077979e?w=400", price: 8, category: "凉菜", desc: "口感丰富" },
    { id: 12, name: "凉拌黄瓜", img: "https://images.unsplash.com/photo-1523049673836-cc790709a7aa?w=400", price: 6, category: "凉菜", desc: "清脆爽口" },
    
    // 饮品系列
    { id: 13, name: "白水/开水", img: "https://images.unsplash.com/photo-1560807707-00cae519ce7f?w=400", price: 0, category: "饮品", desc: "免费提供" },
    { id: 14, name: "现磨豆浆", img: "https://images.unsplash.com/photo-1546093054-2f232dc0a2b6?w=400", price: 5, category: "饮品", desc: "醇厚豆香" },
    { id: 15, name: "复合豆浆", img: "https://images.unsplash.com/photo-1546093054-2f232dc0a2b6?w=400", price: 8, category: "饮品", desc: "秘制配方" },
    { id: 16, name: "冰糖雪梨水", img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400", price: 6, category: "饮品", desc: "润肺止咳" },
    { id: 17, name: "冰凉虾", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400", price: 10, category: "饮品", desc: "夏日限定" },
    { id: 18, name: "冰汤圆", img: "https://images.unsplash.com/photo-1578984787276-61b84e76534e?w=400", price: 10, category: "饮品", desc: "软糯香甜" }
];

// 奖品库
const prizes = [
    { id: 1, name: "免费冰汤圆", points: 100 },
    { id: 2, name: "招牌小面半价券", points: 200 },
    { id: 3, name: "卤蛋兑换券", points: 50 }
];

// 配置
const config = {
    deliveryFee: 2,          // 外卖打包费
    promotion: { threshold: 30, discount: 5 }, // 满30减5
    rechargeRule: { give: 10 }, // 充100送10
    pointsRate: 10           // 10元积1分
};

// 本地存储
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let members = JSON.parse(localStorage.getItem("members")) || {
    "13800000000": { phone: "13800000000", balance: 100, points: 150 }
};
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// 工具函数
function makeCode() { return Math.floor(1000 + Math.random() * 9000); }
function saveMembers() { localStorage.setItem("members", JSON.stringify(members)); }
function saveCurrentUser(user) { 
    currentUser = user; 
    localStorage.setItem("currentUser", JSON.stringify(user)); 
}

// ===== 会员功能 =====
function register(phone) {
    if (members[phone]) return alert("账号已存在");
    members[phone] = { phone, balance: 0, points: 0 };
    saveMembers();
    alert("注册成功！");
}

function login(phone) {
    if (!members[phone]) return alert("请先注册");
    saveCurrentUser(members[phone]);
    alert("登录成功！");
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

function recharge(amount) {
    if (!currentUser) return;
    members[currentUser.phone].balance += amount;
    if (amount >= 100) members[currentUser.phone].balance += config.rechargeRule.give;
    saveMembers();
    saveCurrentUser(members[currentUser.phone]);
    alert(`充值成功！当前余额：${members[currentUser.phone].balance}元`);
}

function addPoints(orderTotal) {
    if (!currentUser) return;
    const pts = Math.floor(orderTotal / config.pointsRate);
    members[currentUser.phone].points += pts;
    saveMembers();
    saveCurrentUser(members[currentUser.phone]);
}

function exchangePrize(prizeId) {
    const prize = prizes.find(p => p.id === prizeId);
    if (currentUser.points < prize.points) return alert("积分不足");
    members[currentUser.phone].points -= prize.points;
    saveMembers();
    saveCurrentUser(members[currentUser.phone]);
    alert(`兑换成功！请凭此页面到柜台领取：${prize.name}`);
}

// ===== 订单功能 =====
function createOrder(cart, info) {
    let subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    let total = subtotal;
    
    // 促销判断
    if (subtotal >= config.promotion.threshold) {
        total -= config.promotion.discount;
    }
    
    // 外卖打包费
    if (info.isDelivery) {
        total += config.deliveryFee;
    }
    
    const order = {
        id: Date.now(),
        items: cart,
        total: total,
        code: makeCode(),
        status: "等待制作",
        time: new Date().toLocaleString(),
        customer: info
    };
    
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    addPoints(total);
    return order;
}

// ===== 语音播报 =====
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    }
}