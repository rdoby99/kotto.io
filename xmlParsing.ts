const { Pool } = require("pg");
const dotenv = require("dotenv");
const fs = require("fs");
const xml2js = require("xml2js");

// Load .env variables
dotenv.config();

// Credintials for DB
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_NAME,
});

const xmlFilePath = "./JMdict_e_examp.xml";
const parser = new xml2js.Parser();
parser.saxParser.ENTITIES["bra"] = "undefined";
parser.saxParser.ENTITIES["hob"] = "undefined";
parser.saxParser.ENTITIES["ksb"] = "undefined";
parser.saxParser.ENTITIES["ktb"] = "undefined";
parser.saxParser.ENTITIES["kyb"] = "undefined";
parser.saxParser.ENTITIES["kyu"] = "undefined";
parser.saxParser.ENTITIES["nab"] = "undefined";
parser.saxParser.ENTITIES["osb"] = "undefined";
parser.saxParser.ENTITIES["rkb"] = "undefined";
parser.saxParser.ENTITIES["thb"] = "undefined";
parser.saxParser.ENTITIES["tsb"] = "undefined";
parser.saxParser.ENTITIES["tsug"] = "undefined";
parser.saxParser.ENTITIES["agric"] = "undefined";
parser.saxParser.ENTITIES["anat"] = "undefined";
parser.saxParser.ENTITIES["archeol"] = "undefined";
parser.saxParser.ENTITIES["archit"] = "undefined";
parser.saxParser.ENTITIES["art"] = "undefined";
parser.saxParser.ENTITIES["astron"] = "undefined";
parser.saxParser.ENTITIES["audvid"] = "undefined";
parser.saxParser.ENTITIES["aviat"] = "undefined";
parser.saxParser.ENTITIES["baseb"] = "undefined";
parser.saxParser.ENTITIES["biochem"] = "undefined";
parser.saxParser.ENTITIES["biol"] = "undefined";
parser.saxParser.ENTITIES["bot"] = "undefined";
parser.saxParser.ENTITIES["boxing"] = "undefined";
parser.saxParser.ENTITIES["Buddh"] = "undefined";
parser.saxParser.ENTITIES["bus"] = "undefined";
parser.saxParser.ENTITIES["cards"] = "undefined";
parser.saxParser.ENTITIES["chem"] = "undefined";
parser.saxParser.ENTITIES["chmyth"] = "undefined";
parser.saxParser.ENTITIES["Christn"] = "undefined";
parser.saxParser.ENTITIES["civeng"] = "undefined";
parser.saxParser.ENTITIES["cloth"] = "undefined";
parser.saxParser.ENTITIES["comp"] = "undefined";
parser.saxParser.ENTITIES["cryst"] = "undefined";
parser.saxParser.ENTITIES["dent"] = "undefined";
parser.saxParser.ENTITIES["ecol"] = "undefined";
parser.saxParser.ENTITIES["econ"] = "undefined";
parser.saxParser.ENTITIES["elec"] = "undefined";
parser.saxParser.ENTITIES["electr"] = "undefined";
parser.saxParser.ENTITIES["embryo"] = "undefined";
parser.saxParser.ENTITIES["engr"] = "undefined";
parser.saxParser.ENTITIES["ent"] = "undefined";
parser.saxParser.ENTITIES["figskt"] = "undefined";
parser.saxParser.ENTITIES["film"] = "undefined";
parser.saxParser.ENTITIES["finc"] = "undefined";
parser.saxParser.ENTITIES["fish"] = "undefined";
parser.saxParser.ENTITIES["food"] = "undefined";
parser.saxParser.ENTITIES["gardn"] = "undefined";
parser.saxParser.ENTITIES["genet"] = "undefined";
parser.saxParser.ENTITIES["geogr"] = "undefined";
parser.saxParser.ENTITIES["geol"] = "undefined";
parser.saxParser.ENTITIES["geom"] = "undefined";
parser.saxParser.ENTITIES["go"] = "undefined";
parser.saxParser.ENTITIES["golf"] = "undefined";
parser.saxParser.ENTITIES["gramm"] = "undefined";
parser.saxParser.ENTITIES["grmyth"] = "undefined";
parser.saxParser.ENTITIES["hanaf"] = "undefined";
parser.saxParser.ENTITIES["horse"] = "undefined";
parser.saxParser.ENTITIES["internet"] = "undefined";
parser.saxParser.ENTITIES["jpmyth"] = "undefined";
parser.saxParser.ENTITIES["kabuki"] = "undefined";
parser.saxParser.ENTITIES["law"] = "undefined";
parser.saxParser.ENTITIES["ling"] = "undefined";
parser.saxParser.ENTITIES["logic"] = "undefined";
parser.saxParser.ENTITIES["MA"] = "undefined";
parser.saxParser.ENTITIES["mahj"] = "undefined";
parser.saxParser.ENTITIES["manga"] = "undefined";
parser.saxParser.ENTITIES["math"] = "undefined";
parser.saxParser.ENTITIES["mech"] = "undefined";
parser.saxParser.ENTITIES["med"] = "undefined";
parser.saxParser.ENTITIES["met"] = "undefined";
parser.saxParser.ENTITIES["mil"] = "undefined";
parser.saxParser.ENTITIES["min"] = "undefined";
parser.saxParser.ENTITIES["mining"] = "undefined";
parser.saxParser.ENTITIES["motor"] = "undefined";
parser.saxParser.ENTITIES["music"] = "undefined";
parser.saxParser.ENTITIES["noh"] = "undefined";
parser.saxParser.ENTITIES["ornith"] = "undefined";
parser.saxParser.ENTITIES["paleo"] = "undefined";
parser.saxParser.ENTITIES["pathol"] = "undefined";
parser.saxParser.ENTITIES["pharm"] = "undefined";
parser.saxParser.ENTITIES["phil"] = "undefined";
parser.saxParser.ENTITIES["photo"] = "undefined";
parser.saxParser.ENTITIES["physics"] = "undefined";
parser.saxParser.ENTITIES["physiol"] = "undefined";
parser.saxParser.ENTITIES["politics"] = "undefined";
parser.saxParser.ENTITIES["print"] = "undefined";
parser.saxParser.ENTITIES["prowres"] = "undefined";
parser.saxParser.ENTITIES["psy"] = "undefined";
parser.saxParser.ENTITIES["psyanal"] = "undefined";
parser.saxParser.ENTITIES["psych"] = "undefined";
parser.saxParser.ENTITIES["rail"] = "undefined";
parser.saxParser.ENTITIES["rommyth"] = "undefined";
parser.saxParser.ENTITIES["Shinto"] = "undefined";
parser.saxParser.ENTITIES["shogi"] = "undefined";
parser.saxParser.ENTITIES["ski"] = "undefined";
parser.saxParser.ENTITIES["sports"] = "undefined";
parser.saxParser.ENTITIES["stat"] = "undefined";
parser.saxParser.ENTITIES["stockm"] = "undefined";
parser.saxParser.ENTITIES["sumo"] = "undefined";
parser.saxParser.ENTITIES["surg"] = "undefined";
parser.saxParser.ENTITIES["telec"] = "undefined";
parser.saxParser.ENTITIES["tradem"] = "undefined";
parser.saxParser.ENTITIES["tv"] = "undefined";
parser.saxParser.ENTITIES["vet"] = "undefined";
parser.saxParser.ENTITIES["vidg"] = "undefined";
parser.saxParser.ENTITIES["zool"] = "undefined";
parser.saxParser.ENTITIES["ateji"] = "undefined";
parser.saxParser.ENTITIES["ik"] = "undefined";
parser.saxParser.ENTITIES["iK"] = "undefined";
parser.saxParser.ENTITIES["io"] = "undefined";
parser.saxParser.ENTITIES["oK"] = "undefined";
parser.saxParser.ENTITIES["rK"] = "undefined";
parser.saxParser.ENTITIES["sK"] = "undefined";
parser.saxParser.ENTITIES["abbr"] = "undefined";
parser.saxParser.ENTITIES["arch"] = "undefined";
parser.saxParser.ENTITIES["char"] = "undefined";
parser.saxParser.ENTITIES["chn"] = "undefined";
parser.saxParser.ENTITIES["col"] = "undefined";
parser.saxParser.ENTITIES["company"] = "undefined";
parser.saxParser.ENTITIES["creat"] = "undefined";
parser.saxParser.ENTITIES["dated"] = "undefined";
parser.saxParser.ENTITIES["dei"] = "undefined";
parser.saxParser.ENTITIES["derog"] = "undefined";
parser.saxParser.ENTITIES["doc"] = "undefined";
parser.saxParser.ENTITIES["euph"] = "undefined";
parser.saxParser.ENTITIES["ev"] = "undefined";
parser.saxParser.ENTITIES["fam"] = "undefined";
parser.saxParser.ENTITIES["fem"] = "undefined";
parser.saxParser.ENTITIES["fict"] = "undefined";
parser.saxParser.ENTITIES["form"] = "undefined";
parser.saxParser.ENTITIES["given"] = "undefined";
parser.saxParser.ENTITIES["group"] = "undefined";
parser.saxParser.ENTITIES["hist"] = "undefined";
parser.saxParser.ENTITIES["hon"] = "undefined";
parser.saxParser.ENTITIES["hum"] = "undefined";
parser.saxParser.ENTITIES["id"] = "undefined";
parser.saxParser.ENTITIES["joc"] = "undefined";
parser.saxParser.ENTITIES["leg"] = "undefined";
parser.saxParser.ENTITIES["m-sl"] = "undefined";
parser.saxParser.ENTITIES["male"] = "undefined";
parser.saxParser.ENTITIES["myth"] = "undefined";
parser.saxParser.ENTITIES["net-sl"] = "undefined";
parser.saxParser.ENTITIES["obj"] = "undefined";
parser.saxParser.ENTITIES["obs"] = "undefined";
parser.saxParser.ENTITIES["on-mim"] = "undefined";
parser.saxParser.ENTITIES["organization"] = "undefined";
parser.saxParser.ENTITIES["oth"] = "undefined";
parser.saxParser.ENTITIES["person"] = "undefined";
parser.saxParser.ENTITIES["place"] = "undefined";
parser.saxParser.ENTITIES["poet"] = "undefined";
parser.saxParser.ENTITIES["pol"] = "undefined";
parser.saxParser.ENTITIES["product"] = "undefined";
parser.saxParser.ENTITIES["proverb"] = "undefined";
parser.saxParser.ENTITIES["quote"] = "undefined";
parser.saxParser.ENTITIES["rare"] = "undefined";
parser.saxParser.ENTITIES["relig"] = "undefined";
parser.saxParser.ENTITIES["sens"] = "undefined";
parser.saxParser.ENTITIES["serv"] = "undefined";
parser.saxParser.ENTITIES["ship"] = "undefined";
parser.saxParser.ENTITIES["sl"] = "undefined";
parser.saxParser.ENTITIES["station"] = "undefined";
parser.saxParser.ENTITIES["surname"] = "undefined";
parser.saxParser.ENTITIES["uk"] = "undefined";
parser.saxParser.ENTITIES["unclass"] = "undefined";
parser.saxParser.ENTITIES["vulg"] = "undefined";
parser.saxParser.ENTITIES["work"] = "undefined";
parser.saxParser.ENTITIES["X"] = "undefined";
parser.saxParser.ENTITIES["yoji"] = "undefined";
parser.saxParser.ENTITIES["adj-f"] = "undefined";
parser.saxParser.ENTITIES["adj-i"] = "undefined";
parser.saxParser.ENTITIES["adj-ix"] = "undefined";
parser.saxParser.ENTITIES["adj-kari"] = "undefined";
parser.saxParser.ENTITIES["adj-ku"] = "undefined";
parser.saxParser.ENTITIES["adj-na"] = "undefined";
parser.saxParser.ENTITIES["adj-nari"] = "undefined";
parser.saxParser.ENTITIES["adj-no"] = "undefined";
parser.saxParser.ENTITIES["adj-pn"] = "undefined";
parser.saxParser.ENTITIES["adj-shiku"] = "undefined";
parser.saxParser.ENTITIES["adj-t"] = "undefined";
parser.saxParser.ENTITIES["adv"] = "undefined";
parser.saxParser.ENTITIES["adv-to"] = "undefined";
parser.saxParser.ENTITIES["aux"] = "undefined";
parser.saxParser.ENTITIES["aux-adj"] = "undefined";
parser.saxParser.ENTITIES["aux-v"] = "undefined";
parser.saxParser.ENTITIES["conj"] = "undefined";
parser.saxParser.ENTITIES["cop"] = "undefined";
parser.saxParser.ENTITIES["ctr"] = "undefined";
parser.saxParser.ENTITIES["exp"] = "undefined";
parser.saxParser.ENTITIES["int"] = "undefined";
parser.saxParser.ENTITIES["n"] = "undefined";
parser.saxParser.ENTITIES["n-adv"] = "undefined";
parser.saxParser.ENTITIES["n-pr"] = "undefined";
parser.saxParser.ENTITIES["n-pref"] = "undefined";
parser.saxParser.ENTITIES["n-suf"] = "undefined";
parser.saxParser.ENTITIES["n-t"] = "undefined";
parser.saxParser.ENTITIES["num"] = "undefined";
parser.saxParser.ENTITIES["pn"] = "undefined";
parser.saxParser.ENTITIES["pref"] = "undefined";
parser.saxParser.ENTITIES["prt"] = "undefined";
parser.saxParser.ENTITIES["suf"] = "undefined";
parser.saxParser.ENTITIES["unc"] = "undefined";
parser.saxParser.ENTITIES["v-unspec"] = "undefined";
parser.saxParser.ENTITIES["v1"] = "undefined";
parser.saxParser.ENTITIES["v1-s"] = "undefined";
parser.saxParser.ENTITIES["v2a-s"] = "undefined";
parser.saxParser.ENTITIES["v2b-k"] = "undefined";
parser.saxParser.ENTITIES["v2b-s"] = "undefined";
parser.saxParser.ENTITIES["v2d-k"] = "undefined";
parser.saxParser.ENTITIES["v2d-s"] = "undefined";
parser.saxParser.ENTITIES["v2g-k"] = "undefined";
parser.saxParser.ENTITIES["v2g-s"] = "undefined";
parser.saxParser.ENTITIES["v2h-k"] = "undefined";
parser.saxParser.ENTITIES["v2h-s"] = "undefined";
parser.saxParser.ENTITIES["v2k-k"] = "undefined";
parser.saxParser.ENTITIES["v2k-s"] = "undefined";
parser.saxParser.ENTITIES["v2m-k"] = "undefined";
parser.saxParser.ENTITIES["v2m-s"] = "undefined";
parser.saxParser.ENTITIES["v2n-s"] = "undefined";
parser.saxParser.ENTITIES["v2r-k"] = "undefined";
parser.saxParser.ENTITIES["v2r-s"] = "undefined";
parser.saxParser.ENTITIES["v2s-s"] = "undefined";
parser.saxParser.ENTITIES["v2t-k"] = "undefined";
parser.saxParser.ENTITIES["v2t-s"] = "undefined";
parser.saxParser.ENTITIES["v2w-s"] = "undefined";
parser.saxParser.ENTITIES["v2y-k"] = "undefined";
parser.saxParser.ENTITIES["v2y-s"] = "undefined";
parser.saxParser.ENTITIES["v2z-s"] = "undefined";
parser.saxParser.ENTITIES["v4b"] = "undefined";
parser.saxParser.ENTITIES["v4g"] = "undefined";
parser.saxParser.ENTITIES["v4h"] = "undefined";
parser.saxParser.ENTITIES["v4k"] = "undefined";
parser.saxParser.ENTITIES["v4m"] = "undefined";
parser.saxParser.ENTITIES["v4n"] = "undefined";
parser.saxParser.ENTITIES["v4r"] = "undefined";
parser.saxParser.ENTITIES["v4s"] = "undefined";
parser.saxParser.ENTITIES["v4t"] = "undefined";
parser.saxParser.ENTITIES["v5aru"] = "undefined";
parser.saxParser.ENTITIES["v5b"] = "undefined";
parser.saxParser.ENTITIES["v5g"] = "undefined";
parser.saxParser.ENTITIES["v5k"] = "undefined";
parser.saxParser.ENTITIES["v5k-s"] = "undefined";
parser.saxParser.ENTITIES["v5m"] = "undefined";
parser.saxParser.ENTITIES["v5n"] = "undefined";
parser.saxParser.ENTITIES["v5r"] = "undefined";
parser.saxParser.ENTITIES["v5r-i"] = "undefined";
parser.saxParser.ENTITIES["v5s"] = "undefined";
parser.saxParser.ENTITIES["v5t"] = "undefined";
parser.saxParser.ENTITIES["v5u"] = "undefined";
parser.saxParser.ENTITIES["v5u-s"] = "undefined";
parser.saxParser.ENTITIES["v5uru"] = "undefined";
parser.saxParser.ENTITIES["vi"] = "undefined";
parser.saxParser.ENTITIES["vk"] = "undefined";
parser.saxParser.ENTITIES["vn"] = "undefined";
parser.saxParser.ENTITIES["vr"] = "undefined";
parser.saxParser.ENTITIES["vs"] = "undefined";
parser.saxParser.ENTITIES["vs-c"] = "undefined";
parser.saxParser.ENTITIES["vs-i"] = "undefined";
parser.saxParser.ENTITIES["vs-s"] = "undefined";
parser.saxParser.ENTITIES["vt"] = "undefined";
parser.saxParser.ENTITIES["vz"] = "undefined";
parser.saxParser.ENTITIES["gikun"] = "undefined";
parser.saxParser.ENTITIES["ik"] = "undefined";
parser.saxParser.ENTITIES["ok"] = "undefined";
parser.saxParser.ENTITIES["rk"] = "undefined";
parser.saxParser.ENTITIES["sk"] = "undefined";

// Read XML file and turn to string
fs.readFile(xmlFilePath, "utf8", async (err, data) => {
  if (err) {
    console.error(`Error reading XML file: ${err}`);
    return;
  }

  // data = data.replace(/&/g, "&amp;").replace(/-/g, "&#45;").replace(/;/g, "&#59;");

  // Parse XML file into object
  parser.parseString(data, (err, result) => {
    if (err) {
      console.error(`Error parsing XML file: ${err}`);
      return;
    }

    //Post object properties to database
    updateDatabase(result);
  });
});

/**
 * Post objects from XML to database
 *
 * @param parsedXml XML document in Object format
 */

const updateDatabase = async (parsedXml) => {
  try {
    const entries = parsedXml.JMdict.entry;

    const client = await pool.connect();

    for (let entry of entries) {
      const id = entry.ent_seq[0];
      const reading = entry.r_ele ? entry.r_ele.map((r) => r.reb[0]) : [];
      const kanji = entry.k_ele ? entry.k_ele.map((k) => k.keb[0]) : [];
      const definition = entry.sense
        ? entry.sense.map((s) => {
            return {
              gloss: s.gloss ? s.gloss.map((g) => g[0]) : null,
            };
          })
        : null;

      const definitionJSON = definition.length
        ? JSON.stringify(definition)
        : null;

      await client.query(
        `INSERT INTO words (id, kanji, reading, definition)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING`,
        [id, kanji, reading, definitionJSON]
      );
    }

    client.release();
    console.log("Data inserted sucessfully");
  } catch (err) {
    console.error(`Error posting to DB: ${err}`);
  }
};
