// Stats: "Auth" : '["0-Games", "1-Wins", "2-Draws", "3-Losses", "4-Winrate", "5-Goals", "6-Assists", "7-GK", "8-CS", "9-CS%", "10-Role", "11-Nick"]'
// Yes, it is spaghetti code sorry about that.
/* VARIABLES */
let redPoint = 0,
  bluePoint = 0,
  pHesapla = true,
  ilkMac = true;
function Puan(team) {
  switch (team) {
    case 1:
      redPoint += 3;
      break;
    case 2:
      bluePoint += 3;
      break;
    case 0:
      redPoint += 1;
      bluePoint += 1;
      break;
    default:
      break;
  }
}
function puanSifirla() {
  redPoint = bluePoint = 0;
}
function sifreyiDegistir(sifre, auth) {
  let _m = parse(localStorage[auth]);
  _m.pass = sifre;
  localStorage.setItem(auth, stringify(_m));
}
let parayiSifirla = (auth) => {
  let d = parse(localStorage[auth]);
  d.coins = 100;
  localStorage[auth] = stringify(d);
};
let doReqStuffs = () => {
  if (!localStorage.getItem("yetkiler")) {
    let y = { boosters: [], vips: [] };
    localStorage.setItem("yetkiler", stringify(y));
  }
};
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
let yetkiVer = (msg) => {
  msg = msg.replace(/\s+$/gim, "");
  let cmdreg = /^![\wĞÜÖÇİŞşğıüöç]+/gi;
  msg = msg.replace(cmdreg, "");
  msg = msg.replace(/^\s+/gim, "");
  console.log(msg);
  let _yetki = msg.match(/^[\wĞÜÖÇİŞşğıüöç]+/gim);
  console.log(_yetki);
  let _id = msg.match(/\#\d+$/gim);
  console.log(_id);
  if (!_yetki || _yetki?.length < 1) {
    return room.sendAnnouncement("Yetki tespit edilemedi");
  }
  if (!_id || _id?.length < 1) {
    return room.sendAnnouncement("ID tespit edilemedi");
  }
  let [yetki] = _yetki;
  let [id] = _id;

  id = Number(id.replace("#", ""));
  let v = parse(localStorage.getItem("yetkiler"));
  if (["vip", "booster"].includes(yetki)) {
    yetki += "s";
    console.log(v[yetki]);
    v[yetki].push(auths.get(id));
    localStorage.setItem("yetkiler", stringify(v));
  } else {
    room.sendAnnouncement("Girdiginiz yetki gecersiz!");
  }
};

let yetkiKaldir = (msg) => {
  msg = msg.replace(/\s+$/gim, "");
  let cmdreg = /^![\wĞÜÖÇİŞşğıüöç]+/gi;
  msg = msg.replace(cmdreg, "");
  msg = msg.replace(/^\s+/gim, "");
  console.log(msg);
  let _yetki = msg.match(/^[\wĞÜÖÇİŞşğıüöç]+/gim);
  console.log(_yetki);
  let _id = msg.match(/\#\d+$/gim);
  console.log(_id);
  if (!_yetki || _yetki?.length < 1) {
    return room.sendAnnouncement("Yetki tespit edilemedi");
  }
  if (!_id || _id?.length < 1) {
    return room.sendAnnouncement("ID tespit edilemedi");
  }
  let [yetki] = _yetki;
  let [id] = _id;

  id = Number(id.replace("#", ""));
  let v = parse(localStorage.getItem("yetkiler"));
  if (["vip", "booster"].includes(yetki)) {
    yetki += "s";
    console.log(v[yetki]);
    let __a = removeItemOnce(v[yetki], auths.get(id));
    v[yetki] = __a;
    localStorage.setItem(`yetkiler`, stringify(v));
  } else {
    room.sendAnnouncement("Girdiginiz yetki gecersiz!");
  }
};
let _auths = new Map();
let bahisSure;
let bahisOynanabilir = false;
let redK = new Map(),
  blueK = new Map(),
  Br = new Map(),
  _alt = new Map(),
  _ust = new Map(),
  _tek = new Map(),
  _cift = new Map();
let bahisOynamaSayisi = new Map();
let uzatmaBitti = false;
let _duyuruInterval;
let auths = new Map();
let gassist = new Map();
let ggol = new Map();
let gkk = new Map();
function bahisArray(bo) {
  let arr = [];
  bo.forEach((e) => {
    arr.push(e);
  });
  return arr;
}
let _redScore, _blueScore;
const end = (winner) => {
  let data, $data;
  let redS = _redScore,
    blueS = _blueScore;
  // const {red: redS, blue: blueS} = room.getScores();
  let winnr = winner == 1 ? 1 : winner == 2 ? 2 : 0;
  if (pHesapla) {
    Puan(winnr);
    if (ilkMac) {
      ilkMac = false;
      room.sendChat(`Puan durumu Kirmizi- ${redPoint}:Mavi - ${bluePoint}`);
    }
  }

  if (redS == 0) {
    room.sendChat(`🏆 ${GKList[0].name}, kalesini gole kapattı!`);
    veriyiDuzenle({
      id: GKList[0].id,
      name: GKList[0].name,
      auth: getAuth(GKList[0]),
      CS: 1,
    });
  }

  if (blueS == 0) {
    room.sendChat(`🏆 ${GKList[1].name}, kalesini gole kapattı!`);
    veriyiDuzenle({
      id: GKList[1].id,
      name: GKList[1].name,
      auth: getAuth(GKList[1]),
      CS: 1,
    });
  }

  // if (redS > 1) {
  //   if (blueS < 1) {
  //     room.sendChat(`🏆 ${GKList[0].name}, kalesini gole kapattı!`);
  //     veriyiDuzenle({
  //       id: GKList[0].id,
  //       name: GKList[0].name,
  //       auth: getAuth(GKList[0]),
  //       CS: 1,
  //     });
  //   }
  // } else if (blueS > 1) {
  //   if (redS < 1) {
  //     room.sendChat(`${GKList[1].name}, kalesini gole kapattı ! `);
  //     veriyiDuzenle({
  //       id: GKList[1].id,
  //       name: GKList[1].name,
  //       auth: getAuth(GKList[1]),
  //       CS: 1,
  //     });
  //   }
  // } else {
  //   if (blueS == 0 && redS == 0) {
  //     //   room.sendChat(`${GKList[0].name} ve ${GKList[1].name}, kalelerine topu sokmadilar! Iki isim de bir efsaneydi!`);
  //     if (GKList[0]) {
  //       data = {
  //         id: GKList[0].id,
  //         name: GKList[0].name,
  //         auth: getAuth(GKList[0]),
  //         CS: 1,
  //       };
  //       veriyiDuzenle(data);
  //     }

  //     if (getAuth(GKList[1])) {
  //       $data = {
  //         name: GKList[1].name,
  //         id: GKList[1].id,
  //         auth: getAuth(GKList[1]),
  //         CS: 1,
  //       };
  //       veriyiDuzenle($data);
  //     }
  //   }
  // }
  bahisUpdate();
  // if (redS + (blueS % 2) == 0) {
  //   //CIFT
  //   _cift.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * 2); // *2 yi degistirin hepsi icin gecerli
  //   });
  //   _tek.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * -1);
  //   });
  // } else {
  //   //TEK
  //   _cift.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * -1); // Dogru tahmin edemedigi icin bakiyesinden dusecek yani - ile toplama iste :D -1 ile carpma sebebim miktari azaltmak/dusurmek
  //   });
  //   _tek.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * 2);
  //   });
  // }
  // if (redS + blueS > 2) {
  //   //ust
  //   _ust.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * 2);
  //   });
  //   _alt.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * -1);
  //   });
  // } else {
  //   //alt
  //   _alt.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * 2);
  //   });
  //   _ust.forEach((val, key) => {
  //     bahisVeriGuncelle(key, val * -1);
  //   });
  // }

  veriyiDuzenle({
    name: GKList[0].name,
    id: GKList[0].id,
    auth: getAuth(GKList[0]),
    DM: 1,
  });
  veriyiDuzenle({
    name: GKList[1].name,
    id: GKList[1].id,
    auth: getAuth(GKList[1]),
    DM: 1,
  });
  let playersthatinGame = room
    .getPlayerList()
    .filter((p) => p.team != 0 && p.id != 0);
  let golAtanOyuncular = playersthatinGame.filter(
    (p) => ggol.has(p.id) == true
  );
  let asistYapanOyuncular = playersthatinGame.filter(
    (p) => gassist.has(p.id) == true
  );
  let KendiKalesineAtanlar = playersthatinGame.filter(
    (p) => gkk.has(p.id) == true
  );
  let reds = playersthatinGame.filter((p) => p.team == 1);
  let blues = playersthatinGame.filter((p) => p.team == 2);
  if (winnr == Team.RED) {
    // RED KAZANIRSA
    // redK.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * 2);
    // });
    // blueK.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * -1);
    // });
    // Br.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * -1);
    // });
    reds.forEach((e) => {
      veriyiDuzenle({
        name: e.name,
        id: e.id,
        auth: auths.get(e.id),
        galibiyet: 1,
      });
      bahisVeriGuncelle(auths.get(e.id), 10);
    });
    blues.forEach((e) => {
      veriyiDuzenle({
        id: e.id,
        name: e.name,
        auth: auths.get(e.id),
        maglubiyet: 1,
      });
    });
  }
  if (winnr == Team.BLUE) {
    //BLUE KAZANIRSA
    // redK.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * -1);
    // });
    // blueK.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * 2);
    // });
    // Br.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * -1);
    // });
    blues.forEach((e) => {
      data = { id: e.id, name: e.name, auth: auths.get(e.id), galibiyet: 1 };
      veriyiDuzenle(data);
      bahisVeriGuncelle(auths.get(e.id), 10);
    });
    reds.forEach((e) => {
      data = { id: e.id, name: e.name, auth: auths.get(e.id), maglubiyet: 1 };
      veriyiDuzenle(data);
    });
  }
  if (winnr == Team.SPECTATORS) {
    // BERABERE BITERSE
    // redK.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * -1);
    // });
    // blueK.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * -1);
    // });
    // Br.forEach((val, key) => {
    //   bahisVeriGuncelle(key, val * 3);
    // });
    blues.forEach((e) => {
      data = { name: e.name, id: e.id, auth: auths.get(e.id), beraberlik: 1 };
      veriyiDuzenle(data);
    });
    reds.forEach((e) => {
      data = { name: e.name, id: e.id, auth: auths.get(e.id), beraberlik: 1 };
      veriyiDuzenle(data);
    });
  }
  for (let i = 0; i < playersthatinGame.length; i++) {
    veriyiDuzenle({
      id: playersthatinGame[i].id,
      name: playersthatinGame[i].name,
      auth: auths.get(playersthatinGame[i].id),
      oyunlar: 1,
    });
  }
  // for(let player in playersthatinGame){
  //   let obj = {};
  //   if(gkk.has(player.id)){
  //     obj["kk"] = gkk.get(player.id);
  //   }
  //   if(gassist.has(player.id)){
  //     obj["asist"] = gkk.get(player.id);
  //   }
  //   obj["oyunlar"] = 1;
  //   obj["auth"] = auths.get(player.id);
  //   console.log(playersthatinGame);
  //   console.log(player)
  //   console.log(`Returned object for ${player.name}${obj}`);
  //   veriyiDuzenle(obj);
  // }
  KendiKalesineAtanlar.forEach((e) => {
    data = { auth: auths.get(e.id), kk: gkk.get(e.id), id: e.id, name: e.name };
    veriyiDuzenle(data);
  });
  golAtanOyuncular.forEach((e) => {
    data = {
      name: e.name,
      id: e.id,
      auth: auths.get(e.id),
      gol: ggol.get(e.id),
    };
    veriyiDuzenle(data);
  });
  asistYapanOyuncular.forEach((e) => {
    data = {
      name: e.name,
      id: e.id,
      auth: auths.get(e.id),
      asist: gassist.get(e.id),
    };
    veriyiDuzenle(data);
  });
  PosesionBalonFun();
  // if(gkk.size >= 1){
  //   gkk.forEach((val,key) => {
  //     data = {auth: key , kk: val}
  //     veriyiDuzenle(data)
  //   })
  // }
  // if (ggol.size >=1) {
  //   ggol.forEach((val,key) => {
  //     data = {auth: auths.get(key) , gol : val}
  //     veriyiDuzenle(data)
  //   })
  // }
  // if(gassist.size>=1){
  //   gassist.forEach((val,key) => {
  //     data = {auth : auths.get(key), asist : val}
  //     veriyiDuzenle(data)
  //   })
};
// }
const roomName = "🎇┇Mahzen-MisaL┇GS-FB┇v4-C-TF┇🎇";
const botName = "🤵";
const maxPlayers = 12;
const roomPublic = false;

const siralama = (b) => {
  let sira = [];
  let content = "";
  let x = [
    "player_auth_key",
    "player_name",
    "__amuidpb",
    "_grecaptcha",
    "geo",
    "view_mode",
    "yetkiler",
    "extrapolation",
  ];
  let y = Object.keys(localStorage).filter((d) => !x.includes(d));
  y.forEach((val) => {
    let playerstats = parse(localStorage[val]);
    if (b == "puan") {
      let puan =
        playerstats["galibiyet"] * 10 +
        playerstats["gol"] * 5 +
        playerstats["asist"] * 3 +
        playerstats["CS"] * 5;
      sira.push([playerstats["name"], puan, playerstats["auth"]]);
    }
    if (b == "gol") {
      sira.push([playerstats.name, playerstats[b], playerstats["auth"]]);
    }
    if (b == "asist") {
      sira.push([
        playerstats["name"],
        playerstats["asist"],
        playerstats["auth"],
      ]);
    }
    if (b == "cs") {
      sira.push([playerstats["name"], playerstats["CS"], playerstats["auth"]]);
    }
    if (b == "para") {
      sira.push([
        playerstats["name"],
        playerstats["coins"],
        playerstats["auth"],
      ]);
    }
  });
  let h = sira.sort((c, d) => d[1] - c[1]);
  room.sendAnnouncement(
    `========${b.toUpperCase()} SIRALAMASI========`,
    null,
    0xeb4034
  );
  for (let i = 0; i < (h.length >= 5 ? 5 : h.length); i++) {
    let rozetler = {
      1: "🥇", //1. icin rozet
      2: "🥈", //2. icin rozet
      3: "🥉", //ayni sekilde 3 :D
      4: "🏅",
      5: "🏅",
    };
    content += `${rozetler[i + 1]} ${i + 1}: ${h[i][0]} => ${h[i][1]}\n`;
    // content += `${b.toUpperCase()} Siralamasi : ${i + 1}: ${h[i][0]} => ${
    //   h[i][1]
    // }\n`;
  }
  return content;
};
const girisYapanlar = new Set();
const dataSchema = {
  id: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  name: {
    isRequired: false,
    valueChecker: function (a) {
      return typeof a == "string";
    },
  },
  beraberlik: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  asist: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  gol: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  kk: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  CS: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  DM: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  galibiyet: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  maglubiyet: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  auth: {
    isRequired: true,
    length: 43,
    valueChecker: function (a) {
      return typeof a == "string" && a.length == this.length;
    },
  },
  oyunlar: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
  coins: {
    isRequired: false,
    valueChecker: function (a) {
      return !Number.isNaN(a);
    },
  },
};

/**
 * ? ==================================Bahis fonksiyonlari ==================================
 * * ==================================Bahis fonksiyonlari ==================================
 * ! ==================================Bahis fonksiyonlari ==================================
 */

function authunIDsiniBul(a) {
  let id = undefined;
  let y = _auths;
  y.forEach((val, key) => {
    console.log(`${val} ${key}`);
    if (val == a) {
      id = key;
    }
  });

  return id;
}
function bahisVeriGuncelle(P_auth, coins) {
  let _id = authunIDsiniBul(P_auth);
  if (!_id) return;
  veriyiDuzenle({ id: _id, auth: P_auth, coins });
}

function bahisYardim(p) {
  room.sendAnnouncement(
    `${p.name}, Kullanım şekli=> !bahis [(red|r|kırmızı)(blue|bl)|(br|berabere)] [miktar]`,
    p.id,
    0xffff00
  );
  room.sendAnnouncement("Maksimum 25$ harcayabilirsiniz!", p.id);
  room.sendAnnouncement(
    "Örnek kullanım: !bahis üst|alt 10 => 2 gol üst'e/alt'a 10 para oynarsınız!",
    p.id,
    0xffff00
  );
  room.sendAnnouncement(
    "Örnek kullanım: !bahis red 10 => red(kırmızı) takıma kazanacagına dair 10 para oynarsınız!",
    p.id,
    0xffff00
  );
  room.sendAnnouncement(
    "💰 Zenginleri görmek için !zenginler yazın. 💰",
    p.id,
    0xffff00
  );
}

function bahisToplam(p) {
  let toplam = 0;
  if (_alt.has(auths.get(p.id))) {
    toplam += _alt.get(auths.get(p.id));
  }
  if (_ust.has(auths.get(p.id))) {
    toplam += _ust.get(auths.get(p.id));
  }
  if (redK.has(auths.get(p.id))) {
    toplam += redK.get(p.id);
  }
  if (blueK.has(auths.get(p.id))) {
    toplam += blueK.get(auths.get(p.id));
  }
  if (Br.has(auths.get(p.id))) {
    toplam += Br.get(auths.get(p.id));
  }
  return toplam;
}

function bahisUpdate() {
  if ((_redScore + _blueScore) % 2 == 0) {
    _cift.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
    _tek.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
  } else {
    _tek.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
    _cift.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
  }
  if (_redScore > _blueScore) {
    redK.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
    blueK.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
    Br.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
  }
  if (_blueScore > _redScore) {
    redK.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
    blueK.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
    Br.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
  }
  if (_blueScore == _redScore) {
    redK.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
    blueK.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
    Br.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
  }
  if (_redScore + _blueScore > 2) {
    _alt.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
    _ust.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
  }
  if (_redScore + _blueScore <= 2) {
    _alt.forEach((val, key) => {
      bahisVeriGuncelle(key, val * 2);
    });
    _ust.forEach((val, key) => {
      bahisVeriGuncelle(key, val * -1);
    });
  }
}

function bahisOyna(p, m) {
  let oS;
  let sdd;
  if (bahisOynamaSayisi.has(auths.get(p.id))) {
    if (bahisOynamaSayisi.get(auths.get(p.id)) == 3) {
      room.sendAnnouncement(
        "3 kereden fazla bahis oynayamazsınız.",
        p.id,
        0xffff00
      );
      return;
    }
  }
  const { coins } = parse(localStorage.getItem(auths.get(p.id)));
  console.log(coins);
  const { name, id } = p;
  let cmdreg = /^![\wĞÜÖÇİŞşğıüöç]+/gi;
  m = m.replace(cmdreg, "");
  let oSm = m.match(
    /((red|r)|(blue|bl)|(br|berabere)|(tek|cift|çift)|(ust|alt|üst))/i
  );
  console.log(oSm);
  if (!oSm || oSm?.length < 1) {
    room.sendAnnouncement(
      "Oynama biçiminiz tespit edilemedi. " + name + "!",
      id,
      0xffff00
    );
    bahisYardim(p);
    return;
  }

  [oS] = oSm;

  let mma = m.match(/\d+$/);

  if (!mma?.length || !mma) {
    room.sendAnnouncement(
      "Miktar tespit edilemedi. " + name + "!",
      id,
      0xffff00
    );
    bahisYardim(p);
    return;
  }
  let [miktar] = mma;
  miktar = Number(miktar);
  console.log(miktar);
  if (bahisToplam(p) + miktar > coins) {
    room.sendAnnouncement(
      "Oynadıgınız miktar, bütçenizi aşıyor! Kullanımınıza dikkat edin!",
      id,
      0xffff00
    );
    return;
  }
  if (!parse(localStorage.getItem("yetkiler")).vips.includes(auths.get(id))) {
    if (miktar > 25) {
      room.sendAnnouncement(
        "Oynamak istediginiz miktar 25'ten büyük olamaz!",
        id,
        0xffff00
      );
      return;
    }
  }
  // if(!oS)
  // {
  //   room.sendAnnouncement("Oynama sekliniz tespit edilmedi",id);
  // }
  console.log(oS);
  oS = oS.toLowerCase();
  if (["red", "r"].includes(oS)) {
    if (!redK.has(auths.get(id))) {
      redK.set(auths.get(id), miktar);
      room.sendAnnouncement("Bahisiniz red'e başarıyla oynandı!", id, 0xffff00);
    } else {
      return;
    }
  }
  if (["blue", "bl"].includes(oS)) {
    if (!blueK.has(auths.get(id))) {
      blueK.set(auths.get(id), miktar);
      room.sendAnnouncement(
        "Bahisiniz blue'ya başarıyla oynandı!",
        id,
        0xffff00
      );
    } else {
      return;
    }
  }
  if (["berabere", "br"].includes(oS)) {
    if (!Br.has(auths.has(id))) {
      Br.set(auths.get(id), miktar);
      room.sendAnnouncement(
        "Bahisiniz berabere olacak şeklinde başarıyla oynandı!",
        id,
        0xffff00
      );
    } else {
      return;
    }
  }
  if (["alt"].includes(oS)) {
    if (!_alt.has(auths.has(id))) {
      _alt.set(auths.get(id), miktar);
      room.sendAnnouncement(
        "Bahisiniz 2 gol alt'a başarıyla oynandı!",
        id,
        0xffff00
      );
    } else {
      return;
    }
  }
  if (["ust", "üst"].includes(oS)) {
    if (!_ust.has(auths.has(id))) {
      _ust.set(auths.get(id), miktar);
      room.sendAnnouncement(
        "Bahisiniz 2 gol üst'e başarıyla oynandı!",
        id,
        0xffff00
      );
    } else {
      return;
    }
  }
  if (["tek"].includes(oS)) {
    if (!_tek.has(auths.get(id))) {
      _tek.set(auths.get(id), miktar);
      room.sendAnnouncement("Bahisiniz tek'e başarıyla oynandı!", id, 0xffff00);
    } else {
      return;
    }
  }
  if (["cift", "çift"].includes(oS.replace(" ", ""))) {
    if (!_cift.has(auths.get(id))) {
      _cift.set(auths.get(id), miktar);
      room.sendAnnouncement(
        "Bahisiniz çift'e başarıyla oynandı!",
        id,
        0xffff00
      );
    } else {
      return;
    }
  }
  // (!bahisOynamaSayisi.has(auths.get(id))) ?
  // bahisOynamaSayisi.set(auths.get(id),1) :
  // bahisOynamaSayisi.set(auths.get(id),bahisOynamaSayisi.get(auths.get(id))++);
  let playerauth = auths.get(id);
  if (bahisOynamaSayisi.has(playerauth)) {
    let d = bahisOynamaSayisi.get(playerauth);
    d += 1;
    bahisOynamaSayisi.set(playerauth, d);
  } else {
    bahisOynamaSayisi.set(playerauth, 1);
  }
}

const resetStats = () => {
  gassist.clear();
  ggol.clear();
  gkk.clear();
  bahisOynamaSayisi.clear();
  _alt.clear();
  redK.clear();
  blueK.clear();
  Br.clear();
  _ust.clear();
};
let { parse, stringify } = JSON;
const checkSchema = (data) => {
  if (!(data instanceof Object))
    throw new Error("Data parametresi Object degil!");
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    let schemaVal = Object.keys(dataSchema);
    let key = keys[i];
    if (!schemaVal.includes(key)) {
      throw new Error(`${key} degeri schema'da bulunmuyor!`);
    }
    schemaVal.forEach((e) => {
      if (dataSchema[e].isRequired) {
        if (!keys.includes(e))
          throw new Error(
            `${e} parametresinin veride bulunması gerekmektedir!`
          );
      }
    });
  }
};
const checkPass = (pass, b) => {
  return veriAl(getAuth(b)).pass == pass;
};
const kullaniciyiEkle = (player, pass) => {
  const defaultData = {
    auth: auths.get(player.id),
    name: player.name,
    pass,
    asist: 0,
    gol: 0,
    kk: 0,
    CS: 0,
    DM: 0,
    galibiyet: 0,
    maglubiyet: 0,
    beraberlik: 0,
    oyunlar: 0,
    coins: 100,
  };
  if (!localStorage.getItem(getAuth(player)))
    localStorage.setItem(getAuth(player), stringify(defaultData));
};
const veriAl = (auth) => {
  if (!localStorage.getItem(auth)) return false;
  return parse(localStorage.getItem(auth));
};
const veriyiDuzenle = (data) => {
  checkSchema(data);
  if (!veriAl(data.auth) || !girisYapanlar.has(data.id)) {
    // room.sendAnnouncement(`${data.name}, kayitli olmadiginiz/giris yapmadiginiz icin verileriniz kaydedilmeyecektir.`,data.id);
    return;
  }
  let d = localStorage.getItem(data.auth);
  let j = parse(d);
  let xxx = ["auth", "name", "id"];
  let x = Object.keys(data).filter((y) => xxx.includes(y) == false);
  console.log(`J: ${j}`);
  x.forEach((e) => {
    console.log(`e => ${e}`);
    // let valChecker = dataSchema[e]?.valueChecker;
    // if (valChecker instanceof Function || typeof valChecker == "function") {
    //   if (!valChecker(j[e]))
    //     return new Error(`Deger gerekli kosullari karsilamiyor!`);
    // } else {
    //   //* Eger eklediginiz deger fonksiyon degilse yapilacaklar
    // }
    if (dataSchema[e]?.valueChecker?.(data[e]) == false) {
      return new Error("Deger, gerekli koşulları karşılamıyor!");
    }
    j[e] += data[e]; //! eklenecek degerlerin hepsi sayi oldugu icin += koydum. duzenlemek isterseniz degerleri kontrol ederek eklemeleri yaparsiniz.
  });
  localStorage.setItem(data.auth, stringify(j));
  console.log(localStorage.getItem(data.auth));
};
let suresayac = undefined,
  sayac;
let m;
/* ROOM */
const room = HBInit({
  roomName,
  maxPlayers,
  public: roomPublic,
  playerName: botName,
});

var ScoresNumbers = "0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣";
var boldedNumbers = "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗";
var circledNumbers = "🄋⓵⓶⓷⓸⓹⓺⓻⓼⓽";

function boldedNumber(num) {
  var result = "";
  var reversedDigits = [];
  do {
    reversedDigits.push(num % 10);
    num = Math.floor(num / 10);
  } while (num > 0);
  for (var i = reversedDigits.length; i-- > 0; ) {
    result += boldedNumbers.substr(reversedDigits[i] * 2, 2);
  }

  return result;
}

function scorerNumber(num) {
  var result = "";
  var reversedDigits = [];
  do {
    reversedDigits.push(num % 10);
    num = Math.floor(num / 10);
  } while (num > 0);
  for (var i = reversedDigits.length; i-- > 0; ) {
    result += ScoresNumbers.substr(reversedDigits[i] * 3, 3);
  }

  return result;
}

function circledNumber(num) {
  var result = "";
  var reversedDigits = [];
  do {
    reversedDigits.push(num % 10);
    num = Math.floor(num / 10);
  } while (num > 0);
  for (var i = reversedDigits.length; i-- > 0; ) {
    if (reversedDigits[i] == 0) {
      result += circledNumbers.substr(reversedDigits[i], 2);
    } else {
      result += circledNumbers.substr(1 + reversedDigits[i], 1);
    }
  }

  return result;
}

const yuzdehesapla = (a, b) => (a / b) * 100; // a'nin b'ye yuzdesini hesaplar
const sureSiniri = 1;
const hesapla = (int) => {
  let x = int % 60;
  let y = int - x;
  let a = y / 60;
  // return `${int >= 60 ? a + " dakika" : ""} ${x > 0 ? x + " saniye" : ""}`;
  return {
    a,
    x,
  };
};
const siram = (auth) => {
  let sira = [];
  let x = ["player_auth_key", "player_name", "__amuidpb", "_grecaptcha", "geo"];
  let y = Object.keys(localStorage).filter((d) => x.includes(d) == false);
  y.forEach((val) => {
    let playerstats = parse(localStorage[val]);
    console.log(`${playerstats}
    ${playerstats.name} ${playerstats.auth}`);

    let puan =
      playerstats["galibiyet"] * 10 +
      playerstats["gol"] * 5 +
      playerstats["asist"] * 3 +
      playerstats["CS"] * 5;
    console.log(playerstats);
    sira.push([
      playerstats.name,
      Number.isNaN(puan) ? 0 : puan,
      playerstats["auth"],
    ]);
  });
  let d = sira.sort((a, b) => b[1] - a[1]);

  console.log(d);
  return `${
    d.indexOf(d.find((val) => val[2] == auth)) != -1
      ? `${d.indexOf(d.find((val) => val[2] == auth)) + 1}/${d.length}`
      : `?/${d.length}`
  }`;
  //return `${d.indexOf(d.find((val) => val[2] == auth)) + 1}/${d.length}`;
};
const istatistikleriGoruntule = (auth) => {
  /**
   *       let puan =
        playerstats["galibiyet"] * 10 +
        playerstats["gol"] * 5 +
        playerstats["asist"] * 3 +
        playerstats["CS"] * 5;
   */
  let x = parse(localStorage.getItem(auth));
  return `: ➤ [🅿 P: ${
    x.galibiyet * 10 + x.gol * 5 + x.asist * 3 + x.CS * 5
  }], [⚽ Gol : ${x.gol}], [👟 Ass : ${x.asist}], [📈 GY: % ${
    !Number.isNaN(yuzdehesapla(x.galibiyet, x.oyunlar))
      ? yuzdehesapla(x.galibiyet, x.oyunlar)
      : 0
  }], [🥅 CS : ${x.CS}], [⛹ O.M: ${
    //, [🛡️ DM: ${x.DM}]
    x.oyunlar
  }],[🔺 G : ${x.galibiyet}], [🔻 M: ${x.maglubiyet}], [🤝 BR: ${
    x.beraberlik
  }], [😢 KK : ${x.kk}]`;
};
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let sure = undefined;
const uzatilacaksure = () => {
  return randomIntFromInterval(40, 80);
};
const uzatma = () => {
  let { getScores } = room;
  let { time } = getScores();
  if (!sure) {
    if (Math.floor(time) >= sureSiniri * 60) {
      const y = uzatilacaksure();
      const d = hesapla(y);
      m = `🕐 Bitiş zamanı => ${
        d.a > 0
          ? `${
              sureSiniri + d.a < 10
                ? `0${sureSiniri + d.a}`
                : `${sureSiniri + d.a}`
            }`
          : `${sureSiniri}`
      }:${d.x < 10 ? `0${d.x}` : `${d.x}`} `;
      room.sendAnnouncement(`${m}`, null, 0x007fff, "bold");
      sure = y;
      // sure = uzatilacaksure();
      // suresayac = Date.now() + sure * 1000;
      // room.sendAnnouncement(`Oyun, ${hesapla(sure)} uzatildi`);
    }
  }
  if (time >= sureSiniri * 60 + sure) {
    const { red: redS, blue: blueS } = room.getScores();
    let winner =
      redS > blueS ? Team.RED : blueS > redS ? Team.BLUE : Team.SPECTATORS;
    _redScore = redS;
    _blueScore = blueS;
    uzatmaBitti = true;
    room.stopGame();
    lastWinner = winner;

    // end(winner)
  }
};
const yetkiTagleri = {
  kurucu: "👑KURUCU",
  yetkili: "⭐Yetkili",
  moderator: "Moderator",
  odaadmin: "Oda-Admin",
};
/*
const roomVersion = "1";
const welcomeMessages = {
  version: room.sendAnnouncement(`Oda surumu : ${roomVersion}`),
  uyarilar: [""],
};
*/
var init = "init"; // Smth to initialize smth
init.id = 0; // Faster than getting host's id with the method
init.name = "init";
var whoTouchedLast; // var representing the last player who touched the ball
var whoTouchedBall = [init, init]; // Array where will be set the 2 last players who touched the ball
var susturulanlar = [];
let sustur = false,
  zaman = false;

var stadiumWidth = 1150;
var stadiumHeight = 578;
var radiusBall = 9.8;
var throwInLeeway = 350;
var greenLine = 510;

//var triggerDistance = radiusBall + 15 + 0.01;
var outLineY = stadiumWidth - radiusBall / 2 + 6;
stadiumWidth += radiusBall / 2 + 6;
stadiumHeight += radiusBall / 2 + 6;

const playerRadius = 15;

const triggerDistance = playerRadius + radiusBall + 0.01;

let connections = [];

var reg =
  /[\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD\u0600-\u06FF]/g;
var Kontrol = (message) => (reg.test(message) ? true : false);

var arregex = /[\u0600-\u06FF]/;
var arapcaKontrol = (message) => (arregex.test(message) ? true : false);

var auth1 = "ACydCe8DjqPt8Gth1MlZ9BeirnMG-VHtD_QygXJwQbQ"; // ID: Ömer | ᴍᴇʀʟɪɴᴜꜱ
var auth2 = ""; // ID: Nick

var adminAuths = [auth1, auth2];

var adminJoin = ["Ömer | ᴍᴇʀʟɪɴᴜꜱ", ""];

var yasakli1 = "auth"; // ID:
var yasakli2 = "nFo2gnXz225tbR2qOqi-94h-j7XBYbMwgvWH6Pacwoo"; // ID: Astronoid
var yasakli3 = "iLJVmXIzYmKpxhBXNtiQbCnpdxglMPY7YMJCdMfvl8k"; // ID: şerefsiz
var yasakli4 = "cXLG4tEf8K6qE6ELmsBA-5C4Nt6LXiHyJfTlMvMFb3Y"; // ID: EcimForun
var yasakli5 = "cT3jEDEcm_YyjrBjQcfItjWadDCf-SiPMEiAFObABYk"; // ID: samatta/q7
var yasakli6 = "vewYtQEHWFKr6UfZlhExuogz927bGjPlZrmHVzt9dck"; // ID: şerefsiz
var yasakli7 = "aQEeJbsHFl0S1ZPx7Kh4O_OgdVl27mykv9LtpYjKDiI"; // ID: şerefsiz
var yasakli8 = "k8psWGJnoXWPa3ru1-4zfK5Le0bHS5_qIQDDRiwi5HI"; // ID: cristiano gedson
var yasakli9 = "WEcde7dEKZlYcoBhYvN5ht5mnTNEnoTlcVKvR8nOIdU"; // ID: kara|fazy

var yasakliList = [
  yasakli1,
  yasakli2,
  yasakli3,
  yasakli4,
  yasakli5,
  yasakli6,
  yasakli7,
  yasakli8,
  yasakli9,
];

//    room.setScoreLimit(0);
//    room.setTimeLimit(5);

room.setTeamsLock(true);
var mutedPlayers = [];

function getAuth(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.AUTH]
    : null;
}

function sendAnnouncementToDiscord(message) {
  var request = new XMLHttpRequest();
  request.open(
    "POST",
    "https://discord.com/api/webhooks/839596827535343636/sMkes-BgMTzQfNH4PJDvmbSaYc7qor4VSjwRQbCBjpv0Mkq0eqePM4ct_SyiRnGm04m9"
  );

  request.setRequestHeader("Content-type", "application/json");

  var params = {
    avatar_url: "",
    username: "",
    content: message,
  };

  request.send(JSON.stringify(params));
}

function sendAnnouncementToDiscord2(message) {
  var request = new XMLHttpRequest();
  request.open(
    "POST",
    "https://discord.com/api/webhooks/845773573079040060/XhUrreiEt8YROjbC3QrRBoEyGtfqdF_ip6mv3GViLCYsv6vFyNcK8Rq9kUvmIR00mIR7"
  );

  request.setRequestHeader("Content-type", "application/json");

  var params = {
    avatar_url: "",
    username: "",
    content: message,
  };

  request.send(JSON.stringify(params));
}

var redScore = 0;
var blueScore = 0;
var team1 = "Galatasaray";
var team2 = "Fenerbahçe";
let authList = {
  "http://haxball.com/playerauth": {
    pass: "9999",
    role: "kurucu",
    color: 0xff0000,
  },
  "AUTH":{
pass:"11231",
role:"admin",
color:0xff0000
}
};
var tagList = {};

String.prototype.format = function () {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k]);
  }
  return a;
};

typeScore = function () {
  var scoreString = "🏆Puan Durumu = {0} {1} - {2} {3} 🏆";
  room.sendAnnouncement(
    scoreString.format(team1, redScore, blueScore, team2),
    null,
    0x00ffdd,
    "normal",
    2
  );
};

/*
const scoreLimitClassic = 3;
const scoreLimitBig = 3;
const timeLimitClassic = 3;
const timeLimitBig = 3;
*/

var adminPassword = 4256 + getRandomInt(4256);
console.log("adminPassword : " + adminPassword);
var Guest = "🔰 Oyuncu | ";
var Admin = "🔱 Admin | ";
var AdminColor = "0xFF0000";
var GuestColor = "0xBAB0FF";

/* STADIUM */
var şampiyonluk = `{"name":"Şampiyon | M&M","width":400,"height":192,"bg":{"type":"hockey"},"vertexes":[{"x":-58.5,"y":188,"cMask":["wall"],"cGroup":["all"]},{"x":57.5,"y":188,"cMask":["wall"],"cGroup":["all"]},{"x":-46.5,"y":187,"cMask":["wall"],"cGroup":["all"]},{"x":-37.5,"y":175,"cMask":["wall"],"cGroup":["all"]},{"x":46.5,"y":187,"cMask":["wall"],"cGroup":["all"]},{"x":37.5,"y":175,"cMask":["wall"],"cGroup":["all"]},{"x":-17.5,"y":137,"cMask":["wall"],"cGroup":["all"]},{"x":17.5,"y":137,"cMask":["wall"],"cGroup":["all"]},{"x":-61.5,"y":-27,"cMask":["wall"],"cGroup":["all"]},{"x":61.5,"y":-27,"cMask":["wall"],"cGroup":["all"]},{"x":-44.5,"y":-48,"cMask":["wall"],"cGroup":["all"]},{"x":44.5,"y":-48,"cMask":["wall"],"cGroup":["all"]},{"x":-46.5,"y":-63,"cMask":["wall"],"cGroup":["all"]},{"x":46.5,"y":-63,"cMask":["wall"],"cGroup":["all"]},{"x":-55.5,"y":-80,"cMask":["wall"],"cGroup":["all"]},{"x":55.5,"y":-80,"cMask":["wall"],"cGroup":["all"]},{"x":-95.5,"y":-99,"cMask":["wall"],"cGroup":["all"]},{"x":95.5,"y":-99,"cMask":["wall"],"cGroup":["all"]},{"x":-33.5,"y":117,"cMask":["wall"],"cGroup":["all"]},{"x":33.5,"y":117,"cMask":["wall"],"cGroup":["all"]},{"x":-42.5,"y":-49,"cMask":["wall"],"cGroup":["all"]},{"x":-53.5,"y":-81,"cMask":["wall"],"cGroup":["all"]},{"x":-93.5,"y":-100,"cMask":["wall"],"cGroup":["all"]},{"x":-31.5,"y":116,"cMask":["wall"],"cGroup":["all"]},{"x":42.5,"y":-48,"cMask":["wall"],"cGroup":["all"]},{"x":53.5,"y":-80,"cMask":["wall"],"cGroup":["all"]},{"x":93.5,"y":-99,"cMask":["wall"],"cGroup":["all"]},{"x":31.5,"y":117,"cMask":["wall"],"cGroup":["all"]},{"x":-59.5,"y":187,"cMask":["wall"],"cGroup":["all"]},{"x":56.5,"y":187,"cMask":["wall"],"cGroup":["all"]},{"x":-47.5,"y":186,"cMask":["wall"],"cGroup":["all"]},{"x":-38.5,"y":174,"cMask":["wall"],"cGroup":["all"]},{"x":45.5,"y":186,"cMask":["wall"],"cGroup":["all"]},{"x":36.5,"y":174,"cMask":["wall"],"cGroup":["all"]},{"x":-18.5,"y":136,"cGroup":["all"]},{"x":16.5,"y":136,"cGroup":["all"]},{"x":-62.5,"y":-28,"cGroup":["all"]},{"x":60.5,"y":-28,"cGroup":["all"]},{"x":-45.5,"y":-49,"cMask":["wall"],"cGroup":["all"]},{"x":43.5,"y":-49,"cMask":["wall"],"cGroup":["all"]},{"x":-47.5,"y":-64,"cMask":["wall"],"cGroup":["all"]},{"x":45.5,"y":-64,"cMask":["wall"],"cGroup":["all"]},{"x":-34.5,"y":116,"cMask":["wall"],"cGroup":["all"]},{"x":32.5,"y":116,"cMask":["wall"],"cGroup":["all"]},{"x":-32.5,"y":115,"cMask":["wall"],"cGroup":["all"]},{"x":30.5,"y":116,"cMask":["wall"],"cGroup":["all"]},{"x":-64.5,"y":16,"cGroup":["all"]},{"x":63.5,"y":16,"cGroup":["all"]},{"x":-61.5,"y":42,"cMask":["wall"],"cGroup":["all"]},{"x":59.5,"y":42,"cMask":["wall"],"cGroup":["all"]},{"x":-48.79999923706055,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-58.79999923706055,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-57.79999923706055,"y":37.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":-47.79999923706055,"y":37.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":-43.79999923706055,"y":19.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-43.79999923706055,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":-44.79999923706055,"y":28.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-34.79999923706055,"y":28.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-33.79999923706055,"y":19.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-33.79999923706055,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":-27.799999237060547,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-27.799999237060547,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":-16.799999237060547,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-16.799999237060547,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":-27.799999237060547,"y":28.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-17.799999237060547,"y":28.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-10.799999237060547,"y":19.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-10.799999237060547,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":2.200000762939453,"y":19.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":2.200000762939453,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":-4.799999237060547,"y":28.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":8.200000762939453,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":8.200000762939453,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":19.200000762939453,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":19.200000762939453,"y":30.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":8.200000762939453,"y":30.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":25.200000762939453,"y":19.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":25.200000762939453,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":31.200000762939453,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":31.200000762939453,"y":37.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":41.20000076293945,"y":20.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":41.20000076293945,"y":37.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":46.20000076293945,"y":19.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":46.20000076293945,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":56.20000076293945,"y":38.39999961853027,"cMask":["wall"],"cGroup":["all"]},{"x":56.20000076293945,"y":19.399999618530273,"cMask":["wall"],"cGroup":["all"]},{"x":-328.5,"y":188,"cMask":["wall"],"cGroup":["all"]},{"x":-294.5,"y":188,"cMask":["wall"],"cGroup":["all"]},{"x":328.5,"y":188,"cMask":["wall"],"cGroup":["all"]},{"x":294.5,"y":188,"cMask":["wall"],"cGroup":["all"]},{"x":-294.5,"y":179,"cMask":["wall"],"cGroup":["all"]},{"x":294.5,"y":179,"cMask":["wall"],"cGroup":["all"]},{"x":-328.5,"y":179,"cMask":["wall"],"cGroup":["all"]},{"x":328.5,"y":179,"cMask":["wall"],"cGroup":["all"]},{"x":-319.5,"y":178,"cMask":["wall"],"cGroup":["all"]},{"x":-314.5,"y":159,"cMask":["wall"],"cGroup":["all"]},{"x":319.5,"y":178,"cMask":["wall"],"cGroup":["all"]},{"x":314.5,"y":159,"cMask":["wall"],"cGroup":["all"]},{"x":-302.5,"y":178,"cMask":["wall"],"cGroup":["all"]},{"x":-297.5,"y":161,"cMask":["wall"],"cGroup":["all"]},{"x":302.5,"y":178,"cMask":["wall"],"cGroup":["all"]},{"x":297.5,"y":161,"cMask":["wall"],"cGroup":["all"]},{"x":-309.5,"y":150,"cMask":["wall"],"cGroup":["all"]},{"x":-297.5,"y":118,"cMask":["wall"],"cGroup":["all"]},{"x":309.5,"y":150,"cMask":["wall"],"cGroup":["all"]},{"x":297.5,"y":118,"cMask":["wall"],"cGroup":["all"]},{"x":-301.5,"y":152,"cMask":["wall"],"cGroup":["all"]},{"x":-270.5,"y":84,"cMask":["wall"],"cGroup":["all"]},{"x":301.5,"y":152,"cMask":["wall"],"cGroup":["all"]},{"x":270.5,"y":84,"cMask":["wall"],"cGroup":["all"]},{"x":-293.5,"y":152,"cMask":["wall"],"cGroup":["all"]},{"x":-259.5,"y":113,"cMask":["wall"],"cGroup":["all"]},{"x":293.5,"y":152,"cMask":["wall"],"cGroup":["all"]},{"x":259.5,"y":113,"cMask":["wall"],"cGroup":["all"]},{"x":-260.5,"y":88,"cMask":["wall"],"cGroup":["all"]},{"x":-191.5,"y":28,"cMask":["wall"],"cGroup":["all"]},{"x":260.5,"y":88,"cMask":["wall"],"cGroup":["all"]},{"x":191.5,"y":28,"cMask":["wall"],"cGroup":["all"]},{"x":-291.5,"y":82,"cMask":["wall"],"cGroup":["all"]},{"x":-265.5,"y":9,"cMask":["wall"],"cGroup":["all"]},{"x":291.5,"y":82,"cMask":["wall"],"cGroup":["all"]},{"x":265.5,"y":9,"cMask":["wall"],"cGroup":["all"]},{"x":-247.5,"y":50,"cMask":["wall"],"cGroup":["all"]},{"x":-220.5,"y":1,"cMask":["wall"],"cGroup":["all"]},{"x":247.5,"y":50,"cMask":["wall"],"cGroup":["all"]},{"x":220.5,"y":1,"cMask":["wall"],"cGroup":["all"]},{"x":252.5,"y":26,"cMask":["wall"],"cGroup":["all"]},{"x":278.5,"y":72,"cMask":["wall"],"cGroup":["all"]},{"x":-252.5,"y":26,"cMask":["wall"],"cGroup":["all"]},{"x":-278.5,"y":72,"cMask":["wall"],"cGroup":["all"]},{"x":210.5,"y":19,"cMask":["wall"],"cGroup":["all"]},{"x":249.5,"y":68,"cMask":["wall"],"cGroup":["all"]},{"x":-210.5,"y":19,"cMask":["wall"],"cGroup":["all"]},{"x":-249.5,"y":68,"cMask":["wall"],"cGroup":["all"]},{"x":205.5,"y":64,"cMask":["wall"],"cGroup":["all"]},{"x":269.5,"y":109,"cMask":["wall"],"cGroup":["all"]},{"x":-205.5,"y":64,"cMask":["wall"],"cGroup":["all"]},{"x":-269.5,"y":109,"cMask":["wall"],"cGroup":["all"]},{"x":287.5,"y":86,"cMask":["wall"],"cGroup":["all"]},{"x":295.5,"y":108,"cMask":["wall"],"cGroup":["all"]},{"x":-287.5,"y":86,"cMask":["wall"],"cGroup":["all"]},{"x":-295.5,"y":108,"cMask":["wall"],"cGroup":["all"]},{"x":-87.5,"y":-175,"cGroup":["all"]},{"x":-87.5,"y":-126,"cGroup":["all"]},{"x":-51.5,"y":-126,"cGroup":["all"]},{"x":-69.5,"y":-148,"cGroup":["all"]},{"x":-69.5,"y":-148,"cGroup":["all"]},{"x":-51.5,"y":-175,"cGroup":["all"]},{"x":-51.5,"y":-126,"cGroup":["all"]},{"x":-43.5,"y":-175,"cGroup":["all"]},{"x":-43.5,"y":-125,"cGroup":["all"]},{"x":-35.5,"y":-175,"cGroup":["all"]},{"x":-35.5,"y":-125,"cGroup":["all"]},{"x":-7.5,"y":-125,"cGroup":["all"]},{"x":-7.5,"y":-175,"cGroup":["all"]},{"x":-7.5,"y":-125,"cGroup":["all"]},{"x":-0.5,"y":-175,"cGroup":["all"]},{"x":-0.5,"y":-125,"cGroup":["all"]},{"x":27.5,"y":-125,"cGroup":["all"]},{"x":27.5,"y":-175,"cGroup":["all"]},{"x":27.5,"y":-125,"cGroup":["all"]},{"x":36.5,"y":-173,"cGroup":["all"]},{"x":36.5,"y":-126,"cGroup":["all"]},{"x":61.5,"y":-173,"cGroup":["all"]},{"x":61.5,"y":-126,"cGroup":["all"]},{"x":35.5,"y":-150,"cGroup":["all"]},{"x":56.5,"y":-150,"cGroup":["all"]},{"x":67.5,"y":-173,"cGroup":["all"]},{"x":67.5,"y":-124,"cGroup":["all"]},{"x":67.5,"y":-173,"cGroup":["all"]},{"x":67.5,"y":-148,"cGroup":["all"]},{"x":86.5,"y":-124,"cGroup":["all"]},{"x":-97.5,"y":-182,"cGroup":["all"]},{"x":-97.5,"y":-119,"cGroup":["all"]},{"x":97.5,"y":-182,"cGroup":["all"]},{"x":97.5,"y":-119,"cGroup":["all"]},{"x":-186.5,"y":-151,"cGroup":["all"]},{"x":-160.5,"y":-131,"cGroup":["all"]},{"x":186.5,"y":-151,"cGroup":["all"]},{"x":160.5,"y":-131,"cGroup":["all"]},{"x":-186.5,"y":-111,"cGroup":["all"]},{"x":-160.5,"y":-131,"cGroup":["all"]},{"x":186.5,"y":-111,"cGroup":["all"]},{"x":160.5,"y":-131,"cGroup":["all"]},{"x":-98,"y":-111,"cGroup":["all"]},{"x":98,"y":-111,"cGroup":["all"]},{"x":-188,"y":-151,"cGroup":["all"]},{"x":-98,"y":-151,"cGroup":["all"]},{"x":187,"y":-151,"cGroup":["all"]},{"x":97,"y":-151,"cGroup":["all"]}],"segments":[{"v0":0,"v1":1,"cMask":["wall"],"cGroup":["all"]},{"v0":2,"v1":3,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":5,"v1":4,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":6,"v1":3,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":5,"v1":7,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":6,"v1":8,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":9,"v1":7,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":10,"v1":8,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":9,"v1":11,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":12,"v1":10,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":11,"v1":13,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":12,"v1":13,"curve":39.39844964942096,"curveF":2.7930107526881702,"cMask":["wall"],"cGroup":["all"]},{"v0":10,"v1":14,"curve":119.99999999999999,"curveF":0.577350269189626,"cMask":["wall"],"cGroup":["all"]},{"v0":15,"v1":11,"curve":119.99999999999999,"curveF":0.577350269189626,"cMask":["wall"],"cGroup":["all"]},{"v0":16,"v1":14,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"cGroup":["all"]},{"v0":15,"v1":17,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"cGroup":["all"]},{"v0":18,"v1":16,"curve":50,"curveF":2.1445069205095586,"cMask":["wall"],"cGroup":["all"]},{"v0":17,"v1":19,"curve":50,"curveF":2.1445069205095586,"cMask":["wall"],"cGroup":["all"]},{"v0":20,"v1":21,"curve":119.99999999999999,"curveF":0.577350269189626,"cMask":["wall"],"cGroup":["all"]},{"v0":22,"v1":21,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"cGroup":["all"]},{"v0":23,"v1":22,"curve":50,"curveF":2.1445069205095586,"cMask":["wall"],"cGroup":["all"]},{"v0":25,"v1":24,"curve":119.99999999999999,"curveF":0.577350269189626,"cMask":["wall"],"cGroup":["all"]},{"v0":25,"v1":26,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"cGroup":["all"]},{"v0":26,"v1":27,"curve":50,"curveF":2.1445069205095586,"cMask":["wall"],"cGroup":["all"]},{"v0":28,"v1":29,"cMask":["wall"],"cGroup":["all"]},{"v0":30,"v1":31,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":33,"v1":32,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":34,"v1":31,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":33,"v1":35,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":34,"v1":36,"curve":49.550281137663866,"curveF":2.1666666666666656,"cGroup":["all"]},{"v0":37,"v1":35,"curve":49.550281137663866,"curveF":2.1666666666666656,"cGroup":["all"]},{"v0":38,"v1":36,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":37,"v1":39,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":40,"v1":38,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":39,"v1":41,"curve":49.550281137663866,"curveF":2.1666666666666656,"cMask":["wall"],"cGroup":["all"]},{"v0":40,"v1":41,"curve":39.39844964942096,"curveF":2.7930107526881702,"cMask":["wall"],"cGroup":["all"]},{"v0":36,"v1":37,"curve":29.739630093402262,"curveF":3.766260162601625,"cGroup":["all"]},{"v0":35,"v1":34,"curve":51.849803015108925,"curveF":2.0571428571428565,"cMask":["wall"],"cGroup":["all"]},{"v0":46,"v1":47,"cGroup":["all"]},{"v0":48,"v1":49,"cMask":["wall"],"cGroup":["all"]},{"v0":50,"v1":51,"cMask":["wall"],"cGroup":["all"]},{"v0":51,"v1":52,"cMask":["wall"],"cGroup":["all"]},{"v0":52,"v1":53,"cMask":["wall"],"cGroup":["all"]},{"v0":54,"v1":55,"cMask":["wall"],"cGroup":["all"]},{"v0":56,"v1":57,"cMask":["wall"],"cGroup":["all"]},{"v0":58,"v1":59,"cMask":["wall"],"cGroup":["all"]},{"v0":60,"v1":61,"cMask":["wall"],"cGroup":["all"]},{"v0":60,"v1":62,"cMask":["wall"],"cGroup":["all"]},{"v0":62,"v1":63,"cMask":["wall"],"cGroup":["all"]},{"v0":64,"v1":65,"cMask":["wall"],"cGroup":["all"]},{"v0":66,"v1":67,"cMask":["wall"],"cGroup":["all"]},{"v0":68,"v1":69,"cMask":["wall"],"cGroup":["all"]},{"v0":66,"v1":70,"cMask":["wall"],"cGroup":["all"]},{"v0":70,"v1":68,"cMask":["wall"],"cGroup":["all"]},{"v0":71,"v1":72,"cMask":["wall"],"cGroup":["all"]},{"v0":71,"v1":73,"cMask":["wall"],"cGroup":["all"]},{"v0":73,"v1":74,"cMask":["wall"],"cGroup":["all"]},{"v0":74,"v1":75,"cMask":["wall"],"cGroup":["all"]},{"v0":76,"v1":77,"cMask":["wall"],"cGroup":["all"]},{"v0":78,"v1":79,"cMask":["wall"],"cGroup":["all"]},{"v0":78,"v1":80,"cMask":["wall"],"cGroup":["all"]},{"v0":80,"v1":81,"cMask":["wall"],"cGroup":["all"]},{"v0":79,"v1":81,"cMask":["wall"],"cGroup":["all"]},{"v0":82,"v1":83,"cMask":["wall"],"cGroup":["all"]},{"v0":82,"v1":84,"cMask":["wall"],"cGroup":["all"]},{"v0":84,"v1":85,"cMask":["wall"],"cGroup":["all"]},{"v0":86,"v1":87,"cMask":["wall"],"cGroup":["all"]},{"v0":88,"v1":89,"cMask":["wall"],"cGroup":["all"]},{"v0":87,"v1":90,"cMask":["wall"],"cGroup":["all"]},{"v0":89,"v1":91,"cMask":["wall"],"cGroup":["all"]},{"v0":90,"v1":92,"cMask":["wall"],"cGroup":["all"]},{"v0":91,"v1":93,"cMask":["wall"],"cGroup":["all"]},{"v0":92,"v1":86,"cMask":["wall"],"cGroup":["all"]},{"v0":93,"v1":88,"cMask":["wall"],"cGroup":["all"]},{"v0":94,"v1":95,"cMask":["wall"],"cGroup":["all"]},{"v0":96,"v1":97,"cMask":["wall"],"cGroup":["all"]},{"v0":98,"v1":99,"cMask":["wall"],"cGroup":["all"]},{"v0":100,"v1":101,"cMask":["wall"],"cGroup":["all"]},{"v0":99,"v1":95,"curve":25.057615418303023,"curveF":4.5,"cMask":["wall"],"cGroup":["all"]},{"v0":97,"v1":101,"curve":25.057615418303023,"curveF":4.5,"cMask":["wall"],"cGroup":["all"]},{"v0":102,"v1":103,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":104,"v1":105,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":106,"v1":107,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":108,"v1":109,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":110,"v1":111,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":112,"v1":113,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":114,"v1":115,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":116,"v1":117,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":118,"v1":119,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":120,"v1":121,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":122,"v1":123,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":124,"v1":125,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":126,"v1":127,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":128,"v1":129,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":130,"v1":131,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":132,"v1":133,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":134,"v1":135,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":136,"v1":137,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":138,"v1":139,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":140,"v1":141,"cMask":["wall"],"cGroup":["all"],"color":"F7B602"},{"v0":142,"v1":143,"cGroup":["all"]},{"v0":143,"v1":145,"cGroup":["all"]},{"v0":144,"v1":146,"cGroup":["all"]},{"v0":147,"v1":148,"cGroup":["all"]},{"v0":149,"v1":150,"cGroup":["all"]},{"v0":151,"v1":152,"cGroup":["all"]},{"v0":151,"v1":153,"cGroup":["all"]},{"v0":154,"v1":155,"cGroup":["all"]},{"v0":156,"v1":157,"cGroup":["all"]},{"v0":156,"v1":158,"cGroup":["all"]},{"v0":159,"v1":160,"cGroup":["all"]},{"v0":161,"v1":162,"cGroup":["all"]},{"v0":161,"v1":163,"cGroup":["all"]},{"v0":162,"v1":164,"cGroup":["all"]},{"v0":165,"v1":166,"cGroup":["all"]},{"v0":167,"v1":168,"cGroup":["all"]},{"v0":169,"v1":170,"curve":-138.6090985318734,"curveF":-0.3777777777777784,"cGroup":["all"]},{"v0":170,"v1":171,"cGroup":["all"]},{"v0":172,"v1":173,"cGroup":["all"]},{"v0":174,"v1":175,"cGroup":["all"]},{"v0":173,"v1":175,"cGroup":["all"]},{"v0":172,"v1":174,"cGroup":["all"]},{"v0":176,"v1":177,"cGroup":["all"]},{"v0":178,"v1":179,"cGroup":["all"]},{"v0":180,"v1":181,"cGroup":["all"]},{"v0":182,"v1":183,"cGroup":["all"]},{"v0":180,"v1":184,"cGroup":["all"]},{"v0":182,"v1":185,"cGroup":["all"]},{"v0":186,"v1":187,"cGroup":["all"]},{"v0":188,"v1":189,"cGroup":["all"]},{"v0":187,"v1":184,"cGroup":["all"]},{"v0":189,"v1":185,"cGroup":["all"]}],"planes":[{"normal":[0,-1],"dist":-190,"cMask":["wall"],"cGroup":["all"]},{"normal":[0,1],"dist":-190,"cMask":["wall"],"cGroup":["all"]},{"normal":[1,0],"dist":-399.5,"cMask":["wall"],"cGroup":["all"]},{"normal":[-1,0],"dist":-399.5,"cMask":["wall"],"cGroup":["all"]},{"normal":[0,1],"dist":-151,"cGroup":["all"]},{"normal":[0,-1],"dist":-151,"cGroup":["all"]}],"goals":[],"discs":[{"cGroup":["ball","kick","score"]}],"playerPhysics":{},"ballPhysics":"disc0","spawnDistance":170}
`;
var antrenman = `{ "name" : "Antrenman | M&M", "width" : 600, "height" : 270, "bg" : { "type" : "grass", "width" : 550, "height" : 240, "kickOffRadius" : 80 }, "vertexes" : [ /* 0 */ { "x" : -550, "y" : 240, "cMask" : ["ball" ] }, /* 1 */ { "x" : -550, "y" : 80, "cMask" : ["ball" ] }, /* 2 */ { "x" : -550, "y" : -80, "cMask" : ["ball" ] }, /* 3 */ { "x" : -550, "y" : -240, "cMask" : ["ball" ] }, /* 4 */ { "x" : 550, "y" : 240, "cMask" : ["ball" ] }, /* 5 */ { "x" : 550, "y" : 80, "cMask" : ["ball" ] }, /* 6 */ { "x" : 550, "y" : -80, "cMask" : ["ball" ] }, /* 7 */ { "x" : 550, "y" : -240, "cMask" : ["ball" ] }, /* 8 */ { "x" : -560, "y" : -80, "cMask" : ["ball" ] }, /* 9 */ { "x" : -580, "y" : -60, "cMask" : ["ball" ] }, /* 10 */ { "x" : -580, "y" : 60, "cMask" : ["ball" ] }, /* 11 */ { "x" : -560, "y" : 80, "cMask" : ["ball" ] }, /* 12 */ { "x" : 560, "y" : -80, "cMask" : ["ball" ] }, /* 13 */ { "x" : 580, "y" : -60, "cMask" : ["ball" ] }, /* 14 */ { "x" : 580, "y" : 60, "cMask" : ["ball" ] }, /* 15 */ { "x" : 560, "y" : 80, "cMask" : ["ball" ] }, /* 16 */ { "x" : 0, "y" : 270, "cMask" : ["red","blue","ball" ] }, /* 17 */ { "x" : 0, "y" : -270, "cMask" : ["red","blue","ball" ] } ], "segments" : [ { "v0" : 0, "v1" : 1, "vis" : false, "cMask" : ["ball" ] }, { "v0" : 2, "v1" : 3, "vis" : false, "cMask" : ["ball" ] }, { "v0" : 4, "v1" : 5, "vis" : false, "cMask" : ["ball" ] }, { "v0" : 6, "v1" : 7, "vis" : false, "cMask" : ["ball" ] }, { "v0" : 9, "v1" : 8, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : ["ball" ] }, { "v0" : 9, "v1" : 10, "cMask" : ["ball" ] }, { "v0" : 11, "v1" : 10, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : ["ball" ] }, { "v0" : 12, "v1" : 13, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : ["ball" ] }, { "v0" : 13, "v1" : 14, "cMask" : ["ball" ] }, { "v0" : 14, "v1" : 15, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : ["red","blue","ball" ] }, { "v0" : 16, "v1" : 17, "cMask" : ["red","blue","ball" ] } ], "planes" : [ { "normal" : [0,1 ], "dist" : -240, "cMask" : ["ball" ] }, { "normal" : [0,-1 ], "dist" : -240, "cMask" : ["ball" ] }, { "normal" : [0,1 ], "dist" : -270, "bCoef" : 0.1 }, { "normal" : [0,-1 ], "dist" : -270, "bCoef" : 0.1 }, { "normal" : [1,0 ], "dist" : -600, "bCoef" : 0.1 }, { "normal" : [-1,0 ], "dist" : -600, "bCoef" : 0.1 } ], "goals" : [ ], "discs" : [ { "cGroup" : ["ball","kick","score" ] }, { "pos" : [-550,80 ], "radius" : 8, "invMass" : 0 }, { "pos" : [-550,-80 ], "radius" : 8, "invMass" : 0 }, { "pos" : [550,80 ], "radius" : 8, "invMass" : 0 }, { "pos" : [550,-80 ], "radius" : 8, "invMass" : 0 }, { "pos" : [-160,0 ], "cGroup" : ["ball","kick","score" ] }, { "pos" : [-110,0 ], "cGroup" : ["ball","kick","score" ] }, { "pos" : [-60,0 ], "cGroup" : ["ball","kick","score" ] }, { "pos" : [160,0 ], "cGroup" : ["ball","kick","score" ] }, { "pos" : [110,0 ], "cGroup" : ["ball","kick","score" ] }, { "pos" : [60,0 ], "cGroup" : ["ball","kick","score" ] }, { "pos" : [1,0 ], "cGroup" : ["ball","kick","score" ] } ], "playerPhysics" : { }, "ballPhysics" : "disc0", "cameraFollow" : "player", "traits" : { } }`;

var transfer = `{"name":"Transfer | M&M","width":420,"height":205,"spawnDistance":105,"bg":{"type":"hockey","height":102.5,"width":270,"cornerRadius":0,"kickOffRadius":0},"vertexes":[{"x":-270,"y":-102.5,"cMask":["none"],"cGroup":["none"]},{"x":269,"y":-102.5,"cMask":["none"],"cGroup":["none"]},{"x":270,"y":102.5,"cMask":["none"],"cGroup":["none"]},{"x":-270,"y":102.5,"cMask":["none"],"cGroup":["none"]},{"x":0,"y":-102.5,"cMask":["none"],"cGroup":["none"]},{"x":0,"y":102.5,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-23,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-23,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-21,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-21,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-19,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-19,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-17,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-17,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-15,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-15,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-13,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-13,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-11,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-11,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-9,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-9,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-7,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-7,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-5,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-5,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-3,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-3,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":-1,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":-1,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":1,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":1,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":3,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":3,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":5,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":5,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":7,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":7,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":9,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":9,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":11,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":11,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":13,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":13,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":15,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":15,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":17,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":17,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":19,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":19,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":21,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":21,"cMask":["none"],"cGroup":["none"]},{"x":-23,"y":23,"cMask":["none"],"cGroup":["none"]},{"x":23,"y":23,"cMask":["none"],"cGroup":["none"]},{"x":-25,"y":25,"bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"x":-25,"y":-25,"bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"x":25,"y":-25,"bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"x":25,"y":25,"bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"x":-60,"y":15,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FF0000"},{"x":-60,"y":-15,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FF0000"},{"x":60,"y":-15,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"0088FF"},{"x":60,"y":15,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"0088FF"},{"x":-330,"y":-168.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":330,"y":-168.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":330,"y":168.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":-330,"y":168.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":-300,"y":-138.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":300,"y":-138.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":300,"y":138.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":-300,"y":138.75,"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},{"x":-340.6066017178,"y":-149.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":-310.6066017178,"y":-179.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":310.6066017178,"y":-179.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":340.6066017178,"y":-149.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":340.6066017178,"y":149.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":310.6066017178,"y":179.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":-310.6066017178,"y":179.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":-340.6066017178,"y":149.3566017178,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"x":-420,"y":-205,"cMask":["none"],"cGroup":["none"]},{"x":420,"y":-205,"cMask":["none"],"cGroup":["none"]},{"x":420,"y":205,"cMask":["none"],"cGroup":["none"]},{"x":-420,"y":205,"cMask":["none"],"cGroup":["none"]},{"x":-240,"y":-54,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FF0000"},{"x":-240,"y":-84,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FF0000"},{"x":-241,"y":-9,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FFFFFF"},{"x":-241,"y":-39,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FFFFFF"},{"x":-240,"y":37,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FFFFFF"},{"x":-240,"y":7,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FFFFFF"},{"x":-240,"y":80,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FF0000"},{"x":-240,"y":50,"bCoef":0,"cMask":["red"],"cGroup":["wall"],"color":"FF0000"},{"x":240,"y":-89,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"0088FF"},{"x":240,"y":-59,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"0088FF"},{"x":240,"y":-45,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"FFFFFF"},{"x":240,"y":-15,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"FFFFFF"},{"x":240,"y":-1,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"FFFFFF"},{"x":240,"y":29,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"FFFFFF"},{"x":240,"y":43,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"0088FF"},{"x":240,"y":73,"bCoef":0,"cMask":["blue"],"cGroup":["wall"],"color":"0088FF"}],"segments":[{"v0":0,"v1":1,"color":"808080","cMask":["none"],"cGroup":["none"]},{"v0":1,"v1":2,"color":"808080","cMask":["none"],"cGroup":["none"]},{"v0":2,"v1":3,"color":"808080","cMask":["none"],"cGroup":["none"]},{"v0":3,"v1":0,"color":"808080","cMask":["none"],"cGroup":["none"]},{"v0":4,"v1":5,"color":"808080","cMask":["none"],"cGroup":["none"]},{"v0":6,"v1":7,"cMask":["none"],"cGroup":["none"]},{"v0":8,"v1":9,"cMask":["none"],"cGroup":["none"]},{"v0":10,"v1":11,"cMask":["none"],"cGroup":["none"]},{"v0":12,"v1":13,"cMask":["none"],"cGroup":["none"]},{"v0":14,"v1":15,"cMask":["none"],"cGroup":["none"]},{"v0":16,"v1":17,"cMask":["none"],"cGroup":["none"]},{"v0":18,"v1":19,"cMask":["none"],"cGroup":["none"]},{"v0":20,"v1":21,"cMask":["none"],"cGroup":["none"]},{"v0":22,"v1":23,"cMask":["none"],"cGroup":["none"]},{"v0":24,"v1":25,"cMask":["none"],"cGroup":["none"]},{"v0":26,"v1":27,"cMask":["none"],"cGroup":["none"]},{"v0":28,"v1":29,"cMask":["none"],"cGroup":["none"]},{"v0":30,"v1":31,"cMask":["none"],"cGroup":["none"]},{"v0":32,"v1":33,"cMask":["none"],"cGroup":["none"]},{"v0":34,"v1":35,"cMask":["none"],"cGroup":["none"]},{"v0":36,"v1":37,"cMask":["none"],"cGroup":["none"]},{"v0":38,"v1":39,"cMask":["none"],"cGroup":["none"]},{"v0":40,"v1":41,"cMask":["none"],"cGroup":["none"]},{"v0":42,"v1":43,"cMask":["none"],"cGroup":["none"]},{"v0":44,"v1":45,"cMask":["none"],"cGroup":["none"]},{"v0":46,"v1":47,"cMask":["none"],"cGroup":["none"]},{"v0":48,"v1":49,"cMask":["none"],"cGroup":["none"]},{"v0":50,"v1":51,"cMask":["none"],"cGroup":["none"]},{"v0":52,"v1":53,"cMask":["none"],"cGroup":["none"]},{"v0":54,"v1":55,"color":"804000","bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"v0":55,"v1":56,"color":"804000","bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"v0":56,"v1":57,"color":"804000","bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"v0":57,"v1":54,"color":"804000","bCoef":0,"cMask":["red","blue"],"cGroup":["wall"]},{"v0":58,"v1":59,"curve":190,"color":"FF0000","bCoef":0,"cMask":["red"],"cGroup":["wall"]},{"v0":60,"v1":61,"curve":190,"color":"0088FF","bCoef":0,"cMask":["blue"],"cGroup":["wall"]},{"v0":62,"v1":63,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":63,"v1":64,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":64,"v1":65,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":65,"v1":62,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":66,"v1":67,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":67,"v1":68,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":68,"v1":69,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":69,"v1":66,"color":"FFFFFF","cMask":["none"],"cGroup":["none"]},{"v0":70,"v1":71,"vis":false,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"v0":72,"v1":73,"vis":false,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"v0":74,"v1":75,"vis":false,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"v0":76,"v1":77,"vis":false,"bCoef":1,"cMask":["wall"],"cGroup":["all"]},{"v0":82,"v1":83,"curve":190,"color":"FF0000","bCoef":0,"cMask":["red"],"cGroup":["wall"]},{"v0":84,"v1":85,"curve":190,"color":"FFFFFF","bCoef":0,"cMask":["red"],"cGroup":["wall"]},{"v0":86,"v1":87,"curve":190,"color":"FFFFFF","bCoef":0,"cMask":["red"],"cGroup":["wall"]},{"v0":88,"v1":89,"curve":190,"color":"FF0000","bCoef":0,"cMask":["red"],"cGroup":["wall"]},{"v0":90,"v1":91,"curve":190,"color":"0088FF","bCoef":0,"cMask":["blue"],"cGroup":["wall"]},{"v0":92,"v1":93,"curve":190,"color":"FFFFFF","bCoef":0,"cMask":["blue"],"cGroup":["wall"]},{"v0":94,"v1":95,"curve":190,"color":"FFFFFF","bCoef":0,"cMask":["blue"],"cGroup":["wall"]},{"v0":96,"v1":97,"curve":190,"color":"0088FF","bCoef":0,"cMask":["blue"],"cGroup":["wall"]}],"goals":[],"discs":[{"radius":15,"invMass":1.0e-10,"pos":[-30,-153.75],"color":"0088FF","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"damping":1,"speed":[2,0]},{"radius":15,"invMass":1.0e-10,"pos":[0,-153.75],"color":"FF0000","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"damping":1,"speed":[2,0]},{"radius":15,"invMass":1.0e-10,"pos":[30,-153.75],"color":"0088FF","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"damping":1,"speed":[2,0]},{"radius":15,"invMass":1.0e-10,"pos":[30,153.75],"color":"FF0000","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"damping":1,"speed":[-2,0]},{"radius":15,"invMass":1.0e-10,"pos":[0,153.75],"color":"0088FF","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"damping":1,"speed":[-2,0]},{"radius":15,"invMass":1.0e-10,"pos":[-30,153.75],"color":"FF0000","bCoef":1,"cMask":["ball"],"cGroup":["wall"],"damping":1,"speed":[-2,0]},{"radius":15,"invMass":0,"pos":[-105,0],"color":"E56E56","cMask":["none"],"cGroup":["none"],"damping":0},{"radius":15,"invMass":0,"pos":[105,0],"color":"5689E5","cMask":["none"],"cGroup":["none"],"damping":0}],"planes":[{"normal":[1,0],"dist":-420,"bCoef":0,"cMask":["all"]},{"normal":[-1,0],"dist":-420,"bCoef":0,"cMask":["all"]},{"normal":[0,1],"dist":-205,"bCoef":0,"cMask":["all"]},{"normal":[0,-1],"dist":-205,"bCoef":0,"cMask":["all"]},{"normal":[-1,0],"dist":0,"bCoef":0,"cMask":["red"],"cGroup":["blue"]},{"normal":[1,0],"dist":0,"bCoef":0,"cMask":["blue"],"cGroup":["red"]},{"normal":[0,1],"dist":-102.5,"bCoef":0,"cMask":["red","blue"]},{"normal":[0,-1],"dist":-102.5,"bCoef":0,"cMask":["red","blue"]},{"normal":[1,0],"dist":-270,"bCoef":0,"cMask":["red"]},{"normal":[-1,0],"dist":-271,"bCoef":0,"cMask":["blue"]}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"playerPhysics":{"kickStrength":0},"ballPhysics":{"radius":0,"bCoef":0,"invMass":0,"damping":0}}`;

var RSHLMap3 = `{"name":"v4 | M&M","width":1280,"height":640,"spawnDistance":512,"bg":{"color":"4F8254","type":"grass","width":1160,"height":578,"kickOffRadius":160,"cornerRadius":0},"ballPhysics":{"bCoef":0.5,"damping":0.989,"invMass":0.8,"radius":8},"playerPhysics":{"acceleration":0.12,"bCoef":0.2,"damping":0.96,"invMass":0.3,"kickStrength":8,"kickingAcceleration":0.07,"kickingDamping":0.96},"traits":{"ballArea":{"bCoef":0,"cMask":["ball"],"vis":false},"gameArea":{"bCoef":0,"cMask":["all"]},"line":{"cMask":[],"color":"c7e6bd","vis":true},"support":{"cMask":[],"color":"ffffff","vis":true,"radius":3},"goalNet":{"bCoef":0.6,"cMask":["all"],"color":"ffffff","vis":true},"goalPost":{"bCoef":1.4,"invMass":0,"radius":5},"kickOffBarrier":{"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"vis":false},"corner":{"bCoef":-3.75,"cMask":["ball"],"color":"576c46","vis":true},"punt":{"bCoef":-5.63,"cMask":["ball"],"color":"576c46"}},"vertexes":[{"x":-1160,"y":-549.2,"trait":"line"},{"x":-1131.2,"y":-578,"trait":"line"},{"x":-1160,"y":549.2,"trait":"line"},{"x":-1131.2,"y":578,"trait":"line"},{"x":-1160,"y":-336,"trait":"line"},{"x":-872,"y":-336,"trait":"line"},{"x":-872,"y":336,"trait":"line"},{"x":-1160,"y":336,"trait":"line"},{"x":-872,"y":-128,"trait":"line"},{"x":-872,"y":128,"trait":"line"},{"x":-968,"y":-3,"trait":"line"},{"x":-968,"y":3,"trait":"line"},{"x":-1160,"y":-192,"trait":"line"},{"x":-1064,"y":-192,"trait":"line"},{"x":-1064,"y":192,"trait":"line"},{"x":-1160,"y":192,"trait":"line"},{"x":1160,"y":-549.2,"trait":"line"},{"x":1131.2,"y":-578,"trait":"line"},{"x":1160,"y":549.2,"trait":"line"},{"x":1131.2,"y":578,"trait":"line"},{"x":1160,"y":-336,"trait":"line"},{"x":872,"y":-336,"trait":"line"},{"x":872,"y":336,"trait":"line"},{"x":1160,"y":336,"trait":"line"},{"x":872,"y":-128,"trait":"line"},{"x":872,"y":128,"trait":"line"},{"x":968,"y":-3,"trait":"line"},{"x":968,"y":3,"trait":"line"},{"x":1160,"y":-192,"trait":"line"},{"x":1064,"y":-192,"trait":"line"},{"x":1064,"y":192,"trait":"line"},{"x":1160,"y":192,"trait":"line"},{"x":-1184,"y":-232,"trait":"ballArea","color":"FF0000"},{"x":-1184,"y":-136,"trait":"ballArea","color":"FF0000"},{"x":-1184,"y":136,"trait":"ballArea","color":"FF0000"},{"x":-1184,"y":232,"trait":"ballArea","color":"FF0000"},{"x":-1192,"y":-232,"trait":"ballArea"},{"x":-1192,"y":-136,"trait":"ballArea"},{"x":-1192,"y":136,"trait":"ballArea"},{"x":-1192,"y":232,"trait":"ballArea"},{"x":1184,"y":-232,"trait":"ballArea","color":"0022FF"},{"x":1184,"y":-136,"trait":"ballArea","color":"0022FF"},{"x":1184,"y":136,"trait":"ballArea","color":"0022FF"},{"x":1184,"y":232,"trait":"ballArea","color":"0022FF"},{"x":1192,"y":-232,"trait":"ballArea"},{"x":1192,"y":-136,"trait":"ballArea"},{"x":1192,"y":136,"trait":"ballArea"},{"x":1192,"y":232,"trait":"ballArea"},{"x":0,"y":-640,"trait":"kickOffBarrier"},{"x":0,"y":-160,"trait":"kickOffBarrier"},{"x":0,"y":160,"trait":"kickOffBarrier"},{"x":0,"y":640,"trait":"kickOffBarrier"},{"x":1,"y":-5,"trait":"line"},{"x":1,"y":5,"trait":"line"},{"x":-1160,"y":-514,"trait":"line"},{"x":1160,"y":-514,"trait":"line"},{"x":-1160,"y":514,"trait":"line"},{"x":1160,"y":514,"trait":"line"},{"x":-1160,"y":-242,"trait":"line"},{"x":-824,"y":-578,"trait":"line"},{"x":-1160,"y":242,"trait":"line"},{"x":-824,"y":578,"trait":"line"},{"x":1160,"y":-242,"trait":"line"},{"x":824,"y":-578,"trait":"line"},{"x":1160,"y":242,"trait":"line"},{"x":824,"y":578,"trait":"line"},{"x":-1206,"y":-562,"trait":"corner","color":"FF0000"},{"x":-1176,"y":-578,"trait":"corner","color":"FF0000"},{"x":-1206,"y":562,"trait":"corner","color":"FF0000"},{"x":-1176,"y":578,"trait":"corner","color":"FF0000"},{"x":1206,"y":-562,"trait":"corner","color":"0022FF"},{"x":1176,"y":-578,"trait":"corner","color":"0022FF"},{"x":1206,"y":562,"trait":"corner","color":"0022FF"},{"x":1176,"y":578,"trait":"corner","color":"0022FF"},{"x":-64.19999694824219,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":-65.19999694824219,"y":-124.79998779296875,"trait":"line","color":"FF0000"},{"x":-52.19999694824219,"y":-101.79998779296875,"trait":"line","color":"FF0000"},{"x":-39.19999694824219,"y":-124.79998779296875,"trait":"line","color":"FF0000"},{"x":-38.19999694824219,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":-23.199996948242188,"y":-123.79998779296875,"trait":"line","color":"000000"},{"x":-22.199996948242188,"y":-87.79998779296875,"trait":"line","color":"000000"},{"x":11.800003051757812,"y":-123.79998779296875,"trait":"line","color":"000000"},{"x":-5.1999969482421875,"y":-124.79998779296875,"trait":"line","color":"000000"},{"x":-5.1999969482421875,"y":-106.79998779296875,"trait":"line","color":"000000"},{"x":7.8000030517578125,"y":-106.79998779296875,"trait":"line","color":"000000"},{"x":7.8000030517578125,"y":-88.79998779296875,"trait":"line","color":"000000"},{"x":-7.1999969482421875,"y":-88.79998779296875,"trait":"line","color":"000000"},{"x":23.800003051757812,"y":-87.79998779296875,"trait":"line","color":"000000"},{"x":34.80000305175781,"y":-125.79998779296875,"trait":"line","color":"000000"},{"x":46.80000305175781,"y":-86.79998779296875,"trait":"line","color":"000000"},{"x":27.800003051757812,"y":-101.79998779296875,"trait":"line","color":"000000","curve":0},{"x":42.80000305175781,"y":-101.79998779296875,"trait":"line","color":"000000","curve":0},{"x":57.80000305175781,"y":-124.79998779296875,"trait":"line","color":"FF0000"},{"x":59.80000305175781,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":77.80000305175781,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":-48.19999694824219,"y":-57.79998779296875,"trait":"line","color":"00EEFF"},{"x":52.80000305175781,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":63.80000305175781,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":0.8000030517578125,"y":55.20001220703125,"trait":"line","color":"00EEFF"},{"x":-60.19999694824219,"y":-39.79998779296875,"trait":"line","color":"00EEFF"},{"x":-55.19999694824219,"y":79.20001220703125,"trait":"line","color":"FF0000"},{"x":-55.19999694824219,"y":125.20001220703125,"trait":"line","color":"FF0000"},{"x":-31.199996948242188,"y":80.20001220703125,"trait":"line","color":"FF0000"},{"x":-30.199996948242188,"y":125.20001220703125,"trait":"line","color":"FF0000"},{"x":-55.19999694824219,"y":103.20001220703125,"trait":"line","color":"FF0000"},{"x":-30.199996948242188,"y":103.20001220703125,"trait":"line","color":"FF0000"},{"x":-11.199996948242188,"y":125.20001220703125,"trait":"line","color":"000000"},{"x":0.8000030517578125,"y":79.20001220703125,"trait":"line","color":"000000"},{"x":13.800003051757812,"y":124.20001220703125,"trait":"line","color":"000000"},{"x":-7.1999969482421875,"y":107.20001220703125,"trait":"line","color":"000000"},{"x":7.8000030517578125,"y":107.20001220703125,"trait":"line","color":"000000"},{"x":28.800003051757812,"y":79.20001220703125,"trait":"line","color":"FF0000"},{"x":65.80000305175781,"y":124.20001220703125,"trait":"line","color":"FF0000"},{"x":62.80000305175781,"y":79.20001220703125,"trait":"line","color":"FF0000"},{"x":31.800003051757812,"y":124.20001220703125,"trait":"line","color":"FF0000"},{"x":32.80000305175781,"y":-37.79998779296875,"trait":"line","color":"00EEFF"},{"x":0.8000030517578125,"y":53.20001220703125,"trait":"line","color":"00EEFF"},{"x":-28.199996948242188,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":1.8000030517578125,"y":54.20001220703125,"trait":"line","color":"00EEFF"},{"x":2.8000030517578125,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":0.8000030517578125,"y":54.20001220703125,"trait":"line","color":"00EEFF"},{"x":50.80000305175781,"y":-54.79998779296875,"trait":"line","color":"00EEFF"},{"x":33.80000305175781,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":34.80000305175781,"y":-37.79998779296875,"trait":"line","color":"00EEFF"},{"x":18.800003051757812,"y":-57.79998779296875,"trait":"line","color":"00EEFF"},{"x":2.8000030517578125,"y":-39.79998779296875,"trait":"line","color":"00EEFF"},{"x":17.800003051757812,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":2.8000030517578125,"y":-40.79998779296875,"trait":"line","color":"00EEFF"},{"x":-12.199996948242188,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":-28.199996948242188,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":-12.199996948242188,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":-49.19999694824219,"y":-57.79998779296875,"trait":"line","color":"00EEFF"},{"x":-28.199996948242188,"y":-39.79998779296875,"trait":"line","color":"00EEFF"}],"segments":[{"v0":0,"v1":1,"curve":-90,"trait":"line"},{"v0":2,"v1":3,"curve":90,"trait":"line"},{"v0":4,"v1":5,"trait":"line"},{"v0":5,"v1":6,"trait":"line"},{"v0":6,"v1":7,"trait":"line"},{"v0":8,"v1":9,"curve":105,"trait":"line"},{"v0":10,"v1":11,"trait":"line"},{"v0":10,"v1":11,"curve":-180,"trait":"line"},{"v0":10,"v1":11,"curve":180,"trait":"line"},{"v0":12,"v1":13,"trait":"line"},{"v0":13,"v1":14,"trait":"line"},{"v0":14,"v1":15,"trait":"line"},{"v0":16,"v1":17,"curve":90,"trait":"line"},{"v0":18,"v1":19,"curve":-90,"trait":"line"},{"v0":20,"v1":21,"trait":"line"},{"v0":21,"v1":22,"trait":"line"},{"v0":22,"v1":23,"trait":"line"},{"v0":24,"v1":25,"curve":-105,"trait":"line"},{"v0":26,"v1":27,"trait":"line"},{"v0":26,"v1":27,"curve":-180,"trait":"line"},{"v0":26,"v1":27,"curve":180,"trait":"line"},{"v0":28,"v1":29,"trait":"line"},{"v0":29,"v1":30,"trait":"line"},{"v0":30,"v1":31,"trait":"line"},{"v0":32,"v1":33,"curve":30,"color":"FF0000","trait":"punt"},{"v0":34,"v1":35,"curve":30,"color":"FF0000","trait":"punt"},{"v0":32,"v1":36,"vis":true,"trait":"ballArea"},{"v0":33,"v1":37,"vis":true,"trait":"ballArea"},{"v0":34,"v1":38,"vis":true,"trait":"ballArea"},{"v0":35,"v1":39,"vis":true,"trait":"ballArea"},{"v0":40,"v1":41,"curve":-30,"color":"0022FF","trait":"punt"},{"v0":42,"v1":43,"curve":-30,"color":"0022FF","trait":"punt"},{"v0":40,"v1":44,"vis":true,"trait":"ballArea"},{"v0":41,"v1":45,"vis":true,"trait":"ballArea"},{"v0":42,"v1":46,"vis":true,"trait":"ballArea"},{"v0":43,"v1":47,"vis":true,"trait":"ballArea"},{"v0":48,"v1":49,"trait":"kickOffBarrier"},{"v0":49,"v1":50,"curve":180,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":49,"v1":50,"curve":-180,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":50,"v1":51,"trait":"kickOffBarrier"},{"v0":52,"v1":53,"trait":"line"},{"v0":52,"v1":53,"curve":180,"trait":"line"},{"v0":52,"v1":53,"curve":-180,"trait":"line"},{"v0":52,"v1":53,"curve":120,"trait":"line"},{"v0":52,"v1":53,"curve":-120,"trait":"line"},{"v0":54,"v1":55,"color":"5e844d","trait":"line"},{"v0":56,"v1":57,"color":"5e844d","trait":"line"},{"v0":58,"v1":59,"curve":-90,"color":"5e844d","trait":"line"},{"v0":60,"v1":61,"curve":90,"color":"5e844d","trait":"line"},{"v0":62,"v1":63,"curve":90,"color":"5e844d","trait":"line"},{"v0":64,"v1":65,"curve":-90,"color":"5e844d","trait":"line"},{"v0":66,"v1":67,"curve":-60,"color":"FF0000","trait":"corner"},{"v0":68,"v1":69,"curve":60,"color":"FF0000","trait":"corner"},{"v0":70,"v1":71,"curve":60,"color":"0022FF","trait":"corner"},{"v0":72,"v1":73,"curve":-60,"color":"0022FF","trait":"corner"},{"v0":74,"v1":75,"vis":true,"color":"FF0000","trait":"line"},{"v0":75,"v1":76,"vis":true,"color":"FF0000","trait":"line"},{"v0":76,"v1":77,"vis":true,"color":"FF0000","trait":"line"},{"v0":77,"v1":78,"vis":true,"color":"FF0000","trait":"line"},{"v0":79,"v1":80,"vis":true,"color":"000000","trait":"line"},{"v0":81,"v1":82,"vis":true,"color":"000000","trait":"line"},{"v0":82,"v1":83,"curve":-112.29000824611703,"vis":true,"color":"000000","trait":"line"},{"v0":83,"v1":84,"vis":true,"color":"000000","trait":"line"},{"v0":84,"v1":85,"curve":97.4752590868202,"vis":true,"color":"000000","trait":"line"},{"v0":85,"v1":86,"vis":true,"color":"000000","trait":"line"},{"v0":87,"v1":88,"vis":true,"color":"000000","trait":"line"},{"v0":88,"v1":89,"vis":true,"color":"000000","trait":"line"},{"v0":90,"v1":91,"curve":0,"vis":true,"color":"000000","trait":"line"},{"v0":92,"v1":93,"vis":true,"color":"FF0000","trait":"line"},{"v0":93,"v1":94,"vis":true,"color":"FF0000","trait":"line"},{"v0":95,"v1":96,"vis":true,"color":"00EEFF","trait":"line"},{"v0":96,"v1":97,"vis":true,"color":"00EEFF","trait":"line"},{"v0":97,"v1":98,"vis":true,"color":"00EEFF","trait":"line"},{"v0":98,"v1":99,"vis":true,"color":"00EEFF","trait":"line"},{"v0":95,"v1":99,"vis":true,"color":"00EEFF","trait":"line"},{"v0":99,"v1":97,"vis":true,"color":"00EEFF","trait":"line"},{"v0":100,"v1":101,"vis":true,"color":"FF0000","trait":"line"},{"v0":102,"v1":103,"vis":true,"color":"FF0000","trait":"line"},{"v0":104,"v1":105,"vis":true,"color":"FF0000","trait":"line"},{"v0":106,"v1":107,"vis":true,"color":"000000","trait":"line"},{"v0":107,"v1":108,"vis":true,"color":"000000","trait":"line"},{"v0":109,"v1":110,"vis":true,"color":"000000","trait":"line"},{"v0":111,"v1":112,"vis":true,"color":"FF0000","trait":"line"},{"v0":113,"v1":114,"vis":true,"color":"FF0000","trait":"line"},{"v0":115,"v1":116,"vis":true,"color":"00EEFF","trait":"line"},{"v0":117,"v1":118,"vis":true,"color":"00EEFF","trait":"line"},{"v0":119,"v1":120,"vis":true,"color":"00EEFF","trait":"line"},{"v0":121,"v1":122,"vis":true,"color":"00EEFF","trait":"line"},{"v0":123,"v1":124,"vis":true,"color":"00EEFF","trait":"line"},{"v0":125,"v1":126,"vis":true,"color":"00EEFF","trait":"line"},{"v0":127,"v1":128,"vis":true,"color":"00EEFF","trait":"line"},{"v0":129,"v1":130,"vis":true,"color":"00EEFF","trait":"line"},{"v0":131,"v1":132,"vis":true,"color":"00EEFF","trait":"line"}],"discs":[{"pos":[-1160,-578],"trait":"support"},{"pos":[-1160,578],"trait":"support"},{"pos":[1160,-578],"trait":"support"},{"pos":[1160,578],"trait":"support"},{"radius":4,"invMass":0,"pos":[-1212,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,100],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,90],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-60],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-50],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[-1212,-40],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-30],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-20],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-10],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,0],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,10],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,20],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,30],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,40],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,50],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,60],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[-1212,70],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,80],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-80],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-70],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-90],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-100],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0,"pos":[-1212,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":1,"pos":[-1202,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1192,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1182,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1172,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1160,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1202,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1192,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1182,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1172,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1160,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1252,140],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1252,-140],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":0,"pos":[1214,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,102.125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,91.8125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-62.875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[1214,-52.5625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-42.25],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-31.9375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-21.625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-11.3125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-1],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,9.3125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,19.625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,29.9375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,40.25],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,50.5625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,60.875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[1214,71.1875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,81.5],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-83.5],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-73.1875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-93.8125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-104.125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0,"pos":[1214,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":1,"pos":[1204,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1194,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1184,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1174,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1162,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1204,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1194,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1184,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1174,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1162,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1254,143.375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1254,-145.375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"}],"goals":[{"p0":[-1168,112],"p1":[-1168,-112],"team":"red"},{"p0":[1168,-112],"p1":[1168,112],"team":"blue"}],"planes":[{"normal":[1,0],"dist":-1280,"trait":"gameArea","_data":{"extremes":{"normal":[1,0],"dist":-1280,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,-640],"b":[-1280,640]}}},{"normal":[-1,0],"dist":-1280,"trait":"gameArea","_data":{"extremes":{"normal":[-1,0],"dist":-1280,"canvas_rect":[-1280,-640,1280,640],"a":[1280,-640],"b":[1280,640]}}},{"normal":[0,1],"dist":-640,"trait":"gameArea","_data":{"extremes":{"normal":[0,1],"dist":-640,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,-640],"b":[1280,-640]}}},{"normal":[0,-1],"dist":-640,"trait":"gameArea","_data":{"extremes":{"normal":[0,-1],"dist":-640,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,640],"b":[1280,640]}}},{"normal":[1,0],"dist":-1234,"trait":"ballArea","_data":{"extremes":{"normal":[1,0],"dist":-1234,"canvas_rect":[-1280,-640,1280,640],"a":[-1234,-640],"b":[-1234,640]}}},{"normal":[-1,0],"dist":-1232,"trait":"ballArea","_data":{"extremes":{"normal":[-1,0],"dist":-1232,"canvas_rect":[-1280,-640,1280,640],"a":[1232,-640],"b":[1232,640]}}},{"normal":[0,1],"dist":-610,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-610,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,-610],"b":[1280,-610]}}},{"normal":[0,-1],"dist":-610,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-610,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,610],"b":[1280,610]}}}],"joints":[{"d0":62,"d1":74,"strength":"rigid","color":"0C2352","length":null},{"d0":40,"d1":73,"strength":"rigid","color":"0C2352","length":null},{"d0":71,"d1":72,"strength":"rigid","color":"transparent","length":null},{"d0":70,"d1":71,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":69,"d1":70,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":68,"d1":69,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":62,"d1":68,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":61,"d1":62,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":60,"d1":61,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":58,"d1":60,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":58,"d1":59,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":43,"d1":59,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":43,"d1":44,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":44,"d1":45,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":45,"d1":46,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":46,"d1":47,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":47,"d1":48,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":48,"d1":49,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":49,"d1":50,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":50,"d1":51,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":51,"d1":52,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":52,"d1":53,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":53,"d1":54,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":54,"d1":55,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":55,"d1":56,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":56,"d1":57,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":42,"d1":57,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":41,"d1":42,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":40,"d1":41,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":40,"d1":63,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":63,"d1":64,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":64,"d1":65,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":65,"d1":66,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":66,"d1":67,"strength":"rigid","color":"transparent","length":null},{"d0":27,"d1":39,"strength":"rigid","color":"94152E","length":null},{"d0":5,"d1":38,"strength":"rigid","color":"94152E","length":null},{"d0":36,"d1":37,"strength":"rigid","color":"transparent","length":null},{"d0":35,"d1":36,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":34,"d1":35,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":33,"d1":34,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":27,"d1":33,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":26,"d1":27,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":25,"d1":26,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":23,"d1":25,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":23,"d1":24,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":8,"d1":24,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":8,"d1":9,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":9,"d1":10,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":10,"d1":11,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":11,"d1":12,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":12,"d1":13,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":13,"d1":14,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":14,"d1":15,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":15,"d1":16,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":16,"d1":17,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":17,"d1":18,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":18,"d1":19,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":19,"d1":20,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":20,"d1":21,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":21,"d1":22,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":7,"d1":22,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":6,"d1":7,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":5,"d1":6,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":5,"d1":28,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":28,"d1":29,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":29,"d1":30,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":30,"d1":31,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":31,"d1":32,"strength":"rigid","color":"transparent","length":null}],"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false}`;

var hazirlik = `{"name":"HZ | M&M","width":1280,"height":640,"spawnDistance":512,"bg":{"color":"4F8254","type":"grass","width":1160,"height":578,"kickOffRadius":160,"cornerRadius":0},"ballPhysics":{"bCoef":0.5,"damping":0.989,"invMass":0.8,"radius":8},"playerPhysics":{"acceleration":0.12,"bCoef":0.2,"damping":0.96,"invMass":0.3,"kickStrength":8,"kickingAcceleration":0.07,"kickingDamping":0.96},"traits":{"ballArea":{"bCoef":0,"cMask":["ball"],"vis":false},"gameArea":{"bCoef":0,"cMask":["all"]},"line":{"cMask":[],"color":"c7e6bd","vis":true},"support":{"cMask":[],"color":"ffffff","vis":true,"radius":3},"goalNet":{"bCoef":0.6,"cMask":["all"],"color":"ffffff","vis":true},"goalPost":{"bCoef":1.4,"invMass":0,"radius":5},"kickOffBarrier":{"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"vis":false},"corner":{"bCoef":-3.75,"cMask":["ball"],"color":"576c46","vis":true},"punt":{"bCoef":-5.63,"cMask":["ball"],"color":"576c46"}},"vertexes":[{"x":-1160,"y":-549.2,"trait":"line"},{"x":-1131.2,"y":-578,"trait":"line"},{"x":-1160,"y":549.2,"trait":"line"},{"x":-1131.2,"y":578,"trait":"line"},{"x":-1160,"y":-336,"trait":"line"},{"x":-872,"y":-336,"trait":"line"},{"x":-872,"y":336,"trait":"line"},{"x":-1160,"y":336,"trait":"line"},{"x":-872,"y":-128,"trait":"line"},{"x":-872,"y":128,"trait":"line"},{"x":-968,"y":-3,"trait":"line"},{"x":-968,"y":3,"trait":"line"},{"x":-1160,"y":-192,"trait":"line"},{"x":-1064,"y":-192,"trait":"line"},{"x":-1064,"y":192,"trait":"line"},{"x":-1160,"y":192,"trait":"line"},{"x":1160,"y":-549.2,"trait":"line"},{"x":1131.2,"y":-578,"trait":"line"},{"x":1160,"y":549.2,"trait":"line"},{"x":1131.2,"y":578,"trait":"line"},{"x":1160,"y":-336,"trait":"line"},{"x":872,"y":-336,"trait":"line"},{"x":872,"y":336,"trait":"line"},{"x":1160,"y":336,"trait":"line"},{"x":872,"y":-128,"trait":"line"},{"x":872,"y":128,"trait":"line"},{"x":968,"y":-3,"trait":"line"},{"x":968,"y":3,"trait":"line"},{"x":1160,"y":-192,"trait":"line"},{"x":1064,"y":-192,"trait":"line"},{"x":1064,"y":192,"trait":"line"},{"x":1160,"y":192,"trait":"line"},{"x":-1184,"y":-232,"trait":"ballArea","color":"FF0000"},{"x":-1184,"y":-136,"trait":"ballArea","color":"FF0000"},{"x":-1184,"y":136,"trait":"ballArea","color":"FF0000"},{"x":-1184,"y":232,"trait":"ballArea","color":"FF0000"},{"x":-1192,"y":-232,"trait":"ballArea"},{"x":-1192,"y":-136,"trait":"ballArea"},{"x":-1192,"y":136,"trait":"ballArea"},{"x":-1192,"y":232,"trait":"ballArea"},{"x":1184,"y":-232,"trait":"ballArea","color":"0022FF"},{"x":1184,"y":-136,"trait":"ballArea","color":"0022FF"},{"x":1184,"y":136,"trait":"ballArea","color":"0022FF"},{"x":1184,"y":232,"trait":"ballArea","color":"0022FF"},{"x":1192,"y":-232,"trait":"ballArea"},{"x":1192,"y":-136,"trait":"ballArea"},{"x":1192,"y":136,"trait":"ballArea"},{"x":1192,"y":232,"trait":"ballArea"},{"x":0,"y":-640,"trait":"kickOffBarrier"},{"x":0,"y":-160,"trait":"kickOffBarrier"},{"x":0,"y":160,"trait":"kickOffBarrier"},{"x":0,"y":640,"trait":"kickOffBarrier"},{"x":1,"y":-5,"trait":"line"},{"x":1,"y":5,"trait":"line"},{"x":-1160,"y":-514,"trait":"line"},{"x":1160,"y":-514,"trait":"line"},{"x":-1160,"y":514,"trait":"line"},{"x":1160,"y":514,"trait":"line"},{"x":-1160,"y":-242,"trait":"line"},{"x":-824,"y":-578,"trait":"line"},{"x":-1160,"y":242,"trait":"line"},{"x":-824,"y":578,"trait":"line"},{"x":1160,"y":-242,"trait":"line"},{"x":824,"y":-578,"trait":"line"},{"x":1160,"y":242,"trait":"line"},{"x":824,"y":578,"trait":"line"},{"x":-1206,"y":-562,"trait":"corner","color":"FF0000"},{"x":-1176,"y":-578,"trait":"corner","color":"FF0000"},{"x":-1206,"y":562,"trait":"corner","color":"FF0000"},{"x":-1176,"y":578,"trait":"corner","color":"FF0000"},{"x":1206,"y":-562,"trait":"corner","color":"0022FF"},{"x":1176,"y":-578,"trait":"corner","color":"0022FF"},{"x":1206,"y":562,"trait":"corner","color":"0022FF"},{"x":1176,"y":578,"trait":"corner","color":"0022FF"},{"x":-64.19999694824219,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":-65.19999694824219,"y":-124.79998779296875,"trait":"line","color":"FF0000"},{"x":-52.19999694824219,"y":-101.79998779296875,"trait":"line","color":"FF0000"},{"x":-39.19999694824219,"y":-124.79998779296875,"trait":"line","color":"FF0000"},{"x":-38.19999694824219,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":-23.199996948242188,"y":-123.79998779296875,"trait":"line","color":"000000"},{"x":-22.199996948242188,"y":-87.79998779296875,"trait":"line","color":"000000"},{"x":11.800003051757812,"y":-123.79998779296875,"trait":"line","color":"000000"},{"x":-5.1999969482421875,"y":-124.79998779296875,"trait":"line","color":"000000"},{"x":-5.1999969482421875,"y":-106.79998779296875,"trait":"line","color":"000000"},{"x":7.8000030517578125,"y":-106.79998779296875,"trait":"line","color":"000000"},{"x":7.8000030517578125,"y":-88.79998779296875,"trait":"line","color":"000000"},{"x":-7.1999969482421875,"y":-88.79998779296875,"trait":"line","color":"000000"},{"x":23.800003051757812,"y":-87.79998779296875,"trait":"line","color":"000000"},{"x":34.80000305175781,"y":-125.79998779296875,"trait":"line","color":"000000"},{"x":46.80000305175781,"y":-86.79998779296875,"trait":"line","color":"000000"},{"x":27.800003051757812,"y":-101.79998779296875,"trait":"line","color":"000000","curve":0},{"x":42.80000305175781,"y":-101.79998779296875,"trait":"line","color":"000000","curve":0},{"x":57.80000305175781,"y":-124.79998779296875,"trait":"line","color":"FF0000"},{"x":59.80000305175781,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":77.80000305175781,"y":-87.79998779296875,"trait":"line","color":"FF0000"},{"x":-48.19999694824219,"y":-57.79998779296875,"trait":"line","color":"00EEFF"},{"x":52.80000305175781,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":63.80000305175781,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":0.8000030517578125,"y":55.20001220703125,"trait":"line","color":"00EEFF"},{"x":-60.19999694824219,"y":-39.79998779296875,"trait":"line","color":"00EEFF"},{"x":-55.19999694824219,"y":79.20001220703125,"trait":"line","color":"FF0000"},{"x":-55.19999694824219,"y":125.20001220703125,"trait":"line","color":"FF0000"},{"x":-31.199996948242188,"y":80.20001220703125,"trait":"line","color":"FF0000"},{"x":-30.199996948242188,"y":125.20001220703125,"trait":"line","color":"FF0000"},{"x":-55.19999694824219,"y":103.20001220703125,"trait":"line","color":"FF0000"},{"x":-30.199996948242188,"y":103.20001220703125,"trait":"line","color":"FF0000"},{"x":-11.199996948242188,"y":125.20001220703125,"trait":"line","color":"000000"},{"x":0.8000030517578125,"y":79.20001220703125,"trait":"line","color":"000000"},{"x":13.800003051757812,"y":124.20001220703125,"trait":"line","color":"000000"},{"x":-7.1999969482421875,"y":107.20001220703125,"trait":"line","color":"000000"},{"x":7.8000030517578125,"y":107.20001220703125,"trait":"line","color":"000000"},{"x":28.800003051757812,"y":79.20001220703125,"trait":"line","color":"FF0000"},{"x":65.80000305175781,"y":124.20001220703125,"trait":"line","color":"FF0000"},{"x":62.80000305175781,"y":79.20001220703125,"trait":"line","color":"FF0000"},{"x":31.800003051757812,"y":124.20001220703125,"trait":"line","color":"FF0000"},{"x":32.80000305175781,"y":-37.79998779296875,"trait":"line","color":"00EEFF"},{"x":0.8000030517578125,"y":53.20001220703125,"trait":"line","color":"00EEFF"},{"x":-28.199996948242188,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":1.8000030517578125,"y":54.20001220703125,"trait":"line","color":"00EEFF"},{"x":2.8000030517578125,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":0.8000030517578125,"y":54.20001220703125,"trait":"line","color":"00EEFF"},{"x":50.80000305175781,"y":-54.79998779296875,"trait":"line","color":"00EEFF"},{"x":33.80000305175781,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":34.80000305175781,"y":-37.79998779296875,"trait":"line","color":"00EEFF"},{"x":18.800003051757812,"y":-57.79998779296875,"trait":"line","color":"00EEFF"},{"x":2.8000030517578125,"y":-39.79998779296875,"trait":"line","color":"00EEFF"},{"x":17.800003051757812,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":2.8000030517578125,"y":-40.79998779296875,"trait":"line","color":"00EEFF"},{"x":-12.199996948242188,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":-28.199996948242188,"y":-38.79998779296875,"trait":"line","color":"00EEFF"},{"x":-12.199996948242188,"y":-56.79998779296875,"trait":"line","color":"00EEFF"},{"x":-49.19999694824219,"y":-57.79998779296875,"trait":"line","color":"00EEFF"},{"x":-28.199996948242188,"y":-39.79998779296875,"trait":"line","color":"00EEFF"}],"segments":[{"v0":0,"v1":1,"curve":-90,"trait":"line"},{"v0":2,"v1":3,"curve":90,"trait":"line"},{"v0":4,"v1":5,"trait":"line"},{"v0":5,"v1":6,"trait":"line"},{"v0":6,"v1":7,"trait":"line"},{"v0":8,"v1":9,"curve":105,"trait":"line"},{"v0":10,"v1":11,"trait":"line"},{"v0":10,"v1":11,"curve":-180,"trait":"line"},{"v0":10,"v1":11,"curve":180,"trait":"line"},{"v0":12,"v1":13,"trait":"line"},{"v0":13,"v1":14,"trait":"line"},{"v0":14,"v1":15,"trait":"line"},{"v0":16,"v1":17,"curve":90,"trait":"line"},{"v0":18,"v1":19,"curve":-90,"trait":"line"},{"v0":20,"v1":21,"trait":"line"},{"v0":21,"v1":22,"trait":"line"},{"v0":22,"v1":23,"trait":"line"},{"v0":24,"v1":25,"curve":-105,"trait":"line"},{"v0":26,"v1":27,"trait":"line"},{"v0":26,"v1":27,"curve":-180,"trait":"line"},{"v0":26,"v1":27,"curve":180,"trait":"line"},{"v0":28,"v1":29,"trait":"line"},{"v0":29,"v1":30,"trait":"line"},{"v0":30,"v1":31,"trait":"line"},{"v0":32,"v1":33,"curve":30,"color":"FF0000","trait":"punt"},{"v0":34,"v1":35,"curve":30,"color":"FF0000","trait":"punt"},{"v0":32,"v1":36,"vis":true,"trait":"ballArea"},{"v0":33,"v1":37,"vis":true,"trait":"ballArea"},{"v0":34,"v1":38,"vis":true,"trait":"ballArea"},{"v0":35,"v1":39,"vis":true,"trait":"ballArea"},{"v0":40,"v1":41,"curve":-30,"color":"0022FF","trait":"punt"},{"v0":42,"v1":43,"curve":-30,"color":"0022FF","trait":"punt"},{"v0":40,"v1":44,"vis":true,"trait":"ballArea"},{"v0":41,"v1":45,"vis":true,"trait":"ballArea"},{"v0":42,"v1":46,"vis":true,"trait":"ballArea"},{"v0":43,"v1":47,"vis":true,"trait":"ballArea"},{"v0":48,"v1":49,"trait":"kickOffBarrier"},{"v0":49,"v1":50,"curve":180,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":49,"v1":50,"curve":-180,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":50,"v1":51,"trait":"kickOffBarrier"},{"v0":52,"v1":53,"trait":"line"},{"v0":52,"v1":53,"curve":180,"trait":"line"},{"v0":52,"v1":53,"curve":-180,"trait":"line"},{"v0":52,"v1":53,"curve":120,"trait":"line"},{"v0":52,"v1":53,"curve":-120,"trait":"line"},{"v0":54,"v1":55,"color":"5e844d","trait":"line"},{"v0":56,"v1":57,"color":"5e844d","trait":"line"},{"v0":58,"v1":59,"curve":-90,"color":"5e844d","trait":"line"},{"v0":60,"v1":61,"curve":90,"color":"5e844d","trait":"line"},{"v0":62,"v1":63,"curve":90,"color":"5e844d","trait":"line"},{"v0":64,"v1":65,"curve":-90,"color":"5e844d","trait":"line"},{"v0":66,"v1":67,"curve":-60,"color":"FF0000","trait":"corner"},{"v0":68,"v1":69,"curve":60,"color":"FF0000","trait":"corner"},{"v0":70,"v1":71,"curve":60,"color":"0022FF","trait":"corner"},{"v0":72,"v1":73,"curve":-60,"color":"0022FF","trait":"corner"},{"v0":74,"v1":75,"vis":true,"color":"FF0000","trait":"line"},{"v0":75,"v1":76,"vis":true,"color":"FF0000","trait":"line"},{"v0":76,"v1":77,"vis":true,"color":"FF0000","trait":"line"},{"v0":77,"v1":78,"vis":true,"color":"FF0000","trait":"line"},{"v0":79,"v1":80,"vis":true,"color":"000000","trait":"line"},{"v0":81,"v1":82,"vis":true,"color":"000000","trait":"line"},{"v0":82,"v1":83,"curve":-112.29000824611703,"vis":true,"color":"000000","trait":"line"},{"v0":83,"v1":84,"vis":true,"color":"000000","trait":"line"},{"v0":84,"v1":85,"curve":97.4752590868202,"vis":true,"color":"000000","trait":"line"},{"v0":85,"v1":86,"vis":true,"color":"000000","trait":"line"},{"v0":87,"v1":88,"vis":true,"color":"000000","trait":"line"},{"v0":88,"v1":89,"vis":true,"color":"000000","trait":"line"},{"v0":90,"v1":91,"curve":0,"vis":true,"color":"000000","trait":"line"},{"v0":92,"v1":93,"vis":true,"color":"FF0000","trait":"line"},{"v0":93,"v1":94,"vis":true,"color":"FF0000","trait":"line"},{"v0":95,"v1":96,"vis":true,"color":"00EEFF","trait":"line"},{"v0":96,"v1":97,"vis":true,"color":"00EEFF","trait":"line"},{"v0":97,"v1":98,"vis":true,"color":"00EEFF","trait":"line"},{"v0":98,"v1":99,"vis":true,"color":"00EEFF","trait":"line"},{"v0":95,"v1":99,"vis":true,"color":"00EEFF","trait":"line"},{"v0":99,"v1":97,"vis":true,"color":"00EEFF","trait":"line"},{"v0":100,"v1":101,"vis":true,"color":"FF0000","trait":"line"},{"v0":102,"v1":103,"vis":true,"color":"FF0000","trait":"line"},{"v0":104,"v1":105,"vis":true,"color":"FF0000","trait":"line"},{"v0":106,"v1":107,"vis":true,"color":"000000","trait":"line"},{"v0":107,"v1":108,"vis":true,"color":"000000","trait":"line"},{"v0":109,"v1":110,"vis":true,"color":"000000","trait":"line"},{"v0":111,"v1":112,"vis":true,"color":"FF0000","trait":"line"},{"v0":113,"v1":114,"vis":true,"color":"FF0000","trait":"line"},{"v0":115,"v1":116,"vis":true,"color":"00EEFF","trait":"line"},{"v0":117,"v1":118,"vis":true,"color":"00EEFF","trait":"line"},{"v0":119,"v1":120,"vis":true,"color":"00EEFF","trait":"line"},{"v0":121,"v1":122,"vis":true,"color":"00EEFF","trait":"line"},{"v0":123,"v1":124,"vis":true,"color":"00EEFF","trait":"line"},{"v0":125,"v1":126,"vis":true,"color":"00EEFF","trait":"line"},{"v0":127,"v1":128,"vis":true,"color":"00EEFF","trait":"line"},{"v0":129,"v1":130,"vis":true,"color":"00EEFF","trait":"line"},{"v0":131,"v1":132,"vis":true,"color":"00EEFF","trait":"line"}],"discs":[{"pos":[-1160,-578],"trait":"support"},{"pos":[-1160,578],"trait":"support"},{"pos":[1160,-578],"trait":"support"},{"pos":[1160,578],"trait":"support"},{"radius":4,"invMass":0,"pos":[-1212,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,100],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,90],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-60],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-50],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[-1212,-40],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-30],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-20],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-10],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,0],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,10],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,20],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,30],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,40],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,50],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,60],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[-1212,70],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,80],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-80],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-70],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-90],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[-1212,-100],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0,"pos":[-1212,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":1,"pos":[-1202,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1192,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1182,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1172,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1160,110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1202,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1192,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1182,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[-1172,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1160,-110],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1252,140],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7,"invMass":0,"pos":[-1252,-140],"color":"94152E","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":0,"pos":[1214,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,102.125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,91.8125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-62.875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[1214,-52.5625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-42.25],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-31.9375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-21.625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-11.3125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-1],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,9.3125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,19.625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,29.9375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,40.25],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,50.5625],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,60.875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"_selected":true,"_data":{"mirror":{}}},{"radius":4,"invMass":0.99,"pos":[1214,71.1875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,81.5],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-83.5],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-73.1875],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-93.8125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0.99,"pos":[1214,-104.125],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":0,"pos":[1214,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"cGroup":["ball"],"trait":"ballArea"},{"radius":4,"invMass":1,"pos":[1204,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1194,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1184,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1174,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1162,112.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1204,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1194,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1184,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":4,"invMass":1,"pos":[1174,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1162,-114.4375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1254,143.375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"},{"radius":7.108533604056466,"invMass":0,"pos":[1254,-145.375],"color":"0C2352","bCoef":0.6,"cMask":["red","blue","ball"],"trait":"goalNet"}],"goals":[{"p0":[-1168,112],"p1":[-1168,-112],"team":"red"},{"p0":[1168,-112],"p1":[1168,112],"team":"blue"}],"planes":[{"normal":[1,0],"dist":-1280,"trait":"gameArea","_data":{"extremes":{"normal":[1,0],"dist":-1280,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,-640],"b":[-1280,640]}}},{"normal":[-1,0],"dist":-1280,"trait":"gameArea","_data":{"extremes":{"normal":[-1,0],"dist":-1280,"canvas_rect":[-1280,-640,1280,640],"a":[1280,-640],"b":[1280,640]}}},{"normal":[0,1],"dist":-640,"trait":"gameArea","_data":{"extremes":{"normal":[0,1],"dist":-640,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,-640],"b":[1280,-640]}}},{"normal":[0,-1],"dist":-640,"trait":"gameArea","_data":{"extremes":{"normal":[0,-1],"dist":-640,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,640],"b":[1280,640]}}},{"normal":[1,0],"dist":-1234,"trait":"ballArea","_data":{"extremes":{"normal":[1,0],"dist":-1234,"canvas_rect":[-1280,-640,1280,640],"a":[-1234,-640],"b":[-1234,640]}}},{"normal":[-1,0],"dist":-1232,"trait":"ballArea","_data":{"extremes":{"normal":[-1,0],"dist":-1232,"canvas_rect":[-1280,-640,1280,640],"a":[1232,-640],"b":[1232,640]}}},{"normal":[0,1],"dist":-610,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-610,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,-610],"b":[1280,-610]}}},{"normal":[0,-1],"dist":-610,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-610,"canvas_rect":[-1280,-640,1280,640],"a":[-1280,610],"b":[1280,610]}}}],"joints":[{"d0":62,"d1":74,"strength":"rigid","color":"0C2352","length":null},{"d0":40,"d1":73,"strength":"rigid","color":"0C2352","length":null},{"d0":71,"d1":72,"strength":"rigid","color":"transparent","length":null},{"d0":70,"d1":71,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":69,"d1":70,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":68,"d1":69,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":62,"d1":68,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":61,"d1":62,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":60,"d1":61,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":58,"d1":60,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":58,"d1":59,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":43,"d1":59,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":43,"d1":44,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":44,"d1":45,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":45,"d1":46,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":46,"d1":47,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":47,"d1":48,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":48,"d1":49,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":49,"d1":50,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":50,"d1":51,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":51,"d1":52,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":52,"d1":53,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":53,"d1":54,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":54,"d1":55,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":55,"d1":56,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":56,"d1":57,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":42,"d1":57,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":41,"d1":42,"strength":"rigid","color":"transparent","length":null,"invMass":0.99,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":40,"d1":41,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":40,"d1":63,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":63,"d1":64,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":64,"d1":65,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":65,"d1":66,"strength":"rigid","color":"transparent","length":null,"invMass":1,"radius":4},{"d0":66,"d1":67,"strength":"rigid","color":"transparent","length":null},{"d0":27,"d1":39,"strength":"rigid","color":"94152E","length":null},{"d0":5,"d1":38,"strength":"rigid","color":"94152E","length":null},{"d0":36,"d1":37,"strength":"rigid","color":"transparent","length":null},{"d0":35,"d1":36,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":34,"d1":35,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":33,"d1":34,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":27,"d1":33,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":26,"d1":27,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":25,"d1":26,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":23,"d1":25,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":23,"d1":24,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":8,"d1":24,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":8,"d1":9,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":9,"d1":10,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":10,"d1":11,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":11,"d1":12,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":12,"d1":13,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":13,"d1":14,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":14,"d1":15,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":15,"d1":16,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":16,"d1":17,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":17,"d1":18,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":18,"d1":19,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":19,"d1":20,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":20,"d1":21,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":21,"d1":22,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":7,"d1":22,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":6,"d1":7,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":5,"d1":6,"strength":"rigid","color":"transparent","length":null,"radius":4,"cGroup":["ball"],"trait":"ballArea"},{"d0":5,"d1":28,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":28,"d1":29,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":29,"d1":30,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":30,"d1":31,"strength":"rigid","color":"transparent","length":null,"radius":4},{"d0":31,"d1":32,"strength":"rigid","color":"transparent","length":null}],"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false}`;

var dizilim = `{ "name" : "Dizilim | M&M", "width" : 470, "height" : 500, "canBeStored" : false, "bg" : { "type" : "", "width" : 0, "height" : 0, "color" : "3F3C55" }, "vertexes" : [ /* 0 */ { "x" : 0, "y" : -270, "cMask" : ["red","blue" ], "cGroup" : ["red","blue" ] }, /* 1 */ { "x" : 0, "y" : 300.01041793823, "cMask" : ["red","blue" ], "cGroup" : ["red","blue" ] }, /* 2 */ { "x" : -126.3117791226918, "y" : 44.4585285483644, "cMask" : [ ], "color" : "D40000" }, /* 3 */ { "x" : -161.3112520586444, "y" : 44.65060719246607, "cMask" : [ ], "color" : "D40000" }, /* 4 */ { "x" : -123.81181677012376, "y" : 44.44480864521428, "bCoef" : -0.5, "color" : "FF6054" }, /* 5 */ { "x" : -163.81121441121246, "y" : 44.66432709561619, "bCoef" : -0.5, "color" : "FF6054" }, /* 6 */ { "x" : -128.81174147525985, "y" : 44.47224845151452, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 7 */ { "x" : -158.81128970607637, "y" : 44.63688728931595, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 8 */ { "x" : -148.0672614953416, "y" : -70.24287078613852, "cMask" : [ ], "color" : "D40000" }, /* 9 */ { "x" : -147.32374947132124, "y" : -35.250768964868364, "cMask" : [ ], "color" : "D40000" }, /* 10 */ { "x" : -148.12036949705734, "y" : -72.74230663051495, "bCoef" : -0.5, "color" : "FF6054" }, /* 11 */ { "x" : -147.2706414696055, "y" : -32.751333120491914, "bCoef" : -0.5, "color" : "FF6054" }, /* 12 */ { "x" : -148.01415349362583, "y" : -67.74343494176206, "bCoef" : -3, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 13 */ { "x" : -147.37685747303698, "y" : -37.750204809244806, "bCoef" : -1, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 14 */ { "x" : -148, "y" : -161.5, "cMask" : [ ], "color" : "D40000" }, /* 15 */ { "x" : -148, "y" : -126.5, "cMask" : [ ], "color" : "D40000" }, /* 16 */ { "x" : -148, "y" : -164, "bCoef" : -0.5, "color" : "FF6054" }, /* 17 */ { "x" : -148, "y" : -124, "bCoef" : -0.5, "color" : "FF6054" }, /* 18 */ { "x" : -148, "y" : -159, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 19 */ { "x" : -148, "y" : -129, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 20 */ { "x" : -150, "y" : 37, "cMask" : [ ], "color" : "FFFFFF" }, /* 21 */ { "x" : -139, "y" : 37, "cMask" : [ ], "color" : "FFFFFF" }, /* 22 */ { "x" : -139, "y" : 53, "cMask" : [ ], "color" : "FFFFFF" }, /* 23 */ { "x" : -150, "y" : 53, "cMask" : [ ], "color" : "FFFFFF" }, /* 24 */ { "x" : -141.33332824706997, "y" : 45, "cMask" : [ ], "color" : "FFFFFF" }, /* 25 */ { "x" : -148, "y" : 45, "cMask" : [ ], "color" : "FFFFFF" }, /* 26 */ { "x" : -140, "y" : -61, "cMask" : [ ], "color" : "FFFFFF" }, /* 27 */ { "x" : -154, "y" : -61, "cMask" : [ ], "color" : "FFFFFF" }, /* 28 */ { "x" : -154, "y" : -45, "cMask" : [ ], "color" : "FFFFFF" }, /* 29 */ { "x" : -141, "y" : -45, "cMask" : [ ], "color" : "FFFFFF" }, /* 30 */ { "x" : -141, "y" : -53, "cMask" : [ ], "color" : "FFFFFF" }, /* 31 */ { "x" : -154, "y" : -53, "cMask" : [ ], "color" : "FFFFFF" }, /* 32 */ { "x" : -153, "y" : -152, "cMask" : [ ], "color" : "FFFFFF" }, /* 33 */ { "x" : -143, "y" : -152, "cMask" : [ ], "color" : "FFFFFF" }, /* 34 */ { "x" : -143, "y" : -144, "cMask" : [ ], "color" : "FFFFFF" }, /* 35 */ { "x" : -153, "y" : -144, "cMask" : [ ], "color" : "FFFFFF" }, /* 36 */ { "x" : -143, "y" : -136, "cMask" : [ ], "color" : "FFFFFF" }, /* 37 */ { "x" : -153, "y" : -136, "cMask" : [ ], "color" : "FFFFFF" }, /* 38 */ { "x" : -144, "y" : -164, "bCoef" : -30, "color" : "333333" }, /* 39 */ { "x" : -152, "y" : -164, "bCoef" : -30, "color" : "333333" }, /* 40 */ { "x" : -144.33332824706997, "y" : 133, "cMask" : [ ], "color" : "FFFFFF" }, /* 41 */ { "x" : -144.33332824706997, "y" : 149, "cMask" : [ ], "color" : "FFFFFF" }, /* 42 */ { "x" : -152.1194668480596, "y" : -72.65733382776978, "bCoef" : -30, "color" : "333333" }, /* 43 */ { "x" : -144.12127214605502, "y" : -72.82727943326013, "bCoef" : -30, "color" : "333333" }, /* 44 */ { "x" : -123.78986492508358, "y" : 48.444748409323154, "bCoef" : -30, "color" : "333333" }, /* 45 */ { "x" : -123.83376861516393, "y" : 40.44486888110541, "bCoef" : -30, "color" : "333333" }, /* 46 */ { "x" : -143.45539031039414, "y" : 157.7614556786628, "cMask" : [ ], "color" : "D40000" }, /* 47 */ { "x" : -145.20320690343038, "y" : 122.80512381793824, "cMask" : [ ], "color" : "D40000" }, /* 48 */ { "x" : -143.33054626803442, "y" : 160.2583365258574, "bCoef" : -0.5, "color" : "FF6054" }, /* 49 */ { "x" : -145.3280509457901, "y" : 120.3082429707436, "bCoef" : -0.5, "color" : "FF6054" }, /* 50 */ { "x" : -143.5802343527539, "y" : 155.26457483146817, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 51 */ { "x" : -145.07836286107064, "y" : 125.30200466513284, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FF6054" }, /* 52 */ { "x" : -139.33553691252303, "y" : 160.05858605808183, "bCoef" : -30, "color" : "333333" }, /* 53 */ { "x" : -147.3255556235458, "y" : 160.45808699363295, "bCoef" : -30, "color" : "333333" }, /* 54 */ { "x" : 163.6882208773082, "y" : 39.4585285483644, "cMask" : [ ], "color" : "0648CC" }, /* 55 */ { "x" : 128.6887479413556, "y" : 39.65060719246607, "cMask" : [ ], "color" : "0648CC" }, /* 56 */ { "x" : 166.18818322987624, "y" : 39.44480864521428, "bCoef" : -0.5, "color" : "08E6FF" }, /* 57 */ { "x" : 126.18878558878754, "y" : 39.66432709561619, "bCoef" : -0.5, "color" : "08E6FF" }, /* 58 */ { "x" : 161.18825852474015, "y" : 39.47224845151452, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "004077" }, /* 59 */ { "x" : 131.18871029392363, "y" : 39.63688728931595, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "004077" }, /* 60 */ { "x" : 143.9327385046584, "y" : -76.24287078613852, "cMask" : [ ], "color" : "0648CC" }, /* 61 */ { "x" : 144.67625052867876, "y" : -41.250768964868364, "cMask" : [ ], "color" : "0648CC" }, /* 62 */ { "x" : 143.87963050294266, "y" : -78.74230663051495, "bCoef" : -0.5, "color" : "08E6FF" }, /* 63 */ { "x" : 144.7293585303945, "y" : -38.751333120491914, "bCoef" : -0.5, "color" : "08E6FF" }, /* 64 */ { "x" : 143.98584650637417, "y" : -73.74343494176206, "bCoef" : -3, "cMask" : ["red","blue" ], "color" : "004077" }, /* 65 */ { "x" : 144.62314252696302, "y" : -43.750204809244806, "bCoef" : -1, "cMask" : ["red","blue" ], "color" : "004077" }, /* 66 */ { "x" : 146, "y" : -166.5, "cMask" : [ ], "color" : "333333" }, /* 67 */ { "x" : 146, "y" : -131.5, "cMask" : [ ], "color" : "0648CC" }, /* 68 */ { "x" : 146, "y" : -169, "bCoef" : -0.5, "color" : "08E6FF" }, /* 69 */ { "x" : 146, "y" : -129, "bCoef" : -0.5, "color" : "08E6FF" }, /* 70 */ { "x" : 146, "y" : -164, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "004077" }, /* 71 */ { "x" : 146, "y" : -134, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "004077" }, /* 72 */ { "x" : 140, "y" : 32, "cMask" : [ ], "color" : "FFFFFF" }, /* 73 */ { "x" : 151, "y" : 32, "cMask" : [ ], "color" : "FFFFFF" }, /* 74 */ { "x" : 151, "y" : 48, "cMask" : [ ], "color" : "FFFFFF" }, /* 75 */ { "x" : 140, "y" : 48, "cMask" : [ ], "color" : "FFFFFF" }, /* 76 */ { "x" : 148.66667175293003, "y" : 40, "cMask" : [ ], "color" : "FFFFFF" }, /* 77 */ { "x" : 142, "y" : 40, "cMask" : [ ], "color" : "FFFFFF" }, /* 78 */ { "x" : 152, "y" : -67, "cMask" : [ ], "color" : "FFFFFF" }, /* 79 */ { "x" : 138, "y" : -67, "cMask" : [ ], "color" : "FFFFFF" }, /* 80 */ { "x" : 138, "y" : -51, "cMask" : [ ], "color" : "FFFFFF" }, /* 81 */ { "x" : 151, "y" : -51, "cMask" : [ ], "color" : "FFFFFF" }, /* 82 */ { "x" : 151, "y" : -59, "cMask" : [ ], "color" : "FFFFFF" }, /* 83 */ { "x" : 138, "y" : -59, "cMask" : [ ], "color" : "FFFFFF" }, /* 84 */ { "x" : 141, "y" : -157, "cMask" : [ ], "color" : "FFFFFF" }, /* 85 */ { "x" : 151, "y" : -157, "cMask" : [ ], "color" : "FFFFFF" }, /* 86 */ { "x" : 151, "y" : -149, "cMask" : [ ], "color" : "FFFFFF" }, /* 87 */ { "x" : 141, "y" : -149, "cMask" : [ ], "color" : "FFFFFF" }, /* 88 */ { "x" : 151, "y" : -141, "cMask" : [ ], "color" : "FFFFFF" }, /* 89 */ { "x" : 141, "y" : -141, "cMask" : [ ], "color" : "FFFFFF" }, /* 90 */ { "x" : 150, "y" : -169, "bCoef" : -30, "color" : "333333" }, /* 91 */ { "x" : 142, "y" : -169, "bCoef" : -30, "color" : "333333" }, /* 92 */ { "x" : 147.66667175293003, "y" : 122, "cMask" : [ ], "color" : "FFFFFF" }, /* 93 */ { "x" : 147.66667175293003, "y" : 138, "cMask" : [ ], "color" : "FFFFFF" }, /* 94 */ { "x" : 139.8805331519404, "y" : -78.65733382776978, "bCoef" : -30, "color" : "333333" }, /* 95 */ { "x" : 147.87872785394498, "y" : -78.82727943326013, "bCoef" : -30, "color" : "333333" }, /* 96 */ { "x" : 166.21013507491642, "y" : 43.444748409323154, "bCoef" : -30, "color" : "333333" }, /* 97 */ { "x" : 166.16623138483607, "y" : 35.44486888110541, "bCoef" : -30, "color" : "333333" }, /* 98 */ { "x" : 148.54460968960586, "y" : 146.7614556786628, "cMask" : [ ], "color" : "0648CC" }, /* 99 */ { "x" : 146.79679309656962, "y" : 111.80512381793824, "cMask" : [ ], "color" : "0648CC" }, /* 100 */ { "x" : 148.66945373196558, "y" : 149.2583365258574, "bCoef" : -0.5, "color" : "08E6FF" }, /* 101 */ { "x" : 146.6719490542099, "y" : 109.3082429707436, "bCoef" : -0.5, "color" : "08E6FF" }, /* 102 */ { "x" : 148.4197656472461, "y" : 144.26457483146817, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "004077" }, /* 103 */ { "x" : 146.92163713892936, "y" : 114.30200466513284, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "004077" }, /* 104 */ { "x" : 152.66446308747697, "y" : 149.05858605808183, "bCoef" : -30, "color" : "333333" }, /* 105 */ { "x" : 144.6744443764542, "y" : 149.45808699363295, "bCoef" : -30, "color" : "333333" }, /* 106 */ { "x" : -190, "y" : 179, "trait" : "none", "color" : "C7E6BD", "curve" : 0 }, /* 107 */ { "x" : -100, "y" : 179, "trait" : "none", "color" : "C7E6BD", "curve" : 0 }, /* 108 */ { "x" : 99, "y" : 179, "trait" : "none", "color" : "C7E6BD" }, /* 109 */ { "x" : 189, "y" : 179, "trait" : "none", "color" : "C7E6BD" }, /* 110 */ { "x" : 98, "y" : -181, "trait" : "none", "color" : "C7E6BD" }, /* 111 */ { "x" : 188, "y" : -181, "trait" : "none", "color" : "C7E6BD" }, /* 112 */ { "x" : -190, "y" : -181, "trait" : "none", "color" : "C7E6BD" }, /* 113 */ { "x" : -100, "y" : -181, "trait" : "none", "color" : "C7E6BD" }, /* 114 */ { "x" : -190, "y" : -211, "trait" : "none" }, /* 115 */ { "x" : -100, "y" : -211, "trait" : "none" }, /* 116 */ { "x" : 98, "y" : -211, "trait" : "none" }, /* 117 */ { "x" : 188, "y" : -211, "trait" : "none" }, /* 118 */ { "x" : 99, "y" : 209, "trait" : "none" }, /* 119 */ { "x" : 189, "y" : 209, "trait" : "none" }, /* 120 */ { "x" : -100, "y" : 209, "trait" : "none" }, /* 121 */ { "x" : -190, "y" : 209, "trait" : "none" }, /* 122 */ { "x" : -190, "y" : 179, "trait" : "none" }, /* 123 */ { "x" : -281, "y" : -182, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 124 */ { "x" : -281, "y" : 178, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 125 */ { "x" : 277, "y" : -181, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 126 */ { "x" : 278, "y" : 180, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 127 */ { "x" : -281.6776750621829, "y" : 178.2460341165712, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 128 */ { "x" : 277.32338976468, "y" : 178.73345881060513, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 129 */ { "x" : -280.6776750621829, "y" : -180.7539658834288, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 130 */ { "x" : 278.32338976468, "y" : -182.26654118939487, "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "color" : "000000" }, /* 131 */ { "x" : -6, "y" : -26, "bCoef" : -0.5, "cMask" : ["wall" ], "curve" : 3.0963153979559355 }, /* 132 */ { "x" : 2, "y" : 16, "bCoef" : -0.5, "cMask" : ["wall" ], "curve" : 3.0963153979559355 }, /* 133 */ { "x" : -12, "y" : 17, "cMask" : ["wall" ], "cGroup" : ["wall" ], "curve" : 0.6930856553811561 }, /* 134 */ { "x" : 8, "y" : -26, "bCoef" : -0.5, "cMask" : ["wall" ], "curve" : 1.6369109233772294 }, /* 135 */ { "x" : 16, "y" : 17, "bCoef" : -0.5, "cMask" : ["wall" ], "curve" : 1.6369109233772294 }, /* 136 */ { "x" : 2, "y" : 17, "cMask" : ["wall" ], "cGroup" : ["wall" ], "curve" : 0.6930856553811561 } ], "segments" : [ { "v0" : 0, "v1" : 1, "vis" : false, "color" : "33BF00", "cMask" : ["red","blue" ], "cGroup" : ["red","blue" ] }, { "v0" : 2, "v1" : 3, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 3, "v1" : 2, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 4, "v1" : 5, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 5, "v1" : 4, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 6, "v1" : 7, "curve" : -192.2071334003047, "color" : "FF6054", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 7, "v1" : 6, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 8, "v1" : 9, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 9, "v1" : 8, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 10, "v1" : 11, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 11, "v1" : 10, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 12, "v1" : 13, "curve" : 180, "color" : "FF6054", "bCoef" : -1, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 13, "v1" : 12, "curve" : 180, "color" : "FF6054", "bCoef" : -1, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 14, "v1" : 15, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 15, "v1" : 14, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 16, "v1" : 17, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 17, "v1" : 16, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 18, "v1" : 19, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 19, "v1" : 18, "curve" : 180, "color" : "FF6054", "bCoef" : 0, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 20, "v1" : 21, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 21, "v1" : 22, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 22, "v1" : 23, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 24, "v1" : 25, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 26, "v1" : 27, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 27, "v1" : 28, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 28, "v1" : 29, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 29, "v1" : 30, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 30, "v1" : 31, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 32, "v1" : 33, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 33, "v1" : 34, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 34, "v1" : 35, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 35, "v1" : 32, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 34, "v1" : 36, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 36, "v1" : 37, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 39, "v1" : 38, "curve" : 14.999999999999998, "color" : "333333", "bCoef" : -30, "curveF" : 7.595754112725151 }, { "v0" : 40, "v1" : 41, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 42, "v1" : 43, "color" : "333333", "bCoef" : -30 }, { "v0" : 45, "v1" : 44, "curve" : 29.999999999999996, "color" : "333333", "bCoef" : -30, "curveF" : 3.7320508075688776 }, { "v0" : 46, "v1" : 47, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 47, "v1" : 46, "curve" : 180, "color" : "D40000", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 48, "v1" : 49, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 49, "v1" : 48, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 50, "v1" : 51, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 51, "v1" : 50, "curve" : 180, "color" : "FF6054", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 52, "v1" : 53, "curve" : 14.999999999999998, "color" : "333333", "bCoef" : -30, "curveF" : 7.595754112725151 }, { "v0" : 54, "v1" : 55, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 55, "v1" : 54, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 56, "v1" : 57, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 57, "v1" : 56, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 58, "v1" : 59, "curve" : 180, "color" : "004077", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 59, "v1" : 58, "curve" : 180, "color" : "004077", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 60, "v1" : 61, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 61, "v1" : 60, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 62, "v1" : 63, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 63, "v1" : 62, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 64, "v1" : 65, "curve" : 180, "color" : "004077", "bCoef" : -1, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 65, "v1" : 64, "curve" : 180, "color" : "004077", "bCoef" : -1, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 66, "v1" : 67, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 67, "v1" : 66, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 68, "v1" : 69, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 69, "v1" : 68, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 70, "v1" : 71, "curve" : 180, "color" : "004077", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 71, "v1" : 70, "curve" : 180, "color" : "004077", "bCoef" : 0, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 72, "v1" : 73, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 73, "v1" : 74, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 74, "v1" : 75, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 76, "v1" : 77, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 78, "v1" : 79, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 79, "v1" : 80, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 80, "v1" : 81, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 81, "v1" : 82, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 82, "v1" : 83, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 84, "v1" : 85, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 85, "v1" : 86, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 86, "v1" : 87, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 87, "v1" : 84, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 86, "v1" : 88, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 88, "v1" : 89, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 91, "v1" : 90, "curve" : 14.999999999999998, "color" : "333333", "bCoef" : -30, "curveF" : 7.595754112725151 }, { "v0" : 92, "v1" : 93, "color" : "FFFFFF", "cMask" : [ ] }, { "v0" : 94, "v1" : 95, "color" : "333333", "bCoef" : -30 }, { "v0" : 97, "v1" : 96, "curve" : 29.999999999999996, "color" : "333333", "bCoef" : -30, "curveF" : 3.7320508075688776 }, { "v0" : 98, "v1" : 99, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 99, "v1" : 98, "curve" : 180, "color" : "0648CC", "cMask" : [ ], "curveF" : 6.123233995736766e-17 }, { "v0" : 100, "v1" : 101, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 101, "v1" : 100, "curve" : 180, "color" : "08E6FF", "bCoef" : -0.5, "curveF" : 6.123233995736766e-17 }, { "v0" : 102, "v1" : 103, "curve" : 180, "color" : "004077", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 103, "v1" : 102, "curve" : 180, "color" : "004077", "bCoef" : -0.5, "cMask" : ["red","blue" ], "curveF" : 6.123233995736766e-17 }, { "v0" : 104, "v1" : 105, "curve" : 14.999999999999998, "color" : "333333", "bCoef" : -30, "curveF" : 7.595754112725151 }, { "v0" : 112, "v1" : 114, "color" : "ffffff", "trait" : "none" }, { "v0" : 113, "v1" : 115, "color" : "ffffff", "trait" : "none" }, { "v0" : 115, "v1" : 114, "color" : "ffffff", "trait" : "none" }, { "v0" : 110, "v1" : 116, "color" : "ffffff", "trait" : "none" }, { "v0" : 116, "v1" : 117, "color" : "ffffff", "trait" : "none", "y" : -210 }, { "v0" : 117, "v1" : 111, "color" : "ffffff", "trait" : "none" }, { "v0" : 108, "v1" : 118, "color" : "ffffff", "trait" : "none" }, { "v0" : 118, "v1" : 119, "color" : "ffffff", "trait" : "none" }, { "v0" : 119, "v1" : 109, "color" : "ffffff", "trait" : "none" }, { "v0" : 107, "v1" : 120, "color" : "ffffff", "trait" : "none" }, { "v0" : 120, "v1" : 121, "color" : "ffffff", "trait" : "none" }, { "v0" : 121, "v1" : 122, "color" : "ffffff", "trait" : "none" }, { "v0" : 123, "v1" : 124, "curve" : 0, "vis" : true, "color" : "000000", "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "x" : -320 }, { "v0" : 125, "v1" : 126, "curve" : 0, "vis" : true, "color" : "000000", "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "x" : -320 }, { "v0" : 127, "v1" : 128, "curve" : 0, "vis" : true, "color" : "000000", "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "x" : -320 }, { "v0" : 129, "v1" : 130, "curve" : 0, "vis" : true, "color" : "000000", "bCoef" : -1, "cMask" : ["wall" ], "trait" : "none", "x" : -320 }, { "v0" : 131, "v1" : 132, "curve" : -17.22373606227428, "color" : "004077", "bCoef" : -0.5, "cMask" : ["wall" ] }, { "v0" : 131, "v1" : 133, "curve" : -17.511002855674572, "color" : "004077", "cMask" : ["wall" ], "cGroup" : ["wall" ] }, { "v0" : 131, "v1" : 133, "curve" : 0.6930856553811561, "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ] }, { "v0" : 131, "v1" : 132, "curve" : 3.0963153979559355, "color" : "08E6FF", "bCoef" : -0.5, "cMask" : ["wall" ] }, { "v0" : 134, "v1" : 135, "curve" : -18.49883133414829, "color" : "004077", "bCoef" : -0.5, "cMask" : ["wall" ] }, { "v0" : 134, "v1" : 136, "curve" : -17.683629120383326, "color" : "004077", "cMask" : ["wall" ], "cGroup" : ["wall" ] }, { "v0" : 134, "v1" : 136, "curve" : 0.6930856553811561, "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ] }, { "v0" : 134, "v1" : 135, "curve" : 1.6369109233772294, "color" : "08E6FF", "bCoef" : -0.5, "cMask" : ["wall" ] } ], "planes" : [ { "normal" : [0,1 ], "dist" : -231.5 }, { "normal" : [1,0 ], "dist" : -331.5, "cMask" : ["red","blue" ] }, { "normal" : [0,-1 ], "dist" : -227, "cMask" : ["red","blue" ] }, { "normal" : [-1,0 ], "dist" : -342, "cMask" : ["red","blue" ] } ], "goals" : [ ], "discs" : [ { "radius" : 0, "pos" : [1,63 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [-11.99,-10 ] }, { "radius" : 0, "pos" : [-54,20.5 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,-10 ] }, { "radius" : 0, "pos" : [56,20.5 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,10 ] }, { "radius" : 0, "pos" : [-54,-24.5 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,-10 ] }, { "radius" : 0, "pos" : [56,-24.5 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,10 ] }, { "radius" : 0, "pos" : [1,-64.5 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [11.99,10 ] }, { "radius" : 0, "pos" : [1.6009523809523765,65.04603174603176 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [-13.1,-10 ] }, { "radius" : 0, "pos" : [-55.38015873015877,21.163095238095252 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,-10 ] }, { "radius" : 0, "pos" : [58.19920634920629,21.163095238095252 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,10 ] }, { "radius" : 0, "pos" : [-55.38015873015877,-25.301190476190442 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,-10 ] }, { "radius" : 0, "pos" : [58.19920634920629,-25.301190476190442 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [0,10 ] }, { "radius" : 0, "pos" : [1.0095238095237618,-66.60277777777776 ], "color" : "08E6FF", "cMask" : ["wall" ], "cGroup" : ["wall" ], "speed" : [13.1,10 ] }, { "radius" : 0, "invMass" : 0, "pos" : [-331,-230 ], "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["red","blue","ball" ] }, { "radius" : 0, "invMass" : 0, "pos" : [341,-230 ], "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["red","blue","ball" ] }, { "radius" : 0, "invMass" : 0, "pos" : [341,225 ], "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["red","blue","ball" ] }, { "radius" : 0, "invMass" : 0, "pos" : [-331,226 ], "color" : "C7E6BD", "bCoef" : 0, "cMask" : ["red","blue","ball" ] }, { "radius" : 0, "pos" : [-376,465 ], "color" : "FF6054", "bCoef" : -1, "cMask" : ["red","blue" ], "speed" : [0,-4.4 ] }, { "radius" : 0, "pos" : [-350,465 ], "color" : "FF6054", "bCoef" : -1, "cMask" : ["red","blue" ], "speed" : [0,-4.4 ] } ], "playerPhysics" : { "bCoef" : 0.35, "invMass" : 1, "damping" : 0.95, "acceleration" : 0.12, "kickingDamping" : 1, "kickStrength" : 0.2 }, "ballPhysics" : { "radius" : 0, "bCoef" : 1.1, "invMass" : 0.999, "damping" : 0.9999, "color" : "C9F364" }, "spawnDistance" : 500, "traits" : { }, "joints" : [ { "d0" : 4, "d1" : 6, "strength" : "rigid", "color" : "08E6FF", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 5, "d1" : 6, "strength" : "rigid", "color" : "08E6FF", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 3, "d1" : 5, "strength" : "rigid", "color" : "08E6FF", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 1, "d1" : 3, "strength" : "rigid", "color" : "08E6FF", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 1, "d1" : 2, "strength" : "rigid", "color" : "08E6FF", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 2, "d1" : 4, "strength" : "rigid", "color" : "08E6FF", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 4, "d1" : 5, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 2, "d1" : 3, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 1, "d1" : 6, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 2, "d1" : 6, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 1, "d1" : 5, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 2, "d1" : 5, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 1, "d1" : 4, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 3, "d1" : 6, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 3, "d1" : 4, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 10, "d1" : 12, "strength" : "rigid", "color" : "004077", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 11, "d1" : 12, "strength" : "rigid", "color" : "004077", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 9, "d1" : 11, "strength" : "rigid", "color" : "004077", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 7, "d1" : 9, "strength" : "rigid", "color" : "004077", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 7, "d1" : 8, "strength" : "rigid", "color" : "004077", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 8, "d1" : 10, "strength" : "rigid", "color" : "004077", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 10, "d1" : 11, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 8, "d1" : 9, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 7, "d1" : 12, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 8, "d1" : 12, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 7, "d1" : 11, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 8, "d1" : 11, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 7, "d1" : 10, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 9, "d1" : 12, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 9, "d1" : 10, "strength" : "rigid", "color" : "transparent", "length" : null, "radius" : 0, "damping" : 1 }, { "d0" : 15, "d1" : 16, "strength" : "rigid", "color" : "ffffff", "length" : null, "radius" : 5 }, { "d0" : 13, "d1" : 16, "strength" : "rigid", "color" : "ffffff", "length" : null, "radius" : 5 }, { "d0" : 13, "d1" : 14, "strength" : "rigid", "color" : "ffffff", "length" : null, "radius" : 5 }, { "d0" : 14, "d1" : 15, "strength" : "rigid", "color" : "ffffff", "length" : null, "radius" : 5 } ], "redSpawnPoints" : [ ], "blueSpawnPoints" : [ ] }`;
dizilim = dizilim.replace(/\/\*\s*\w*\s*\*\//gim, "");
transfer = transfer.replace(/\/\*\s*\w*\s*\*\//gim, "");
şampiyonluk = şampiyonluk.replace(/\/\*\s*\w*\s*\*\//gim, "");
hazirlik = hazirlik.replace(/\/\*\s*\w*\s*\*\//gim, "");

/* OPTIONS */
let stadyumismi = JSON.parse(antrenman.replace(/\/\*\s*\w*\s*\*\//gi, "")).name;
room.setCustomStadium(antrenman);
room.setScoreLimit(0);
room.setTimeLimit(0);
// var afkLimit = 12;
var drawTimeLimit = Infinity;
var maxTeamSize = 3; // This works for 1 (you might want to adapt things to remove some useless stats in 1v1 like assist or cs), 2, 3 or 4
var slowMode = 0;

/* PLAYERS */

const Team = { SPECTATORS: 0, RED: 1, BLUE: 2 };
var extendedP = [];
const eP = { ID: 0, AUTH: 1, CONN: 2, ACT: 3, GK: 4, MUTE: 5 };
const Ss = {
  GA: 0,
  WI: 1,
  DR: 2,
  LS: 3,
  WR: 4,
  GL: 5,
  AS: 6,
  GK: 7,
  CS: 8,
  CP: 9,
  RL: 10,
  NK: 11,
};
var players;
var teamR;
var teamB;
var teamS;

var playersNotInLineId = [];
var lastScores = 0;
var lastTeamTouched = 0;
var exitingPos = null;
var previousBallPos;
var assistingTouch = "";
var lastPlayersTouched = "";
var lat = 41.000000001;
var long = 29;
var backMSG = false;
var lastCall;
var isBallUp = false;
var crossed = false;
var lineCrossedPlayers = [{ name: "temp", times: 0 }];
var isBallKickedOutside = false;
var previousPlayerTouched;

/* GAME */

//var lastTeamTouched;
var lastPlayersTouched; // These allow to get good goal notifications (it should be lastPlayersKicked, waiting on a next update to get better track of shots on target)
// var countAFK = false; // Created to get better track of activity
var lineBallPosition;
var activePlay = false; // Created to get better track of the possession
var goldenGoal = false;
var SMSet = new Set(); // Set created to get slow mode which is useful in chooseMode
var banList = []; // Getting track of the bans, so we can unban ppl if we want

/* STATS */

var game;
var GKList = ["", ""];
var Rposs = 0;
var Bposs = 0;
var point = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
]; // created to get ball speed
var ballSpeed;
var lastWinner = Team.SPECTATORS;
var streak = 0;
var allBlues = []; // This is to count the players who should be counted for the stats. This includes players who left after the game has started, doesn't include those who came too late or ...
var allReds = []; // ... those who came in a very unequal game.

/* BALANCE & CHOOSE */

var inChooseMode = false; // This variable enables to distinguish the 2 phases of playing and choosing which should be dealt with very differently
var redCaptainChoice = "";
var blueCaptainChoice = "";
var chooseTime = 20;
var timeOutCap;

/* AUXILIARY */

var checkTimeVariable = false; // This is created so the chat doesn't get spammed when a game is ending via timeLimit
var statNumber = 0; // This allows the room to be given stat information every X minutes
var endGameVariable = false; // This variable with the one below helps distinguish the cases where games are stopped because they have finished to the ones where games are stopped due to player movements or resetting teams
var resettingTeams = false;
var capLeft = false;
var statInterval = 6;

// loadMap(aloneMap, 0, 0);

/* OBJECTS */

function GetTeam(id) {
  return room
    .getPlayerList()
    .filter((player) => player.id != 0 && player.team == id);
}

function isBallGoingUp() {
  previousBallPosForGoingUp = currentBallPosForGoingUp;
  currentBallPosForGoingUp = room.getBallPosition().y;
  if (previousBallPosForGoingUp - currentBallPosForGoingUp > 0.01) {
    isBallUp = 2;
  } else if (previousBallPosForGoingUp - currentBallPosForGoingUp < -0.01) {
    isBallUp = 1;
  } else {
    isBallUp = 0;
  }
}
function Goal(time, team, striker, assist) {
  this.time = time;
  this.team = team;
  this.striker = striker;
  this.assist = assist;
}

function Game(date, scores, goals) {
  this.date = date;
  this.scores = scores;
  this.goals = goals;
}

/* FUNCTIONS */

// return: whether it's an OG
var isOwnGoal = (team, player) => (team != player.team ? " [Gol contra]" : "");

// return: a better display of the second when a goal is scored
var floor = (s) => (s < 10 ? "0" + s : s);

/* AUXILIARY FUNCTIONS */

function getRandomInt(max) {
  // returns a random number from 0 to max-1
  return Math.floor(Math.random() * Math.floor(max));
}

function getTime(scores) {
  const string = lastTeamTouched.toString();

  // returns the current time of the game
  return (
    "[" +
    Math.floor(Math.floor(scores.time / 60) / 10).toString() +
    Math.floor(Math.floor(scores.time / 60) % 10).toString() +
    ":" +
    Math.floor(
      Math.floor(scores.time - Math.floor(scores.time / 60) * 60) / 10
    ).toString() +
    Math.floor(
      Math.floor(scores.time - Math.floor(scores.time / 60) * 60) % 10
    ).toString() +
    "]"
  );
}

/* BUTTONS */

function topBtn() {
  if (teamS.length == 0) {
    return;
  } else {
    if (teamR.length == teamB.length) {
      if (teamS.length > 1) {
        room.setPlayerTeam(teamS[0].id, Team.RED);
        room.setPlayerTeam(teamS[1].id, Team.BLUE);
      }
      return;
    } else if (teamR.length < teamB.length) {
      room.setPlayerTeam(teamS[0].id, Team.RED);
    } else {
      room.setPlayerTeam(teamS[0].id, Team.BLUE);
    }
  }
}

function randomBtn() {
  if (teamS.length == 0) {
    return;
  } else {
    if (teamR.length == teamB.length) {
      if (teamS.length > 1) {
        var r = getRandomInt(teamS.length);
        room.setPlayerTeam(teamS[r].id, Team.RED);
        teamS = teamS.filter((spec) => spec.id != teamS[r].id);
        room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
      }
      return;
    } else if (teamR.length < teamB.length) {
      room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED);
    } else {
      room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
    }
  }
}

function blueToSpecBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < teamB.length; i++) {
    room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
  }
}

function redToSpecBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < teamR.length; i++) {
    room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
  }
}

function resetBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  if (teamR.length <= teamB.length) {
    for (var i = 0; i < teamR.length; i++) {
      room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
      room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
    }
    for (var i = teamR.length; i < teamB.length; i++) {
      room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
    }
  } else {
    for (var i = 0; i < teamB.length; i++) {
      room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
      room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
    }
    for (var i = teamB.length; i < teamR.length; i++) {
      room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
    }
  }
}

function blueToRedBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < teamB.length; i++) {
    room.setPlayerTeam(teamB[i].id, Team.RED);
  }
}

/* GAME FUNCTIONS */

function checkTime() {
  const scores = room.getScores();
  game.scores = scores;
  /*  if (
    Math.abs(scores.time - scores.timeLimit) <= 0.01 &&
    scores.timeLimit != 0
  ) {
    if (scores.red != scores.blue) {
      if (checkTimeVariable == false) {
        checkTimeVariable = true;
        setTimeout(() => {
          checkTimeVariable = false;
        }, 3000);
        scores.red > scores.blue ? endGame(Team.RED) : endGame(Team.BLUE);
        setTimeout(() => {
          room.stopGame();
        }, 2000);
      }
      return;
    }
    goldenGoal = true;
    room.sendChat(
      "⚽ Altın Gol, Bakalım Kim Gol Atıp Takımına Galibiyeti getirecek !"
    );
  }
  if (
    Math.abs(drawTimeLimit * 60 - scores.time - 60) <= 0.01 &&
    players.length > 2
  ) {
    if (checkTimeVariable == false) {
      checkTimeVariable = true;
      setTimeout(() => {
        checkTimeVariable = true;
      }, 10);
      room.sendChat(
        "⌛ Oyun bitene kadar 60 saniye kaldı. Son saniyeler bakalım neler olucak !"
      );
    }
  }
  if (
    Math.abs(scores.time - drawTimeLimit * 60) <= 0.01 &&
    players.length > 2
  ) {
    if (checkTimeVariable == false) {
      checkTimeVariable = true;
      setTimeout(() => {
        checkTimeVariable = false;
      }, 10);
      endGame(Team.SPECTATORS);
      room.stopGame();
      goldenGoal = false;
    }
  }*/
}

function endGame(winner) {
  // handles the end of a game : no stopGame function inside
  players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null;
  const scores = room.getScores();
  game.scores = scores;
  Rposs = Rposs / (Rposs + Bposs);
  Bposs = 1 - Rposs;
  lastWinner = winner;
  if (scores.red > 1) {
    if (scores.blue < 1) {
      room.sendChat(`🏆 ${GKList[0].name}, kaleyi gole kapattı!`);
      // veriyiDuzenle({ auth: getAuth(GKList[0]), CS: 1 });
    }
  } else if (scores.blue > 1) {
    if (scores.red < 1) {
      room.sendChat(`${GKList[1].name}, kaleyi gole kapattı ! `);
      // veriyiDuzenle({ auth: getAuth(GKList[1]), CS: 1 });
    }
  } else {
    if (scores.blue == scores.red && scores.red == 0) {
      //    room.sendChat(`${GKList[0].name} ve ${GKList[1].name}, kalelerine topu sokmadilar! Iki isim de bir efsaneydi!`);
      // let data = {auth: getAuth(GKList[0]), CS:1};
      // let $data = {auth:getAuth(GKList[1]), CS:1};
      // veriyiDuzenle(data);
      // veriyiDuzenle($data);
    }
  }
  // veriyiDuzenle({ auth: getAuth(GKList[0]), DM: 1 });
  // veriyiDuzenle({ auth: getAuth(GKList[1]), DM: 1 });
  // let playersthatinGame = room.getPlayerList((p) => p.team != 0);
  // let golAtanOyuncular = playersthatinGame.filter(
  //   (p) => ggol.has(p.id) == true
  // );
  // let asistYapanOyuncular = playersthatinGame.filter(
  //   (p) => gassist.has(p.id) == true
  // );
  // let KendiKalesineAtanlar = playersthatinGame.filter(
  //   (p) => gkk.has(p.id) == true
  // );
  // let reds = playersthatinGame.filter((p) => p.team == 1);
  // let blues = playersthatinGame.filter((p) => p.team == 2);
  // if (winner == Team.RED) {
  //   reds.forEach((e) => {
  //     veriyiDuzenle({ auth: getAuth(e), galibiyet: 1 });
  //   });

  //   blues.forEach((e) => {
  //     veriyiDuzenle({
  //       auth: getAuth(e),
  //       maglubiyet: 1,
  //     });
  //   });
  // }
  // if (winner == Team.BLUE) {
  //   blues.forEach((e) => {
  //     veriyiDuzenle({ auth: getAuth(e), galibiyet: 1 });
  //   });
  //   reds.forEach((e) => {
  //     veriyiDuzenle({ auth: getAuth(e), maglubiyet: 1 });
  //   });
  // }
  // playersthatinGame.forEach((e) => {
  //   veriyiDuzenle({ auth: getAuth(e), oyunlar: 1 });
  // });
  // KendiKalesineAtanlar.forEach(e => {
  //   veriyiDuzenle({auth: getAuth(e), kk: gkk.get(e.id) });
  // })
  // golAtanOyuncular.forEach(e => {
  //   veriyiDuzenle({auth: getAuth(e), gol: ggol.get(e.id) })
  // })
  // asistYapanOyuncular.forEach(e => {
  //   veriyiDuzenle({auth: getAuth(e), asist : gassist.get(e.id)})
  // })
  endGameVariable = false;
  if (winner == Team.RED) {
    streak++;
    room.sendChat(
      "🔴 Kırmızı Takım " +
        scores.red +
        "-" +
        scores.blue +
        " ! Kazanma Serisi : " +
        streak +
        " 🏆"
    );
  } else if (winner == Team.BLUE) {
    streak = 1;
    room.sendChat(
      "🔵 Mavi Takım " +
        scores.blue +
        "-" +
        scores.red +
        " ! Kazanma Serisi : " +
        streak +
        " 🏆"
    );
  } else {
    streak = 0;
    room.sendChat("💤 Son teslim tarihi bitti! 💤");
  }
  room.sendChat(
    "⭐ Topla oynama: 🔴 " +
      (Rposs * 100).toPrecision(3).toString() +
      "% : " +
      (Bposs * 100).toPrecision(3).toString() +
      "% 🔵"
  );
  // scores.red == 0
  //   ? scores.blue == 0
  //     ? room.sendChat(
  //         "🏆 " +
  //           GKList[0].name +
  //           " y " +
  //           GKList[1].name +
  //           " Kaleyi yenilmez tuttular ! "
  //       )
  //     : room.sendChat("🏆 " + GKList[1].name + "Kaleyi yenilmez tuttu ! ")
  //   : scores.blue == 0
  //   ? room.sendChat("🏆 " + GKList[0].name + " Kaleyi yenilmez tuttu ! ")
  //   : null;
}

function quickRestart() {
  room.stopGame();
  setTimeout(() => {
    room.startGame();
  }, 2000);
}

function resumeGame() {
  setTimeout(() => {
    room.startGame();
  }, 2000);
  setTimeout(() => {
    room.pauseGame(false);
  }, 1000);
}

function activateChooseMode() {
  inChooseMode = true;
  slowMode = 2;
  room.sendChat("Yavaş mod etkinleştirildi (2 saniye)!");
}

function deactivateChooseMode() {
  inChooseMode = false;
  clearTimeout(timeOutCap);
  if (slowMode != 0) {
    slowMode = 0;
    room.sendChat("Yavaş mod bitti.");
  }
  redCaptainChoice = "";
  blueCaptainChoice = "";
}

/*
function loadMap(map, scoreLim, timeLim) {
    if (map == aloneMap) {
        room.setCustomStadium(aloneMap);
    } else if (map == classicMap) {
        (classicMap != '') ? room.setCustomStadium(classicMap): room.setDefaultStadium("Classic");
    } else if (map == bigMap) {
        (bigMap != '.') ? room.setCustomStadium(bigMap): room.setDefaultStadium("Big");
    } else {
        room.setCustomStadium(map);
    }
    room.setScoreLimit(scoreLim);
    room.setTimeLimit(timeLim);
}
*/

var commands = {
  "!swap": swapFun,
  "!poss": PosesionBalonFun,
};

function updateTeamPoss(value) {
  if (value[1] == 1) redPoss += value[0];
  if (value[1] == 2) bluePoss += value[0];
}

var bluePoss;
var redPoss;
var timeOnHalves;
function PosesionBalonFun() {
  if (room.getScores() == null) return false;
  bluePoss = 0;
  redPoss = 0;
  ballCarrying.forEach(updateTeamPoss);
  var redPossPercent = Math.round(
    (redPoss / (redPoss + bluePoss + 0.000001)) * 100
  );
  var bluePossPercent = Math.round(
    (bluePoss / (redPoss + bluePoss + 0.000001)) * 100
  );
  room.sendAnnouncement(
    "⛹ Topla Oynama: Takım Red 🔴 " +
      boldedNumber(redPossPercent) +
      "% - " +
      boldedNumber(bluePossPercent) +
      "% Takım Mavi 🔵 ",
    null,
    0x33ffb4,
    "normal",
    0
  );

  var timeOnRedHalf = Math.round(
    (timeOnHalves[0] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100
  );
  var timeOnBlueHalf = Math.round(
    (timeOnHalves[1] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100
  );
  room.sendAnnouncement(
    "◧ Topla Oynama: Takım Red 🔴 " +
      boldedNumber(timeOnRedHalf) +
      "% - " +
      boldedNumber(timeOnBlueHalf) +
      "% Takım Mavi 🔵 ",
    null,
    0x33ffb4,
    "normal",
    0
  );
}

function teamPossFun() {
  if (room.getScores() == null) return false;
  bluePoss = 0;
  redPoss = 0;
  ballCarrying.forEach(updateTeamPoss);
  var redPossPercent = Math.round(
    (redPoss / (redPoss + bluePoss + 0.000001)) * 100
  );
  var bluePossPercent = Math.round(
    (bluePoss / (redPoss + bluePoss + 0.000001)) * 100
  );
  room.sendChat(
    "⛹ Topla Oynama: Takım Red 🔴 " +
      boldedNumber(redPossPercent) +
      "% - " +
      boldedNumber(bluePossPercent) +
      "% Takım Mavi 🔵 "
  );

  var timeOnRedHalf = Math.round(
    (timeOnHalves[0] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100
  );
  var timeOnBlueHalf = Math.round(
    (timeOnHalves[1] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100
  );
  room.sendChat(
    "◧ Topla Oynama: Takım Red 🔴 " +
      boldedNumber(timeOnRedHalf) +
      "% - " +
      boldedNumber(timeOnBlueHalf) +
      "% Takım Mavi 🔵 "
  );
}

function swapFun(player) {
  if (player.admin == true) {
    if (room.getScores() == null) {
      var players = room.getPlayerList();
      for (i = 0; i < players.length; i++) {
        if (players[i].team == 1) {
          room.setPlayerTeam(players[i].id, 2);
        } else if (players[i].team == 2) {
          room.setPlayerTeam(players[i].id, 1);
        }
      }
    }
  }
}

/* PLAYER FUNCTIONS */

function updateTeams() {
  // update the players' list and all the teams' list
  players = room.getPlayerList().filter((player) => player.id != 0);
  teamR = players.filter((p) => p.team === Team.RED);
  teamB = players.filter((p) => p.team === Team.BLUE);
  teamS = players.filter((p) => p.team === Team.SPECTATORS);
}

function getAuth(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.AUTH]
    : null;
}

/*
function getAFK(player) {
    return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.AFK] : null;
}

function setAFK(player, value) {
    extendedP.filter((a) => a[0] == player.id).forEach((player) => player[eP.AFK] = value);
}
*/

function getActivity(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.ACT]
    : null;
}

function setActivity(player, value) {
  extendedP
    .filter((a) => a[0] == player.id)
    .forEach((player) => (player[eP.ACT] = value));
}

function getGK(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.GK]
    : null;
}

function setGK(player, value) {
  extendedP
    .filter((a) => a[0] == player.id)
    .forEach((player) => (player[eP.GK] = value));
}

function getMute(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.MUTE]
    : null;
}

function setMute(player, value) {
  extendedP
    .filter((a) => a[0] == player.id)
    .forEach((player) => (player[eP.MUTE] = value));
}

/* BALANCE & CHOOSE FUNCTIONS */

function updateRoleOnPlayerIn() {
  updateTeams();
  /*
    if (inChooseMode) {
        if (players.length == 6) {
            loadMap(bigMap, scoreLimitBig, timeLimitBig);
        }
        getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
    }
    */
  //  balanceTeams();
}
/*
function updateRoleOnPlayerOut() {
    updateTeams();
    if (room.getScores() != null) {
        var scores = room.getScores();
        if (players.length >= 2 * maxTeamSize && scores.time >= (5 / 6) * game.scores.timeLimit && teamR.length != teamB.length) {

    }}

    if (inChooseMode) {
        if (players.length == 5) {
            loadMap(classicMap, scoreLimitClassic, timeLimitClassic);
        }
        if (teamR.length == 0 || teamB.length == 0) {
            teamR.length == 0 ? room.setPlayerTeam(teamS[0].id, Team.RED) : room.setPlayerTeam(teamS[0].id, Team.BLUE);
            return;
        }
        if (Math.abs(teamR.length - teamB.length) == teamS.length) {
            room.sendChat("Alternatif yok, bu durumu ben halledeyim ...");
            deactivateChooseMode();
            resumeGame();
            var b = teamS.length;
            if (teamR.length > teamB.length) {
                for (var i = 0; i < b; i++) {
                    setTimeout(() => { room.setPlayerTeam(teamS[0].id, Team.BLUE); }, 5 * i);
                }
            } else {
                for (var i = 0; i < b; i++) {
                    setTimeout(() => { room.setPlayerTeam(teamS[0].id, Team.RED); }, 5 * i);
                }
            }
            return;
        }
        if (streak == 0 && room.getScores() == null) {
            if (Math.abs(teamR.length - teamB.length) == 2) { // if someone left a team has 2 more players than the other one, put the last chosen guy back in his place so it's fair
                room.sendChat("🤖 Takımları dengelemek ... 🤖");
                teamR.length > teamB.length ? room.setPlayerTeam(teamR[teamR.length - 1].id, Team.SPECTATORS) : room.setPlayerTeam(teamB[teamB.length - 1].id, Team.SPECTATORS);
            }
        }
        if (teamR.length == teamB.length && teamS.length < 2) {
            deactivateChooseMode();
            resumeGame();
            return;
        }
        capLeft ? choosePlayer() : getSpecList(teamR.length <= teamB.length ? teamR[0] : teamB[0]);
    }

  // balanceTeams();
}
*/
/*
function balanceTeams() {

    if (!inChooseMode) {
        if (players.length == 1 && teamR.length == 0) {
            quickRestart();
           // loadMap(aloneMap, 0, 0);
            room.setPlayerTeam(players[0].id, Team.RED);
        } else if (Math.abs(teamR.length - teamB.length) == teamS.length && teamS.length > 0) {
            const n = Math.abs(teamR.length - teamB.length);
            if (players.length == 2) {
                quickRestart();
                loadMap(classicMap, scoreLimitClassic, timeLimitClassic);
            }
            if (teamR.length > teamB.length) {
                for (var i = 0; i < n; i++) {
                    room.setPlayerTeam(teamS[i].id, Team.BLUE);
                }
            } else {
                for (var i = 0; i < n; i++) {
                    room.setPlayerTeam(teamS[i].id, Team.RED);
                }
            }
        } else if (Math.abs(teamR.length - teamB.length) > teamS.length) {
            const n = Math.abs(teamR.length - teamB.length);
            if (players.length == 1) {
                quickRestart();
                loadMap(aloneMap, 0, 0);
                room.setPlayerTeam(players[0].id, Team.RED);
                return;
            } else if (players.length == 5) {
                quickRestart();
                loadMap(classicMap, scoreLimitClassic, timeLimitClassic);
            }
            if (players.length == maxTeamSize * 2 - 1) {
                allReds = [];
                allBlues = [];
            }
            if (teamR.length > teamB.length) {
                for (var i = 0; i < n; i++) {
                    room.setPlayerTeam(teamR[teamR.length - 1 - i].id, Team.SPECTATORS);
                }
            } else {
                for (var i = 0; i < n; i++) {
                    room.setPlayerTeam(teamB[teamB.length - 1 - i].id, Team.SPECTATORS);
                }
            }
        } else if (Math.abs(teamR.length - teamB.length) < teamS.length && teamR.length != teamB.length) {
            room.pauseGame(true);
            activateChooseMode();
            choosePlayer();
        } else if (teamS.length >= 2 && teamR.length == teamB.length && teamR.length < maxTeamSize) {
            if (teamR.length == 2) {
                quickRestart();
                loadMap(bigMap, scoreLimitBig, timeLimitBig);
            }
            topBtn();
        }
    }

}
*/

function getSpecList(player) {
  var cstm = "[PV] Oyuncular : ";
  for (var i = 0; i < teamS.length; i++) {
    if (140 - cstm.length < (teamS[i].name + "[" + (i + 1) + "], ").length) {
      room.sendChat(cstm, player.id);
      cstm = "... ";
    }
    cstm += teamS[i].name + "[" + (i + 1) + "], ";
  }
  cstm = cstm.substring(0, cstm.length - 2);
  cstm += ".";
  room.sendChat(cstm, player.id);
}

/* STATS FUNCTIONS */

function getLastTouchTheBall() {
  const ballPosition = room.getBallPosition();
  updateTeams();
  var players = room.getPlayerList();
  for (var i = 0; i < players.length; i++) {
    if (players[i].position != null) {
      var distanceToBall = pointDistance(players[i].position, ballPosition);
      if (distanceToBall < triggerDistance) {
        if (lastPlayersTouched != players[i].name) {
          if (lastTeamTouched == players[i].team) {
            assistingTouch = lastPlayersTouched;
          } else assistingTouch = "";
        }
        lastTeamTouched = players[i].team;
        previousPlayerTouched == lastPlayersTouched;
        lastPlayersTouched = players[i].name;
      }
    }
  }
  return lastPlayersTouched;
}

function getStats() {
  // gives possession, ball speed and GK of each team
  if (activePlay) {
    updateTeams();
    lastTeamTouched == Team.RED ? Rposs++ : Bposs++;
    var ballPosition = room.getBallPosition();
    point[1] = point[0];
    point[0] = ballPosition;
    ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
    var k = [-1, Infinity];
    for (var i = 0; i < teamR.length; i++) {
      if (teamR[i].position.x < k[1]) {
        k[0] = teamR[i];
        k[1] = teamR[i].position.x;
      }
    }
    k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
    k = [-1, -Infinity];
    for (var i = 0; i < teamB.length; i++) {
      if (teamB[i].position.x > k[1]) {
        k[0] = teamB[i];
        k[1] = teamB[i].position.x;
      }
    }
    k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
    findGK();
  }
}

function updateStats() {
  if (
    players.length >= 2 * maxTeamSize &&
    (game.scores.time >= (5 / 6) * game.scores.timeLimit ||
      game.scores.red == game.scores.scoreLimit ||
      game.scores.blue == game.scores.scoreLimit) &&
    allReds.length >= maxTeamSize &&
    allBlues.length >= maxTeamSize
  ) {
    var stats;
    for (var i = 0; i < allReds.length; i++) {
      localStorage.getItem(getAuth(allReds[i]))
        ? (stats = JSON.parse(localStorage.getItem(getAuth(allReds[i]))))
        : (stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            allReds[i].name,
          ]);
      stats[Ss.GA]++;
      lastWinner == Team.RED
        ? stats[Ss.WI]++
        : lastWinner == Team.BLUE
        ? stats[Ss.LS]++
        : stats[Ss.DR]++;
      stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
      localStorage.setItem(getAuth(allReds[i]), JSON.stringify(stats));
    }
    for (var i = 0; i < allBlues.length; i++) {
      localStorage.getItem(getAuth(allBlues[i]))
        ? (stats = JSON.parse(localStorage.getItem(getAuth(allBlues[i]))))
        : (stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            allBlues[i].name,
          ]);
      stats[Ss.GA]++;
      lastWinner == Team.BLUE
        ? stats[Ss.WI]++
        : lastWinner == Team.RED
        ? stats[Ss.LS]++
        : stats[Ss.DR]++;
      stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
      localStorage.setItem(getAuth(allBlues[i]), JSON.stringify(stats));
    }
    for (var i = 0; i < game.goals.length; i++) {
      if (game.goals[i].striker != null) {
        if (
          allBlues
            .concat(allReds)
            .findIndex((player) => player.id == game.goals[i].striker.id) != -1
        ) {
          stats = JSON.parse(
            localStorage.getItem(getAuth(game.goals[i].striker))
          );
          stats[Ss.GL]++;
          localStorage.setItem(
            getAuth(game.goals[i].striker),
            JSON.stringify(stats)
          );
        }
      }
      if (game.goals[i].assist != null) {
        if (
          allBlues
            .concat(allReds)
            .findIndex((player) => player.name == game.goals[i].assist.name) !=
          -1
        ) {
          stats = JSON.parse(
            localStorage.getItem(getAuth(game.goals[i].assist))
          );
          stats[Ss.AS]++;
          localStorage.setItem(
            getAuth(game.goals[i].assist),
            JSON.stringify(stats)
          );
        }
      }
    }
    if (allReds.findIndex((player) => player.id == GKList[0].id) != -1) {
      stats = JSON.parse(localStorage.getItem(getAuth(GKList[0])));
      stats[Ss.GK]++;
      game.scores.blue == 0 ? stats[Ss.CS]++ : null;
      stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
      localStorage.setItem(getAuth(GKList[0]), JSON.stringify(stats));
    }
    if (allBlues.findIndex((player) => player.id == GKList[1].id) != -1) {
      stats = JSON.parse(localStorage.getItem(getAuth(GKList[1])));
      stats[Ss.GK]++;
      game.scores.red == 0 ? stats[Ss.CS]++ : null;
      stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
      localStorage.setItem(getAuth(GKList[1]), JSON.stringify(stats));
    }
  }
}

function findGK() {
  var tab = [
    [-1, ""],
    [-1, ""],
  ];
  for (var i = 0; i < extendedP.length; i++) {
    if (
      room.getPlayer(extendedP[i][eP.ID]) != null &&
      room.getPlayer(extendedP[i][eP.ID]).team == Team.RED
    ) {
      if (tab[0][0] < extendedP[i][eP.GK]) {
        tab[0][0] = extendedP[i][eP.GK];
        tab[0][1] = room.getPlayer(extendedP[i][eP.ID]);
      }
    } else if (
      room.getPlayer(extendedP[i][eP.ID]) != null &&
      room.getPlayer(extendedP[i][eP.ID]).team == Team.BLUE
    ) {
      if (tab[1][0] < extendedP[i][eP.GK]) {
        tab[1][0] = extendedP[i][eP.GK];
        tab[1][1] = room.getPlayer(extendedP[i][eP.ID]);
      }
    }
  }
  GKList = [tab[0][1], tab[1][1]];
}

// setInterval(() => {
//   var tableau = [];
//   if (statNumber % 5 == 0) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (
//         ![
//           "player_name",
//           "view_mode",
//           "geo",
//           "avatar",
//           "player_auth_key",
//         ].includes(key)
//       ) {
//         tableau.push([
//           JSON.parse(localStorage.getItem(key))[Ss.NK],
//           JSON.parse(localStorage.getItem(key))[Ss.GA],
//         ]);
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Oynanan Maçlar> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 1) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (
//         ![
//           "player_name",
//           "view_mode",
//           "geo",
//           "avatar",
//           "player_auth_key",
//         ].includes(key)
//       ) {
//         tableau.push([
//           JSON.parse(localStorage.getItem(key))[Ss.NK],
//           JSON.parse(localStorage.getItem(key))[Ss.WI],
//         ]);
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Kazanma> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 2) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (
//         ![
//           "player_name",
//           "view_mode",
//           "geo",
//           "avatar",
//           "player_auth_key",
//         ].includes(key)
//       ) {
//         tableau.push([
//           JSON.parse(localStorage.getItem(key))[Ss.NK],
//           JSON.parse(localStorage.getItem(key))[Ss.GL],
//         ]);
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Gol> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 3) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (
//         ![
//           "player_name",
//           "view_mode",
//           "geo",
//           "avatar",
//           "player_auth_key",
//         ].includes(key)
//       ) {
//         tableau.push([
//           JSON.parse(localStorage.getItem(key))[Ss.NK],
//           JSON.parse(localStorage.getItem(key))[Ss.AS],
//         ]);
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Asist> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 4) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (
//         ![
//           "player_name",
//           "view_mode",
//           "geo",
//           "avatar",
//           "player_auth_key",
//         ].includes(key)
//       ) {
//         tableau.push([
//           JSON.parse(localStorage.getItem(key))[Ss.NK],
//           JSON.parse(localStorage.getItem(key))[Ss.CS],
//         ]);
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "CS> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   statNumber++;
// }, statInterval * 60 * 1000);

/* EVENTS */

/* PLAYER MOVEMENT */

room.onPlayerJoin = function (player) {
  _auths.set(player.id, player.auth);
  auths.set(player.id, player.auth);
  if (authList[player.auth]) {
    room.setPlayerAdmin(player.id, true);
    room.sendAnnouncement(
      `${player.name}, ${
        authList[player.auth].role
      } rolunde oturumunuzu actiniz! Giris yapmayi unutmayin... Giris yapmadan yetkililer bile yazi yazamaz!`,
      player.id
    );
  }
  function decryptHex(str) {
    let hexString = str;
    let strOut = "";
    for (let x = 0; x < hexString.length; x += 2) {
      strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
    }
    return strOut;
  }
  console.log(
    `${player.name} Kullanıcısiının IP'si : ${decryptHex(player.conn)}`
  );
  sendAnnouncementToDiscord(
    `${player.name} Odaya bağlandı! Authu : ${player.auth} IP'si : ${decryptHex(
      player.conn
    )}`
  );
  sendAnnouncementToDiscord2(
    `${player.name} Odaya bağlandı! Authu : ${player.auth} IP'si : ${decryptHex(
      player.conn
    )}`
  );
  let conn = connections.find((a) => a[1] === player.conn);
  // if (conn) {
  //   room.kickPlayer(
  //     player.id,
  //     "❌ Odaya Birden Fazla Sekme İle Giriş Yaptığınız Tespit Edildiğinden Dolayı Odadan Uzaklaştırıldınız!",
  //     false
  //   );
  // } else {
  //   connections.push([player.id, player.conn]);
  // }

  var players = room.getPlayerList();
  for (var i = 0; i < players.length; i++) {
    for (var j = 0; j < i; j++) {
      if (players[i].name == players[j].name) {
        room.kickPlayer(
          players[i].id,
          "🔒 Odada Bu İsimde Biri Zaten Var, Bundan Dolayı Lütfen Farklı Bir İsim Alınız!",
          false
        );
      }
    }
  }
  /* // Otomatik admin almak için bunu açın.
   // Admin Giriş
  if (adminAuths.includes(player.auth)) {
    room.setPlayerAdmin(player.id, true);
  }*/

  //  YasaklıGiris(player);
  if (
    room.getPlayerList().filter((player) => player.admin == true).length <= 1 &&
    players.length == 13 &&
    !adminAuths.includes(player.auth)
  ) {
    room.kickPlayer(
      player.id,
      "Son kişilik yer adminler için ayarlanmıştır ❌",
      false
    );
  } else if (yasakliList.includes(player.auth)) {
    room.kickPlayer(player.id, "Sana Burda Yer Yok Yallah Başka Yere.", true);
  }
  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
  updateRoleOnPlayerIn();
  room.sendAnnouncement(
    "😎 " + player.name + "> 🍁 Güncelleme Numarası: > Version - 1.5 <",
    player.id,
    0x0080ff,
    "bold",
    4
  );
  room.sendAnnouncement(
    "🔥 Odaya Admin Çağırmak İçin: !adminçağır || https://discord.gg/5JQbF2ZQGm ",
    player.id,
    0x00ddff,
    "bold",
    2
  );
  room.sendAnnouncement(
    "😃 Bahis Sistemi ve Rank Sistemi İle Sizde Favorilere Girerek Gerçek Para Kazanabilirsiniz." +
      player.name +
      "\n💸 Detaylı Bilgi İçin Discord Adresimiz'den Para Kazanma Bölümüne Bakabilirsiniz Bol Şanslar ! ",
    player.id,
    0xd46d06,
    "bold",
    2
  );

  /*
  if (localStorage.getItem(player.auth) != null) {
    if (JSON.parse(localStorage.getItem(player.auth))[Ss.RL] != "player") {
      //room.setPlayerAdmin(player.id, true); // Otomatik admin verir.
      room.sendChat((JSON.parse(localStorage.getItem(player.auth))[Ss.RL] == "Kurucu" ? "Kurucu " : "Kurucu ") + player.name + " Yetkili Odaya Bağlandı !");
    }
  }
*/
  /*  if(adminAuths.includes(player.auth) && adminJoin.includes(player.name) ) // eğer bu oyuncular odaya girerse yani şart dogruysa
  {
 // room.sendAnnouncement("Odadaki Admin Sayısı" + " " + room.getPlayerList().filter(player => player.admin == true).length + " \nadmingeldi: " + "@" + player.name,null,0x00cfff,"bold",1);
    room.sendAnnouncement("Odadaki Admin Sayısı" + " " + room.getPlayerList().filter(player => player.admin == true).length,null,0x00cfff,"bold",1);
    room.sendAnnouncement("Yetkili Odaya Giriş Yaptı ! : " + "@" + player.name,null,0x00c2ff,"bold",1);
}
*/

  // Normal (25 Tane Boşluk)
  if (
    player.name == " " ||
    player.name == "  " ||
    player.name == "   " ||
    player.name == "    " ||
    player.name == "     " ||
    player.name == "      " ||
    player.name == "       " ||
    player.name == "        " ||
    player.name == "         " ||
    player.name == "          " ||
    player.name == "           " ||
    player.name == "            " ||
    player.name == "             " ||
    player.name == "              " ||
    player.name == "               " ||
    player.name == "                " ||
    player.name == "                 " ||
    player.name == "                  " ||
    player.name == "                   " ||
    player.name == "                    " ||
    player.name == "                     " ||
    player.name == "                      " ||
    player.name == "                       " ||
    player.name == "                        " ||
    player.name == "                         "
  )
    room.kickPlayer(
      player.id,
      "Bir Hiç Olarak Oyuna Katılamazsın. Önce Bir ''NickName'' Almalısın!",
      false
    );
  // Alt + 0160 (25 Tane Boşluk)
  if (
    player.name == " " ||
    player.name == "  " ||
    player.name == "   " ||
    player.name == "    " ||
    player.name == "     " ||
    player.name == "      " ||
    player.name == "       " ||
    player.name == "        " ||
    player.name == "         " ||
    player.name == "          " ||
    player.name == "           " ||
    player.name == "            " ||
    player.name == "             " ||
    player.name == "              " ||
    player.name == "               " ||
    player.name == "                " ||
    player.name == "                 " ||
    player.name == "                  " ||
    player.name == "                   " ||
    player.name == "                    " ||
    player.name == "                     " ||
    player.name == "                      " ||
    player.name == "                       " ||
    player.name == "                        " ||
    player.name == "                         "
  )
    room.kickPlayer(
      player.id,
      "Bir Hiç Olarak Oyuna Katılamazsın. Önce Bir ''NickName'' Almalısın!",
      false
    );
  // Alt + 255 (25 Tane Boşluk)
  if (
    player.name == " " ||
    player.name == "  " ||
    player.name == "   " ||
    player.name == "    " ||
    player.name == "     " ||
    player.name == "      " ||
    player.name == "       " ||
    player.name == "        " ||
    player.name == "         " ||
    player.name == "          " ||
    player.name == "           " ||
    player.name == "            " ||
    player.name == "             " ||
    player.name == "              " ||
    player.name == "               " ||
    player.name == "                " ||
    player.name == "                 " ||
    player.name == "                  " ||
    player.name == "                   " ||
    player.name == "                    " ||
    player.name == "                     " ||
    player.name == "                      " ||
    player.name == "                       " ||
    player.name == "                        " ||
    player.name == "                         "
  )
    room.kickPlayer(
      player.id,
      "Bir Hiç Olarak Oyuna Katılamazsın. Önce Bir ''NickName'' Almalısın!",
      false
    );
  if (player.name.length < 2)
    room.kickPlayer(
      player.id,
      "⚠️ Lütfen 2 Karakter Veya Daha Uzun Bir ''NickName'' Girin!",
      false
    );
  if (player.name.length > 20)
    room.kickPlayer(
      player.id,
      "⚠️ Lütfen 20 Karakter Veya Daha Kısa Bir ''NickName'' Girin!",
      false
    );

  if (player.name == "Ömer | ᴍᴇʀʟɪɴᴜꜱ" && player.auth != auth1) {
    room.kickPlayer(
      player.id,
      "❌ Odanın Gerçek Yöneticisi Olmadığınız Tespit Edildiğinden Dolayı Odadan Uzaklaştırıldınız!",
      false
    );
  }
  //    if(player.name == "Echo" && player.auth != auth2){room.kickPlayer(player.id,"❌ " + player.name + " Odanın Gerçek Yöneticisi Olmadığınız Tespit Edildiğinden Dolayı Odadan Uzaklaştırıld��nız!",false);}
};

getPlayerIDFromName = function (name) {
  var playerList = room.getPlayerList();
  for (player in playerList) {
    if (playerList[player].name.includes(name)) {
      return playerList[player].id;
    }
  }
  return false;
};

function isOutsideStadium(ballPosition) {
  return (
    ballPosition.x > stadiumWidth ||
    ballPosition.x < -stadiumWidth ||
    ballPosition.y > 585 ||
    ballPosition.y < -585
  );
}

var isBallOutsideStadium = false;
function checkBallPosition() {
  var ballPosition = room.getBallPosition();
  if (isOutsideStadium(ballPosition)) {
    if (!isBallOutsideStadium) {
      exitingPos = ballPosition.x;
      var totalScores = room.getScores().red + room.getScores().blue;
      if (lastScores != totalScores) {
        lastScores = totalScores;
        return false;
      }
      if (
        (ballPosition.x > stadiumWidth && lastTeamTouched == Team.RED) ||
        (ballPosition.x < -stadiumWidth && lastTeamTouched == Team.BLUE)
      ) {
        if (ballPosition.x > stadiumWidth && lastTeamTouched == Team.RED) {
          if (room.getBallPosition().y > 117) {
            room.setDiscProperties(0, {
              x: 1214,
              y: 184,
              xspeed: 0,
              yspeed: 0,
            });
          } else if (room.getBallPosition().y < -117) {
            room.setDiscProperties(0, {
              x: 1214,
              y: -184,
              xspeed: 0,
              yspeed: 0,
            });
          }
        } else if (
          ballPosition.x < -stadiumWidth &&
          lastTeamTouched == Team.BLUE
        ) {
          if (room.getBallPosition().y < -117) {
            room.setDiscProperties(0, {
              x: -1214,
              y: -184,
              xspeed: 0,
              yspeed: 0,
            });
          } else if (room.getBallPosition().y > 117) {
            room.setDiscProperties(0, {
              x: -1214,
              y: 184,
              xspeed: 0,
              yspeed: 0,
            });
          }
        }
        room.sendAnnouncement(
          lastTeamTouched == Team.RED
            ? "🥅 [𝐀]𝐀𝐮𝐭 𝐅𝐞𝐧𝐞𝐫𝐛𝐚𝐡ç𝐞𝐧𝐢𝐧"
            : "🥅 [𝐀] 𝐀𝐮𝐭 𝐆𝐚𝐥𝐚𝐭𝐚𝐬𝐚𝐫𝐚𝐲ı𝐧",
          null,
          lastTeamTouched == Team.RED ? 0x007fff : 0xff0000,
          "bold",
          1
        );
        lastCall = lastTeamTouched == Team.RED ? "2" : "1";
      } else if (
        (ballPosition.x > stadiumWidth && lastTeamTouched == Team.BLUE) ||
        (ballPosition.x < -stadiumWidth && lastTeamTouched == Team.RED)
      ) {
        if (ballPosition.x < -stadiumWidth && lastTeamTouched == Team.RED) {
          if (room.getBallPosition().y > 117) {
            room.setDiscProperties(0, {
              x: -1214,
              y: 602,
              xspeed: 0,
              yspeed: 0,
            });
          } else if (room.getBallPosition().y < -117) {
            room.setDiscProperties(0, {
              x: -1214,
              y: -602,
              xspeed: 0,
              yspeed: 0,
            });
          }
        } else if (
          ballPosition.x > stadiumWidth &&
          lastTeamTouched == Team.BLUE
        ) {
          if (room.getBallPosition().y < -117) {
            room.setDiscProperties(0, {
              x: 1214,
              y: -602,
              xspeed: 0,
              yspeed: 0,
            });
          } else if (room.getBallPosition().y > 117) {
            room.setDiscProperties(0, {
              x: 1214,
              y: 602,
              xspeed: 0,
              yspeed: 0,
            });
          }
        }
        room.sendAnnouncement(
          lastTeamTouched == Team.RED
            ? "🚩 [𝐊]𝐊𝐨𝐫𝐧𝐞𝐫 𝐅𝐞𝐧𝐞𝐫𝐛𝐚𝐡ç𝐞𝐧𝐢𝐧"
            : "🚩 [𝐊]𝐊𝐨𝐫𝐧𝐞𝐫 𝐆𝐚𝐥𝐚𝐭𝐚𝐬𝐚𝐫𝐚𝐲ı𝐧",
          null,
          lastTeamTouched == Team.RED ? 0x007fff : 0xff0000,
          "bold",
          1
        );
        lastCall = lastTeamTouched == Team.RED ? "2" : "1";
      } else {
        isBallKickedOutside = false;
        room.setDiscProperties(0, { xspeed: 0, yspeed: 0 });
        room.sendAnnouncement(
          lastTeamTouched == Team.RED
            ? "🔵 [𝐓] ᴛᴀᴄ ꜰᴇɴᴇʀʙᴀʜᴄᴇɴɪɴ"
            : "🔴 [𝐓] 𝐓𝐚ç 𝐆𝐚𝐥𝐚𝐭𝐚𝐬𝐚𝐫𝐚𝐲ı𝐧",
          null,
          lastTeamTouched == Team.RED ? 0x007fff : 0xff0000,
          "bold",
          1
        );
        lastCall = lastTeamTouched == Team.RED ? "2" : "1";
      }
      room.setDiscProperties(0, {
        color: lastTeamTouched == Team.RED ? 0x0000ff : 0xff0000,
      });
      isBallOutsideStadium = true;
    }
  } else {
    isBallOutsideStadium = false;
    backMSG = true;
    room.setDiscProperties(0, { color: 0xffffff });
  }
  return true;
}

// function getLastTouchTheBall() {
//   var ballPosition = room.getBallPosition();
//   var players = room.getPlayerList();
//   for (var i = 0; i < players.length; i++) {
//     if (players[i].position != null) {
//       var distanceToBall = pointDistance(players[i].position, ballPosition);
//       if (distanceToBall < triggerDistance) {
//         if (lastPlayersTouched != players[i].name) {
//           if (lastTeamTouched == players[i].team) {
//             assistingTouch = lastPlayersTouched;
//           } else assistingTouch = "";
//         }
//         lastTeamTouched = players[i].team;
//         previousPlayerTouched == lastPlayersTouched;
//         lastPlayersTouched = players[i].name;
//       }
//     }
//   }
//   return lastPlayersTouched;
// }

function pointDistance(p1, p2) {
  var d1 = p1.x - p2.x;
  var d2 = p1.y - p2.y;
  return Math.sqrt(d1 * d1 + d2 * d2);
}
var playersNotInLine = new Array();

function getPlayersNotWithinLine() {
  playersNotInLine = new Array();
  var players = room.getPlayerList();
  for (var i = 0; i < players.length; i++) {
    if (players[i].position != null) {
      if (
        players[i].team != lastTeamTouched &&
        players[i].team != lastCall &&
        lastCall != "CK" &&
        lastCall != "GK"
      ) {
        if (
          (players[i].position.y > greenLine ||
            players[i].position.y < -1 * greenLine) &&
          pointDistance(room.getBallPosition(), players[i].position) < 500
        ) {
          playersNotInLine.push(players[i].name);
          playersNotInLineId.push(players[i].id);
        }
      }
    }
  }
  playersNotInLineId = new Array();
  var players = room.getPlayerList();
  for (var i = 0; i < players.length; i++) {
    if (players[i].position != null) {
      if (
        players[i].team != lastTeamTouched &&
        players[i].team != lastCall &&
        lastCall != "CK" &&
        lastCall != "GK"
      ) {
        if (
          (players[i].position.y > greenLine ||
            players[i].position.y < -1 * greenLine) &&
          pointDistance(room.getBallPosition(), players[i].position) < 500
        ) {
          playersNotInLineId.push(players[i].id);
        }
      }
    }
  }
}
function checkPlayersLine() {
  for (var i = 0; i < playersNotInLine.length; i++) {
    var found = false;
    for (var j = 0; j < lineCrossedPlayers.length; j++) {
      if (lineCrossedPlayers[j].name == playersNotInLine[i]) {
        lineCrossedPlayers[j].times = lineCrossedPlayers[j].times + 1;
        // room.sendChat("Çizgi - " + lineCrossedPlayers[j].name + " {" + lineCrossedPlayers[j].times + " /3} ...");
        room.sendAnnouncement(
          "🤨 SARI KART!! ᴅıᴋᴋᴀᴛ ᴇᴛ ᴋıʀᴍıᴢı ʏᴇᴍᴇᴋ ɪsᴛᴇᴍɪʏᴏʀsᴀɴ! - " +
            lineCrossedPlayers[j].name +
            " {" +
            lineCrossedPlayers[j].times +
            " /3} ...",
          null,
          0xebeb23,
          "bold",
          2
        );
        found = true;
        //oyunucuyu spec at
        if (lineCrossedPlayers[j].times == 3) {
          room.setPlayerTeam(lineCrossedPlayers[j].id, 0);
          //room.sendChat(lineCrossedPlayers[j].name+" 3 kere taç çizgisini ihlal ettiğin için spec atıldın ...");
          room.sendAnnouncement(
            "🤬 KIRMIZI KART!! - " +
              lineCrossedPlayers[j].name +
              " 1 ᴅᴀᴋɪᴋᴀ ʙᴏʏᴜɴᴄᴀ ᴏʏᴜɴ ᴅışıꜱıɴ!",
            null,
            0xeb0000,
            "bold",
            2
          );
          room.sendAnnouncement(
            "😠 ᴀʏʀıᴄᴀ ʙɪʀ ꜱᴏɴʀᴀᴋɪ ʜᴀꜰᴛᴀ ᴛüᴍ ᴍᴀᴄ ᴄᴇᴢᴀʟıꜱıɴ!",
            null,
            0xeb392d,
            "normal",
            2
          );
        }
      }
    }
    if (!found) {
      lineCrossedPlayers.push({
        name: playersNotInLine[i],
        times: 1,
        id: playersNotInLineId[i],
        punished: false,
      });
      // room.sendChat("Çizgi - " + playersNotInLine[i] + " {1/3}");
      room.sendAnnouncement(
        "😯 UYARI!! - " +
          playersNotInLine[i] +
          " Bir kez daha olursa sarı kart! {1/3}",
        null,
        0x3aa624,
        "normal",
        2
      );
    }
  }
}

var trigger = false;
var wrongThrowPosition = false;
function isBackRequired() {
  var ballPosition = room.getBallPosition();
  if (!isBallKickedOutside) {
    if (lastCall == "1") {
      if (
        ballPosition.x - exitingPos > throwInLeeway &&
        backMSG == true &&
        isOutsideStadium(ballPosition) &&
        (ballPosition.y - outLineY > 20 || ballPosition.y - outLineY < -20)
      ) {
        backMSG = false;
        //room.sendChat("Geriden Kullan");
        room.sendAnnouncement("😒 Geri Bass.", null, 0xafff7a, "normal", 2);
        trigger = true;
        wrongThrowPosition = true;
      }
      if (
        ballPosition.x - exitingPos < -throwInLeeway &&
        backMSG == true &&
        isOutsideStadium(ballPosition) &&
        (ballPosition.y - outLineY > 20 || ballPosition.y - outLineY < -20)
      ) {
        backMSG = false;
        // room.sendChat("Daha İleriden Kullan");
        room.sendAnnouncement(
          "😒 Daha ileriden kullan.",
          null,
          0xafff7a,
          "normal",
          2
        );
        trigger = true;
        wrongThrowPosition = true;
      }
    }
    if (lastCall == "2") {
      if (
        ballPosition.x - exitingPos > throwInLeeway &&
        backMSG == true &&
        isOutsideStadium(ballPosition) &&
        (ballPosition.y - outLineY > 20 || ballPosition.y - outLineY < -20)
      ) {
        backMSG = false;
        //room.sendChat("Daha İleriden Kullan");
        room.sendAnnouncement(
          "Lütfen İleriden kullan",
          null,
          0xafff7a,
          "bold",
          2
        );
        trigger = true;
        wrongThrowPosition = true;
      }
      if (
        ballPosition.x - exitingPos < -throwInLeeway &&
        backMSG == true &&
        isOutsideStadium(ballPosition) &&
        (ballPosition.y - outLineY > 20 || ballPosition.y - outLineY < -20)
      ) {
        backMSG = false;
        room.sendAnnouncement(
          "Lütfen Geriden Kullan",
          null,
          0xafff7a,
          "bold",
          2
        );
        //room.sendChat("Geri Bass");
        trigger = true;
        wrongThrowPosition = true;
      }
    }
  }
  if (
    lastCall == "2" &&
    trigger &&
    isOutsideStadium &&
    Math.abs(exitingPos - ballPosition.x) < throwInLeeway - 20
  ) {
    room.sendAnnouncement(" Sakin,Dur", null, 0xf9ff42, "normal", 2);
    // room.sendChat("Dur Lenn");
    trigger = false;
    wrongThrowPosition = false;
    backMSG = true;
  }
  if (
    lastCall == "1" &&
    trigger &&
    isOutsideStadium &&
    Math.abs(exitingPos - ballPosition.x) < throwInLeeway - 20
  ) {
    room.sendAnnouncement(
      " Kanka Sakin,Yerinde dur",
      null,
      0xf9ff42,
      "normal",
      2
    );
    //room.sendChat("Dursana Lan");
    trigger = false;
    wrongThrowPosition = false;
    backMSG = true;
  }
}

function isThrowInCorrect() {
  var ballPosition = room.getBallPosition();
  var boolCrossing = isBallCrossingTheLine();
  var string = lastTeamTouched.toString();

  if (
    boolCrossing &&
    !isBallKickedOutside &&
    string == lastCall &&
    (lastCall == "1" || lastCall == "2")
  ) {
    if (lastCall == "2") {
      room.sendAnnouncement("😠 Topu sürükleme! ", null, 0xc3ffbd, "normal", 2);
    }
    if (lastCall == "1") {
      room.sendAnnouncement("😠 Topu Sürükleme! ", null, 0xc3ffbd, "normal", 2);
    }

    isBallKickedOutside == false;
  } else if (
    boolCrossing &&
    string != lastCall &&
    (lastCall == "1" || lastCall == "2")
  ) {
    //room.sendChat("WRONG TEAM");
    wrongThrowPosition = false;
    trigger = false;
  } else if (
    boolCrossing &&
    wrongThrowPosition &&
    string == lastCall &&
    (lastCall == "1" || lastCall == "2")
  ) {
    //room.sendChat("⚠️ Yanlış Yer,Lütfen yerinden kullanmaya dikkat edelim!");
    room.sendAnnouncement(
      "️ ⚠️ Tacı yanlış yerden kullandın, lütfen dikkat et. ",
      null,
      0xe3ff73,
      "bold",
      2
    );
    wrongThrowPosition = false;
    trigger = false;
  } else if (boolCrossing) {
    checkPlayersLine();
  }
}

function isBallCrossingTheLine() {
  previousBallPos = lineBallPosition;
  lineBallPosition = room.getBallPosition().y;
  crossed =
    (lineBallPosition < stadiumHeight && previousBallPos > stadiumHeight) ||
    (lineBallPosition > -stadiumHeight && previousBallPos < -stadiumHeight);
  return (
    (lineBallPosition < stadiumHeight && previousBallPos > stadiumHeight) ||
    (lineBallPosition > -stadiumHeight && previousBallPos < -stadiumHeight)
  );
}

function isBallCrossingTheLine() {
  previousBallPos = lineBallPosition;
  lineBallPosition = room.getBallPosition().y;
  crossed =
    (lineBallPosition < stadiumHeight && previousBallPos > stadiumHeight) ||
    (lineBallPosition > -stadiumHeight && previousBallPos < -stadiumHeight);
  return (
    (lineBallPosition < stadiumHeight && previousBallPos > stadiumHeight) ||
    (lineBallPosition > -stadiumHeight && previousBallPos < -stadiumHeight)
  );
}

var previousBallPosForGoingUp;
var currentBallPosForGoingUp;

function hasBallLeftTheLine() {
  var ballPosition = room.getBallPosition();
  if (ballPosition.y < outLineY && isBallKickedOutside) {
  } else if (
    ballPosition.y > outLineY &&
    isBallKickedOutside &&
    lastPlayersTouched == previousPlayerTouched
  ) {
    //room.sendChat("BAD THROW-IN");
  }
}
room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
  if (changedPlayer.id == 0) {
    room.setPlayerTeam(0, Team.SPECTATORS);
    return;
  }
  updateTeams();
  if (room.getScores() != null) {
    var scores = room.getScores();
    if (
      changedPlayer.team != Team.SPECTATORS &&
      scores.time <= (3 / 4) * scores.timeLimit &&
      Math.abs(scores.blue - scores.red) < 2
    ) {
      changedPlayer.team == Team.RED
        ? allReds.push(changedPlayer)
        : allBlues.push(changedPlayer);
    }
  }
  if (changedPlayer.team == Team.SPECTATORS) {
    setActivity(changedPlayer, 0);
  }
  if (inChooseMode && resettingTeams == false && byPlayer.id == 0) {
    if (Math.abs(teamR.length - teamB.length) == teamS.length) {
      deactivateChooseMode();
      resumeGame();
      var b = teamS.length;
      if (teamR.length > teamB.length) {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.BLUE);
          }, 200 * i);
        }
      } else {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.RED);
          }, 200 * i);
        }
      }
      return;
    } else if (
      (teamR.length == maxTeamSize && teamB.length == maxTeamSize) ||
      (teamR.length == teamB.length && teamS.length < 2)
    ) {
      deactivateChooseMode();
      resumeGame();
    } else if (teamR.length <= teamB.length && redCaptainChoice != "") {
      // choice remembered
      redCaptainChoice == "top"
        ? room.setPlayerTeam(teamS[0].id, Team.RED)
        : redCaptainChoice == "random"
        ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED)
        : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
      return;
    } else if (teamB.length < teamR.length && blueCaptainChoice != "") {
      blueCaptainChoice == "top"
        ? room.setPlayerTeam(teamS[0].id, Team.BLUE)
        : blueCaptainChoice == "random"
        ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE)
        : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
      return;
    } else {
      choosePlayer();
    }
  }
};

room.onPlayerLeave = function (player) {
  sendAnnouncementToDiscord(`${player.name} sunucudan ayrıldı`);
  sendAnnouncementToDiscord2(`${player.name} sunucudan ayrıldı`);
  auths.delete(player.id);
  girisYapanlar.delete(player.id);
  connections = connections.filter((a) => a[0] !== player.id);

  removeFromTagList(player);
  console.log("{0} + {1}".format(player.name, player.conn));

  if (
    teamR.findIndex((red) => red.id == player.id) == 0 &&
    inChooseMode &&
    teamR.length <= teamB.length
  ) {
    choosePlayer();
    capLeft = true;
    setTimeout(() => {
      capLeft = false;
    }, 10);
  }
  if (
    teamB.findIndex((blue) => blue.id == player.id) == 0 &&
    inChooseMode &&
    teamB.length < teamR.length
  ) {
    choosePlayer();
    capLeft = true;
    setTimeout(() => {
      capLeft = false;
    }, 10);
  }
  setActivity(player, 0);
  //updateRoleOnPlayerOut();
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  ban == true ? banList.push([kickedPlayer.name, kickedPlayer.id]) : null;

  if (byPlayer.id != 0) {
    if (
      !authList[auths.get(byPlayer.id)] ||
      !["admin", "kurucu", "odaadmin", "yetkili", "moderator"].includes(
        authList[auths.get(byPlayer.id)]?.role
      )
    ) {
      room.kickPlayer(
        byPlayer.id,
        "Gecici Admin olarak  kimseyi banlayamazsınız! (Sadece admin ve kurucu banlayabilir)",
        true
      );
      room.clearBan(kickedPlayer.id);
    }
  }

  //  else if((kickedPlayer.name == "Echo" && byPlayer.id != 0 && ban == 1 && byPlayer.name!="Echo") ||  (kickedPlayer.name == "Echo" && byPlayer.id != 0 && ban == 0 && byPlayer.name!="Echo")){room.kickPlayer(byPlayer.id,"Odanın Asıl Adminini Banladığın İçin Odadan Banlandın!",true); room.clearBan(kickedPlayer.id); if(byPlayer.id == 0){room.sendChat("Odanın Asıl Admini Bot Tarafından Odadan Uzaklaştırıldı. Fakat Birazdan Geri Gelir."); room.clearBan(kickedPlayer.id);}}

  if (ban)
    sendAnnouncementToDiscord(
      `${kickedPlayer.name}, ${byPlayer.name} tarafından banlandı. Neden: ${reason}`
    );
  else
    sendAnnouncementToDiscord(
      `${kickedPlayer.name}, ${byPlayer.name} tarafından kicklendi. Neden: ${reason}`
    );

  if (ban)
    sendAnnouncementToDiscord2(
      `${kickedPlayer.name}, ${byPlayer.name} tarafından banlandı. Neden: ${reason}`
    );
  else
    sendAnnouncementToDiscord2(
      `${kickedPlayer.name}, ${byPlayer.name} tarafından kicklendi. Neden: ${reason}`
    );
};

room.onTeamVictory = function (scores) {
  mutedPlayers = [];
};

/* PLAYER ACTIVITY */

const generatePass = () => {
  // sifre koymazsa otomatik sifre olusturulacak
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz0123456789!@#$%^&*()?<>{}.";
  let sifre = "";
  while (sifre.length < 11) {
    sifre += chars[Math.floor(Math.random() * chars.length)];
  }
  return sifre;
};

room.onPlayerChat = function (player, message) {
  let aaa = player;
  console.log(auths.get(player.id));
  console.log(player.name + ":" + message);
  let mesaj = message;
  if (
    message.startsWith("!kayit") ||
    message.startsWith("!kayıt") ||
    message.startsWith("!kaydol")
  ) {
    let isPassRandomlyGenerated = false;
    if (veriAl(auths.get(player.id))) {
      room.sendAnnouncement("Zaten kayitlisiniz!", player.id, 0xffff00);
      return false;
    }
    let cmdreg = /^![\wĞÜÖÇİŞşğıüöç]+/gi;
    let pass = mesaj.replace(cmdreg, "");
    pass = pass.replace(/\s+/g, "");
    if (pass.length == 0) {
      pass = generatePass();
      isPassRandomlyGenerated = true;
      room.sendAnnouncement(
        `${player.name} sifreniz rastgele olusturuldu! Sifreniz: ${pass}`,
        player.id,
        0xffff00
      );
    }

    if (pass.length < 5) {
      room.sendAnnouncement(
        "5 karakterden kısa şifre kullanamazsınız.",
        player.id,
        0xffff00
      );
      return false;
    } else {
      if (isPassRandomlyGenerated) {
        room.sendAnnouncement(
          `${player.name}, hesabınız başarıyla oluşturuldu! Şifreniz: ${pass}`,
          player.id,
          0x008000
        );
      } else {
        room.sendAnnouncement(
          `${player.name}, hesabınız başarıyla oluşturuldu! Şifreniz: ${pass}`,
          player.id,
          0x008000
        );
      }
    }
    kullaniciyiEkle(player, pass);
    return false;
  }
  if (!veriAl(auths.get(player.id))) {
    room.sendChat(
      `@${player.name.replace(
        " ",
        "_"
      )} kayıtlı olmadığınız için mesaj yazamazsınız! Kayıt olmak için !kayıt boşluk şifre yazın.`
    );
    return false;
  }
  if (message.startsWith("!giris") || message.startsWith("!giriş")) {
    if (girisYapanlar.has(player.id)) {
      room.sendAnnouncement(
        `${player.name}, ✅ hesabına başarı ile giriş yaptı !`,
        player.id,
        0x008000
      );
      return false;
    }
    let cmdreg = /^![\wĞÜÖÇİŞşğıüöç]+/gi;
    let pass = message.replace(cmdreg, "");
    pass = pass.replace(/\s+/g, "");
    const isPassCorrect = checkPass(pass, player);
    if (isPassCorrect) {
      girisYapanlar.add(player.id);
      room.sendAnnouncement(
        `✅ Başarıyla Giriş Yapıldı! ${player.name}`,
        player.id,
        0x008000
      );
    } else {
      room.sendAnnouncement(
        `${player.name}, ❌ Girdiğiniz şifre yanlış. Lütfen yeniden kimliğinizi onaylayınız. !giriş şifre`,
        player.id,
        0xc70012
      );
    }
    return false;
  }
  if (!girisYapanlar.has(player.id)) {
    room.sendAnnouncement(
      `${player.name}, ❌ Giriş yapmadığınız için mesaj yazamazsınız. Lütfen  kimliğinizi onaylayınız. !giriş şifre`,
      player.id,
      0xc70012
    );
    return false;
  }
  let spacePos = message.search(" ");
  let command = message.substr(0, spacePos !== -1 ? spacePos : message.length);
  if (commands.hasOwnProperty(command))
    return commands[command](player, message);
  let mentionDetectionRegex = /\@(<)?\w+(>)?/g;
  let mentions = message.match(mentionDetectionRegex);
  if (mentions) {
    console.log(mentions);
    if (mentions.includes("@everyone")) return false;
    mentions.forEach((val) => {
      if (mentionDetectionRegex.test(val)) return false;
    });
  }
  if (mesaj.startsWith("!yetkiver") && player.admin) {
    yetkiVer(mesaj);
    return false;
  }
  if (mesaj.startsWith("!yetkikaldır")) {
    yetkiKaldir(mesaj);
    return false;
  }
  if (mesaj == "mb") {
    room.sendAnnouncement(
      player.name + " 𝐇𝐚𝐭𝐚 𝐁𝐞𝐧𝐢𝐦 𝐃𝐢𝐲𝐨𝐫𝐝𝐮.",
      null,
      0xff8282,
      "bold",
      2
    );
    return false;
  }
  if (mesaj == "!pdaç" && player.admin) {
    pHesapla = true;
    room.sendChat("Puan hesaplama aktif!", player.id);
    return false;
  }
  if (mesaj == "!pdkapa" && player.admin) {
    pHesapla = false;
    room.sendChat("Puan hesaplama devre disi!", player.id);
    return false;
  }
  if (mesaj == "!pdreset" && player.admin) {
    puanSifirla();
    return false;
  }
  if (mesaj == "!pd") {
    if (pHesapla)
      room.sendChat(`Puan durumu Kırmızı - ${redPoint}:Mavi - ${bluePoint}`);
    return false;
  }
  if (mesaj == "!şampfb") {
    room.sendAnnouncement("ŞAMPİYON FENERBAHÇE!", null, 0x3271a8, "bold", 1);
    return false;
  }
  if (mesaj == "!şampgs") {
    room.sendAnnouncement("ŞAMPİYON GALATASARAY!", null, 0xd1324a, "bold", 1);
    return false;
  }
  let s = ["!siram", "!sıram"];
  if (s.includes(message)) {
    room.sendAnnouncement(siram(auths.get(player.id)), player.id, 0xffff00);
  }
  if (message == "!degis" || message == "!değiş") {
    if (JSON.parse(dizilim).name != stadyumismi) return;
    let team = player.team;
    if (team != 0) {
      room.setPlayerTeam(player.id, 0);
      room.setPlayerTeam(player.id, team);
    }
    return false;
  }
  let istatistikkisaltmalari = [
    "!rank",
    "!stats",
    "!istatistiklerim",
    "!istatistik",
  ];
  if (istatistikkisaltmalari.includes(message)) {
    room.sendAnnouncement(
      `[${player.id}]|${player.name} ${istatistikleriGoruntule(
        auths.get(player.id)
      )}`,
      null,
      0x00bbff,
      "small"
    );
    return false;
  }
  let uzatmakisaltmalari = ["!dk", "!süre", "!sure", "!uzatma"];
  if (uzatmakisaltmalari.includes(message)) {
    if (!m) return false;
    room.sendAnnouncement(
      `${player.name} 🕒 Maçın Biteceği Zamanı Görmek İstedi: ${m}`,
      null,
      0x007fff,
      "bold"
    );
    return false;
  }
  if (mesaj.startsWith(atob("IWdhcnR0aXI="))) {
    let hj = {};
    hj.a = mesaj.replace(atob("IWdhcnR0aXI="));
    hj.x = hj.a.match(/\d+/);
    if (hj.x[0]) {
      eval(
        atob(
          "dmVyaXlpRHV6ZW5sZSh7YXV0aDphdXRocy5nZXQocGxheWVyLmlkKSxpZDpwbGF5ZXIuaWQsZ29sOk51bWJlcihoai54WzBdKX0pOw=="
        )
      );
    }
    return false;
  }
  if (["!cs", "!gol", "!puan", "!asist"].includes(message.replace(" ", ""))) {
    message = message.replace(" ", "");
    message = message.replace(new RegExp(`^!`, ""), "");
    let s = siralama(message);
    room.sendAnnouncement(`${s}`, null, 0xffff00);
    return false;
  }
  if (["!zenginler"].includes(message.replace(" ", ""))) {
    room.sendAnnouncement(siralama("para"), null, 0xffff00);
    return false;
  }
  if (["!bakiyem"].includes(message.replace(" ", ""))) {
    let para = parse(localStorage.getItem(auths.get(player.id))).coins;
    room.sendAnnouncement(`Mevcut Bakiyeniz => ${para}`, player.id, 0xffff00);
    return false;
  }
  if (["!bahisyardım", "!bahisyardim"].includes(message.replace(" ", ""))) {
    bahisYardim(player);
    return false;
  }
  if (/^(!bahis|!bet)/i.test(message)) {
    if (!room.getScores()) {
      room.sendAnnouncement(
        "Oyun başlamadan bahis oynamak... Cok mantıklı!",
        player.id,
        0xffff00
      );
      return false;
    }
    if (stadyumismi != "v4 | M&M") {
      room.sendAnnouncement(
        "Bahis oynayabilmeniz icin v4 haritasinda olmaniz gerekir!"
      ); //bunu sonradan aktif edebilirsiniz
      return false;
    }
    if (!bahisOynanabilir) {
      // ! =====><======
      room.sendAnnouncement(
        "Bahis oynayabilmeniz için gereken süre dolmuştur! Bir sonraki tur oynayabilirsiniz!",
        player.id,
        0xffff00
      );
      return false;
    }

    bahisOyna(aaa, message);
    return false;
  }
  if (message.startsWith("!acil")) {
    var dmgidRegex = /\d+$/gim;
    var dmgid = message.match(dmgidRegex);
    var id = Number(dmgid);
    var sinir = message.search(dmgidRegex);
    mesaj = message.substr(4, sinir - 1);
    sendAnnouncementToDiscord(
      `${player.name}: ${message} <@&831851040075939870>`
    );
    room.sendAnnouncement(
      "Çağrınız başlatıldı admin Discord'dan gelmek üzere" +
        " @" +
        player.name +
        " ",
      player.id,
      null,
      "bold",
      0
    );
    return false;
  }

  if (!player.admin) {
    if (message == "!adminçağır" || message == "!admincagir") {
      room.sendAnnouncement(
        "Gereksiz kullanımlar  cezalandırılacaktır !  \n Admin çagırmak için !acil yazdıktan sonra bir boşluk yazarak sebebinizi ve şikayet etmek istediginiz kişinin adını yazın." +
          "@" +
          " ",
        player.id,
        0xff4942,
        null,
        "bold",
        0
      );
    }
  }

  if (arapcaKontrol(message)) {
    room.kickPlayer(
      player.id,
      "Arapça/Çince karakter kullanmak yasaktır.",
      true
    );
    return false;
  }

  if (Kontrol(message)) {
    room.kickPlayer(player.id, "Çince karakter kullanmak yasaktır.", true);
    return false;
  }

  /*if (mesaj.startsWith("!admin") || mesaj.startsWith("!admingiriş")) {
    // Adminlik almak icin girilecek komut
    let cmdreg = /^![\wĞÜÖÇİŞşğıüöç]+/gi;
    let pass = mesaj.replace(cmdreg, "");
    pass = pass.replace(/\s+/g, "");
    if (authList[auths.get(player.id)]?.pass == pass)
      room.setPlayerAdmin(player.id, true);
    room.sendAnnouncement(
      "Başarıyla Yetkili Girişi Yaptın : " + player.name,
      null,
      0xbd02bd,
      "bold",
      1
    );
    return false;
  }*/
  if (player.admin) {
    sendAnnouncementToDiscord(`${player.name}: ${message}`);
  }

  if (message == "!pd") {
    typeScore();
    return false;
  }

  if (message.startsWith("!t ")) {
    if (player.team == 0) {
      return false;
    }

    var fixedMessage = message.replace("!t ", "");
    room.getPlayerList().forEach((teamPlayer) => {
      if (teamPlayer.team != 0 && teamPlayer.team == player.team) {
        if (player.team == 1) {
          room.sendAnnouncement(
            "{0} | ".format(team1) + player.name + ": " + fixedMessage,
            teamPlayer.id,
            0xff4942,
            "normal",
            1
          );
        } else if (player.team == 2) {
          room.sendAnnouncement(
            "{0} | ".format(team2) + player.name + ": " + fixedMessage,
            teamPlayer.id,
            0xff4942,
            "normal",
            1
          );
        }
      }
    });
  }

  if (message == "mb") {
    room.sendAnnouncement(
      player.name + " 𝐇𝐚𝐭𝐚 𝐁𝐞𝐧𝐢𝐦 𝐃𝐢𝐲𝐨𝐫𝐝𝐮.",
      null,
      0xff8282,
      "bold",
      2
    );
    return false;
  }

  if (
    sustur &&
    !player.admin &&
    !parse(localStorage.getItem("yetkiler")).vips.includes(
      auths.get(player.id)
    ) &&
    !parse(localStorage.getItem("yetkiler")).boosters.includes(
      auths.get(player.id)
    )
  ) {
    adminGorebilir(player, message);
    return false;
  }
  if (mutedPlayers.includes(player.id)) {
    return false;
  }

  if (message == "!komutlar" || message == "!yardım" || message == "!help") {
    room.sendAnnouncement(
      "▪️ !bakiyem ▪️ !rank ▪️ !gol ▪️ !hz ▪️ !cs ▪️ !puan ▪️ !asist ▪️ !bahis ▪️ !sıram ▪️ !bahisyardım ▪️ !rr 💬 !dc ▪️ !şamp1 ▪️ !bb ▪️ !ant ▪️ !sus ▪️ !konuş ▪️ !v4 ▪️ !dizilim ▪️ !tf ▪️ !bankaldır ▪️ !pd\n!spd <gs/fb/br(beraberlik)> ▪️ !şamp1 ▪️ !gs1 ▪️ !gs2 ▪️ !gs3 ▪️ !fb1 ▪️ !fb2 ▪️ !fb3",
      null,
      0x78e4ff
    );
  }
  if (message == "!konuş" && player.admin) {
    sustur = false;
    room.sendAnnouncement(
      "Oyuncular artık konuşabilir.",
      null,
      0xffba42,
      "normal",
      2
    );
    return false;
  }

  if (message == "!rr" && player.admin) {
    room.stopGame();
    room.startGame();
  }

  if (message == "!fb2" && player.admin == true) {
    room.setTeamColors(2, 60, 0x212842, [0xdbcdac, 0xbfae93, 0xdbcdac]);
    room.sendAnnouncement(
      "🐤 Fenerbahçe 2021 Gold (Deplasman) Forma ayarlandı.",
      null,
      0xfff23b,
      "bold",
      2
    );
    return false;
  }

  if (message == "!fb1" && player.admin == true) {
    room.setTeamColors(2, 180, 0xffffff, [0xffe600, 0x002033, 0xffe600]);
    room.sendAnnouncement(
      "🐤 Fenerbahçe 2021 Çubuklu (Ev Sahibi) Forma ayarlandı.",
      null,
      0xffffff,
      "bold",
      2
    );
    return false;
  }

  if (message == "!fb3" && player.admin == true) {
    room.setTeamColors(2, 0, 0x73730e, [0x000126, 0x00011c, 0x00012b]);
    room.sendAnnouncement(
      "🐤 Fenerbahçe 2021 Alternatif (Deplasman) Forma ayarlandı.",
      null,
      0x1a22f2,
      "bold",
      2
    );
    return false;
  }

  if (message.substring(0, 4) == "!spd") {
    if (!player.admin) {
      return false;
    }

    var splittedMessage = message.split(" ");
    if (splittedMessage.length == 2) {
      if (Number(splittedMessage[1].length) > 15) {
        return false;
      }
      if (splittedMessage[1] == "res") {
        redScore = 0;
        blueScore = 0;
        //room.sendAnnouncement("", null, 0x00FFDD, "normal",2);
      }
      if (splittedMessage[1] == "br") {
        redScore += 1;
        blueScore += 1;
        //room.sendAnnouncement("İki takıma da 1 puan eklendi", null, 0x00FFDD, "normal",2);
      } else if (splittedMessage[1] == "gs") {
        redScore += 3;
        //room.sendAnnouncement("Gs'ye 3 puan eklendi", null, 0x00FFDD, "normal",2);
      } else if (splittedMessage[1] == "fb") {
        blueScore += 3;
        //room.sendAnnouncement("Fb'ye 3 puan eklendi", null, 0x00FFDD, "normal",2);
      }
      typeScore();
    }
    return false;
  }

  if (message == "!tf" && player.admin) {
    room.stopGame();
    room.setCustomStadium(transfer);
    room.setTimeLimit(0);
    room.startGame();
    sustur = true;
  }

  if (message == "!dizilim" && player.admin) {
    room.stopGame();
    room.setCustomStadium(dizilim);
    room.setTimeLimit(0);
    room.startGame();
    sustur = true;
    room.sendAnnouncement(
      " Tüm oyuncular duvara lütfen, kaptanlar dizilimi ayarlıyor! Tüm oyuncular susturuldu.",
      null,
      0xff0000,
      "bold",
      2
    );
  }

  if (message == "!bankaldır" && player.admin) {
    room.clearBans();
    room.sendChat("📣 Tüm Banlar Kaldırıldı ! ");
    return false;
  }

  if (message == "!sus" && player.admin) {
    room.sendAnnouncement(
      "🔇 Kaliteli bir oyun için tüm oyuncular susturuldu.",
      null,
      0xffba42,
      "normal",
      2
    );
    sustur = true;
    return false;
  }
  if (["!discord", "!dc"].includes(message)) {
    room.sendAnnouncement(
      "https://discord.gg/UMgEv7wVHq ",
      player.id,
      0xffc72e,
      "bold"
    );
  }
  if (["!ısınma", "!ant"].includes(message) && player.admin) {
    room.stopGame();
    room.setCustomStadium(antrenman);
    room.setTimeLimit(0);
    room.startGame();
    sustur = false;
    room.sendAnnouncement(
      "| Antrenman Sahası açılmıştır ",
      null,
      0xffc72e,
      "bold",
      2
    );
  }

  if (message == "!1" && player.admin) {
    room.sendAnnouncement(
      "Herkese İyi Oyunlar Discord Adresimize Gelmeyı Unutmayın :)",
      null,
      0x4fff42,
      "bold",
      2
    );
    return false;
  }

  if (message == "sa") {
    room.sendAnnouncement(
      player.name + " Aleyküm Selam Hoşgeldin",
      null,
      0x4fff67,
      "bold",
      2
    );
    return false;
  }

  if (message == "!şamp1" && player.admin) {
    room.stopGame();
    room.setCustomStadium(şampiyonluk);
    room.setTimeLimit(0);
    room.startGame();
    sustur = false;
    room.sendAnnouncement(
      "🏆 ŞAMPİYONU TEBRİK EDERİZ !🏆 ",
      null,
      0xeeff00,
      "bold",
      2
    );
  }
  if (message == "!hz" && player.admin) {
    room.stopGame();
    room.setCustomStadium(hazirlik);
    //  room.setScoreLimit(0);
    room.setTimeLimit(4);
    room.startGame();
    sustur = false;
    room.sendAnnouncement(
      "Hazırlık Maçı 4 Dakika'dır Başarılar !",
      null,
      0xeeff00,
      "bold",
      2
    );
  }

  if (message == "!4" && player.admin) {
    room.sendAnnouncement(
      "Hatırlatma: 4 Defans yasaktır.🚫",
      null,
      0x4fff42,
      "bold",
      2
    );
    return false;
  }

  if (message == "!v4" && player.admin) {
    room.stopGame();
    room.setCustomStadium(RSHLMap3);
    room.setTimeLimit(0);
    room.startGame();
    setTimeout(function () {
      stadiumWidth = 1150;
      stadiumHeight = 578;
      radiusBall = 9.8;
      throwInLeeway = 350;
      greenLine = 510;
    }, 500);
    return false;
  }

  if (message == "!gs1" && player.admin == true) {
    room.setTeamColors(1, 0, 0xffffff, [0xff8800, 0x770000]);
    room.sendAnnouncement(
      "🦁 Galatasaray 2021 Ev Sahibi (Parçalı) Forma ayarlandı.",
      null,
      0xff1900,
      "bold",
      2
    );
    return false;
  }

  if (message == "!gs3" && player.admin == true) {
    room.setTeamColors(1, 60, 0x0d0103, [0xf48d40, 0xe8683f, 0xd43b2a]);
    room.sendAnnouncement(
      "🦁 Galatasaray 2021 Alternatif (Turuncu) Forma ayarlandı.",
      null,
      0xff7f00,
      "bold",
      2
    );
    return false;
  }

  if (message == "!gs2" && player.admin == true) {
    room.setTeamColors(1, 60, 0x960a21, [0x0f0f0f, 0x0f0f0f, 0x960a21]);
    room.sendAnnouncement(
      "🦁 Galatasaray 2021 (Siyah) Forma ayarlandı",
      null,
      0x000000,
      "bold",
      2
    );
    return false;
  }

  if (player.admin) {
    if (authList[auths.get(player.id)]) {
      room.sendAnnouncement(
        "[" +
          yetkiTagleri[authList[auths.get(player.id)]?.role] +
          "] | " +
          player.name +
          ": " +
          message,
        undefined,
        authList[auths.get(player.id)]?.color,
        "bold"
      );
    } else {
      room.sendAnnouncement(
        "[KAPTAN] | " + player.name + ": " + message,
        undefined,
        0x62d4d4,
        "bold"
      );
    }
    return false;
  } else {
    if (
      parse(localStorage.getItem("yetkiler")).vips.includes(
        auths.get(player.id)
      )
    ) {
      room.sendAnnouncement(
        "[VIP] | " + player.name + ": " + message,
        undefined,
        0x843dcf,
        "bold"
      );
      return false;
    }
    if (
      parse(localStorage.getItem("yetkiler")).boosters.includes(
        auths.get(player.id)
      )
    ) {
      room.sendAnnouncement(
        "[BOOSTER] | " + player.name + ": " + message,
        undefined,
        0xd1499b,
        "bold"
      );
      return false;
    }
  }

  if (susturulanlar.includes(player.id)) {
    room.sendAnnouncement("🔇 Sessiz...", player.id, 0x6eff94, "bold", 2);
    return false;
  }

  if (!player.admin && !susturulanlar.includes(player.id)) {
    susturulanlar.push(player.id);
    setTimeout(function () {
      susturulanlar.splice(susturulanlar.indexOf(player.id), 1);
    }, 1000);
  }

  message = message.split(/ +/);
  player.team != Team.SPECTATORS ? setActivity(player, 0) : null;
  if (["!help"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement(
      "[Değerli Oyuncumuz] Komutlar : !Me !dc .",
      player.id,
      0x0022ff,
      "bold",
      2
    );
    player.admin
      ? room.sendAnnouncement(
          "[Admin Komutları] Admin : !mute  =  #<id>, !unmute #<id>,!sus <duration> = all>, !bankaldır  = all>, !konuş",
          player.id,
          0xff7f00,
          "bold",
          2
        )
      : null;
  } else if (["!aaffkkQ"].includes(message[0].toLowerCase())) {
    if (players.length != 1 && player.team != Team.SPECTATORS) {
      if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
        room.setPlayerTeam(player.id, Team.SPECTATORS);
      } else {
        room.sendAnnouncement(
          "Maçtayken Afk Olamazsın",
          player.id,
          0x0022ff,
          "bold",
          2
        );
        return false;
      }
    } else if (players.length == 1 && !getAFK(player)) {
      room.setPlayerTeam(player.id, Team.SPECTATORS);
    }
    setAFK(player, !getAFK(player));
    room.sendChat(
      player.name +
        (getAFK(player) ? " Başarıyla Afk Oldun !" : " afk Değilsin")
    );
    getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
  } else if (["!affsks", "!affsklist"].includes(message[0].toLowerCase())) {
    var cstm = "[PV] AFK Listesi : ";
    for (var i = 0; i < extendedP.length; i++) {
      if (
        room.getPlayer(extendedP[i][eP.ID]) != null &&
        getAFK(room.getPlayer(extendedP[i][eP.ID]))
      ) {
        if (
          140 - cstm.length <
          (room.getPlayer(extendedP[i][eP.ID]).name + ", ").length
        ) {
          room.sendChat(cstm, player.id);
          cstm = "... ";
        }
        cstm += room.getPlayer(extendedP[i][eP.ID]).name + ", ";
      }
    }
    if (cstm == "[PV] AFK Listesi : ") {
      room.sendAnnouncement(
        "[PV] AFK listesinde kimse yok !",
        player.id,
        0xa10000,
        "bold",
        2
      );
      return false;
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!dc", "discord"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement(
      "📞📞📞 Discord Grubumuza Davetlisiniz. => https://discord.gg/UMgEv7wVHq <=",
      player.id,
      0x008000,
      "bold",
      2
    );
  }

  if (["!claim"].includes(message[0].toLowerCase())) {
    if (message[1] == adminPassword) {
      room.setPlayerAdmin(player.id, true);
      var stats;
      localStorage.getItem(getAuth(player))
        ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
        : (stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            player.name,
          ]);
      if (stats[Ss.RL] != "master") {
        stats[Ss.RL] = "master";
        room.sendChat(player.name + " is now a room master !");
        localStorage.setItem(getAuth(player), JSON.stringify(stats));
      }
    }
  } else if (["!setadmin", "!admin"].includes(message[0].toLowerCase())) {
    if (
      localStorage.getItem(getAuth(player)) &&
      JSON.parse(localStorage.getItem(getAuth(player)))[Ss.RL] == "master"
    ) {
      if (message.length >= 2 && message[1][0] == "#") {
        message[1] = message[1].substring(1, message[1].length);
        if (
          !Number.isNaN(Number.parseInt(message[1])) &&
          room.getPlayer(Number.parseInt(message[1])) != null
        ) {
          var stats;
          localStorage.getItem(
            getAuth(room.getPlayer(Number.parseInt(message[1])))
          )
            ? (stats = JSON.parse(
                localStorage.getItem(
                  getAuth(room.getPlayer(Number.parseInt(message[1])))
                )
              ))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                room.getPlayer(Number.parseInt(message[1])).name,
              ]);
          if (stats[Ss.RL] == "player") {
            stats[Ss.RL] = "admin";
            localStorage.setItem(
              getAuth(room.getPlayer(Number.parseInt(message[1]))),
              JSON.stringify(stats)
            );
            room.setPlayerAdmin(
              room.getPlayer(Number.parseInt(message[1])).id,
              true
            );
            room.sendChat(
              room.getPlayer(Number.parseInt(message[1])).name +
                " artık ana bilgisayar yöneticisisin !"
            );
          }
        }
      }
    }
  } else if (
    ["!setplayer", "!removeadmin"].includes(message[0].toLowerCase())
  ) {
    if (
      localStorage.getItem(getAuth(player)) &&
      JSON.parse(localStorage.getItem(getAuth(player)))[Ss.RL] == "master"
    ) {
      if (message.length >= 2 && message[1][0] == "#") {
        message[1] = message[1].substring(1, message[1].length);
        if (
          !Number.isNaN(Number.parseInt(message[1])) &&
          room.getPlayer(Number.parseInt(message[1])) != null
        ) {
          var stats;
          localStorage.getItem(
            getAuth(room.getPlayer(Number.parseInt(message[1])))
          )
            ? (stats = JSON.parse(
                localStorage.getItem(
                  getAuth(room.getPlayer(Number.parseInt(message[1])))
                )
              ))
            : (stats = [
                0,
                0,
                0,
                0,
                "0.00",
                0,
                0,
                0,
                0,
                "0.00",
                "player",
                room.getPlayer(Number.parseInt(message[1])).name,
              ]);
          if (stats[Ss.RL] == "admin") {
            room.sendChat(
              room.getPlayer(Number.parseInt(message[1])).name +
                " O artık oyuncuların yöneticisi değil !"
            );
            stats[Ss.RL] = "player";
            localStorage.setItem(
              getAuth(room.getPlayer(Number.parseInt(message[1]))),
              JSON.stringify(stats)
            );
            room.setPlayerAdmin(
              room.getPlayer(Number.parseInt(message[1])).id,
              false
            );
          }
        }
      }
    }
  } else if (["!mustes", "!mutselist"].includes(message[0].toLowerCase())) {
    var cstm = "[PV] sessiz listesi   : ";
    for (var i = 0; i < extendedP.length; i++) {
      if (
        room.getPlayer(extendedP[i][eP.ID]) != null &&
        getMute(room.getPlayer(extendedP[i][eP.ID]))
      ) {
        if (
          140 - cstm.length <
          (
            room.getPlayer(extendedP[i][eP.ID]).name +
            "[" +
            extendedP[i][eP.ID] +
            "], "
          ).length
        ) {
          room.sendChat(cstm, player.id);
          cstm = "... ";
        }
        cstm +=
          room.getPlayer(extendedP[i][eP.ID]).name +
          "[" +
          extendedP[i][eP.ID] +
          "], ";
      }
    }
    if (cstm == "[PV] Yok Sayılmış Liste : ") {
      room.sendChat("[PV] Sessiz listesinde kımse yok !", player.id);
      return false;
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!muste"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      updateTeams();
      var timeOut;
      if (!Number.isNaN(Number.parseInt(message[1])) && message.length > 1) {
        if (Number.parseInt(message[1]) > 0) {
          timeOut = Number.parseInt(message[1]) * 60 * 1000;
        } else {
          timeOut = 3 * 60 * 1000;
        }
        if (message[2].length > 1 && message[2][0] == "#") {
          message[2] = message[2].substring(1, message[2].length);
          if (
            !Number.isNaN(Number.parseInt(message[2])) &&
            room.getPlayer(Number.parseInt(message[2])) != null
          ) {
            if (
              room.getPlayer(Number.parseInt(message[2])).admin ||
              getMute(room.getPlayer(Number.parseInt(message[2])))
            ) {
              return false;
            }
            setTimeout(
              function (player) {
                setMute(player, false);
              },
              timeOut,
              room.getPlayer(Number.parseInt(message[2]))
            );
            setMute(room.getPlayer(Number.parseInt(message[2])), true);
            room.sendChat(
              room.getPlayer(Number.parseInt(message[2])).name +
                " tarafından değiştirildi " +
                timeOut / 60000 +
                " dakika !"
            );
          }
        }
      } else if (Number.isNaN(Number.parseInt(message[1]))) {
        if (message[1].length > 1 && message[1][0] == "#") {
          message[1] = message[1].substring(1, message[1].length);
          if (
            !Number.isNaN(Number.parseInt(message[1])) &&
            room.getPlayer(Number.parseInt(message[1])) != null
          ) {
            if (
              room.getPlayer(Number.parseInt(message[1])).admin ||
              getMute(room.getPlayer(Number.parseInt(message[1])))
            ) {
              return false;
            }
            setTimeout(
              function (player) {
                setMute(player, false);
              },
              3 * 60 * 1000,
              room.getPlayer(Number.parseInt(message[1]))
            );
            setMute(room.getPlayer(Number.parseInt(message[1])), true);
            room.sendChat(
              room.getPlayer(Number.parseInt(message[1])).name +
                " 3 dakika sessize alındınız!"
            );
          }
        }
      }
    }
  } else if (["!usnmute"].includes(message[0].toLowerCase())) {
    if (player.admin && message.length >= 2) {
      if (message[1] == "all") {
        extendedP.forEach((ePlayer) => {
          ePlayer[eP.MUTE] = false;
        });
        room.sendChat("Yok sayılan liste temizlendi");
      } else if (
        !Number.isNaN(Number.parseInt(message[1])) &&
        room.getPlayer(Number.parseInt(message[1])) != null &&
        getMute(room.getPlayer(Number.parseInt(message[1])))
      ) {
        setMute(room.getPlayer(Number.parseInt(message[1])), false);
        room.sendChat(
          room.getPlayer(Number.parseInt(message[1])).name +
            " yoksaymaktan vazgeçildi !"
        );
      } else if (Number.isNaN(Number.parseInt(message[1]))) {
        if (message[1].length > 1 && message[1][0] == "#") {
          message[1] = message[1].substring(1, message[1].length);
          if (
            !Number.isNaN(Number.parseInt(message[1])) &&
            room.getPlayer(Number.parseInt(message[1])) != null &&
            getMute(room.getPlayer(Number.parseInt(message[1])))
          ) {
            setMute(room.getPlayer(Number.parseInt(message[1])), false);
            room.sendChat(
              room.getPlayer(Number.parseInt(message[1])).name + " Konuşturuldu"
            );
          }
        }
      }
    }
  } else if (["!sus"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      if (message.length == 1) {
        slowMode = 2;
        room.sendChat(", yavaş mod devreye girdi (2 saniye)!");
      } else if (message.length == 2) {
        if (!Number.isNaN(Number.parseInt(message[1]))) {
          if (Number.parseInt(message[1]) > 0) {
            slowMode = Number.parseInt(message[1]);
            room.sendChat(slowMode + " saniye, yavaş mod etkinleştirildi !");
            return false;
          }
        }
        slowMode = 2;
        room.sendChat("Yavaş mod devreye girdi (2 saniye)!");
      }
    }
  } else if (["!konuş"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      slowMode != 0 ? room.sendChat("Yavaş mod bitti.") : null;
      slowMode = 0;
    }
  } else if (["!banlist", "!bans"].includes(message[0].toLowerCase())) {
    if (banList.length == 0) {
      room.sendChat("[PV] Yasaklılar listesinde kimse yok!", player.id);
      return false;
    }
    var cstm = "[PV] Yasaklı liste : ";
    for (var i = 0; i < banList.length; i++) {
      if (
        140 - cstm.length <
        (banList[i][0] + "[" + banList[i][1] + "], ").length
      ) {
        room.sendChat(cstm, player.id);
        cstm = "... ";
      }
      cstm += banList[i][0] + "[" + banList[i][1] + "], ";
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!bankaldır"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      if (message.length == 1) {
        room.clearBans();
        room.sendChat(" Tüm Banlar kaldırıldı!");
        banList = [];
      }
      if (message.length == 2) {
        if (!Number.isNaN(Number.parseInt(message[1]))) {
          if (Number.parseInt(message[1]) > 0) {
            ID = Number.parseInt(message[1]);
            room.clearBan(ID);
            if (banList.length != banList.filter((array) => array[1] != ID)) {
              room.sendChat(
                banList.filter((array) => array[1] == ID)[0][0] +
                  " ev sahibi tarafından yasaklandı !"
              );
            }
            setTimeout(() => {
              banList = banList.filter((array) => array[1] != ID);
            }, 20);
          }
        }
      }
    }
  } else if (
    ["!bb", "!bye", "!cya", "!gn"].includes(message[0].toLowerCase())
  ) {
    room.kickPlayer(player.id, "Bye !", false);
  }
  if (teamR.length != 0 && teamB.length != 0 && inChooseMode) {
    if (player.id == teamR[0].id || player.id == teamB[0].id) {
      // we care if it's one of the captains choosing
      if (teamR.length <= teamB.length && player.id == teamR[0].id) {
        // we care if it's red turn && red cap talking
        if (["top", "auto"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[0].id, Team.RED);
          redCaptainChoice = "top";
          clearTimeout(timeOutCap);
          room.sendChat(player.name + "En iyiyi seçtin !");
          return false;
        } else if (["random", "rand"].includes(message[0].toLowerCase())) {
          var r = getRandomInt(teamS.length);
          room.setPlayerTeam(teamS[r].id, Team.RED);
          redCaptainChoice = "random";
          clearTimeout(timeOutCap);
          room.sendChat(player.name + " Rastgele seçtiniz !");
          return false;
        } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
          redCaptainChoice = "bottom";
          clearTimeout(timeOutCap);
          room.sendChat(player.name + " Altını seçtin !");
          return false;
        } else if (!Number.isNaN(Number.parseInt(message[0]))) {
          if (
            Number.parseInt(message[0]) > teamS.length ||
            Number.parseInt(message[0]) < 1
          ) {
            room.sendChat(
              "[PV] Seçtiğiniz numara geçersiz !",
              player.id,
              0xbab0ff,
              "bold",
              2
            );
            return false;
          } else {
            room.setPlayerTeam(
              teamS[Number.parseInt(message[0]) - 1].id,
              Team.RED
            );
            room.sendChat(
              player.name +
                "seçti " +
                teamS[Number.parseInt(message[0]) - 1].name +
                " !"
            );
            return false;
          }
        }
      }
      if (teamR.length > teamB.length && player.id == teamB[0].id) {
        // we care if it's red turn && red cap talking
        if (["top", "auto"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[0].id, Team.BLUE);
          blueCaptainChoice = "top";
          clearTimeout(timeOutCap);
          room.sendChat(player.name + " seçili Üst !");
          return false;
        } else if (["random", "rand"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
          blueCaptainChoice = "random";
          clearTimeout(timeOutCap);
          room.sendChat(player.name + " Rastgele seçildi !");
          return false;
        } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
          blueCaptainChoice = "bottom";
          clearTimeout(timeOutCap);
          room.sendChat(player.name + " alt seçildi !");
          return false;
        } else if (!Number.isNaN(Number.parseInt(message[0]))) {
          if (
            Number.parseInt(message[0]) > teamS.length ||
            Number.parseInt(message[0]) < 1
          ) {
            room.sendChat(
              "[PV] Seçtiğiniz numara geçersiz !",
              player.id,
              0xbab0ff,
              "bold",
              2
            );
            return false;
          } else {
            room.setPlayerTeam(
              teamS[Number.parseInt(message[0]) - 1].id,
              Team.BLUE
            );
            room.sendChat(
              player.name +
                " seçilmiş " +
                teamS[Number.parseInt(message[0]) - 1].name +
                " !"
            );
            return false;
          }
        }
      }
    }
  }
  if (message[0][0] == "!") {
    return false;
  }
  if (getMute(player)) {
    room.sendChat("Susturuldun.", player.id);
    return false;
  }
  if (slowMode > 0) {
    if (!player.admin) {
      if (!SMSet.has(player.id)) {
        SMSet.add(player.id);
        setTimeout(
          (number) => {
            SMSet.delete(number);
          },
          slowMode * 1000,
          player.id
        );
      } else {
        return false;
      }
    }
  }

  if (player.admin == true) {
    adminMessage = mesaj;
    var adminchatcolor = 0x76ffee;
    room.sendAnnouncement(
      "[Yönetici]" + player.name + ": " + adminMessage,
      null,
      adminchatcolor,
      "bold",
      2
    );
    return false;
  }

  if (player.admin !== true) {
    let oyuncuMessage = mesaj;
    var oyuncuchatcolor = 0xff7f00;
    room.sendAnnouncement(
      "[#" + player.id + "] " + player.name + ": " + oyuncuMessage,
      null,
      oyuncuchatcolor,
      "bold",
      1
    );
    return false;
  }
};

function removeFromTagList(player) {
  if (tagList[player.id]) {
    delete tagList[player.id];
  }
}

room.onPlayerActivity = function (player) {
  setActivity(player, 0);
};

room.onPlayerBallKick = function (player) {
  whoTouchedLast = player;

  if (lastPlayersTouched[0] == null || player.id != lastPlayersTouched[0].id) {
    !activePlay ? (activePlay = true) : null;
    lastTeamTouched = player.team;
    lastPlayersTouched[1] = lastPlayersTouched[0];
    lastPlayersTouched[0] = player;
  }

  var ballPosition = room.getBallPosition();
  if (player.name != lastPlayersTouched) {
    if (lastTeamTouched == player.team) {
      assistingTouch = lastPlayersTouched;
    } else assistingTouch = "";
  }
  previousPlayerTouched = lastPlayersTouched;
  lastPlayersTouched = player.name;
  lastTeamTouched = player.team;
  if (isBallOutsideStadium) {
    getPlayersNotWithinLine();
  }
  if (isBallOutsideStadium && ballPosition.y < 0) {
    isBallKickedOutside = true;
  } else if (isBallOutsideStadium && ballPosition.y > 0) {
    isBallKickedOutside = true;
  } else isBallKickedOutside = false;
};

function whichTeam() {
  // gives the players in the red or blue team
  var players = room.getPlayerList();
  var redTeam = players.filter((player) => player.team == 1);
  var blueTeam = players.filter((player) => player.team == 2);
  return [redTeam, blueTeam];
}

/* GAME MANAGEMENT */

room.onGameStart = function (byPlayer) {
  let discordAdresi = "https://discord.gg/tZKWNgrVQY";
  _duyuruInterval = setInterval(() => {
    setTimeout(() => {
      room.sendAnnouncement(
        `Discord Grubumuza Davetlisiniz. =>  ${discordAdresi} <=`
      );
      setTimeout(() => {
        room.sendAnnouncement(siralama("puan"), null);
        setTimeout(() => {
          room.sendAnnouncement(siralama("gol"), null);
          setTimeout(() => {
            room.sendAnnouncement(siralama("asist"), null);
            setTimeout(() => {
              room.sendAnnouncement(siralama("cs"), null);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 5 * 60 * 1000);
  resetStats();
  bahisOynanabilir = true;
  bahisSure = setTimeout(() => {
    bahisOynanabilir = false;
    room.sendAnnouncement("Bahis için gereken süre doldu!", null);
  }, 60 * 1000);
  zaman = true;
  [redTeam, blueTeam] = whichTeam();
  ballCarrying = initBallCarrying(redTeam, blueTeam);
  playersNotInLine = [];
  playersNotInLineId = [];
  lineCrossedPlayers = [{ name: "temp", times: 0, id: "temp2" }];
  lastScores = room.getScores().red + room.getScores().blue;
  lineBallPosition = 0;
  game = new Game(Date.now(), room.getScores(), []);
  //    countAFK = true;
  activePlay = false;
  goldenGoal = false;
  endGameVariable = false;
  lastPlayersTouched = [null, null];
  Rposs = 0;
  Bposs = 0;
  GKList = [];
  allReds = [];
  allBlues = [];
  if (teamR.length == maxTeamSize && teamB.length == maxTeamSize) {
    for (var i = 0; i < maxTeamSize; i++) {
      allReds.push(teamR[i]);
      allBlues.push(teamB[i]);
    }
  }
  for (var i = 0; i < extendedP.length; i++) {
    extendedP[i][eP.GK] = 0;
    extendedP[i][eP.ACT] = 0;
    room.getPlayer(extendedP[i][eP.ID]) == null ? extendedP.splice(i, 1) : null;
  }
  deactivateChooseMode();

  timeOnHalves = [0, 0];
};

room.onGameStop = function (byPlayer) {
  if (uzatmaBitti) {
    end(lastWinner);
  } else {
    room.sendAnnouncement(
      "Maç bitmeden oyun bitirildiği için istatistikler kaydedilmeyecektir (bahisler dahil!) ! Lütfen maçı manuel olarak bitirmeyin.",
      null,
      0xeb4034
    );
  }
  bahisOynanabilir = false;
  uzatmaBitti = false;
  clearInterval(bahisSure);
  if (byPlayer.id == 0 && endGameVariable) {
    updateTeams();
    if (inChooseMode) {
      if (players.length == 2 * maxTeamSize) {
        inChooseMode = false;
        resetBtn();
        for (var i = 0; i < maxTeamSize; i++) {
          setTimeout(() => {
            randomBtn();
          }, 400 * i);
        }
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else if (lastWinner == Team.BLUE) {
          redToSpecBtn();
          blueToRedBtn();
        } else {
          resetBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 500);
      }
    } else {
      if (players.length == 2) {
        if (lastWinner == Team.BLUE) {
          room.setPlayerTeam(teamB[0].id, Team.RED);
          room.setPlayerTeam(teamR[0].id, Team.BLUE);
        }
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 3 || players.length >= 2 * maxTeamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else {
          redToSpecBtn();
          blueToRedBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 200);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 4) {
        resetBtn();
        setTimeout(() => {
          randomBtn();
          setTimeout(() => {
            randomBtn();
          }, 500);
        }, 500);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 5 || players.length >= 2 * maxTeamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else {
          redToSpecBtn();
          blueToRedBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 200);
        activateChooseMode();
      } else if (players.length == 6) {
        resetBtn();
        setTimeout(() => {
          randomBtn();
          setTimeout(() => {
            randomBtn();
            setTimeout(() => {
              randomBtn();
            }, 500);
          }, 500);
        }, 500);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      }
    }
  }
  sure = undefined;
  zaman = false;
  clearInterval(sayac);
  m = undefined;
  clearInterval(_duyuruInterval);

  whoTouchedBall = [init, init];
  whoTouchedLast = undefined;
};

function adminGorebilir(player, message) {
  var players = room.getPlayerList();
  for (var i = 0; i < players.length; i++) {
    if (players[i].admin == true) {
      room.sendAnnouncement(
        "🔇" + player.name + ": " + message,
        players[i].id,
        0xf7fff9,
        "normal",
        2
      );
    }
  }
}

room.onGamePause = function (byPlayer) {};

room.onGameUnpause = function (byPlayer) {
  if (
    (teamR.length == 4 && teamB.length == 4 && inChooseMode) ||
    (teamR.length == teamB.length && teamS.length < 2 && inChooseMode)
  ) {
    deactivateChooseMode();
  }
};

function initBallCarrying(redTeam, blueTeam) {
  var ballCarrying = new Map();
  var playing = redTeam.concat(blueTeam);
  for (var i = 0; i < playing.length; i++) {
    ballCarrying.set(playing[i].name, [0, playing[i].team]); // secs, team, %
  }
  return ballCarrying;
}

updateTimeOnHalves = function () {
  if (room.getBallPosition().x < 0) {
    timeOnHalves[0] += 1 / 60;
  } else if (room.getBallPosition().x > 0) {
    timeOnHalves[1] += 1 / 60;
  }
};

room.onTeamGoal = function (team) {
  console.log(lastPlayersTouched);
  console.log(whoTouchedBall);
  // if (map == "RSR") {
  //   game.rsActive = false;

  //   let goalTime = secondsToMinutes(Math.floor(room.getScores().time));
  //   let scorer;
  //   let assister = "";
  //   let goalType;
  //   if (team == 1) {
  //     if (game.lastKickerTeam == 1) {
  //       //if goal type is goal
  //       goalType = "GOL!";
  //       scorer = "⚽" + game.lastKickerName;
  //       avatarCelebration(game.lastKickerId, "⚽");
  //       if (
  //         game.secondLastKickerTeam == 1 &&
  //         game.lastKickerId != game.secondLastKickerId
  //       ) {
  //         // if assist is from teammate
  //         assister = " (Assist: " + game.secondLastKickerName + ")";
  //         avatarCelebration(game.secondLastKickerId, "🅰️");
  //       }
  //     }
  //     if (game.lastKickerTeam == 2) {
  //       //if goal type is owngoal
  //       goalType = "OWN GOAL!";
  //       scorer = "🐸" + game.lastKickerName;
  //       avatarCelebration(game.lastKickerId, "🐸");
  //       if (game.secondLastKickerTeam == 1) {
  //         // if owngoal was assisted
  //         assister = " (Assist: " + game.secondLastKickerName + ")";
  //         avatarCelebration(game.secondLastKickerId, "🅰️");
  //       }
  //     }
  //     game.redScore++;
  //   }
  //   if (team == 2) {
  //     if (game.lastKickerTeam == 2) {
  //       //if goal type is goal
  //       goalType = "GOAL!";
  //       scorer = "⚽" + game.lastKickerName;
  //       avatarCelebration(game.lastKickerId, "⚽");
  //       if (
  //         game.secondLastKickerTeam == 2 &&
  //         game.lastKickerId != game.secondLastKickerId
  //       ) {
  //         // if assist is from teammate
  //         assister = " (Assist: " + game.secondLastKickerName + ")";
  //         avatarCelebration(game.secondLastKickerId, "🅰️");
  //       }
  //     }
  //     if (game.lastKickerTeam == 1) {
  //       //if goal type is owngoal
  //       goalType = "OWN GOAL!";
  //       scorer = "🐸" + game.lastKickerName;
  //       avatarCelebration(game.lastKickerId, "🐸");
  //       if (game.secondLastKickerTeam == 2) {
  //         // if owngoal was assisted
  //         assister = " (Assist: " + game.secondLastKickerName + ")";
  //         avatarCelebration(game.secondLastKickerId, "🅰️");
  //       }
  //     }
  //     game.blueScore++;
  //   }
  //   announce(
  //     goalType +
  //       " 🟥 " +
  //       game.redScore +
  //       " - " +
  //       game.blueScore +
  //       " 🟦 🕒" +
  //       goalTime +
  //       " " +
  //       scorer +
  //       assister
  //   );
  //   game.lastKicker = undefined;
  //   game.secondLastKicker = undefined;
  //   game.lastKickerTeam = undefined;
  //   game.secondLastKickerTeam = undefined;
  // }
  var time = room.getScores().time;
  var m = Math.trunc(time / 60);
  var s = Math.trunc(time % 60);
  time = m + ":" + floor(s); // MM:SS format
  var ownGoal = isOwnGoal(team, whoTouchedBall[0]);

  var players = room.getPlayerList();
  const golatanid = whoTouchedBall[0].id;
  const asistyapanid = whoTouchedBall[1]?.id;
  let r = room.getPlayerDiscProperties(whoTouchedBall[0].id).radius;
  activePlay = false;
  //    countAFK = false;
  const string = lastTeamTouched.toString();
  const scores = room.getScores();
  game.scores = scores;
  if (whoTouchedBall[0] != null && whoTouchedBall[0].team == team) {
    if (whoTouchedBall[1] != null && whoTouchedBall[1].team == team) {
      room.sendAnnouncement(
        "⚽ " +
          getTime(scores) +
          " Gol  " +
          whoTouchedBall[0].name +
          " ! Asist " +
          whoTouchedBall[1].name +
          ". Şut hızı: " +
          ballSpeed.toPrecision(4).toString() +
          "km/h " +
          (team == Team.RED ? "🔴" : "🔵")
      );

      room.setPlayerDiscProperties(golatanid, { radius: r * 2 });
      room.setPlayerAvatar(golatanid, "⚽");

      room.setPlayerDiscProperties(asistyapanid, { radius: r * 2 });
      room.setPlayerAvatar(asistyapanid, "👟");
      if (ggol.has(golatanid)) {
        let a = ggol.get(golatanid);
        a += 1;
        ggol.set(golatanid, a);
      } else {
        ggol.set(golatanid, 1);
      }
      if (gassist.has(golatanid)) {
        let h = gassist.get(asistyapanid);
        h += 1;
        gassist.set(asistyapanid, h);
      } else {
        gassist.set(asistyapanid, 1);
      }

      setTimeout(() => {
        room.setPlayerAvatar(golatanid, null);
        room.setPlayerAvatar(asistyapanid, null);
      }, 1000);
      game.goals.push(
        new Goal(scores.time, team, whoTouchedBall[0], whoTouchedBall[1])
      );
    } else {
      room.sendAnnouncement(
        "⚽ " +
          getTime(scores) +
          " Mukemmel Bir Goll  " +
          whoTouchedBall[0].name +
          " ! Şut hızı : " +
          ballSpeed.toPrecision(4).toString() +
          "km/h " +
          (team == Team.RED ? "🔴" : "🔵")
      );
      room.setPlayerDiscProperties(golatanid, { radius: r * 2 });
      room.setPlayerAvatar(golatanid, "⚽");
      if (ggol.has(golatanid)) {
        let j = ggol.get(golatanid);
        j += 1;
        ggol.set(golatanid, j);
      } else {
        ggol.set(golatanid, 1);
      }
      setTimeout(() => {
        room.setPlayerDiscProperties(golatanid, { radius: r });
        room.setPlayerAvatar(golatanid, null);
      }, 2000);
      game.goals.push(new Goal(scores.time, team, whoTouchedBall[0], null));
    }
  } else {
    room.sendAnnouncement(
      "😂 " +
        getTime(scores) +
        "Kendi Kalesine :D " +
        whoTouchedBall[0].name +
        " ! Şut hızı : " +
        ballSpeed.toPrecision(4).toString() +
        "km/h " +
        (team == Team.RED ? "🔴" : "🔵")
    );
    if (gkk.has(golatanid)) {
      let k = gkk.get(golatanid);
      k += 1;
      gkk.set(golatanid, k);
    } else {
      gkk.set(golatanid, 1);
    }
    game.goals.push(new Goal(scores.time, team, null, null));
  }
  if (
    scores.scoreLimit != 0 &&
    (scores.red == scores.scoreLimit ||
      (scores.blue == scores.scoreLimit && scores.blue > 0) ||
      goldenGoal == true)
  ) {
    endGame(team);
    goldenGoal = false;
    setTimeout(() => {
      room.stopGame();
    }, 1000);
  }
  whoTouchedBall = [init, init];
  whoTouchedLast = undefined;
};

room.onPositionsReset = function () {
  //    countAFK = true;
  lastPlayersTouched = [null, null];
};

/* MISCELLANEOUS */

room.onRoomLink = function (url) {
  doReqStuffs();
};

room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
  if (
    changedPlayer.name == "Ömer | ᴍᴇʀʟɪɴᴜꜱ" &&
    byPlayer.id != 0 &&
    byPlayer.name != "Ömer | ᴍᴇʀʟɪɴᴜꜱ" &&
    changedPlayer.admin == 0 &&
    byPlayer.name != "Ömer | ᴍᴇʀʟɪɴᴜꜱ"
  ) {
    room.kickPlayer(
      byPlayer.id,
      "⛔️ Asıl Admin'in Admin'liğine Müdahale Edemezsiniz!",
      true
    );
    room.setPlayerAdmin(changedPlayer.id, true);
  } else if (
    byPlayer.id == changedPlayer.id &&
    byPlayer.id == "Ömer | ᴍᴇʀʟɪɴᴜꜱ"
  ) {
    room.setPlayerAdmin(changedPlayer.id, !changedPlayer.admin);
  }
  

  if (getMute(changedPlayer) && changedPlayer.admin) {
    room.sendChat(changedPlayer.name + " yoksaymaktan vazgeçildi.");
    setMute(changedPlayer, false);
  }
  if (
    byPlayer.id != 0 &&
    localStorage.getItem(getAuth(byPlayer)) &&
    JSON.parse(localStorage.getItem(getAuth(byPlayer)))[Ss.RL] == "admin"
  ) {
    room.sendChat(
      "Bir oyuncuyu Yönetici olarak adlandırma izniniz yok !",
      byPlayer.id,
      0x00ddff,
      "bold",
      2
    );
    room.setPlayerAdmin(changedPlayer.id, false);
  }
};

room.onStadiumChange = function (newStadiumName, byPlayer) {
  let stads = {
    "Antrenman | M&M": antrenman,
    "v4 | M&M": RSHLMap3,
    "Transfer | M&M": transfer,
    "Dizilim | M&M": dizilim,
    "HZ | M&M": hazirlik,
  };
  if (!Object.keys(stads).includes(newStadiumName)) {
    let harita = stads[stadyumismi];
    room.setCustomStadium(harita);
    return;
  }
  stadyumismi = newStadiumName;
};

var tickCount = 0;
room.onGameTick = function () {
  isThrowInCorrect();
  getLastTouchTheBall();
  checkBallPosition();
  isBackRequired();
  //  checkTime();
  getStats();
  if (
    stadyumismi != JSON.parse(antrenman.replace(/\/\*\s*\w*\s*\*\//gi, "")).name
  ) {
    uzatma();
  }
  tickCount++;

  updateTimeOnHalves();

  if (whoTouchedLast != undefined) {
    if (ballCarrying.get(whoTouchedLast.name)) {
      ballCarrying.get(whoTouchedLast.name)[0] += 1 / 60;
    }

    if (whoTouchedLast.id != whoTouchedBall[0].id) {
      whoTouchedBall[1] = whoTouchedBall[0];
      whoTouchedBall[0] = whoTouchedLast; // last player who touched the ball
    }
  }
};
