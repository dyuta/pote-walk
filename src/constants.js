class Constants{

    constructor(){
        this.name = "constObj";
        this.appVersion = "1.0.3";
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
            //background:"E7E6E3",
            background:"81858E",
            backgroundAsh:"FCFCFC",
            backgroundNPPlay:"C4C5C9"
        };

        this.jumpVelocity = -1250;

        this.gameSpeedNormal = 9;
        this.gameSpeedFast = 9;// samespeed
        this.gameSpeedNP = 10;
        this.gameSpeedNPFast = 12;

        this.obsRespawnInterval = 1100;
        this.coinRespawnInterval = 2200;
        this.storeRespawnInterval = 5500;
        this.coinCntInterval =128;

        this.npCloudIncAlphaInterval =1100;
        this.npCloudIncVal =0.1;

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

        // np
        this.fontoConf.titleNP = {
			fontFamily: '"Kumbh Sans"', fontSize: '82px', fill: "#ffffff"
        };
        
        this.fontoConf.bodyNP = {
			fontFamily: '"Albert Sans"', fontSize: '48px', fill: "#ffffff"
        };

        this.skipTitleNPTrue = true;

        this.npscenetitleList= [
            {name:"NOPE"},
            {name:"GHOST"},
            {name:"CLOVER"},
            {name:"GORDY"},
            {name:"LUCKY"},
            {name:"Jean Jacket"},
            {name:"Jean Jacket"}
        ];
        this.npSpObstacleList=[
            {name:"kunekuneNP",anim:"kune-kune",distanceX:this.distances.obstacleFrom,posYUp:0},//靴にしたい
            {name:"kunekuneNP",anim:"kune-kune",distanceX:this.distances.obstacleFrom,posYUp:0},//
            {name:"alienKids",anim:"alienKids-look",distanceX:this.distances.obstacleFrom,posYUp:0},
            {name:"monkey",anim:"monkey-angry",distanceX:this.distances.obstacleFrom,posYUp:0},
            {name:"flagropeNP",anim:"nope-rope",distanceX:this.distances.obstacleFrom,posYUp:120},
            {name:"motorcycleNP",anim:"bike-ride",distanceX:this.distances.obstacleFrom,posYUp:0},
            {name:"UFONP",anim:"UFO-NP-fly",distanceX:this.distances.obstacleFrom,posYUp:20}
        ];


    }
}

export default Constants;