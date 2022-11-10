class Constants{

    constructor(){
        this.name = "constObj";
        this.appURL = 'https://dyuta.github.io/pote-walk/';
        this.numberOfStores=6;

        this.noiUrl = 'https://www.tunecore.co.jp/artists/noiyuhi?lang=ja';
        this.kotobaUrl = 'https://liondo.jp/?page_id=3029';
        this.naoeUrl = 'https://twitter.com/naoeaki';

        this.gameModes =[
            "Normal",
            "Sanpo",
            "Nope"
        ];
        
        this.bookstoreList = [
            {name:"NENOi",line:"東京メトロ",station:"早稲田"
            ,url:"https://nenoi.jp/"},
            {name:"マルジナリア書店",line:"京王 JR",station:"分倍河原"
            ,url:"https://twitter.com/yohakushapub"},
            {name:"書肆 海と夕焼",line:"JR",station:"谷保"
            ,url:"https://twitter.com/bs_sea_sunset_"},
            {name:"BREWBOOKS",line:"JR",station:"西荻窪"
            ,url:"https://brewbooks.net/"},
            {name:"山陽堂書店",line:"東京メトロ",station:"表参道"
            ,url:"https://sanyodo-shoten.co.jp/"},
            {name:"双子のライオン堂",line:"東京メトロ",station:"赤坂"
            ,url:"https://liondo.jp/"},
        ];

        this.volumeBGM=0.1;
        this.volumeSound=0.2;
        /*
        this.START_GAME="START_GAME";
        this.GO_CREDIT="GO_CREDIT";
        this.GO_TITLE="GO_TITLE";
        this.VOLUME_OFF="VOLUME_OFF";
        this.VOLUME_ON="VOLUME_ON";
        this.GO_POTATO="GO_POTATO";
        */

        this.colors = {
            background:"E7E6E3",
            backgroundAsh:"FCFCFC"
        };

        this.jumpVelocity = -1250;

        this.gameSpeedNormal = 9;
        this.gameSpeedFast = 9;// samespeed

        this.obsRespawnInterval = 1100;
        this.coinRespawnInterval = 2200;
        this.storeRespawnInterval = 5500;
        this.coinCntInterval =128;

        this.distances={
            obstacleFrom:400,
            obstacleTo:700,
            coinFromFirst:100,
            coinToFirst:350,
            coinFromSec:850,
            coinToSec:950,
            bookstore:400,
            potehome:500
        };

        this.worldScroll = 0.6;

        this.fontoConf = {};
        //'Zen Maru Gothic','Noto Sans JP','Sawarabi Gothic'
        this.fontoConf.counter = {
			fontFamily: '"Roboto"', fontSize: '28px', fill: "#878176"
        };
        this.fontoConf.loader = {
			fontFamily: '"Roboto"', fontSize: '18px', fill: "#878176"
        };

        this.fontoConf.openingDialogue = {
			fontFamily: '"Zen Maru Gothic"', fontSize: '38px', fill: "#5E5A53"
            ,fontWeight:"bold"
        };

        this.fontoConf.storeinfo01 = {
			fontFamily: '"Zen Maru Gothic"', fontSize: '32px', fill: "#878176"
            //,fontWeight:"bold"
        };

        /*
        this.fontoConf.storeinfo02 = {
			fontFamily: '"Noto Sans JP"', fontSize: '28px', fill: "#878176"
        };
        this.fontoConf.storeinfo03 = {
			fontFamily: '"Sawarabi Gothic"', fontSize: '28px', fill: "#878176"
        };
        */

        // const Resultcolor = "#9F6F3F";
        const Resultcolor = "#EFA92A";
        this.fontoConf.resultTitle = {
			fontFamily: '"Concert One"', fontSize: '64px', fill: Resultcolor
        };
        this.fontoConf.resultDetail = {
			fontFamily: '"Concert One"', fontSize: '48px', fill: Resultcolor
        };

        //
        this.fontoConf.TapLink = {
			fontFamily: '"Roboto"', fontSize: '40px', fill: "#878176"
        };

        // nope
        this.nope = {};


    }
}

export default Constants;