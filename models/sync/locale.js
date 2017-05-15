module.exports = {
    sync: function(models, callback){
        var Locale = models.Locale;
        
        Locale.sync().then(function(){
            Locale.count().then(function(Locales){
                if(Locales === 0){
                    Locale.bulkCreate(LocalesToCreate).then(function(){
                        console.log("Locales created successfully!");
                        callback && callback();
                    });
                }else{
                    callback && callback();
                }
            });
        });
    }
};

var LocalesToCreate = [{name:"Arabic (United Arab Emirates)", code:"ar_AE", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Arabic (Jordan)", code:"ar_JO", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Arabic (Syria)", code:"ar_SY", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Croatian (Croatia)", code:"hr_HR", dateTimeFormat:"YYYY. MMMM DD HH:mm:ss", dateFormat:"YYYY. MMMM DD"},
{name:"French (Belgium)", code:"fr_BE", dateTimeFormat:"dddd DD MMMM YYYY H[ h ]mm[ min ]ss[ s ]", dateFormat:"dddd DD MMMM YYYY"},
{name:"Spanish (Panama)", code:"es_PA", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Maltese (Malta)", code:"mt_MT", dateTimeFormat:"dddd, DD [ta’] MMMM YYYY HH:mm:ss", dateFormat:"dddd, DD [ta’] MMMM YYYY"},
{name:"Spanish (Venezuela)", code:"es_VE", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Bulgarian", code:"bg", dateTimeFormat:"DD MMMM Y, dddd HH:mm:ss", dateFormat:"DD MMMM Y, dddd"},
{name:"Chinese (Taiwan)", code:"zh_TW", dateTimeFormat:"YYYY[?]M[?]DD[?] dddd ahh[?]mm[?]ss[?]", dateFormat:"YYYY[?]M[?]DD[?] dddd"},
{name:"Italian", code:"it", dateTimeFormat:"dddd DD MMMM YYYY H.mm.ss", dateFormat:"dddd DD MMMM YYYY"},
{name:"Korean", code:"ko", dateTimeFormat:"YYYY[?] M[?] d[?] dddd a h[?] mm[?] ss[?]", dateFormat:"YYYY[?] M[?] d[?] dddd"},
{name:"Ukrainian", code:"uk", dateTimeFormat:"dddd, DD MMMM YYYY ?. H:mm:ss", dateFormat:"dddd, DD MMMM YYYY ?."},
{name:"Latvian", code:"lv", dateTimeFormat:"dddd, YYYY, DD MMMM HH:mm:ss", dateFormat:"dddd, YYYY, DD MMMM"},
{name:"Danish (Denmark)", code:"da_DK", dateTimeFormat:"DD. MMMM YYYY HH:mm:ss", dateFormat:"DD. MMMM YYYY"},
{name:"Spanish (Puerto Rico)", code:"es_PR", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Vietnamese (Vietnam)", code:"vi_VN", dateTimeFormat:"HH:mm:ss dddd, [ngày] dd MMMM [n?m] YYYY", dateFormat:"dddd, [ngày] DD MMMM [n?m] YYYY"},
{name:"English (United States)", code:"en_US", dateTimeFormat:"dddd, MMMM d, YYYY h:mm:ss a", dateFormat:"dddd, MMMM d, YYYY"},
{name:"Serbian (Montenegro)", code:"sr_ME", dateTimeFormat:"dddd, DD.MMMM.YYYY. HH.mm.ss", dateFormat:"dddd, DD.MMMM.YYYY."},
{name:"Swedish (Sweden)", code:"sv_SE", dateTimeFormat:"[den ]DD MMMM YYYY [kl ]H:mm", dateFormat:"[den ]DD MMMM YYYY"},
{name:"Spanish (Bolivia)", code:"es_BO", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"English (Singapore)", code:"en_SG", dateTimeFormat:"dddd, MMMM d, YYYY h:mm:ss a", dateFormat:"dddd, MMMM d, YYYY"},
{name:"Arabic (Bahrain)", code:"ar_BH", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Portuguese", code:"pt", dateTimeFormat:"dddd, DD[ de ]MMMM[ de ]YYYY HH[H]mm[m]", dateFormat:"dddd, DD[ de ]MMMM[ de ]YYYY"},
{name:"Arabic (Saudi Arabia)", code:"ar_SA", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Slovak", code:"sk", dateTimeFormat:"dddd, YYYY, MMMM DD H:mm:ss", dateFormat:"dddd, YYYY, MMMM d"},
{name:"Arabic (Yemen)", code:"ar_YE", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Hindi (India)", code:"hi_IN", dateTimeFormat:"dddd, DD MMMM, YYYY h:mm:ss a", dateFormat:"dddd, DD MMMM, YYYY"},
{name:"Irish", code:"ga", dateTimeFormat:"dddd, YYYY MMMM DD HH:mm:ss", dateFormat:"dddd, YYYY MMMM DD"},
{name:"English (Malta)", code:"en_MT", dateTimeFormat:"dddd, DD MMMM YYYY HH:mm:ss", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Finnish (Finland)", code:"fi_FI", dateTimeFormat:"DD. MMMM[ta ]YYYY H.mm.ss", dateFormat:"DD. MMMM[ta ]YYYY"},
{name:"Estonian", code:"et", dateTimeFormat:"dddd, DD. MMMM YYYY H:mm:ss", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Swedish", code:"sv", dateTimeFormat:"[den ]DD MMMM YYYY [kl ]H:mm", dateFormat:"[den ]DD MMMM YYYY"},
{name:"Czech", code:"cs", dateTimeFormat:"dddd, DD. MMMM YYYY H:mm:ss", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Serbian (Latin,Bosnia and Herzegovina)", code:"sr_BA_#Latn", dateTimeFormat:"dddd, DD. MMMM Y. HH.mm.ss", dateFormat:"dddd, DD. MMMM Y."},
{name:"Greek", code:"el", dateTimeFormat:"dddd, DD MMMM YYYY h:mm:ss a", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Ukrainian (Ukraine)", code:"uk_UA", dateTimeFormat:"dddd, DD MMMM YYYY ?. H:mm:ss", dateFormat:"dddd, DD MMMM YYYY ?."},
{name:"Hungarian", code:"hu", dateTimeFormat:"YYYY. MMMM DD. H:mm:ss", dateFormat:"YYYY. MMMM DD."},
{name:"French (Switzerland)", code:"fr_CH", dateTimeFormat:"dddd, DD. MMMM YYYY HH.mm.[ h]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Indonesian", code:"in", dateTimeFormat:"dddd, YYYY MMMM DD HH:mm:ss", dateFormat:"dddd, YYYY MMMM DD"},
{name:"Spanish (Argentina)", code:"es_AR", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY HH[h][]mm", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Arabic (Egypt)", code:"ar_EG", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Japanese (Japan,JP)", code:"ja_JP_JP_#u-ca-japanese", dateTimeFormat:"GGGGYYYY[?]M[?]DD[?] H[?]mm[?]ss[?]", dateFormat:"GGGGYYYY[?]M[?]DD[?]"},
{name:"Spanish (El Salvador)", code:"es_SV", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Portuguese (Brazil)", code:"pt_BR", dateTimeFormat:"dddd, DD[ de ]MMMM[ de ]YYYY HH[h]mm[min]ss[s]", dateFormat:"dddd, DD] de [MMMM] de [YYYY"},
{name:"Belarusian", code:"be", dateTimeFormat:"dddd, d, MMMM YYYY H.mm.ss", dateFormat:"dddd, d, MMMM YYYY"},
{name:"Icelandic (Iceland)", code:"is_IS", dateTimeFormat:"DD. MMMM YYYY HH:mm:ss", dateFormat:"DD. MMMM YYYY"},
{name:"Czech (Czech Republic)", code:"cs_CZ", dateTimeFormat:"dddd, DD. MMMM YYYY H:mm:ss", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Spanish", code:"es", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY HH[H]mm[]", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Polish (Poland)", code:"pl_PL", dateTimeFormat:"dddd, DD MMMM YYYY HH:mm:ss", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Turkish", code:"tr", dateTimeFormat:"DD MMMM YYYY dddd HH:mm:ss", dateFormat:"DD MMMM YYYY dddd"},
{name:"Catalan (Spain)", code:"ca_ES", dateTimeFormat:"dddd, DD[ / ]MMMM[ / ]YYYY HH:mm:ss", dateFormat:"dddd, DD[ / ]MMMM[ / ]YYYY"},
{name:"Serbian (Serbia and Montenegro)", code:"sr_CS", dateTimeFormat:"dddd, DD.MMMM.YYYY. HH.mm.ss", dateFormat:"dddd, DD.MMMM.YYYY."},
{name:"Malay (Malaysia)", code:"ms_MY", dateTimeFormat:"dddd DD MMM YYYY h:mm:ss a", dateFormat:"dddd DD MMM YYYY"},
{name:"Croatian", code:"hr", dateTimeFormat:"YYYY. MMMM DD HH:mm:ss", dateFormat:"YYYY. MMMM DD"},
{name:"Lithuanian", code:"lt", dateTimeFormat:"dddd, YYYY, MMMM DD HH.mm.ss", dateFormat:"dddd, YYYY, MMMM d"},
{name:"Spanish (Spain)", code:"es_ES", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY HH[H]mm[]", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Spanish (Colombia)", code:"es_CO", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Bulgarian (Bulgaria)", code:"bg_BG", dateTimeFormat:"DD MMMM Y, dddd HH:mm:ss", dateFormat:"DD MMMM Y, dddd"},
{name:"Albanian", code:"sq", dateTimeFormat:"YYYY-MM-DD h.mm.ss.a", dateFormat:"YYYY-MM-DD"},
{name:"French", code:"fr", dateTimeFormat:"dddd DD MMMM YYYY HH[ h ]mm", dateFormat:"dddd DD MMMM YYYY"},
{name:"Japanese", code:"ja", dateTimeFormat:"YYYY[?]M[?]DD[?] H[?]mm[?]ss[?]", dateFormat:"YYYY[?]M[?]DD[?]"},
{name:"Serbian (Bosnia and Herzegovina)", code:"sr_BA", dateTimeFormat:"dddd, DD. MMMM YYYY. HH [??????], mm [??????], ss[ ???????]", dateFormat:"dddd, DD. MMMM YYYY."},
{name:"Icelandic", code:"is", dateTimeFormat:"DD. MMMM YYYY HH:mm:ss", dateFormat:"DD. MMMM YYYY"},
{name:"Spanish (Paraguay)", code:"es_PY", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"German", code:"de", dateTimeFormat:"dddd, DD. MMMM YYYY HH:mm[ Uhr ]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Spanish (Ecuador)", code:"es_EC", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY HH:mm:ss", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Spanish (United States)", code:"es_US", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY h:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Arabic (Sudan)", code:"ar_SD", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"English", code:"en", dateTimeFormat:"dddd, MMMM d, YYYY h:mm:ss a", dateFormat:"dddd, MMMM d, YYYY"},
{name:"Romanian (Romania)", code:"ro_RO", dateTimeFormat:"DD MMMM YYYY HH:mm:ss", dateFormat:"DD MMMM YYYY"},
{name:"English (Philippines)", code:"en_PH", dateTimeFormat:"dddd, MMMM d, YYYY h:mm:ss a", dateFormat:"dddd, MMMM d, YYYY"},
{name:"Catalan", code:"ca", dateTimeFormat:"dddd, DD[ / ]MMMM[ / ]YYYY HH:mm:ss", dateFormat:"dddd, DD[ / ]MMMM[ / ]YYYY"},
{name:"Arabic (Tunisia)", code:"ar_TN", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Serbian (Latin,Montenegro)", code:"sr_ME_#Latn", dateTimeFormat:"dddd, DD. MMMM Y. HH.mm.ss", dateFormat:"dddd, DD. MMMM Y."},
{name:"Spanish (Guatemala)", code:"es_GT", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Slovenian", code:"sl", dateTimeFormat:"dddd, DD. MMMM Y H:mm:ss", dateFormat:"dddd, DD. MMMM Y"},
{name:"Korean (South Korea)", code:"ko_KR", dateTimeFormat:"YYYY[?] M[?] d[?] dddd a h[?] mm[?] ss[?]", dateFormat:"YYYY[?] M[?] d[?] dddd"},
{name:"Greek (Cyprus)", code:"el_CY", dateTimeFormat:"dddd, DD MMMM YYYY h:mm:ss a", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Spanish (Mexico)", code:"es_MX", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Russian (Russia)", code:"ru_RU", dateTimeFormat:"d MMMM YYYY [?.] H:mm:ss", dateFormat:"d MMMM YYYY [?.]"},
{name:"Spanish (Honduras)", code:"es_HN", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Chinese (Hong Kong)", code:"zh_HK", dateTimeFormat:"YYYY[?]MM[?]DD[?] dddd ahh[?]mm[?]ss[?]", dateFormat:"YYYY[?]MM[?]DD[?] dddd"},
{name:"Norwegian (Norway,Nynorsk)", code:"no_NO_NY", dateTimeFormat:"DD. MMMM YYYY [kl ]HH.mm", dateFormat:"DD. MMMM YYYY"},
{name:"Hungarian (Hungary)", code:"hu_HU", dateTimeFormat:"YYYY. MMMM DD. H:mm:ss", dateFormat:"YYYY. MMMM DD."},
{name:"Thai (Thailand)", code:"th_TH", dateTimeFormat:"dddd[??? ]DD MMMM G YYYY, H[ ?????? ]m[ ???? ]ss[ ??????]", dateFormat:"dddd[??? ]DD MMMM G YYYY"},
{name:"Arabic (Iraq)", code:"ar_IQ", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Spanish (Chile)", code:"es_CL", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY HH:mm:ss", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Finnish", code:"fi", dateTimeFormat:"DD. MMMM[ta ]YYYY H.mm.ss", dateFormat:"DD. MMMM[ta ]YYYY"},
{name:"Arabic (Morocco)", code:"ar_MA", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Irish (Ireland)", code:"ga_IE", dateTimeFormat:"dddd DD MMMM YYYY HH:mm:ss", dateFormat:"dddd DD MMMM YYYY"},
{name:"Macedonian", code:"mk", dateTimeFormat:"dddd, d, MMMM YYYY HH:mm:ss", dateFormat:"dddd, d, MMMM YYYY"},
{name:"Turkish (Turkey)", code:"tr_TR", dateTimeFormat:"DD MMMM YYYY dddd HH:mm:ss", dateFormat:"DD MMMM YYYY dddd"},
{name:"Estonian (Estonia)", code:"et_EE", dateTimeFormat:"dddd, DD. MMMM YYYY H:mm:ss", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Arabic (Qatar)", code:"ar_QA", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Serbian (Latin)", code:"sr__#Latn", dateTimeFormat:"dddd, DD. MMMM Y. HH.mm.ss", dateFormat:"dddd, DD. MMMM Y."},
{name:"Portuguese (Portugal)", code:"pt_PT", dateTimeFormat:"dddd, DD[ de ]MMMM[ de ]YYYY HH[H]mm[m]", dateFormat:"dddd, DD[ de ]MMMM[ de ]YYYY"},
{name:"French (Luxembourg)", code:"fr_LU", dateTimeFormat:"dddd DD MMMM YYYY HH[ h ]mm", dateFormat:"dddd DD MMMM YYYY"},
{name:"Arabic (Oman)", code:"ar_OM", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Thai", code:"th", dateTimeFormat:"dddd[??? ]DD MMMM G YYYY, H[ ?????? ]m[ ???? ]ss[ ??????]", dateFormat:"dddd[??? ]DD MMMM G YYYY"},
{name:"Albanian (Albania)", code:"sq_AL", dateTimeFormat:"YYYY-MM-DD h.mm.ss.a", dateFormat:"YYYY-MM-DD"},
{name:"Spanish (Dominican Republic)", code:"es_DO", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Spanish (Cuba)", code:"es_CU", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY HH[H]mm[]", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Arabic", code:"ar", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Russian", code:"ru", dateTimeFormat:"d MMMM YYYY [?.] H:mm:ss", dateFormat:"d MMMM YYYY [?.]"},
{name:"English (New Zealand)", code:"en_NZ", dateTimeFormat:"dddd, DD MMMM YYYY h:mm:ss a", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Serbian (Serbia)", code:"sr_RS", dateTimeFormat:"dddd, DD.MMMM.YYYY. HH.mm.ss", dateFormat:"dddd, DD.MMMM.YYYY."},
{name:"German (Switzerland)", code:"de_CH", dateTimeFormat:"dddd, DD. MMMM YYYY HH:mm[ Uhr ]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Spanish (Uruguay)", code:"es_UY", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Malay", code:"ms", dateTimeFormat:"dddd, YYYY MMMM DD HH:mm:ss", dateFormat:"dddd, YYYY MMMM DD"},
{name:"Greek (Greece)", code:"el_GR", dateTimeFormat:"dddd, DD MMMM YYYY h:mm:ss a", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Hebrew (Israel)", code:"iw_IL", dateTimeFormat:"HH:mm:ss dddd DD MMMM YYYY", dateFormat:"dddd DD MMMM YYYY"},
{name:"English (South Africa)", code:"en_ZA", dateTimeFormat:"dddd DD MMMM YYYY h:mm:ss a", dateFormat:"dddd DD MMMM YYYY"},
{name:"Thai (Thailand,TH)", code:"th_TH_TH_#u-nu-thai", dateTimeFormat:"dddd[??? ]DD MMMM G YYYY, H[ ?????? ]m[ ???? ]ss[ ??????]", dateFormat:"dddd[??? ]DD MMMM G YYYY"},
{name:"Hindi", code:"hi", dateTimeFormat:"dddd, MMMM d, YYYY h:mm:ss a", dateFormat:"dddd, MMMM d, YYYY"},
{name:"French (France)", code:"fr_FR", dateTimeFormat:"dddd DD MMMM YYYY HH[ h ]mm", dateFormat:"dddd DD MMMM YYYY"},
{name:"German (Austria)", code:"de_AT", dateTimeFormat:"dddd, DD. MMMM YYYY HH:mm[ Uhr ]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Dutch", code:"nl", dateTimeFormat:"dddd DD MMMM YYYY H:mm:ss[ uur]", dateFormat:"dddd DD MMMM YYYY"},
{name:"Norwegian (Norway)", code:"no_NO", dateTimeFormat:"DD. MMMM YYYY [kl ]HH.mm", dateFormat:"DD. MMMM YYYY"},
{name:"English (Australia)", code:"en_AU", dateTimeFormat:"dddd, DD MMMM YYYY h:mm:ss a", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Vietnamese", code:"vi", dateTimeFormat:"HH:mm:ss dddd, [ngày] DD MMMM [n?m] YYYY", dateFormat:"dddd, [ngày] DD MMMM [n?m] YYYY"},
{name:"Dutch (Netherlands)", code:"nl_NL", dateTimeFormat:"dddd DD MMMM YYYY H:mm:ss[ uur]", dateFormat:"dddd DD MMMM YYYY"},
{name:"French (Canada)", code:"fr_CA", dateTimeFormat:"dddd DD MMMM YYYY H[ h ]mm", dateFormat:"dddd DD MMMM YYYY"},
{name:"Latvian (Latvia)", code:"lv_LV", dateTimeFormat:"dddd, YYYY, DD MMMM HH:mm:ss", dateFormat:"dddd, YYYY, DD MMMM"},
{name:"German (Luxembourg)", code:"de_LU", dateTimeFormat:"dddd, DD. MMMM YYYY HH:mm[ Uhr ]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Spanish (Costa Rica)", code:"es_CR", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Arabic (Kuwait)", code:"ar_KW", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Serbian", code:"sr", dateTimeFormat:"dddd, DD.MMMM.YYYY. HH.mm.ss", dateFormat:"dddd, DD.MMMM.YYYY."},
{name:"Arabic (Libya)", code:"ar_LY", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Maltese", code:"mt", dateTimeFormat:"dddd, DD [ta’] MMMM YYYY HH:mm:ss", dateFormat:"dddd, DD [ta’] MMMM YYYY"},
{name:"Italian (Switzerland)", code:"it_CH", dateTimeFormat:"dddd, DD. MMMM YYYY H.mm[ h]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Danish", code:"da", dateTimeFormat:"DD. MMMM YYYY HH:mm:ss", dateFormat:"DD. MMMM YYYY"},
{name:"German (Germany)", code:"de_DE", dateTimeFormat:"dddd, DD. MMMM YYYY HH:mm[ Uhr ]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Arabic (Algeria)", code:"ar_DZ", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Slovak (Slovakia)", code:"sk_SK", dateTimeFormat:"dddd, YYYY, MMMM DD H:mm:ss", dateFormat:"dddd, YYYY, MMMM d"},
{name:"Lithuanian (Lithuania)", code:"lt_LT", dateTimeFormat:"dddd, YYYY, MMMM DD HH.mm.ss", dateFormat:"dddd, YYYY, MMMM d"},
{name:"Italian (Italy)", code:"it_IT", dateTimeFormat:"dddd DD MMMM YYYY H.mm.ss", dateFormat:"dddd DD MMMM YYYY"},
{name:"English (Ireland)", code:"en_IE", dateTimeFormat:"DD MMMM YYYY HH:mm:ss [o][clock]", dateFormat:"DD MMMM YYYY"},
{name:"Chinese (Singapore)", code:"zh_SG", dateTimeFormat:"DD MMMM YYYY a hh:mm:ss", dateFormat:"DD MMMM YYYY"},
{name:"Romanian", code:"ro", dateTimeFormat:"DD MMMM YYYY HH:mm:ss", dateFormat:"DD MMMM YYYY"},
{name:"English (Canada)", code:"en_CA", dateTimeFormat:"dddd, MMMM d, YYYY h:mm:ss [o][clock] a", dateFormat:"dddd, MMMM d, YYYY"},
{name:"Dutch (Belgium)", code:"nl_BE", dateTimeFormat:"dddd DD MMMM YYYY H.mm[ u. ]", dateFormat:"dddd DD MMMM YYYY"},
{name:"Norwegian", code:"no", dateTimeFormat:"DD. MMMM YYYY [kl ]HH.mm", dateFormat:"DD. MMMM YYYY"},
{name:"Polish", code:"pl", dateTimeFormat:"dddd, DD MMMM YYYY HH:mm:ss", dateFormat:"dddd, DD MMMM YYYY"},
{name:"Chinese (China)", code:"zh_CN", dateTimeFormat:"YYYY[?]M[?]DD[?] dddd ahh[?]mm[?]ss[?]", dateFormat:"YYYY[?]M[?]DD[?] dddd"},
{name:"Japanese (Japan)", code:"ja_JP", dateTimeFormat:"YYYY[?]M[?]DD[?] H[?]mm[?]ss[?]", dateFormat:"YYYY[?]M[?]DD[?]"},
{name:"German (Greece)", code:"de_GR", dateTimeFormat:"dddd, DD. MMMM YYYY HH:mm[ Uhr ]", dateFormat:"dddd, DD. MMMM YYYY"},
{name:"Serbian (Latin,Serbia)", code:"sr_RS_#Latn", dateTimeFormat:"dddd, DD. MMMM Y. HH.mm.ss", dateFormat:"dddd, DD. MMMM Y."},
{name:"Hebrew", code:"iw", dateTimeFormat:"HH:mm:ss dddd DD MMMM YYYY", dateFormat:"dddd DD MMMM YYYY"},
{name:"English (India)", code:"en_IN", dateTimeFormat:"dddd, DD MMMM, YYYY h:mm:ss a", dateFormat:"dddd, DD MMMM, YYYY"},
{name:"Arabic (Lebanon)", code:"ar_LB", dateTimeFormat:"DD MMMM, YYYY hh:mm:ss a", dateFormat:"DD MMMM, YYYY"},
{name:"Spanish (Nicaragua)", code:"es_NI", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Chinese", code:"zh", dateTimeFormat:"YYYY[?]M[?]DD[?] dddd ahh[?]mm[?]ss[?]", dateFormat:"YYYY[?]M[?]DD[?] dddd"},
{name:"Macedonian (Macedonia)", code:"mk_MK", dateTimeFormat:"dddd, d, MMMM YYYY HH:mm:ss", dateFormat:"dddd, d, MMMM YYYY"},
{name:"Belarusian (Belarus)", code:"be_BY", dateTimeFormat:"dddd, d, MMMM YYYY H.mm.ss", dateFormat:"dddd, d, MMMM YYYY"},
{name:"Slovenian (Slovenia)", code:"sl_SI", dateTimeFormat:"dddd, DD. MMMM Y H:mm:ss", dateFormat:"dddd, DD. MMMM Y"},
{name:"Spanish (Peru)", code:"es_PE", dateTimeFormat:"dddd DD[ de ]MMMM[ de ]YYYY hh:mm:ss a", dateFormat:"dddd DD[ de ]MMMM[ de ]YYYY"},
{name:"Indonesian (Indonesia)", code:"in_ID", dateTimeFormat:"dddd DD MMMM YYYY H:mm:ss", dateFormat:"dddd DD MMMM YYYY"},
{name:"English (United Kingdom)", code:"en_GB", dateTimeFormat:"dddd, DD MMMM YYYY HH:mm:ss [o][clock]", dateFormat:"dddd, DD MMMM YYYY"}]