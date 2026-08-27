export interface Category {
  id: string;
  name: string;
  image: string;
  visible: boolean;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  categoryId: string;
  visible: boolean;
}

const u = (id: string, w = 400, h = 300) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// Category cover images
const IMGS = {
  appetizers: u("1748540459503-19efc015143b", 800, 500),
  meat: u("1588168333986-5078d3ae3976", 800, 500),
  breakfast: u("1786799445505-77b51a75ee1f", 800, 500),
  soups: u("1547592166-23ac45744acd", 800, 500),
  salads: u("1512621776951-a57141f2eefd", 800, 500),
  sandwiches: u("1550317138-10000687a72b", 800, 500),
  cocktails: u("1551782450-3939704166fc", 800, 500),
  hot_drinks: u("1495474472287-4d71bcdd2085", 800, 500),
  juices: u("1621506289937-a8e83f5acdd1", 800, 500),
  mojito: u("1668533889350-21a05111310b", 800, 500),
  iced_coffee: u("1461023058943-07fcbe16d735", 800, 500),
  cold_drinks: u("1608270586620-248524c67de9", 800, 500),
  ice_cream: u("1563805042-7684c019e1cb", 800, 500),
  milkshake: u("1553787499-6f9133860278", 800, 500),
  cheesecake: u("1533134242443-d4fd215305ad", 800, 500),
  hookah: u("1574751749605-0f1e41b6cf67", 800, 500),
};

// Item-specific images
const ITEM_IMGS = {
  curly_fries: u("1573080496219-bb964701c075"),
  wedges: u("1565299507177-ab7e0d5a18f8"),
  onion_rings: u("1541592553-34d4a2c5ee37"),
  french_fries: u("1573080496219-bb964701c075"),
  mozz_sticks: u("1631857584757-6e2b0c2dd53a"),
  chicken_fingers: u("1562802378-063ec186a863"),
  garlic_bread: u("1619096252214-ef06c45683e3"),
  kibbeh: u("1564671165093-20688ff1fffa"),
  ravioli: u("1621996346565-e3dbc353d2e5"),
  wings: u("1567620905732-2d1ec7ab7445"),
  steak: u("1588168333986-5078d3ae3976"),
  lamb: u("1546964124-0cce460f38ef"),
  kafta: u("1599487488170-d11ec9c172f0"),
  stroganoff: u("1574484284002-952d92456975"),
  shrimp: u("1534482421-64566f976cfa"),
  fajita: u("1565299624596-941d32a9cf29"),
  burger: u("1550317138-10000687a72b"),
  shawarma: u("1561043433-aaf687c4cf04"),
  zinger: u("1562802378-063ec186a863"),
  tabbouleh: u("1512838130539-acd76c2bcea4"),
  fattoush: u("1546069901-ba9599a7e63c"),
  hummus: u("1512621776951-a57141f2eefd"),
  greek: u("1540420773420-3cc4f6f3e38a"),
  coleslaw: u("1512621776951-a57141f2eefd"),
  caesar: u("1550304943-4f24f54ddde9"),
  soup_veg: u("1547592166-23ac45744acd"),
  soup_mush: u("1607330289024-1535c6b4e1c1"),
  soup_sea: u("1559742230-f4a53d5591f9"),
  breakfast_full: u("1786799445505-77b51a75ee1f"),
  breakfast_eggs: u("1786799445519-1ccdd3ae2e1c"),
  toast: u("1618167014695-ed59a2e8bc78"),
  espresso: u("1509042239860-f550ce710b93"),
  cappuccino: u("1514432324607-a09d9b4aefdd"),
  americano: u("1495474472287-4d71bcdd2085"),
  latte: u("1561047029-3000c68339ca"),
  mocha: u("1578314675249-a6910f80cc4e"),
  hot_choc: u("1542691457-cbe4ef0cbbde"),
  tea: u("1597318181409-cf64d0b5d8a2"),
  orange_juice: u("1621506289937-a8e83f5acdd1"),
  strawberry_juice: u("1551462034-1e60cd0b2d2b"),
  mango_juice: u("1615485291234-9d694218aeb2"),
  lemonade: u("1613478223719-ff08b9e0b45a"),
  pomegranate: u("1553913861-8c7ee2c5a0e1"),
  carrot_juice: u("1590779033100-9f60a05a2100"),
  mojito_drink: u("1587393855524-087f83d95bc9"),
  iced_coffee_drink: u("1461023058943-07fcbe16d735"),
  cola: u("1608270586620-248524c67de9"),
  ice_cream_mixed: u("1563805042-7684c019e1cb"),
  ice_cream_stuffed: u("1488900128323-21503983a07e"),
  milkshake_vanilla: u("1553787499-6f9133860278"),
  milkshake_choc: u("1572490122747-3368b75a7b9e"),
  cheesecake_oreo: u("1565958011703-44f9829ba187"),
  cheesecake_lotus: u("1533134242443-d4fd215305ad"),
  cheesecake_berry: u("1488900128323-21503983a07e"),
  hookah_device: u("1574751749605-0f1e41b6cf67"),
};

export const initialCategories: Category[] = [
  { id: "cat-1", name: "مقبلات", image: IMGS.appetizers, visible: true, order: 1 },
  { id: "cat-2", name: "وجبات رئيسية لحوم وستيكات", image: IMGS.meat, visible: true, order: 2 },
  { id: "cat-3", name: "افطارات", image: IMGS.breakfast, visible: true, order: 3 },
  { id: "cat-4", name: "شوربة", image: IMGS.soups, visible: true, order: 4 },
  { id: "cat-5", name: "سلطات", image: IMGS.salads, visible: true, order: 5 },
  { id: "cat-6", name: "ساندويشات", image: IMGS.sandwiches, visible: true, order: 6 },
  { id: "cat-7", name: "كوكتيل", image: IMGS.cocktails, visible: true, order: 7 },
  { id: "cat-8", name: "مشروبات ساخنة", image: IMGS.hot_drinks, visible: true, order: 8 },
  { id: "cat-9", name: "عصائر طبيعية", image: IMGS.juices, visible: true, order: 9 },
  { id: "cat-10", name: "موهيتو", image: IMGS.mojito, visible: true, order: 10 },
  { id: "cat-11", name: "ايسات", image: IMGS.iced_coffee, visible: true, order: 11 },
  { id: "cat-12", name: "مشروبات باردة", image: IMGS.cold_drinks, visible: true, order: 12 },
  { id: "cat-13", name: "بوظة", image: IMGS.ice_cream, visible: true, order: 13 },
  { id: "cat-14", name: "ميلك شيك", image: IMGS.milkshake, visible: true, order: 14 },
  { id: "cat-15", name: "تشيز كيك", image: IMGS.cheesecake, visible: true, order: 15 },
  { id: "cat-16", name: "اراجيل", image: IMGS.hookah, visible: true, order: 16 },
];

export const initialProducts: Product[] = [
  // ─── مقبلات ──────────────────────────────
  { id: "p-1-1", categoryId: "cat-1", name: "بطاطا كيرلي", description: "", image: ITEM_IMGS.curly_fries, price: "15", visible: true },
  { id: "p-1-2", categoryId: "cat-1", name: "وجز", description: "", image: ITEM_IMGS.wedges, price: "15", visible: true },
  { id: "p-1-3", categoryId: "cat-1", name: "حلقات بصل", description: "", image: ITEM_IMGS.onion_rings, price: "12", visible: true },
  { id: "p-1-4", categoryId: "cat-1", name: "بطاطا", description: "", image: ITEM_IMGS.french_fries, price: "12", visible: true },
  { id: "p-1-5", categoryId: "cat-1", name: "اصابع موزوريلا", description: "", image: ITEM_IMGS.mozz_sticks, price: "15", visible: true },
  { id: "p-1-6", categoryId: "cat-1", name: "اصابع دجاج", description: "", image: ITEM_IMGS.chicken_fingers, price: "20", visible: true },
  { id: "p-1-7", categoryId: "cat-1", name: "اصابع زنجر", description: "", image: ITEM_IMGS.zinger, price: "20", visible: true },
  { id: "p-1-8", categoryId: "cat-1", name: "اجنحة دجاج بوفلو", description: "", image: ITEM_IMGS.wings, price: "20", visible: true },
  { id: "p-1-9", categoryId: "cat-1", name: "خبز بالثوم والجبنة", description: "", image: ITEM_IMGS.garlic_bread, price: "15", visible: true },
  { id: "p-1-10", categoryId: "cat-1", name: "كبة", description: "", image: ITEM_IMGS.kibbeh, price: "20", visible: true },
  { id: "p-1-11", categoryId: "cat-1", name: "بطاطا مع جبنة", description: "", image: ITEM_IMGS.curly_fries, price: "15", visible: true },
  { id: "p-1-12", categoryId: "cat-1", name: "رفيولي جبنة", description: "", image: ITEM_IMGS.ravioli, price: "35", visible: true },
  { id: "p-1-13", categoryId: "cat-1", name: "رفيولي بطاطا", description: "", image: ITEM_IMGS.ravioli, price: "35", visible: true },

  // ─── وجبات رئيسية لحوم وستيكات ───────────
  { id: "p-2-1", categoryId: "cat-2", name: "منسف خروف", description: "", image: ITEM_IMGS.lamb, price: "75", visible: true },
  { id: "p-2-2", categoryId: "cat-2", name: "كفته", description: "بندورة، طحينية", image: ITEM_IMGS.kafta, price: "50", visible: true },
  { id: "p-2-3", categoryId: "cat-2", name: "فهيتا", description: "لحمة، دجاج", image: ITEM_IMGS.fajita, price: "50", visible: true },
  { id: "p-2-4", categoryId: "cat-2", name: "بيف ستراجانوف", description: "", image: ITEM_IMGS.stroganoff, price: "55", visible: true },
  { id: "p-2-5", categoryId: "cat-2", name: "تشكن ستراجانوف", description: "", image: ITEM_IMGS.stroganoff, price: "50", visible: true },
  { id: "p-2-6", categoryId: "cat-2", name: "كتف خروف", description: "", image: ITEM_IMGS.lamb, price: "350", visible: true },
  { id: "p-2-7", categoryId: "cat-2", name: "موز خروف", description: "", image: ITEM_IMGS.lamb, price: "90-100", visible: true },
  { id: "p-2-8", categoryId: "cat-2", name: "رقبة خروف", description: "", image: ITEM_IMGS.lamb, price: "حسب الوزن", visible: true },
  { id: "p-2-9", categoryId: "cat-2", name: "اساحو", description: "", image: ITEM_IMGS.lamb, price: "حسب الوزن", visible: true },
  { id: "p-2-10", categoryId: "cat-2", name: "يرسكت", description: "", image: ITEM_IMGS.lamb, price: "حسب الوزن", visible: true },
  { id: "p-2-11", categoryId: "cat-2", name: "ستيك فيليه تورناحو", description: "فطر، كريما، جبنة", image: ITEM_IMGS.steak, price: "80", visible: true },
  { id: "p-2-12", categoryId: "cat-2", name: "ستيك فيليه شيربون", description: "خضار سوتيه وزبدة", image: ITEM_IMGS.steak, price: "75", visible: true },
  { id: "p-2-13", categoryId: "cat-2", name: "ستيك فيليه", description: "وايت صوص، ثومة وليمون", image: ITEM_IMGS.steak, price: "75", visible: true },
  { id: "p-2-14", categoryId: "cat-2", name: "ستيك فيليه بيبر", description: "", image: ITEM_IMGS.steak, price: "75", visible: true },
  { id: "p-2-15", categoryId: "cat-2", name: "ستيك دجاج", description: "وايت صوص، ثومة وليمون، كاري، باربيكو", image: ITEM_IMGS.steak, price: "55", visible: true },
  { id: "p-2-16", categoryId: "cat-2", name: "فخارة لحمة", description: "", image: ITEM_IMGS.kafta, price: "55", visible: true },
  { id: "p-2-17", categoryId: "cat-2", name: "فخارة دجاج", description: "", image: ITEM_IMGS.chicken_fingers, price: "50", visible: true },
  { id: "p-2-18", categoryId: "cat-2", name: "فخارة فواكه بحر", description: "", image: ITEM_IMGS.shrimp, price: "50", visible: true },
  { id: "p-2-19", categoryId: "cat-2", name: "فخارة جمبري", description: "وايت صوص", image: ITEM_IMGS.shrimp, price: "55", visible: true },

  // ─── افطارات ──────────────────────────────
  { id: "p-3-1", categoryId: "cat-3", name: "افطار صباحي", description: "حمص، بجة، لبنة، جبنة مقلية، مول، زيت، زعتر", image: ITEM_IMGS.breakfast_full, price: "40", visible: true },
  { id: "p-3-2", categoryId: "cat-3", name: "حمص مع لحمة خروف", description: "", image: ITEM_IMGS.hummus, price: "40", visible: true },
  { id: "p-3-3", categoryId: "cat-3", name: "توست جبنة بيضاء", description: "", image: ITEM_IMGS.toast, price: "15", visible: true },
  { id: "p-3-4", categoryId: "cat-3", name: "توست جبنة صفراء", description: "", image: ITEM_IMGS.toast, price: "15", visible: true },
  { id: "p-3-5", categoryId: "cat-3", name: "منقوشة زعتر", description: "", image: ITEM_IMGS.breakfast_eggs, price: "20", visible: true },
  { id: "p-3-6", categoryId: "cat-3", name: "منقوشة جبنة", description: "", image: ITEM_IMGS.breakfast_eggs, price: "20", visible: true },
  { id: "p-3-7", categoryId: "cat-3", name: "صفيحة لحمة", description: "", image: ITEM_IMGS.kafta, price: "25", visible: true },

  // ─── شوربة ────────────────────────────────
  { id: "p-4-1", categoryId: "cat-4", name: "شوربة خضار", description: "", image: ITEM_IMGS.soup_veg, price: "15", visible: true },
  { id: "p-4-2", categoryId: "cat-4", name: "شوربة فطر", description: "", image: ITEM_IMGS.soup_mush, price: "15", visible: true },
  { id: "p-4-3", categoryId: "cat-4", name: "شوربة فواكه بحر", description: "", image: ITEM_IMGS.soup_sea, price: "20", visible: true },
  { id: "p-4-4", categoryId: "cat-4", name: "شوربة بصل", description: "", image: ITEM_IMGS.soup_veg, price: "15", visible: true },
  { id: "p-4-5", categoryId: "cat-4", name: "شوربة لبن", description: "", image: ITEM_IMGS.soup_veg, price: "15", visible: true },

  // ─── سلطات ────────────────────────────────
  { id: "p-5-1", categoryId: "cat-5", name: "تبولة", description: "", image: ITEM_IMGS.tabbouleh, price: "15", visible: true },
  { id: "p-5-2", categoryId: "cat-5", name: "يونانية", description: "", image: ITEM_IMGS.greek, price: "20", visible: true },
  { id: "p-5-3", categoryId: "cat-5", name: "فتوش", description: "", image: ITEM_IMGS.fattoush, price: "15", visible: true },
  { id: "p-5-4", categoryId: "cat-5", name: "جرجير", description: "", image: ITEM_IMGS.caesar, price: "15", visible: true },
  { id: "p-5-5", categoryId: "cat-5", name: "عربية", description: "", image: ITEM_IMGS.tabbouleh, price: "15", visible: true },
  { id: "p-5-6", categoryId: "cat-5", name: "حمص", description: "", image: ITEM_IMGS.hummus, price: "12", visible: true },
  { id: "p-5-7", categoryId: "cat-5", name: "تركية", description: "", image: ITEM_IMGS.greek, price: "12", visible: true },
  { id: "p-5-8", categoryId: "cat-5", name: "طحينية/بقدونسية", description: "", image: ITEM_IMGS.hummus, price: "12", visible: true },
  { id: "p-5-9", categoryId: "cat-5", name: "ذرة خضار", description: "", image: ITEM_IMGS.coleslaw, price: "12", visible: true },
  { id: "p-5-10", categoryId: "cat-5", name: "ذرة مايونيز", description: "", image: ITEM_IMGS.coleslaw, price: "12", visible: true },
  { id: "p-5-11", categoryId: "cat-5", name: "سيزر دجاج", description: "", image: ITEM_IMGS.caesar, price: "25", visible: true },
  { id: "p-5-12", categoryId: "cat-5", name: "سيزر جبنة", description: "", image: ITEM_IMGS.caesar, price: "20", visible: true },
  { id: "p-5-13", categoryId: "cat-5", name: "كولسلو", description: "", image: ITEM_IMGS.coleslaw, price: "15", visible: true },
  { id: "p-5-14", categoryId: "cat-5", name: "نابل باذنجان", description: "", image: ITEM_IMGS.fattoush, price: "15", visible: true },
  { id: "p-5-15", categoryId: "cat-5", name: "بابا غنوج", description: "", image: ITEM_IMGS.hummus, price: "12", visible: true },
  { id: "p-5-16", categoryId: "cat-5", name: "جرجير مع طحينية", description: "", image: ITEM_IMGS.caesar, price: "15", visible: true },
  { id: "p-5-17", categoryId: "cat-5", name: "عربية مع طحينية", description: "", image: ITEM_IMGS.tabbouleh, price: "15", visible: true },
  { id: "p-5-18", categoryId: "cat-5", name: "فلاحية", description: "", image: ITEM_IMGS.fattoush, price: "12", visible: true },

  // ─── ساندويشات ────────────────────────────
  { id: "p-6-1", categoryId: "cat-6", name: "لفة شامية", description: "", image: ITEM_IMGS.shawarma, price: "25", visible: true },
  { id: "p-6-2", categoryId: "cat-6", name: "شوارما بجيت", description: "", image: ITEM_IMGS.shawarma, price: "25", visible: true },
  { id: "p-6-3", categoryId: "cat-6", name: "برغر", description: "", image: ITEM_IMGS.burger, price: "25", visible: true },
  { id: "p-6-4", categoryId: "cat-6", name: "فهيتا", description: "", image: ITEM_IMGS.fajita, price: "25", visible: true },
  { id: "p-6-5", categoryId: "cat-6", name: "زنجر", description: "", image: ITEM_IMGS.zinger, price: "25", visible: true },
  { id: "p-6-6", categoryId: "cat-6", name: "ساندويش صدر دجاج", description: "", image: ITEM_IMGS.chicken_fingers, price: "25", visible: true },
  { id: "p-6-7", categoryId: "cat-6", name: "اصابع دجاج", description: "", image: ITEM_IMGS.chicken_fingers, price: "25", visible: true },

  // ─── كوكتيل ───────────────────────────────
  { id: "p-7-1", categoryId: "cat-7", name: "كوكتيل ROW", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-7-2", categoryId: "cat-7", name: "محمصينا", description: "", image: ITEM_IMGS.mojito_drink, price: "15", visible: true },
  { id: "p-7-3", categoryId: "cat-7", name: "كوكتيل فواكه", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },

  // ─── مشروبات ساخنة ────────────────────────
  { id: "p-8-1", categoryId: "cat-8", name: "اسرسو", description: "", image: ITEM_IMGS.espresso, price: "6", visible: true },
  { id: "p-8-2", categoryId: "cat-8", name: "اسبر سو حيل", description: "", image: ITEM_IMGS.espresso, price: "8", visible: true },
  { id: "p-8-3", categoryId: "cat-8", name: "امريكانو", description: "", image: ITEM_IMGS.americano, price: "10", visible: true },
  { id: "p-8-4", categoryId: "cat-8", name: "كابتشينو", description: "", image: ITEM_IMGS.cappuccino, price: "12", visible: true },
  { id: "p-8-5", categoryId: "cat-8", name: "نسكافيه", description: "", image: ITEM_IMGS.americano, price: "12", visible: true },
  { id: "p-8-6", categoryId: "cat-8", name: "لاتيه", description: "", image: ITEM_IMGS.latte, price: "12", visible: true },
  { id: "p-8-7", categoryId: "cat-8", name: "موكا", description: "", image: ITEM_IMGS.mocha, price: "12", visible: true },
  { id: "p-8-8", categoryId: "cat-8", name: "هوت شوكليت بودينج", description: "", image: ITEM_IMGS.hot_choc, price: "12", visible: true },
  { id: "p-8-9", categoryId: "cat-8", name: "هوت شوكليت ايطالياني", description: "", image: ITEM_IMGS.hot_choc, price: "15", visible: true },
  { id: "p-8-10", categoryId: "cat-8", name: "هوت لوتس", description: "", image: ITEM_IMGS.latte, price: "15", visible: true },
  { id: "p-8-11", categoryId: "cat-8", name: "شوكو مارشميلو", description: "", image: ITEM_IMGS.hot_choc, price: "15", visible: true },
  { id: "p-8-12", categoryId: "cat-8", name: "فرش بنحو", description: "", image: ITEM_IMGS.latte, price: "15", visible: true },
  { id: "p-8-13", categoryId: "cat-8", name: "شاي باحليب", description: "", image: ITEM_IMGS.tea, price: "12", visible: true },
  { id: "p-8-14", categoryId: "cat-8", name: "شاي زنجبيل، زهورات", description: "", image: ITEM_IMGS.tea, price: "6", visible: true },

  // ─── عصائر طبيعية ─────────────────────────
  { id: "p-9-1", categoryId: "cat-9", name: "برتقال", description: "", image: ITEM_IMGS.orange_juice, price: "15", visible: true },
  { id: "p-9-2", categoryId: "cat-9", name: "تفاح", description: "", image: ITEM_IMGS.orange_juice, price: "15", visible: true },
  { id: "p-9-3", categoryId: "cat-9", name: "ليمون ونعنع", description: "", image: ITEM_IMGS.lemonade, price: "15", visible: true },
  { id: "p-9-4", categoryId: "cat-9", name: "ليموناضة", description: "", image: ITEM_IMGS.lemonade, price: "15", visible: true },
  { id: "p-9-5", categoryId: "cat-9", name: "مانجا", description: "", image: ITEM_IMGS.mango_juice, price: "15", visible: true },
  { id: "p-9-6", categoryId: "cat-9", name: "فراولة", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },
  { id: "p-9-7", categoryId: "cat-9", name: "اناناس", description: "", image: ITEM_IMGS.orange_juice, price: "15", visible: true },
  { id: "p-9-8", categoryId: "cat-9", name: "جراغون فروت", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },
  { id: "p-9-9", categoryId: "cat-9", name: "جزر", description: "", image: ITEM_IMGS.carrot_juice, price: "15", visible: true },
  { id: "p-9-10", categoryId: "cat-9", name: "جزر وتفاح", description: "", image: ITEM_IMGS.carrot_juice, price: "15", visible: true },
  { id: "p-9-11", categoryId: "cat-9", name: "جزر وبرتقال", description: "", image: ITEM_IMGS.carrot_juice, price: "15", visible: true },
  { id: "p-9-12", categoryId: "cat-9", name: "تفاح وبرتقال", description: "", image: ITEM_IMGS.orange_juice, price: "15", visible: true },
  { id: "p-9-13", categoryId: "cat-9", name: "رمان", description: "", image: ITEM_IMGS.pomegranate, price: "15", visible: true },
  { id: "p-9-14", categoryId: "cat-9", name: "جمايكا", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },

  // ─── موهيتو ───────────────────────────────
  { id: "p-10-1", categoryId: "cat-10", name: "LeBLU", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-2", categoryId: "cat-10", name: "بلو اوشن", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-3", categoryId: "cat-10", name: "فراولة", description: "", image: ITEM_IMGS.strawberry_juice, price: "17", visible: true },
  { id: "p-10-4", categoryId: "cat-10", name: "تفاح", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-5", categoryId: "cat-10", name: "اناناس", description: "", image: ITEM_IMGS.mango_juice, price: "17", visible: true },
  { id: "p-10-6", categoryId: "cat-10", name: "مسفلورا", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-7", categoryId: "cat-10", name: "كيوكي", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-8", categoryId: "cat-10", name: "ليمون", description: "", image: ITEM_IMGS.lemonade, price: "17", visible: true },
  { id: "p-10-9", categoryId: "cat-10", name: "بطيخ", description: "", image: ITEM_IMGS.strawberry_juice, price: "17", visible: true },
  { id: "p-10-10", categoryId: "cat-10", name: "Under The See", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-11", categoryId: "cat-10", name: "بابل جم", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-12", categoryId: "cat-10", name: "جرانجين", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-13", categoryId: "cat-10", name: "بلوباري", description: "", image: ITEM_IMGS.strawberry_juice, price: "17", visible: true },
  { id: "p-10-14", categoryId: "cat-10", name: "مكس بري", description: "", image: ITEM_IMGS.strawberry_juice, price: "17", visible: true },
  { id: "p-10-15", categoryId: "cat-10", name: "فانيلا", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-16", categoryId: "cat-10", name: "كراميل", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },
  { id: "p-10-17", categoryId: "cat-10", name: "خوخ", description: "", image: ITEM_IMGS.strawberry_juice, price: "17", visible: true },
  { id: "p-10-18", categoryId: "cat-10", name: "Coconut", description: "", image: ITEM_IMGS.mojito_drink, price: "17", visible: true },

  // ─── ايسات ────────────────────────────────
  { id: "p-11-1", categoryId: "cat-11", name: "ايس كوفي", description: "", image: ITEM_IMGS.iced_coffee_drink, price: "15", visible: true },
  { id: "p-11-2", categoryId: "cat-11", name: "ايس كوفي لايت", description: "", image: ITEM_IMGS.iced_coffee_drink, price: "15", visible: true },
  { id: "p-11-3", categoryId: "cat-11", name: "ايس كوفي جايت", description: "", image: ITEM_IMGS.iced_coffee_drink, price: "15", visible: true },
  { id: "p-11-4", categoryId: "cat-11", name: "ايس مسفلورا", description: "", image: ITEM_IMGS.iced_coffee_drink, price: "15", visible: true },
  { id: "p-11-5", categoryId: "cat-11", name: "ايس مانجا", description: "", image: ITEM_IMGS.mango_juice, price: "15", visible: true },
  { id: "p-11-6", categoryId: "cat-11", name: "ايس اناناس", description: "", image: ITEM_IMGS.orange_juice, price: "15", visible: true },
  { id: "p-11-7", categoryId: "cat-11", name: "ايس فانيلا", description: "", image: ITEM_IMGS.milkshake_vanilla, price: "15", visible: true },
  { id: "p-11-8", categoryId: "cat-11", name: "ايس فراولة", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },
  { id: "p-11-9", categoryId: "cat-11", name: "ايس كيوكي", description: "", image: ITEM_IMGS.iced_coffee_drink, price: "15", visible: true },
  { id: "p-11-10", categoryId: "cat-11", name: "بلو اوشن", description: "", image: ITEM_IMGS.mojito_drink, price: "15", visible: true },
  { id: "p-11-11", categoryId: "cat-11", name: "بطيخ", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },
  { id: "p-11-12", categoryId: "cat-11", name: "مكس بري", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },
  { id: "p-11-13", categoryId: "cat-11", name: "ايس خوخ", description: "", image: ITEM_IMGS.strawberry_juice, price: "15", visible: true },
  { id: "p-11-14", categoryId: "cat-11", name: "ايس كراميل", description: "", image: ITEM_IMGS.iced_coffee_drink, price: "15", visible: true },
  { id: "p-11-15", categoryId: "cat-11", name: "تيراميسو لاتيه", description: "", image: ITEM_IMGS.iced_coffee_drink, price: "15", visible: true },

  // ─── مشروبات باردة ────────────────────────
  { id: "p-12-1", categoryId: "cat-12", name: "كولا", description: "", image: ITEM_IMGS.cola, price: "5", visible: true },
  { id: "p-12-2", categoryId: "cat-12", name: "سبرايت", description: "", image: ITEM_IMGS.cola, price: "5", visible: true },
  { id: "p-12-3", categoryId: "cat-12", name: "فانتا", description: "", image: ITEM_IMGS.cola, price: "5", visible: true },
  { id: "p-12-4", categoryId: "cat-12", name: "بغاريا", description: "", image: ITEM_IMGS.cola, price: "10", visible: true },
  { id: "p-12-5", categoryId: "cat-12", name: "فرش", description: "", image: ITEM_IMGS.cola, price: "5", visible: true },
  { id: "p-12-6", categoryId: "cat-12", name: "مياه غازية", description: "", image: ITEM_IMGS.cola, price: "5", visible: true },
  { id: "p-12-7", categoryId: "cat-12", name: "مياه صغير", description: "", image: ITEM_IMGS.cola, price: "4", visible: true },
  { id: "p-12-8", categoryId: "cat-12", name: "مياه كبير", description: "", image: ITEM_IMGS.cola, price: "8", visible: true },
  { id: "p-12-9", categoryId: "cat-12", name: "XL", description: "", image: ITEM_IMGS.cola, price: "8", visible: true },
  { id: "p-12-10", categoryId: "cat-12", name: "Blu Day", description: "", image: ITEM_IMGS.mojito_drink, price: "7", visible: true },
  { id: "p-12-11", categoryId: "cat-12", name: "Blu", description: "", image: ITEM_IMGS.mojito_drink, price: "7", visible: true },

  // ─── بوظة ─────────────────────────────────
  { id: "p-13-1", categoryId: "cat-13", name: "مشكل", description: "", image: ITEM_IMGS.ice_cream_mixed, price: "15", visible: true },
  { id: "p-13-2", categoryId: "cat-13", name: "محشي", description: "", image: ITEM_IMGS.ice_cream_stuffed, price: "17", visible: true },
  { id: "p-13-3", categoryId: "cat-13", name: "بوظة ROW", description: "", image: ITEM_IMGS.ice_cream_mixed, price: "20", visible: true },

  // ─── ميلك شيك ─────────────────────────────
  { id: "p-14-1", categoryId: "cat-14", name: "فانيلا", description: "", image: ITEM_IMGS.milkshake_vanilla, price: "17", visible: true },
  { id: "p-14-2", categoryId: "cat-14", name: "شوكلاتة", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-3", categoryId: "cat-14", name: "بستاشيو", description: "", image: ITEM_IMGS.milkshake_vanilla, price: "17", visible: true },
  { id: "p-14-4", categoryId: "cat-14", name: "نوتيلا", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-5", categoryId: "cat-14", name: "لوتس", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-6", categoryId: "cat-14", name: "اوريو", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-7", categoryId: "cat-14", name: "بون بون", description: "", image: ITEM_IMGS.milkshake_vanilla, price: "17", visible: true },
  { id: "p-14-8", categoryId: "cat-14", name: "كراميل", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-9", categoryId: "cat-14", name: "بابل جم", description: "", image: ITEM_IMGS.milkshake_vanilla, price: "17", visible: true },
  { id: "p-14-10", categoryId: "cat-14", name: "موكا", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-11", categoryId: "cat-14", name: "فلو انجيل", description: "", image: ITEM_IMGS.milkshake_vanilla, price: "17", visible: true },
  { id: "p-14-12", categoryId: "cat-14", name: "كورنتو", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-13", categoryId: "cat-14", name: "سبرلاك", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },
  { id: "p-14-14", categoryId: "cat-14", name: "كورن فليكس", description: "", image: ITEM_IMGS.milkshake_vanilla, price: "17", visible: true },
  { id: "p-14-15", categoryId: "cat-14", name: "بكحاش", description: "", image: ITEM_IMGS.milkshake_choc, price: "17", visible: true },

  // ─── تشيز كيك ─────────────────────────────
  { id: "p-15-1", categoryId: "cat-15", name: "اوريو", description: "", image: ITEM_IMGS.cheesecake_oreo, price: "25", visible: true },
  { id: "p-15-2", categoryId: "cat-15", name: "لوتس", description: "", image: ITEM_IMGS.cheesecake_lotus, price: "25", visible: true },
  { id: "p-15-3", categoryId: "cat-15", name: "بلوبري", description: "", image: ITEM_IMGS.cheesecake_berry, price: "25", visible: true },
  { id: "p-15-4", categoryId: "cat-15", name: "فراولة", description: "", image: ITEM_IMGS.cheesecake_berry, price: "25", visible: true },
  { id: "p-15-5", categoryId: "cat-15", name: "موس جيرمان", description: "", image: ITEM_IMGS.cheesecake_lotus, price: "25", visible: true },
  { id: "p-15-6", categoryId: "cat-15", name: "ريد فيلفيت", description: "", image: ITEM_IMGS.cheesecake_berry, price: "25", visible: true },
  { id: "p-15-7", categoryId: "cat-15", name: "تراكولادا", description: "", image: ITEM_IMGS.cheesecake_lotus, price: "25", visible: true },

  // ─── اراجيل ───────────────────────────────
  { id: "p-16-1", categoryId: "cat-16", name: "تفاحتين نخلة", description: "", image: ITEM_IMGS.hookah_device, price: "25", visible: true },
  { id: "p-16-2", categoryId: "cat-16", name: "تفاحتين", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-3", categoryId: "cat-16", name: "خلطة شامية", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-4", categoryId: "cat-16", name: "معسل عنب", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-5", categoryId: "cat-16", name: "معسل لاق", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-6", categoryId: "cat-16", name: "معسل ليمون ونعنع", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-7", categoryId: "cat-16", name: "معسل سهم وقرفة", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-8", categoryId: "cat-16", name: "معسل بلوباري", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-9", categoryId: "cat-16", name: "معسل بطيخ ونعنع", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
  { id: "p-16-10", categoryId: "cat-16", name: "كاندي", description: "", image: ITEM_IMGS.hookah_device, price: "20", visible: true },
];

export const initialBanner = {
  type: "image" as "image" | "video",
  imageUrl: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&auto=format&q=80`,
  videoUrl: "",
  headline: "مرحباً بكم في ROW Restaurant",
  subtext: "تجربة طعام استثنائية من قلب حيفا — نكهات أصيلة وأجواء لا تُنسى",
};

export const initialContact = {
  phone: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
};
